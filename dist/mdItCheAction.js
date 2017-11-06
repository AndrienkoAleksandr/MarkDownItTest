(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownItAction = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


module.exports = require('./lib/');
},{"./lib/":2}],2:[function(require,module,exports){
'use strict';

var che_action_ruler = require("./ruler");

module.exports = function action_plugin(md, options) {

    //add new "action" rule
    md.renderer.rules.action = function (tokens, idx /*, options, env, self */) {
        return "<input type=\"button\" id=\"" + tokens[idx].meta + "\" value=\"Che action\">";
    };

    md.core.ruler.push('action', che_action_ruler(md))
};

},{"./ruler":3}],3:[function(require,module,exports){
'use strict';

module.exports = function che_action_ruler(md) {

  function createTokensToReplace(text, Token) {

    var regexpr = new RegExp(/\[action, [^\]]+\]/gi), //todo improve regexp
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
      token = new Token('text', '', 0);
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

        var regExp = new RegExp(".*\\[action,.*\\].*"); //todo improve regexp
        if (token.type === 'text' && regExp.test(token.content)) {
          var newToken = createTokensToReplace(token.content, state.Token);
          blockTokens[j].children = tokens = md.utils.arrayReplaceAt(tokens, i, newToken);
        }
      }
    }
  }
}
},{}]},{},[1])(1)
});

//# sourceMappingURL=mdItCheAction.js.map
