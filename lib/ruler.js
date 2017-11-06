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