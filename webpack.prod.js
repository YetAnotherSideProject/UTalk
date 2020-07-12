const { CleanWebpackPlugin } = require('clean-webpack-plugin');     // installed via npm
const HtmlPlugin = require('html-webpack-plugin');           // installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // installed via npm
const CopyPlugin = require('copy-webpack-plugin');                  // installed via npm
module.exports = {
    mode: 'production', resolve: { extensions: ['.ts', '.js'] },
    module: {
        rules: [
            { test: /.ts$/, use: 'ts-loader' },
            {
                test: /.scss$/, use: [{ loader: MiniCssExtractPlugin.loader },
                    'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: [
                    'file-loader',
                ],
            }
        ]
    },
    entry: './src/main.ts',
    output: {
        path: __dirname + '/dist'
    },
    plugins: [
        new CleanWebpackPlugin(),
        //Base ist wichtig, da sich hiervon relativ die index.html Ionic Core zieht
        new HtmlPlugin({ template: './src/index.html', base: './ionic/core' }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                //Prod: Ionic Core wird Teil der lokalen Distro und wird deshalb kopiert
                { from: './node_modules/@ionic/core/css', to: 'ionic/core/css' },
                { from: './node_modules/@ionic/core/dist/ionic', to: 'ionic/core/dist/ionic' }
            ],
        })
    ]
};
