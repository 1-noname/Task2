import { baseApi } from "@/shared/api/baseApi";

import { Product, ProductsLimit, ProductsResponse } from "../model/types";

const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, ProductsLimit>({
      query: ({ limit = 6, skip = 0 }) => ({
        url: "/products",
        params: { limit, skip },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.products.push(...newItems.products);
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
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

    addProduct: build.mutation<Product, Omit<Product, "id">>({
      query: (body) => ({
        url: "products/add",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: build.mutation<Product, { id: number } & Partial<Product>>({
      query: ({ id, ...partial }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: partial,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const productResult = dispatch(
          productsApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              const updatedProduct = draft.products.find(
                (product) => product.id === id,
              );

              if (updatedProduct) Object.assign(updatedProduct, patch);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          productResult.undo();
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
      invalidatesTags: (result, error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
