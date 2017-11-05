require.config({
  paths: {
    'markdown-it' : '../../../node_modules/markdown-it/dist/markdown-it',
    "markdown-it-for-inline" : '../../../node_modules/markdown-it-for-inline/dist/markdown-it-for-inline',
    "markdown-it-emoji": '../../../node_modules/markdown-it-emoji/dist/markdown-it-emoji'
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

            // mdParser.use(mdItEmoji);//. chain
            mdParser.use(che_action_plugin);

            return mdParser;
        }

        function che_action(md, options) {

             function createTokenToReplace(text, level, Token) {
                 var token = new Token('action', '', 0);
                 token.content = text.replace(":)", "🤠 ");
                 console.log("set Id");
                 token.meta = "id!";

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
                        var regExp = new RegExp("\\[action,.*\\]");
                        if (token.type === 'text' && regExp.test(token.content)) {
                             var newToken = createTokenToReplace(token.content, token.level, state.Token);
                             tokens[j].children = tokens = md.utils.arrayReplaceAt(children, i, newToken);
                        }
                    }
                }
            }
        }

        function che_action_plugin(md, options) {
            //add new rule
            md.renderer.rules.action = function (tokens, idx /*, options, env, self */) {
                console.log("test for test");
                return "<input type=\"button\" id=\"" + tokens[idx].meta + "\" value=\"Che action\">";
            };

            md.core.ruler.push('action', che_action(md))
        }

        run();
});
