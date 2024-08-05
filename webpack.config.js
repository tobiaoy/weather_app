const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/app.js'),
      },
    
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'deploy'),
        assetModuleFilename: '[name][ext]',
        clean: true
      },
    
      devServer: {
        static: [
            { directory: path.join(__dirname, 'deploy') },
            { directory: path.join(__dirname, 'src') },
            { directory: path.join(__dirname, 'icons') }
        ],
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.css/,
                use: ["style-loader", "css-loader"]
            },

            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext][query]', 
                },
            }
        ]
    },  

    plugins: [
        new HtmlWebpackPlugin({
            title: "Weather App",
            template: path.resolve(__dirname, 'src/template.html')
        }),

        // new CleanWebpackPlugin()
    ],
    
    resolve: {
        extensions: ['.js', '.json'],
    },

    devtool: 'source-map'
}