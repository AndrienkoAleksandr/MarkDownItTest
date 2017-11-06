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
            mdParser.use(che_action_plugin);

            return mdParser;
        }

        function che_action(md, options) {

             function createTokensToReplace(text, Token) {
                 //todo improve regexp
                 var regexpr = new RegExp(/\[action, [^\]]+\]/gi),
                     last_index = 0,
                     nodes = [],
                     token;
                 text.replace(regexpr, function (match, offset) {
                     if (offset > last_index) {
                         token = new Token("text", '', 0);
                         token.content = text.slice(last_index, offset);
                         nodes.push(token);
                     }

                     token = new Token('action', '', 0);
                     token.content = "";
                     token.meta = "id!";
                     nodes.push(token);

                     last_index = offset + match.length;
                 });

                 if (last_index < text.length) {
                     token         = new Token('text', '', 0);
                     token.content = text.slice(last_index);
                     nodes.push(token);
                 }

                 return nodes;
             }

            return function(state) {
                var i,
                    j,
                    tokens,
                    blockTokens = state.tokens;

                for (j = 0; j < blockTokens.length; j++) {
                    if (blockTokens[j].type !== 'inline') {
                        continue;
                    }
                    tokens = blockTokens[j].children;

                    for (i = tokens.length - 1; i >= 0; i--) {
                        var token = tokens[i];
                        //todo improve regexp
                        var regExp = new RegExp(".*\\[action,.*\\].*");
                        console.log("** " + token.content);
                        if (token.type === 'text' && regExp.test(token.content)) {
                             var newToken = createTokensToReplace(token.content, state.Token);
                            blockTokens[j].children = tokens = md.utils.arrayReplaceAt(tokens, i, newToken);
                        }
                    }
                }
            }
        }

        function che_action_plugin(md, options) {
            //add new rule
            md.renderer.rules.action = function (tokens, idx /*, options, env, self */) {
                return "<input type=\"button\" id=\"" + tokens[idx].meta + "\" value=\"Action\">";
            };

            md.core.ruler.push('action', che_action(md))
        }

        run();
});
