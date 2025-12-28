import { BuildOptions } from "./types/config";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgrLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const babelLoader = {
    test: /\.(?:js|mjs|cjs|ts|tsx)$/i,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        targets: "defaults",
        presets: [["@babel/preset-env"]],
      },
    },
  };

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            namedExport: false,
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  return [babelLoader, cssLoader, svgrLoader];
}
