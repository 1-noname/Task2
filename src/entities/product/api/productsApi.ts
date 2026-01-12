import { baseApi } from "@/shared/api/baseApi";

import type {
  Product,
  ProductsLimit,
  ProductsResponse,
} from "../model/types/types";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<string[], void>({
      query: () => "products/category-list",
    }),

    getProductById: build.query<Product, string>({
      query: (id) => `products/${id}`,
    }),

    getProducts: build.query<ProductsResponse, ProductsLimit>({
      query: ({ limit = 6, skip = 0, search, category }) => {
        if (search) {
          return {
            url: "products/search",
            params: {
              q: search,
              limit,
              skip,
            },
          };
        }

        if (category) {
          return {
            url: `products/category/${category}`,
            params: {
              limit,
              skip,
            },
          };
        }

        return {
          url: "products",
          params: {
            limit,
            skip,
          },
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          currentCache.products = newItems.products;
          currentCache.total = newItems.total;
        } else {
          currentCache.products.push(...newItems.products);
        }
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.skip !== previousArg?.skip ||
          currentArg?.category !== previousArg?.category ||
          currentArg?.search !== previousArg?.search
        );
      },

      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    addProduct: build.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "products/add",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      async onQueryStarted(newProduct, { dispatch }) {
        try {
          const patchResult = {
            id: Date.now(),
            title: newProduct.title,
            price: newProduct.price,
            description: newProduct.description,
            thumbnail: "",
            category: "custom",
          } as Product;

          dispatch(
            productsApi.util.updateQueryData(
              "getProducts",
              { limit: 6, skip: 0 },
              (draft) => {
                if (draft?.products) {
                  draft.products.unshift(patchResult);
                  draft.total += 1;
                }
              },
            ),
          );
        } catch (e) {
          console.error("Add failed", e);
        }
      },
    }),

    updateProduct: build.mutation<Product, { id: number } & Partial<Product>>({
      query: ({ id, ...partial }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: partial,
      }),

      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedProduct } = await queryFulfilled;

          dispatch(
            productsApi.util.updateQueryData(
              "getProductById",
              id.toString(),
              (draft) => {
                Object.assign(draft, updatedProduct);
              },
            ),
          );
        } catch {
          console.error("Update failed");
        }
      },

      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    deleteProduct: build.mutation<{ isDeleted: boolean; id: number }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            productsApi.util.updateQueryData(
              "getProducts",
              { limit: 6, skip: 0 },
              (draft) => {
                draft.products = draft.products.filter(
                  (product) => product.id !== id,
                );
                draft.total -= 1;
              },
            ),
          );
        } catch (e) {
          console.error("Delete failed", e);
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
} = productsApi;
