'use strict';

var che_action_ruler = require("./ruler");

module.exports = function action_plugin(md, options) {

    //add new "action" rule
    md.renderer.rules.action = function (tokens, idx /*, options, env, self */) {
        return "<input type=\"button\" id=\"" + tokens[idx].meta + "\" value=\"Che action\">";
    };

    console.log("test");
    console.log(che_action_ruler);
    md.core.ruler.push('action', che_action_ruler(md))
};
