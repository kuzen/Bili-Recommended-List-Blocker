// ==UserScript==
// @name         Bili-Recommended-List-Blocker
// @description  屏蔽b站首页推荐中的指定up
// @icon         http://www.bilibili.com/favicon.ico
// @namespace    https://greasyfork.org/zh-CN/users/xxxxx
// @version      1.1
// @author       kuzen
// @run-at       document-start
// @include      *://www.bilibili.com/
// @include      *://www.bilibili.com/?*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';
    var search = function (nums, target) {
        const n = nums.length;
        let left = 0,
            right = n - 1,
            ans = n;
        while (left <= right) {
            let mid = ((right - left) >> 1) + left;
            if (target <= nums[mid]) {
                ans = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return ans;
    };

    var removeDuplicates = function (nums) {
        const n = nums.length;
        if (n === 0) {
            return 0;
        }
        let fast = 1,
            slow = 1;
        while (fast < n) {
            if (nums[fast] !== nums[fast - 1]) {
                nums[slow] = nums[fast];
                ++slow;
            }
            ++fast;
        }
        return slow;
    };

    var addBlockUid = function (blockList, uid) {
        var index = search(blockList, uid);
        if (blockList[index] !== uid) {
            blockList.splice(index, 0, uid);
        }
        GM_setValue('blockList', JSON.stringify(blockList));
    }

    var blockBtn = function (event) {
        console.log(event.currentTarget.parentElement);
        var cardInfo = event.currentTarget.parentElement.getElementsByClassName("bili-video-card__info")[0];
        var uidStr = cardInfo.firstElementChild["href"]
        var uid = uidStr.substr(uidStr.lastIndexOf("/") + 1);
        console.log(uid + " 已屏蔽");
        addBlockUid(blockList, uid);
        event.currentTarget.parentElement.lastElementChild.replaceChildren(blockContext.cloneNode(true));
        return false;
    };

    var run = function () {
        setTimeout(function () {
            var list = document.getElementsByClassName('recommend-container__2-line')[0].getElementsByClassName('bili-video-card__wrap');
            for (let item of list) {
                // item.replaceChildren(blockDom);
                // 判断是否屏蔽
                var uidStr = item.lastElementChild.firstElementChild["href"]
                var uid = uidStr.substr(uidStr.lastIndexOf("/") + 1);
                // console.log(uid);
                var index = search(blockList, uid);
                if (blockList[index] == uid) {
                    item.replaceChildren(blockContext.cloneNode(true));
                }
                // break;

                // 添加屏蔽按钮
                var bd = blockBtnDiv.cloneNode(true);
                bd.addEventListener("click", blockBtn);
                item.parentElement.insertBefore(bd, item.parentElement.childNodes[1]);
            }
        }, 1000);
    };

    // 读取黑名单
    var blockDivCss = '.bili-block-uid .bili-block-uid__icon{pointer-events:none;user-select:none;width:22px;height:22px;color:#fff}.bili-block-uid__icon{pointer-events:none;user-select:none;width:22px;height:22px;color:#fff;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjQgNDRDMzUuMDQ1NyA0NCA0NCAzNS4wNDU3IDQ0IDI0QzQ0IDEyLjk1NDMgMzUuMDQ1NyA0IDI0IDRDMTIuOTU0MyA0IDQgMTIuOTU0MyA0IDI0QzQgMzUuMDQ1NyAxMi45NTQzIDQ0IDI0IDQ0WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNSAxNUwzMyAzMyIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)}.bili-block-uid{display:-webkit-flex;display:flex;align-items:center;justify-content:center;position:absolute;top:72px;right:8px;width:28px;height:28px;border-radius:6px;cursor:pointer;background-color:rgba(33,33,33,.8);z-index:9;transform:translateZ(0)}.bili-block-uid .bili-block-uid__tip{pointer-events:none;user-select:none;position:absolute;bottom:-6px;right:-10px;transform:translateY(100%);font-size:12px;color:#fff;border-radius:4px;line-height:18px;padding:4px 8px;background-color:rgba(0,0,0,.8);white-space:nowrap}';
    var style_tag = document.createElement('style');
    style_tag.innerHTML = blockDivCss;
    document.head.appendChild(style_tag);

    var blockList = JSON.parse(GM_getValue('blockList') || '[]');
    blockList.sort();
    removeDuplicates(blockList);
    console.log(GM_getValue('blockList'))

    // 屏蔽块
    var blockContext = document.createElement("div");
    blockContext.setAttribute("class", "bili-video-card")
    blockContext.innerHTML = '<a target="_blank" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><div class="bili-video-card__image __scale-player-wrap"><div class="bili-video-card__image--wrap"><div class="bili-watch-later" style="display: none;"><svg class="bili-watch-later__icon"><use xlink:href="#widget-watch-later"></use></svg><span class="bili-watch-later__tip" style="display: none;"></span></div><picture class="v-img bili-video-card__cover"><source srcset="//s6.jpg.cm/2021/12/23/LbJgzO.jpg" type="image/jpg"><img src="//s6.jpg.cm/2021/12/23/LbJgzO.jpg" alt="黑名单内容" loading="eager" onload="fsrCb()"></picture></div></div></a><div class="bili-video-card__info __scale-disable"><a target="_blank" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><div class="v-avatar bili-video-card__avatar"><picture class="v-img v-avatar__face"><source srcset="//s6.jpg.cm/2021/12/23/LbJ0Iw.jpg" type="image/jpg"><img src="//s6.jpg.cm/2021/12/23/LbJ0Iw.jpg" alt="黑名单" loading="lazy" onload=""></picture></div></a><div class="bili-video-card__info--right"><a target="_blank" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><h3 class="bili-video-card__info--tit" title="黑名单内容">黑名单内容</h3></a><p class="bili-video-card__info--bottom"><a class="bili-video-card__info--owner" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><span class="bili-video-card__info--author">已屏蔽</span></a></p></div></div>';

    // 屏蔽按钮
    var blockBtnDiv = document.createElement("div");
    blockBtnDiv.setAttribute("class", "bili-block-uid");
    blockBtnDiv.innerHTML = '<svg class="bili-block-uid__icon"></svg><span class="bili-block-uid__tip" style="display: none;">屏蔽用户</span>'
    blockBtnDiv.innerHTML = '<svg class="bili-block-uid__icon""></svg>'


    // "换一换"按钮监听事件
    setTimeout(function () {
        var rollBtn = document.getElementsByClassName("roll-btn-wrap")[0].firstElementChild;
        rollBtn.addEventListener("click", function () {
            run();
        });
    }, 1000);

    // 刷新网页运行
    run();
})();