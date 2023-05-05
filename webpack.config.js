const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
   optimization:{
       minimize: false // 关闭代码压缩，可选
   },

   entry: "./src/index.ts",

   devtool: "inline-source-map",

   devServer: {
    static: { 
		directory: path.join(__dirname, 'dist')
	},
   },

   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "bundle.js",
       environment: {
           arrowFunction: false // 关闭webpack的箭头函数，可选
       }
   },

   resolve: {
       extensions: [".ts", ".js"]
   },

   module: {
       rules: [
           {
               test: /\.ts$/,
               use: [
                {
                    loader: "babel-loader",
                    options:{
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets":{
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    "corejs":"3",
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                {
                    loader: "ts-loader",

                }
            ],
               exclude: /node_modules/
           },
           //设置less文件的处理
           {
            test:/\.less$/,
            use:[
                "style-loader",
                "css-loader",
                {
                    loader:"postcss-loader",
                    options:{
                        postcssOptions:{
                            plugins:[
                                [
                                "postcss-preset-env",
                                {
                                    browsers:'last 2 versions'
                                }
                            ]
                        ]
                        }
                    }
                },
                "less-loader"
            ]
           }
       ]
   },

   plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
        template:"./src/index.html"
       }),
   ]
}