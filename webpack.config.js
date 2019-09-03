const path = require('path');
var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//environment variable dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//get variables in html-plugin
var getHtmlConfig = function(name, title) {
    return {
        template:'./src/view/'+ name +'.html',
        filename:'view/'+ name +'.html',
        title:title,
        hash:true,
        inject:true,
        chunks:['common', name]
    };
};
var config = {
  entry: {  
      'common':['./src/page/common/index.js'],
      'index':['./src/page/index/index.js'],
      'login':['./src/page/login/index.js'],
      'result':['./src/page/result/index.js']
    },
  output: {
    filename: 'js/[name].js',
    publicPath: '/dist',
    path: path.resolve(__dirname, 'dist')
  },
  externals:{
      'jquery':'window.jQuery'
  },
  module:{
    loaders:[{
        test: /\.css$/, loader:Ex.extract("style-loader", "css-loader")
    },
    {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=100&name=resource/[name].[ext]'
    },
    {
        test:/\.string$/, loader:'html-loader'
    }]
  },
  resolve: {
      alias:{
          node_modules:__dirname+'/node_modules',
          util:__dirname+'/src/util',
          iamge:__dirname+'/src/iamge',
          page:__dirname+'/src/page',
          service:__dirname+'/src/service',
      },
  },
  plugins:[
      //common chunk plugin
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: 'js/base.js'
      }),
      //individully packed css 
      new Ex("css/[name].css"),
      //html template pack
      new HtmlWebpackPlugin(getHtmlConfig('index', 'Home Page') ),
      new HtmlWebpackPlugin(getHtmlConfig('login', 'Login') ),
      new HtmlWebpackPlugin(getHtmlConfig('result', 'Result Page') ),
    ],
};

if(WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;