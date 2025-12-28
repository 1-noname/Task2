import { BuildOptions } from "./types/config";

import webpack from "webpack";

export function buildResolves(options: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"],
    preferAbsolute: true,
    alias: {
      "@": options.paths.src,
    },
  };
}
