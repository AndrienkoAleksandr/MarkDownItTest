require.config({
  paths: {
    'markdown-it' : '../../node_modules/markdown-it/dist/markdown-it',
    "markdown-it-for-inline" : '../../node_modules/markdown-it-for-inline/dist/markdown-it-for-inline'
  }
}); 

require(["convertor"], function(convertor) {
    convertor.convert();
});
