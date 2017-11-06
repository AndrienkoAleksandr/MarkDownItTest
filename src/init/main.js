require.config({
  paths: {
    'markdown-it' : 'node_modules/markdown-it/dist/markdown-it',
    "markdown-it-for-inline" : 'node_modules/markdown-it-for-inline/dist/markdown-it-for-inline',
    "markdown-it-emoji": 'node_modules/markdown-it-emoji/dist/markdown-it-emoji'
  }
}); 

require(["markdown-it", "markdown-it-emoji"],
    function(markdownIt, mdItEmoji) {

        function run() {
            var mdParser = markDownInit(markdownIt);

            var content = document.getElementById("content-widget").value;

            document.getElementById("result-container").innerHTML = mdParser.render(content);
        }

        // default options for markdown parser
        var defaults = {
            html:         false,        // Enable HTML tags in source
            xhtmlOut:     false,        // Use '/' to close single tags (<br />)
            breaks:       false,        // Convert '\n' in paragraphs into <br>
            langPrefix:   'language-',  // CSS language prefix for fenced blocks
            linkify:      true,         // autoconvert URL-like texts to links
            typographer:  true,         // Enable smartypants and other sweet transforms

            // options below are for demo only
            _highlight: true,
            _strict: false,
            _view: 'html'               // html / src / debug
        };

        function markDownInit(markdownIt) {
            var mdParser = new markdownIt(defaults);

//             mdParser.use(mdItEmoji);//. chain
            mdParser.use(emoji_plugin_little);

            return mdParser;
        }

        run();
});
