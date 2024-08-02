import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { resolve as _resolve, join } from "path";

export const mode = 'production';
export const entry = {
    main: _resolve(__dirname, './src/app.js'),
};
export const output = {
    filename: '[name].bundle.js',
    path: _resolve(__dirname, 'deploy'),
    clean: true
};
export const devServer = {
    static: [
        { directory: join(__dirname, 'deploy') },
    ],
    port: 3000,
    open: true,
    hot: true
};
export const module = {
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
};
export const plugins = [
    new HtmlWebpackPlugin({
        title: "Weather App",
        template: _resolve(__dirname, 'src/template.html')
    }),

    new CleanWebpackPlugin()
];
export const resolve = {
    extensions: ['.js', '.json'],
};
export const devtool = 'source-map';