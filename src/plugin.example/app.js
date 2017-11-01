var iterator = require('markdown-it-for-inline');
var md = require('markdown-it')()
    .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
        tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
    });

md.render()