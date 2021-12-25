// ==UserScript==
// @name         Bili-Recommended-List-Blocker
// @description  屏蔽b站首页推荐中的指定up
// @icon         http://www.bilibili.com/favicon.ico
// @namespace    https://greasyfork.org/zh-CN/users/xxxxx
// @version      1.5
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
    class BiliBlocker {
        constructor(blockList) {
            this.blockList = blockList;
            this.css = {
                blockDiv: '.bili-block-uid .bili-block-uid__icon{pointer-events:none;user-select:none;width:22px;height:22px;color:#fff}.bili-block-uid__icon{pointer-events:none;user-select:none;width:22px;height:22px;color:#fff;background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjQgNDRDMzUuMDQ1NyA0NCA0NCAzNS4wNDU3IDQ0IDI0QzQ0IDEyLjk1NDMgMzUuMDQ1NyA0IDI0IDRDMTIuOTU0MyA0IDQgMTIuOTU0MyA0IDI0QzQgMzUuMDQ1NyAxMi45NTQzIDQ0IDI0IDQ0WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNSAxNUwzMyAzMyIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==)}.bili-block-uid{display:-webkit-flex;display:flex;align-items:center;justify-content:center;position:absolute;top:72px;right:8px;width:28px;height:28px;border-radius:6px;cursor:pointer;background-color:rgba(33,33,33,.8);z-index:9;transform:translateZ(0)}.bili-block-uid .bili-block-uid__tip{pointer-events:none;user-select:none;position:absolute;bottom:-6px;right:-10px;transform:translateY(100%);font-size:12px;color:#fff;border-radius:4px;line-height:18px;padding:4px 8px;background-color:rgba(0,0,0,.8);white-space:nowrap}',
                settingBtn: 'padding:0 4px;height:40px;text-align:center;font-size:12px',
                settings: '#balh-settings {font-size: 12px;color: #6d757a;}  #balh-settings h1 {color: #161a1e}  #balh-settings a {color: #00a1d6;}  #balh-settings a:hover {color: #f25d8e}  #balh-settings input {margin-left: 3px;margin-right: 3px;}  @keyframes balh-settings-bg { from {background: rgba(0, 0, 0, 0)} to {background: rgba(0, 0, 0, .7)} }  #balh-settings label {width: 100%;display: inline-block;cursor: pointer}  #balh-settings label:after {content: "";width: 0;height: 1px;background: #4285f4;transition: width .3s;display: block}  #balh-settings label:hover:after {width: 100%}  form {margin: 0}  #balh-settings input[type="radio"] {-webkit-appearance: radio;-moz-appearance: radio;appearance: radio;}  #balh-settings input[type="checkbox"] {-webkit-appearance: checkbox;-moz-appearance: checkbox;appearance: checkbox;} '
            };
            // 屏蔽块样式
            var blockDivSty = document.createElement('style');
            blockDivSty.innerHTML = this.css.blockDiv;
            document.head.appendChild(blockDivSty);

            this.blockBtnEnterFlag = false;

        }

        addBlockUid(blockList, uid) {
            var index = this.search(blockList, uid);
            if (blockList[index] !== uid) {
                blockList.splice(index, 0, uid);
                GM_setValue('blockList', JSON.stringify(blockList));
                return true;
            }
            return false;
        }

        // 添加屏蔽按钮
        addBlockBtn(cardView) {
            var blockBtnDiv = document.createElement("div");
            blockBtnDiv.setAttribute("class", "bili-block-uid");
            blockBtnDiv.setAttribute("style", "display: none;");
            blockBtnDiv.innerHTML = '<svg class="bili-block-uid__icon" style></svg>'
            this.blockBtnBind = this.blockBtnClick.bind(this);
            blockBtnDiv.addEventListener("click", this.blockBtnBind);
            blockBtnDiv.addEventListener("mouseleave", function () {
                this.blockBtnEnterFlag = false;
            });
            blockBtnDiv.addEventListener("mouseenter", function () {
                this.blockBtnEnterFlag = true;
            });
            cardView.insertBefore(blockBtnDiv, cardView.childNodes[1]);
        }

        // mouseEnter才显示按钮
        setCardViewEvent(cardView) {
            var cardImage = cardView.getElementsByClassName("bili-video-card__image--wrap")[0];
            cardImage.addEventListener("mouseenter", function (event) {
                var cardView = event.currentTarget.parentElement.parentElement.parentElement;
                // console.log(cardView)
                var blockDiv = cardView.getElementsByClassName("bili-block-uid")[0];
                blockDiv.setAttribute("style", "");
            });
            cardView.addEventListener("mouseleave", function (event) {
                var cardView = event.currentTarget;
                var blockDiv = cardView.getElementsByClassName("bili-block-uid")[0];
                if (this.blockBtnEnterFlag == false) {
                    blockDiv.setAttribute("style", "display: none;");
                }
            });
        }

        addSettingBtn() {
            var settingsDOM = createElement('div', {
                id: 'brlb-settings',
                style: {
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0,0,0,.7)',
                    animationName: 'brlb-settings-bg',
                    animationDuration: '.5s',
                    zIndex: 10000,
                    cursor: 'pointer'
                },
                event: {
                    click: function (e) {
                        if (e.target === this)
                            document.body.style.overflow = '', this.remove();
                    }
                }
            }, [
                createElement('style', {}, [createElement('text', this.css.settings)]),
                createElement('div', {
                    style: {
                        position: 'absolute',
                        background: '#FFF',
                        borderRadius: '10px',
                        padding: '20px',
                        top: '50%',
                        left: '50%',
                        width: '600px',
                        transform: 'translate(-50%,-50%)',
                        cursor: 'default'
                    }
                }, [
                    createElement('h1', {}, [createElement('text', `${GM_info.script.name} v${GM_info.script.version} 设置`)]),
                    createElement('br'),
                    createElement('br'),
                    createElement('form', {
                        id: 'brlb-settings-form',
                        // event: {
                        //     change: onSettingsFormChange
                        // }
                    }, [
                        createElement('a', {
                            href: 'javascript:',
                            'data-sign': 'in',
                            event: {
                                click: this.clrBlockList
                            }
                        }, [createElement('text', '清空黑名单 (刷新生效)')]),
                        createElement('text', '　'),
                        createElement('br'), createElement('br'),
                        createElement('div', {
                            style: {
                                whiteSpace: 'pre-wrap'
                            },
                            // event: {
                            //     mouseenter: onMouseEnterSettingBottom
                            // }
                        }, [
                            createElement('a', {
                                href: 'https://greasyfork.org/zh-CN/scripts/437528-bili-recommended-list-blocker',
                                target: '_blank'
                            }, [createElement('text', '脚本主页')]),
                            createElement('text', '　'),
                            createElement('a', {
                                href: 'https://github.com/kuzen/Bili-Recommended-List-Blocker/blob/master/README.md',
                                target: '_blank'
                            }, [createElement('text', '帮助说明')]),

                        ])
                    ])
                ])
            ]);

            var btnWrap = document.getElementsByClassName("palette-button-wrap")[0];
            var firstBtn = btnWrap.getElementsByClassName("primary-btn")[1];
            var settingBtn = document.createElement("button");
            settingBtn.innerHTML = "屏蔽设置"
            settingBtn.setAttribute("class", "primary-btn block-setting-btn");
            settingBtn.setAttribute("style", this.css.settingBtn);
            settingBtn.addEventListener("click", function () {
                document.body.appendChild(settingsDOM);
            });
            btnWrap.insertBefore(settingBtn, firstBtn);
        }

        blockCardView(cardView, uid) {
            var blockContext = '<a target="_blank" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><div class="bili-video-card__image __scale-player-wrap"><div class="bili-video-card__image--wrap"><div class="bili-watch-later" style="display: none;"><svg class="bili-watch-later__icon"><use xlink:href="#widget-watch-later"></use></svg><span class="bili-watch-later__tip" style="display: none;"></span></div><picture class="v-img bili-video-card__cover"><source srcset="//s6.jpg.cm/2021/12/23/LbJgzO.jpg" type="image/jpg"><img src="//s6.jpg.cm/2021/12/23/LbJgzO.jpg" alt="黑名单内容" loading="eager" onload="fsrCb()"></picture></div></div></a><div class="bili-video-card__info __scale-disable"><a target="_blank" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><div class="v-avatar bili-video-card__avatar"><picture class="v-img v-avatar__face"><source srcset="//s6.jpg.cm/2021/12/23/LbJ0Iw.jpg" type="image/jpg"><img src="//s6.jpg.cm/2021/12/23/LbJ0Iw.jpg" alt="黑名单" loading="lazy" onload=""></picture></div></a><div class="bili-video-card__info--right"><a target="_blank" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><h3 class="bili-video-card__info--tit" title="黑名单内容">黑名单内容</h3></a><p class="bili-video-card__info--bottom"><a class="bili-video-card__info--owner" data-spmid="333.851" data-mod="b_7265636f6d6d656e64" data-idx="1""><span class="bili-video-card__info--author">已屏蔽</span></a></p></div></div>';
            cardView.setAttribute("class", "bili-video-card__wrap __scale-wrap bili-block");
            cardView.setAttribute("data-uid", uid.toString());
            cardView.innerHTML = blockContext;
        }

        blockBtnClick(event) {
            var cardView = event.currentTarget.parentElement;
            var cardInfo = cardView.getElementsByClassName("bili-video-card__info")[0];
            var uidStr = cardInfo.firstElementChild["href"]
            if (uidStr.length > 0) {
                var uid = uidStr.substr(uidStr.lastIndexOf("/") + 1);
                console.log(uid + " 已屏蔽");
                if (this.addBlockUid(this.blockList, uid) == true) {
                    this.blockCardView(cardView, uid);
                }
                this.addBlockBtn(cardView);
                this.setCardViewEvent(cardView);
            }
            return false;
        };

        run(cardViewList) {
            // "eva-extension-area" or "recommend-container__"
            for (let cardView of cardViewList) {
                // item.replaceChildren(blockDom);
                // 判断是否屏蔽
                if (cardView.getElementsByClassName("bili-video-card__info--ad-img").length > 0) {
                    // 推广链接
                    this.blockCardView(cardView, 0);
                    this.addBlockBtn(cardView);
                    this.setCardViewEvent(cardView);
                } else {
                    // 普通视频
                    var uidStr = cardView.lastElementChild.firstElementChild["href"]
                    if (uidStr.length > 0) {
                        var uid = uidStr.substr(uidStr.lastIndexOf("/") + 1);
                        // console.log(uid);
                        var index = this.search(this.blockList, uid);
                        if (this.blockList[index] == uid) {
                            this.blockCardView(cardView, uid);
                        }
                    }
                    this.addBlockBtn(cardView);
                    this.setCardViewEvent(cardView);
                }
            }
        }

        clrBlockList() {
            GM_setValue("blockList", '[]');
            this.blockList = [];
        }

        search(nums, target) {
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
    }

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

    /**
     * 创建元素的快捷方法:
     * 1. type, props, children
     * 2. type, props, innerHTML
     * 3. 'text', text
     * refer to: https://github.com/ipcjs/bilibili-helper
     * @param type string, 标签名; 特殊的, 若为text, 则表示创建文字, 对应的t为文字的内容
     * @param props object, 属性; 特殊的属性名有: className, 类名; style, 样式, 值为(样式名, 值)形式的object; event, 值为(事件名, 监听函数)形式的object;
     * @param children array, 子元素; 也可以直接是html文本;
     */
    function createElement(type, props, children) {
        let elem = null;
        if (type === "text") {
            return document.createTextNode(props);
        } else {
            elem = document.createElement(type);
        }
        for (let n in props) {
            if (n === "style") {
                for (let x in props.style) {
                    elem.style[x] = props.style[x];
                }
            } else if (n === "className") {
                elem.className = props[n];
            } else if (n === "event") {
                for (let x in props.event) {
                    elem.addEventListener(x, props.event[x]);
                }
            } else {
                // 用undefined表示不设置这个属性
                props[n] !== undefined && elem.setAttribute(n, props[n]);
            }
        }
        if (children) {
            if (typeof children === 'string') {
                elem.innerHTML = children;
            } else {
                for (let i = 0; i < children.length; i++) {
                    if (children[i] != null)
                        elem.appendChild(children[i]);
                }
            }
        }
        return elem;
    }

    // 读黑名单
    var blockList = JSON.parse(GM_getValue('blockList') || '[]');
    blockList.sort();
    console.log(GM_getValue('blockList'))
    removeDuplicates(blockList);
    var biliBlocker = new BiliBlocker(blockList);

    setTimeout(function () {

        //推荐列表
        var recommendList = document.querySelectorAll('div[class^="recommend-container__"]')[0].getElementsByClassName('bili-video-card__wrap');
        biliBlocker.run(recommendList);

        //推广列表
        var evaList = document.querySelectorAll('div[class^="eva-extension-area"]')[0].getElementsByClassName('bili-video-card__wrap');
        biliBlocker.run(evaList);

        // "换一换"按钮监听事件
        var rollBtn = document.getElementsByClassName("roll-btn-wrap")[0].firstElementChild;
        rollBtn.addEventListener("click", function () {
            setTimeout(function () {
                var recommendList = document.querySelectorAll('div[class^="recommend-container__"]')[0].getElementsByClassName('bili-video-card__wrap');
                biliBlocker.run(recommendList);
            }, 1000);
        });

        setTimeout(function () {
            // 右侧按钮栏加载更慢点
            biliBlocker.addSettingBtn();
        }, 1000);
    }, 1000);

})();