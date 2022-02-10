// ==UserScript==
// @name         b站首页黑名单 屏蔽首页视频
// @description  屏蔽b站首页推荐中的指定up
// @namespace    https://github.com/kuzen
// @version      1.8.0
// @author       kuzen
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @run-at       document-start
// @include      *://www.bilibili.com/
// @include      *://www.bilibili.com/?*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_log
// @grant        GM_addElement
// @license      MIT
// ==/UserScript==
/* ==UserConfig==
blockList:
  uid:
    title: uid黑名单
    description: uid黑名单，注意若格式填写有问题则会影响脚本运行！格式为 ["xxx", "xxx"]
    default: s[]
 ==/UserConfig== */
