require.config({
  paths: {
    'markdown-it' : 'demo_libs/markdown-it.min',
    "markdown-it-action": '../dist/mdItCheAction',
  }
}); 

require(["markdown-it", "markdown-it-action"],
function(markdownIt, mdItAction) {

    // todo compare with default
    // default options for markdown parser
    var defaults = {
        html:         false,        // Enable HTML tags in source
        xhtmlOut:     false,        // Use '/' to close single tags (<br />)
        breaks:       false,        // Convert '\n' in paragraphs into <br>
        langPrefix:   'language-',  // CSS language prefix for fenced blocks
        linkify:      true,         // autoconvert URL-like texts to links
        typographer:  true,         // Enable smartypants and other sweet transforms
    };

    var mdParser = new markdownIt(defaults);

    console.log(mdItAction);

    mdParser.use(mdItAction);

    var content = document.getElementById("content-widget").value;
    document.getElementById("result-container").innerHTML = mdParser.render(content);
});
