import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    mdx({
      extendMarkdownConfig: true,
    }),
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }], remarkMath,],
     rehypePlugins: [
      // 将 rehypeKatex 放入 rehype 插件数组中
      [rehypeKatex, { output: "mathml" }],
    ],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "github-dark-default" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },

fonts: [
  {
    name: "Noto Sans SC",
    cssVariable: "--font-sans",
    fallbacks: [
      "PingFang SC",
      "Hiragino Sans GB",
      "Microsoft YaHei",
      "sans-serif",
    ],
    provider: fontProviders.local(),
    options: {
      variants: [
        {
          src: ["./src/assets/fonts/noto-sans-sc.woff2"],
        },
      ],
    },
  },
  {
    name: "Noto Serif SC",
    cssVariable: "--font-serif",
    fallbacks: [
      "Songti SC",
      "STSong",
      "SimSun",
      "serif",
    ],
    provider: fontProviders.local(),
    options: {
      variants: [
        {
          src: ["./src/assets/fonts/noto-serif-sc.woff2"],
        },
      ],
    },
  },
  {
    name: "Sarasa Mono SC",
    cssVariable: "--font-mono",
    fallbacks: [
      "Cascadia Code",
      "JetBrains Mono",
      "monospace",
    ],
    provider: fontProviders.local(),
    options: {
      variants: [
        {
          src: ["./src/assets/fonts/sarasa-mono-sc.woff2"],
        },
      ],
    },
  },
],
});
