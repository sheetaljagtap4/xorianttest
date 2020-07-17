const path = require('path')
const webpack = require('webpack')

const htmlentrypath = path.resolve(__dirname, 'src', 'index.html')
const jsentrypath = path.resolve(__dirname, 'src', 'index.js')

//const nodeenv = JSON.stringify(process.env.NODE_ENV)

const apiuri = JSON.stringify(process.env.API_URI)
const sassLoaders = [
    'sass-loader'
]

let buildlocation=''
switch(apiuri){
    case '"production"':
        buildlocation='test-prod';
        break;
    case '"dev"':
        buildlocation='test-dev';
        break;
}

const buildpath = path.resolve(__dirname, buildlocation, 'build')

function pluginsToUse(){
    var plugins=[];
    // plugins.push(new webpack.DefinePlugin({
    //     'prenv': {
    //         NODEENV : nodeenv
    //     }
    // }));
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports ={
    entry: [
        'babel-polyfill',
        jsentrypath,
        htmlentrypath
    ],
    output:{
        path: buildpath,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                options: {
                    list: [
                        {
                            tag : 'h1',                            
                        }
                    ]
                }
            }
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'react-hot-loader/webpack',
                exclude: /node_modules/,                
            },
            {
                test: /\.scss|\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))'
                               
            }
        ]
    },
    plugins: pluginsToUse(),
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}