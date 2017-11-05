require.config({
  paths: {
    'markdown-it' : '../../../node_modules/markdown-it/dist/markdown-it',
    "markdown-it-for-inline" : '../../../node_modules/markdown-it-for-inline/dist/markdown-it-for-inline',
//    "markdown-it-emoji": '../../../node_modules/markdown-it-emoji/dist/markdown-it-emoji'
  }
}); 

require(["markdown-it", "markdown-it-emoji"],
    function(markdownIt, mdItEmoji) {

        function run() {
            var mdParser = markDownInit(markdownIt);

            // convertor.convert(mdParser);
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

             mdParser.use(mdItEmoji);//. chain
//            mdParser.use(emoji_plugin_little);

            return mdParser;
        }

        function emoji_replace(md) {

            function createTokenToReplace(text, level, Token) {
                var token = new Token('text', '', 0);
                token.content = text.replace(":)", "😃 ");

                return token;
            }

            return function(state) {
                var i,
                    j,
                    tokens = state.tokens;

                for (j = 0; j < tokens.length; j++) {
                    if (tokens[j].type !== 'inline') {

                        continue;
                    }
                    var children = tokens[j].children;

                    for (i = children.length - 1; i >= 0; i--) {
                        var token = children[i];
                        var regExp = new RegExp(".*:\\).*");
                        if (token.type === 'text' && regExp.test(token.content)) {
                            console.log("yes");
                            var newToken = createTokenToReplace(token.content, token.level, state.Token);
                            tokens[j].children = tokens = md.utils.arrayReplaceAt(children, i, newToken);
                        }
                    }
                }
            }
        }

        function emoji_plugin_little(md, options) {

            //add new rule
            md.renderer.rules.emoji = function (tokens, idx /*, options, env, self */) {
                console.log("rule emotion here!!!")
                return tokens[idx].content; // here we have html, but in this case we return text too
            };

            console.log(md.renderer.rules);

            md.core.ruler.push('emoji', emoji_replace(md));
        }

        run();
});
