define(["markdown-it", "markdown-it-for-inline"], function(markdownIt, iterator) {

    function convert() {
        console.log("prepare to convertation");
        
        var mdParser = new markdownIt();
        mdParser.use(iterator, 'foo_replace', 'text', function (tokens, idx) {
            tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
        });

        var mdContent = "# markdown-it rulezz! /foo ";

        console.log(mdParser.render(mdContent));

//            fetch('/static/sample.adoc', {method: 'GET'}).then(function (res) {
//                res.text().then(function (text) {

//                });
//            });
    }

    return {
        convert: convert
    }
});