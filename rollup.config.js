import postcss from "rollup-plugin-postcss";
import babel from "rollup-plugin-babel";
import metablock from "rollup-plugin-userscript-metablock";
import ts from "rollup-plugin-typescript2";
import path from "path";
const url = require('postcss-url');

const config = {
  postcss: {
    minimize: true,
    extensions: [".css"],
    inject: false,
    plugins: [
      url({
        url: "inline",
        maxSize: 50,
        fallback: "copy",
      }),
    ],
  },
  babel: {
    exclude: ["node_modules/**"],
    presets: [
      [
        "@babel/env",
        {
          modules: false,
          targets: "last 2 versions, ie > 10",
        },
      ],
    ],
  },
};

const metas = {
  brlbBlocker: {
    input: "./meta/blank.js",
    output: {
      file: "./dist/brlbBlocker.meta.js",
      format: "es",
      name: "copyMetaModule",
    },
    plugins: [
      metablock({
        file: "./src/meta.json",
      }),
    ],
  },
};

const scriptCatMetas =`/* ==UserConfig==
blockList:
  uid:
    title: uid黑名单
    description: uid黑名单，注意若格式填写有问题则会影响脚本运行！格式为 ["xxx", "xxx"]
    default: s[]
 ==/UserConfig== */`;

const scripts = {
  brlbBlocker: {
    input: "./src/index.js",
    output: {
      file: "./dist/brlbBlocker.user.js",
      format: "iife",
      name: "copyModule",
      banner: scriptCatMetas,
    },
    plugins: [
      postcss(config.postcss),
      babel(config.babel),
      // ts({
      //   tsconfig: path.resolve(__dirname, "./tsconfig.json"),
      //   extensions: [".ts"],
      // }),
      // uglify(),
      metablock({
        file: "./src/meta.json",
      }),
    ],
  },
};


export default [...Object.values(metas), ...Object.values(scripts)];
