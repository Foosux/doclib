/**
 * 基础框架
 * 包含内容如需下
 *
 * core: cmd,jquery,EventEmittier,utils
 * ui:   AView,View,Trans,Model
 */
// require("./js/nt/cmd");

if(!window.LMD){
    window.LMD = require("../../lib/lmd");
}
require("./js/nt/es5");
// require("./js/promise");
window.$ = window.jQuery = require("../../lib/jquery");

// require("./js/vue");

// require("./js/EventEmitter");
// require("./js/nt/utils");
//
// require("./js/AView");
// require("./js/template");
// require("./js/Trans");
// require("./js/Model");
// require("./js/View");

$.extend($,{
    // "EventEmitter": require("./js/EventEmitter"),
    // "AView": require("./js/AView"),
    // "Trans": require("./js/Trans"),
    // "Model": require("./js/Model"),
    // "View": require("./js/View")
})

// $.listener = new $.EventEmitter();

// if(!window.Promise){
    // window.Promise = require("./js/promise")
// }

module.exports = $;
