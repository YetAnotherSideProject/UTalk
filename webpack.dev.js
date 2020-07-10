const HtmlWebpackPlugin = require('html-webpack-plugin');   // installed via npm
module.exports = {
    output: { publicPath: '/' },
    mode: 'development', devtool: 'inline-source-map',
    resolve: { extensions: ['.ts', '.js'] },
    module: {
        rules: [
            {
                test: /.ts$/,
                use: { loader: 'ts-loader', options: { transpileOnly: true } }
            },
            {
                test: /.scss$/, use: ['style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ttf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    entry: './src/main.ts',
    devServer: { historyApiFallback: true },

    plugins: [
        //Base ist wichtig, da sich hiervon relativ die index.html Ionic Core zieht
        //Dev (dev server): Ionic Core wird hier einfach direkt aus den lokalen node_modules genommen
        new HtmlWebpackPlugin({ template: './src/index.html', base: '../node_modules/@ionic/core' }),
    ]
};