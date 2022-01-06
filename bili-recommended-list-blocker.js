// ==UserScript==
// @name         Bili-Recommended-List-Blocker
// @description  屏蔽b站首页推荐中的指定up
// @namespace    https://github.com/kuzen
// @version      1.7.0
// @author       kuzen
// @icon         https://www.google.com/s2/favicons?domain=bilibili.com
// @run-at       document-start
// @include      *://www.bilibili.com/
// @include      *://www.bilibili.com/?*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_addElement
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    class Setting {
        constructor(blockList) {
            this.blockList = blockList;
            let deleteIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGQ9Ik05IDEwVjQ0SDM5VjEwSDlaIiBmaWxsPSJub25lIiBzdHJva2U9IiM0YTRhNGEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMCAyMFYzMyIgc3Ryb2tlPSIjNGE0YTRhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yOCAyMFYzMyIgc3Ryb2tlPSIjNGE0YTRhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00IDEwSDQ0IiBzdHJva2U9IiM0YTRhNGEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE2IDEwTDE5LjI4OSA0SDI4Ljc3NzFMMzIgMTBIMTZaIiBmaWxsPSJub25lIiBzdHJva2U9IiM0YTRhNGEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg=='
            this.css = {
                settingsPanel: `#brlb-settings {
                    font-size: 12px;
                    color: #6d757a;
                }
                #brlb-settings h1 {
                    color: #161a1e
                }
                #brlb-settings a {
                    color: #00a1d6;
                }
                #brlb-settings a:hover {
                    color: #f25d8e
                }
                #brlb-settings input {
                    margin-left: 3px;
                    margin-right: 3px;
                }
                @keyframes brlb-settings-bg {
                    from {
                        background: rgba(0, 0, 0, 0)
                    }
                    to {
                        background: rgba(0, 0, 0, .7)
                    }
                }
                #brlb-settings label {
                    width: 100%;
                    display: inline-block;
                    cursor: pointer
                }
                #brlb-settings label:after {
                    content: "";
                    width: 0;
                    height: 1px;
                    background: #4285f4;
                    transition: width .3s;
                    display: block
                }
                #brlb-settings label:hover:after {
                    width: 100%
                }
                form {
                    margin: 0
                }
                #brlb-settings input[type="radio"] {
                    -webkit-appearance: radio;
                    -moz-appearance: radio;
                    appearance: radio;
                }
                #brlb-settings input[type="checkbox"] {
                    -webkit-appearance: checkbox;
                    -moz-appearance: checkbox;
                    appearance: checkbox;
                }
                .brlb-block-line-delete {
                    background: url(${deleteIcon});
                    width: 16px;
                    background-repeat: no-repeat;
                    background-position: center;`,
                bui: `.bui {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    vertical-align: middle;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center
                }
                .bui-tabs {
                    -webkit-box-pack: start;
                    -ms-flex-pack: start;
                    justify-content: flex-start
                }
                .bui-tabs .bui-tabs-header {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    margin-bottom: 8px
                }
                .bui-tabs .bui-tabs-header .bui-tabs-header-item {
                    text-align: center;
                    margin-right: 20px;
                    font-size: 12px;
                    color: #212121;
                    cursor: pointer
                }
                .bui-tabs .bui-tabs-header .bui-tabs-header-item.bui-tabs-header-item-active {
                    color: #00a1d6;
                    border-bottom: 1px solid #00a1d6
                }
                .bui-tabs .bui-tabs-body .bui-tabs-body-item {
                    display: none
                }
                .bui-tabs .bui-tabs-body .bui-tabs-body-item.bui-tabs-body-item-active {
                    display: block
                }
                .bui-button {
                    display: -webkit-inline-box;
                    display: -ms-inline-flexbox;
                    display: inline-flex;
                    cursor: pointer;
                    min-width: 68px;
                    height: 24px;
                    font-size: 12px;
                    border-radius: 2px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    -webkit-transition: .2s;
                    -o-transition: .2s;
                    transition: .2s;
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);
                    background: 0 0;
                    padding: 0;
                    outline: 0;
                    color: inherit;
                    text-align: inherit;
                    line-height: inherit
                }
                .bui-button.bui-button-transparent {
                    color: #fff;
                    border: 1px solid hsla(0, 0%, 100%, .2)
                }
                .bui-button.bui-button-transparent:hover {
                    color: #00a1d6;
                    border-color: #00a1d6
                }
                .bui-button.bui-button-border {
                    color: #fff;
                    border: 1px solid hsla(0, 0%, 100%, .2);
                    cursor: pointer
                }
                .bui-button.bui-button-border:hover {
                    color: #00a1d6;
                    border-color: #00a1d6
                }
                .bui-button.bui-button-border.bui-button-disabled {
                    background: 0 0;
                    color: hsla(0, 0%, 100%, .2);
                    border: 1px solid hsla(0, 0%, 100%, .1)
                }
                .bui-button.bui-button-border.bui-button-disabled:hover {
                    background: 0 0;
                    color: hsla(0, 0%, 100%, .2)
                }
                .bui-button.bui-button-white {
                    color: #757575;
                    border: 1px solid silver;
                    background-color: #fff
                }
                .bui-button.bui-button-white:hover {
                    color: #00a1d6;
                    border-color: #00a1d6
                }
                .bui-button.bui-button-gray {
                    background-color: #e5e9ef;
                    color: #212121
                }
                .bui-button.bui-button-gray:hover {
                    background-color: #00a1d6;
                    color: #fff
                }
                .bui-button.bui-button-gray2 {
                    color: #505050;
                    background-color: #f4f4f4
                }
                .bui-button.bui-button-gray2:hover {
                    background-color: #f4f4f4;
                    color: #222
                }
                .bui-button.bui-button-gray2.bui-button-disabled,
                .bui-button.bui-button-gray2.bui-button-disabled:hover {
                    background-color: #f4f4f4;
                    color: #ccd0d7
                }
                .bui-button.bui-button-gray3 {
                    color: #999
                }
                .bui-button.bui-button-blue,
                .bui-button.bui-button-gray3:hover {
                    background-color: #00a1d6;
                    color: #fff
                }
                .bui-button.bui-button-blue:hover {
                    background-color: #00b5e5
                }
                .bui-button.bui-button-blue2 {
                    color: #00a1d6;
                    background-color: #fff;
                    border: 1px solid #00a1d6
                }
                .bui-button.bui-button-blue2:hover {
                    background-color: #00a1d6;
                    color: #fff
                }
                .bui-button.bui-button-yellow {
                    background-color: #f5b23d;
                    color: #fff
                }
                .bui-button.bui-button-yellow:hover {
                    background-color: #ffc154
                }
                .bui-button.bui-button-text {
                    color: #00a1d6
                }
                .bui-button.bui-button-text:hover {
                    color: #00b5e5
                }
                .bui-button.bui-button-disabled {
                    cursor: default;
                    background: #f5f7fa;
                    color: silver;
                    border: none
                }
                .bui-button.bui-button-disabled:hover {
                    background: #f5f7fa;
                    color: silver
                }`,

                brlbBlockList: `.brlb-block-setting {
                    padding-bottom: 24px
                }
                .brlb-block-label {
                    font-weight: 700;
                    font-size: 12px;
                    color: #18191c;
                    vertical-align: middle
                }
                .brlb-block-tabpanel-row {
                    zoom: 1;
                    line-height: 20px;
                    margin-bottom: 4px;
                    font-size: 0
                }
                .input-row {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex
                }
                .brlb-block-tabpanel {
                    position: relative;
                    ;
                    height: auto;
                    -webkit-transition: height .3s;
                    transition: height .3s;
                    pointer-events: auto
                }
                .brlb-block-tabpanel.no-bottom {
                    padding-bottom: 0;
                    border-bottom: 0
                }
                .brlb-block-tablist {
                    margin: 0 16px;
                    transition-timing-function: cubic-bezier(.165, .84, .44, 1);
                    transition-duration: 0s;
                    transform: translateX(0) translateY(0) translateZ(1px);
                    transition-property: transform
                }
                .brlb-block-wrap {
                    width: 320px;
                    flex: none;
                    border-bottom: 1px solid #e3e5e7;
                    touch-action: pan-x;
                    user-select: none;
                    -webkit-user-drag: none;
                    -webkit-tap-highlight-color: transparent;
                    height: 377px
                }
                .brlb-block-string {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    width: 75%;
                    margin-right: 6px;
                    padding: 1px 10px 1px 5px;
                    border-radius: 2px;
                    vertical-align: middle;
                    background-color: #fff;
                    color: #18191c;
                    font-size: 12px;
                    border: 1px solid #e3e5e7;
                    height: 20px;
                    line-height: 20px;
                    display: inline-block
                }
                .bui-button-gray {
                    background-color: #f1f2f3;
                    color: #18191c;
                    min-width: -webkit-fit-content;
                    min-width: -moz-fit-content;
                    min-width: fit-content;
                    -webkit-box-flex: 1;
                    flex: 1
                }
                .brlb-block-list-function {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    padding: 0 6px;
                    font-size: 12px;
                    line-height: 24px;
                    text-align: center;
                    color: #9499a0;
                    color: var(--text3, #9499a0)
                }
                .brlb-block-empty {
                    display: none;
                    width: 100%;
                    height: 100%;
                    line-height: 100px;
                    text-align: center;
                    color: #9499a0;
                    color: var(--text3, #9499a0)
                }
                .brlb-block-line {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-pack: justify;
                    -ms-flex-pack: justify;
                    justify-content: space-between;
                    padding-left: 5px;
                    height: 24px;
                    color: #18191c;
                    color: var(--text1, #18191c);
                    background: #fff;
                    background: var(--bg1, #fff);
                    position: relative;
                    font-size: 100%
                }
                .brlb-block-line>div {
                    font-size: 12px;
                    line-height: 24px;
                    white-space: nowrap;
                    height: 24px;
                    text-overflow: ellipsis;
                }
                .brlb-block-line-content {
                    text-align: left;
                    display: inline-block;
                    width: 150px;
                    padding-left: 4px
                }
                .icon-general-del {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    font-family: bilibili-new-iconfont !important;
                    font-size: 16px;
                    font-style: normal;
                    line-height: inherit;
                    vertical-align: top;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    -webkit-transition: color .3s;
                    transition: color .3s
                }
                .brlb-block-list-function-delete {
                    padding-right: 16px;
                }
                .brlb-block-line-delete {
                    padding-right: 36px;
                }`,
            }
            this.listWrap = null;
            setTimeout(() => {
                this.addSettingBtn();
            }, 2000);
        }

        refreshList() {
            if (this.listWrap) {
                this.listWrap.innerHTML = '';
                this.addItems();
            }
        }

        addItems(text) {
            let itemDom = createElement('div', {
                className: 'brlb-block-line'
            }, [createElement('div', {
                className: 'brlb-block-line-content'
            }), createElement('span', {
                className: 'brlb-block-line-delete'
            })]);
            if (this.listWrap) {
                if (text == null) {
                    for (let uid of this.blockList) {
                        let item = itemDom.cloneNode(true);
                        item.getElementsByClassName('brlb-block-line-content')[0].innerText = uid;
                        this.listWrap.appendChild(item);
                    }
                } else {
                    let item = itemDom.cloneNode(true);
                    item.getElementsByClassName('brlb-block-line-content')[0].innerText = text;
                    this.listWrap.appendChild(item);
                }
            }
        }

        addSettingBtn() {
            let addBtnClick = (event) => {
                let uid = event.currentTarget.parentElement.getElementsByClassName('brlb-block-string')[0].value;
                if (uid.length > 0) {
                    console.log(uid);
                    this.blockList.add(uid);
                    this.addItems(uid);
                }
            };
            let brlbBlockListWrap = createElement('div', {
                className: 'brlb-block-setting'
            }, [
                createElement('div', {
                    className: 'brlb-block-label'
                }, "屏蔽列表"),
                createElement('div', {
                    className: 'brlb-block brlb-block-wrap'
                }, [
                    createElement('div', {
                        className: 'brlb-block-tablist'
                    }, [
                        createElement('div', {
                            className: 'brlb-block-tabpanel',
                            role: 'list'
                        }, [
                            createElement('div', {
                                className: 'brlb-block-tabpanel-row input-row',
                            }, [
                                createElement('input', {
                                    type: 'text',
                                    className: 'brlb-block-string',
                                    placeholder: "添加屏蔽词，正则以&quot;/&quot;开头&quot;/&quot;结尾"
                                }),
                                createElement('div', {
                                    className: 'brlb-block-string-btn bui bui-button bui-button-gray',
                                    role: "button",
                                    event: {
                                        click: addBtnClick
                                    }
                                }, [createElement('span', {}, "添加")]),
                            ]),
                        ]),
                        createElement('div', {
                            className: '<div class="brlb-block-tabpanel-row active-1',
                        }, [
                            createElement('div', {
                                className: 'brlb-block-tabpanel-row special-tabs bui bui-tabs',
                            }, [
                                createElement('div', {
                                    className: 'bui-tabs-wrap',
                                }, [
                                    createElement('div', {
                                        className: 'bui-tabs-header',
                                    }, [
                                        createElement('div', {
                                            className: 'bui-tabs-header-item bui-tabs-header-item-active',
                                            'data-index': "0"
                                        }, "屏蔽用户"),
                                        // createElement('div', {
                                        //     className: 'bui-tabs-header-item',
                                        //     'data-index': "1"
                                        // }, "正则屏蔽用户"),
                                        // createElement('div', {
                                        //     className: 'bui-tabs-header-item',
                                        //     'data-index': "2"
                                        // }, "正则屏蔽视频"),
                                    ]),
                                    createElement('div', {
                                        className: 'bui-tabs-body',
                                    }, [
                                        createElement('div', {
                                            className: 'bui-tabs-body-item bui-tabs-body-item-active',
                                        }),
                                        createElement('div', {
                                            className: 'bui-tabs-body-item',
                                        }),
                                        createElement('div', {
                                            className: 'bui-tabs-body-item',
                                        }),
                                    ]),
                                ]),
                            ]),
                            createElement('div', {
                                className: 'brlb-block-tabpanel-row brlb-border'
                            }, [
                                createElement('div', {
                                    className: 'brlb-block-list-function'
                                }, [
                                    createElement('div', {
                                        className: 'brlb-block-list-function-content'
                                    }, '内容'),
                                    createElement('div', {
                                        className: 'brlb-state-wrap'
                                    }, [createElement('div', {
                                        className: 'brlb-block-list-function-delete'
                                    }, "操作")])
                                ]),
                                createElement('div', {
                                    className: 'brlb-block-list-wrap',
                                    style: {
                                        height: '265px',
                                        'overflow-y': 'scroll',
                                        'overflow-x': 'hidden'
                                    }
                                }),
                            ]),
                        ])
                    ])
                ])
            ]);

            let settingsPanelDom = createElement('div', {
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
                        if (e.target === this) {
                            document.body.style.overflow = '';
                            this.remove();
                        }
                    }
                }
            }, [
                createElement('style', {}, [createElement('text', this.css.settingsPanel)]),
                createElement('style', {}, [createElement('text', this.css.bui)]),
                createElement('style', {}, [createElement('text', this.css.brlbBlockList)]),
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
                        brlbBlockListWrap,
                        createElement('a', {
                            href: 'javascript:',
                            'data-sign': 'in',
                            event: {
                                click: this.blockList.clr
                            }
                        }, [
                            createElement('text', '清空黑名单 (刷新生效)')
                        ]),
                        createElement('text', ' '),
                        createElement('br'),
                        createElement('br'),
                        createElement('div', {
                            style: {
                                whiteSpace: 'pre-wrap'
                            },
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
            let settingBtn = createElement('button', {
                className: 'primary-btn brlb-setting-btn',
                style: {
                    padding: "0 4px",
                    height: "40px",
                    "text-align": "center",
                    "font-size": "12px",
                },
                event: {
                    click: () => {
                        document.body.appendChild(settingsPanelDom);
                        this.refreshList();
                    }
                }
            }, '屏蔽设置')
            let btnWrap = document.getElementsByClassName("palette-button-wrap")[0];
            let firstBtn = btnWrap.getElementsByClassName("primary-btn")[1];
            this.listWrap = settingsPanelDom.getElementsByClassName("brlb-block-list-wrap")[0];
            this.listWrap.onclick = (ev) => {
                var ev = ev || window.event;
                var target = ev.target;
                if (target.className.toLowerCase() == 'brlb-block-line-delete') {
                    let uid = target.parentElement.firstChild.innerText;
                    this.blockList.remove(uid);
                    ev.currentTarget.removeChild(target.parentElement);
                }
            }
            // let tabsWrap = settingsPanelDom.getElementsByClassName("bui-tabs-header")[0];
            // tabsWrap.onclick = (ev) => {
            //     var ev = ev || window.event;
            //     var target = ev.target;
            //     if (target.className.toLowerCase() == 'bui-tabs-header-item') {
            //         let index = target.getAttribute('data-index');
            //         for (let tab of ev.currentTarget.getElementsByClassName('bui-tabs-header-item')) {
            //             tab.classList.remove('bui-tabs-header-item-active');
            //         }
            //         target.classList.add('bui-tabs-header-item-active');
            //     }
            // }

            btnWrap.insertBefore(settingBtn, firstBtn);
        }
    }
    class BiliBlocker {
        constructor(blockList) {
            this.blockList = blockList;
            this.isEnterBtnDiv = false;
            this.setting = new Setting(this.blockList);

            // 屏蔽主图
            let blockPic = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRpc3BsYXk9ImJsb2NrIiB2aWV3Qm94PSIwIDAgNjc4IDM4MSI+PHBhdGggZmlsbD0iIzE4MmI5YSIgZD0iTTAgMGg2Nzh2MzgxSDB6Ii8+PHBhdGggZmlsbD0iIzE2MTk1YyIgZD0iTTY1NCAxMzRoMnYybDE2LTJ2N2wtMyAxLTEgMmgxMHYyMzdIMFYxNjNsMTAgNSAxNCA0IDQgMyA2IDIgMyA2IDIgMSAxIDIwIDEzIDEgMyAxdjJsNyAxIDEtNiA0LTUgNS0yaDdsOCAzIDUgMiAxIDMgNiAxIDIgMyAyIDE4IDIgMXYxM2wyIDhoMnYyaDJ2Mmw0IDIgNyA0IDMgMyAxMSA0djFsLTktMS0xMC01IDIgM3YzbC0zIDEtMSAyaC00djNsLTEwIDMtMiAyLTUgMmgtNXYtMmg0di0zaDJsLTEtNmgtNGwxLTgtNiAxLTEgNC01IDNoLTN2MmgxMnYySDc2bDQgNS0xMCAydjNsMjIgMXYzSDgydjJsLTcgMSAxIDUtOSAydjNoMTNsMiAxLTEgNGgtN3YtMmgtOGwtMSA1aDE2bC0xIDItOCAxLTIgNGg3bDE4IDJ2LTJoOXYybDUtMSAyMSAxIDYgMXYybC04IDItMTggMXYybDE1LTEgMy0xIDE2LTEgMy0xIDEtNGgtM2wtMS00IDYtMSAxIDEgMS0yIDMyLTEgMTYgM2g5bDItNGg3bDEgNCAxNi0yIDItMWgxMXY1bDMtMiAxNi0yLTQtMTctMS0ydi03bC01LTEtMy0xdi00bC03IDMtNSAxLTItNHYtM2gydi0zaDJ2LTJsMy0xIDEtN2gtNnYybC03IDF2LTlsNS00IDYtMyAzLTEtNC0ydi0ybDgtMS0xLTNoLTEybC04IDF2MmwtNiA0LTcgMmgtODRsLTUgMSAxIDFoMTNsNCAxLTEgMy03LTF2MmwtMyAzLTYtMXYtMmgtMmwtNC0xMC0yLTExdi0xMWg0bDEgNCAxMCAxdi00bDktNGg1bDMtOWgydjExaDNsMS00aDJsMSA0IDQgMiAxLTggNS0xIDMgMTAgOSAyIDEtOCA0IDIgNCA5IDUgMiA2NSAxdi00aDNsMS00aDJsMi03aDRsMS00LTExIDJ2LTdoMmwyLTUgNi00IDExLTJoN2w0IDIgNCAyIDMgOXY0aC0ydjJoLTZ2OGgtMmwtMSA4IDEgMyA0LTIgMjAtMmgyNnYtM2gzdi00aDJsMS0zaDJsMi04IDQgMXY1bC0zIDItMiA2LTEgMTQgMiA3djJoNnYzaC0zNXYtMmwxNS0xLTctMTItMTAgMXYtMmwtMyAxaC0xNGwxIDloLTN2LTloLTlsMSA1IDEgMTkgNSAzIDEgMyAzIDF2LTJsNS0xIDIgMyAzIDItMyA0aC0xNWwtNC0xLTMtMTBoLTVsLTEgNHY4bDIgMiAzIDcgNCAydjRoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTEgNC0xMGg1djEwbDUgMiA2IDcgNSA0IDYgMnYybDctMS0xLTd2LTE2bDItOC00LTF2LTJoNmw0IDIgMS01aDR2LTloLTEzbC03LTF2M2gtM2wtMSA2aC0ybC0xLTN2LTEybDEgM2gzbDEtMTBoM3YtOWgtMnYtN2wyLTIgMTQtMSAxMC0xIDEgMTIgMiA3djZoLTExdjJoNGw0IDE0aDlsMiAxdjNoMTF2M2gtMTJsNCA3IDEgMjAgMiAxMSAxIDEgMyAxNSA2IDQgNSAxaDIzbDMtMyAxMC0xIDEtMSAzMSAxaDE5di0zbC0yNy0ydi0yaDN2LTRoLTE4bC0zLTR2LTJoLTJ2LTJoLTNsLTEtNCAzLTEgMS0zaDEybDQgNGgydi02bDItMSAxIDMgMjIgMSAyLTIgMTAtMyAyMSAxIDUtNSA1LTMgNSAxaDRsMi01IDEzLTEgMS01LTE5LTEtOC0yLTE2LTEtMi0yLTEwLTEgNC0yIDI2LTF2LTJsLTUtMS0yLTEgMS00IDktMyAyLTMtMTItMWgtMzFsLTkgMS0xIDQtNCAzLTIgNWgzdjNoLTEydi0zaC0ybC0yLTgtMTEtNC02LTItNi0zIDEgNC0zOCAxLTUtMXYtNWg5bDEgMyAyIDEgMS00IDEyLTEgNzAtMWg0NXYtM2w1LTIgMy01IDQtMyA1LTEgMi02IDUtMnYtMTJsMi02aDJsMiA0IDIgMXYxN2gybDEtNCAxNy01aDN2LTExbDEtM2gtMnYtM2gydi02bDgtM2g2djNoOGw0LTYtMyAyaC00di04aC0xMXYtM2w2LTVoMnYtMmgybDItNSAzLTEgMi00aDV2LTNsMTAtMnYtNWwzIDF6TTQ4MCAyNzl6Ii8+PHBhdGggZmlsbD0iIzM3NTRjMSIgZD0iTTQ1MyA2NGg1bDMgMyAxMSAxIDUtMSAzIDggMyA4IDEgNWg0djNsLTMgMi0yIDloMnYtM2gzdjZoMmwxLTUgNCAyIDIgNyA1LTUgMiAxLTUgNiA3IDEgMSA2IDE1IDEgNSAxdi0zbC0xMi0xLTItNS0yLTJ2LTNoMnYybDQtMSAzIDEgMSA0aDJ2LTVoOXYyaC02djZoNWw4IDMgMiA0IDMgMS0xLTNoNmwtMS02di0ybC0xLTVoMTVsNiAydjNoN2wxIDQgMTAgMXYtNGgtNnYtMmg0bC0xLTQgNy0xaDEwdi0ybDMtMiAxLTRoMmwtMiA3LTEgMiA5LTMgMS0yIDYtMSAzIDEgMTItMyA2LTF2MmgtMnYyaC0ybC0xIDQtNyAyLTEgMmgtNWwtMiA0LTMgM3YxMGwzLTF2NWwtNCAxdi0zbC01IDJoLTV2LTNoLTNsLTEgNCA0IDF2M2wxNi0xIDQtM2gzbDEgNi00IDF2NmwtMSAxaC01di0yaC0zbC0yIDUtNSAydjVoLTMgNGw1LTJoM3YtMmgydi0yaDZsLTEgMy03IDRoLTV2Mmw1IDItMSA3aDExdjhsNy0yLTIgNS0yIDItOC0xdi0zbC0xMyAzLTEgNmgtMnYzaDJsLTEgMTQtMjAgNi0xIDNoLTJsLTEtNHYtMTBsMS0zLTMtMS0xLTRoLTJsLTIgMTgtNSAzLTIgNi03IDItMyAzLTIgNC01IDF2M2wtNDUgMS03MCAxLTEyIDEtMSAzLTMtMXYtM2wtOCAxLTEgNCA0Mi0xLTEtNCA3IDMgNiAyIDExIDQgMiAzdjZoMnYzaDEydi0zaC0zbDItNiA0LTIgMS00IDktMmgzMWwxMyAxLTQgNi04IDItMSAzIDcgMnYybC0yNiAyIDggMXYybDE2IDEgOCAyIDE5IDJ2NWwtMSAxLTEzIDEtMiA1aC00bC02LTEtNSA0LTQgNGgtOWwtMTItMS0xMCAzLTIgMi0yMi0xLTItM3Y3bC00LTEtMy0zaC0xMmwtMyA0IDEgMiAzIDEtMSAyIDQgMSAxIDQgMTggMXY0aC0zdjJoMTZsMTEgMSAxIDItMSAyLTMgMWgtMTZsLTMxLTEtMSAxLTEwIDEtMyAzaC0yM2wtOS0zLTMtMy0zLTE1LTItNi0xLTYtMS0yMC0zLTR2LTNoMTJ2LTNoLTExdi0zbC01LTEtMSAxaC01bC0zLTktMS02aC00di0yaDExbC0zLTEzdi0xMmwtNiAyaC05bC05IDEtMSAxLTEgN2gydjloLTN2N2wtMSAzaC0zdjEyaDJsMS02aDN2LTNoMTdsMyAxdjlsLTQgMS0xIDQtMTAtMnYybDQgMXY2bC0xIDJ2MjNsLTcgMXYtMmwtNy0yLTctNi00LTUtNC0ydi0xMGgtNWwtMyAxMC01IDUtNSA3LTcgMy0xIDItNSAyLTEgMWgtMTF2MmgtM3YtNGwtNS0yLTQtOC0xLTF2LThsMi00aDVsMyA3djNoMTlsMi0zLTQtNGgtNXYybC00LTEtMS0zLTUtMy0xLTI0aDl2OWgzbC0xLTkgMTctMXYybDEwLTIgNyAxMXYybC02IDFoLTl2MmwxOS0xaDExbDUgMXYtM2gtNmwtMy05IDEtMTQgMy03IDMtMS0xLTUtMy0xdjVsLTUgNmgtMnY0aC0zdjNsLTcgMWgtMTlsLTIwIDItNCAxLTItNSAyLTZoMnYtOGg2di0yaDJsLTQtMTMtOC0ydi0xbC0xMiAxLTkgMy00IDZoLTJ2N2w2LTJoNWwtMSA0aC00bC0yIDdoLTJsLTEgNGgtM3Y0aC02NWwtNi0zLTUtMTAtMi0xLTEgOC05LTItMy04di0ybC00IDEtMiA4LTUtMnYtNGgtMmwtMSA0aC0zdi0xMWgtMmwtMyA5LTEwIDMtNCAxdjRoLTdsLTMtMS0xLTRoLTRsMiAxOCA0IDEydjJoMnYybDYgMSAxLTNoMnYtMmw0LTF2MmwzLTEgMS0yaC0xN2wtMi0xIDEtMiA1LTFoODRsOS0zIDQtMnYtMmw4LTJoMTJsMiAyLTEgMi04IDF2Mmw4IDEtNCAxLTEgMi02IDItNiA0LTEgOSA3LTF2LTJoNnY3bC00IDF2MmgtMnYzaC0ybDIgNHYzbDctMyA1LTF2NGw1IDEgMyAxIDIgOSAzIDEzdjRsLTcgMi05IDEtMyAxdi01bC0xMSAxLTkgMmgtOWwtMS00aC03djVoLTExbC0xOC0zaC0zMGwtMSAzLTEtMi01IDJ2M2gzbC0xIDUtMyAxLTE2IDEtMyAxaC0xNXYtMmwyLTEgMTYtMSA4LTF2LTJsLTMyLTF2LTJoLTl2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTEgMS01aDh2Mmg3bDEtNC0xNS0xdi0zbDgtMy0xLTQgMS0xaDd2LTJoMTB2LTNINzJsLTItMXYtM2w4LTMtMi00aDEzdi0ySDc3di0ybDUtM2gzbDEtNWg2bC0xIDhoNGwxIDZoLTJ2M2gtNHYybDEwLTMgNC0zIDgtMXYtM2g0bDEtM2gzbC0yLTYgNSAxIDUgM2gzbC04LTQtMy0zLTgtNXYtMmgtMnYtMmgtMmwtMy04di0xMGwxLTMtMy0xLTItMTgtMy0zLTQtMS0yLTMtMTAtMy0yLTFoLTdsLTUgMS0yIDQtMyA3LTctMXYtMmwtMTYtMS0xLTF2LTIwbC0zLTEtMi0zdi0zbC04LTItMi0yLTE2LTUtNy00LTEtNCAxNCAzIDIgNGg4bDEtNWgzdi05bC00LTJ2LTJsMTAgMSA1IDIgMi02IDMtMiAyLTYgMy0xIDQgMi01IDEtMSA0aDE4bC0xLTQgMi0yIDQgMnYyaDJ2MmwyIDFoM2wzLTF2LThsMy01IDMtMSAyLTYgOC00aDE3bDIgMyA0IDF2LTRsNSAxIDMgMXY3aDNsMSAxMC0xIDQgMSAxdjZsNi0zdjE1bDUgNXYxbC05IDMtNSAyaC0zbC0xIDNoMTVsLTMgMi0zIDFoLTEwdjNoMTlsNy0yIDUtMmg0di0yaDJ2LTJoLTRsMi00IDEtMSAxOS0yIDEtNCAzLTMgMy01IDEtNS02LTItMi0xdjNsLTcgMSAyLTEwaDl2M2w2LTEgMy0yIDEtM2gzdi0zbDItMSAxNS0yLTMtMiA1LTIgMS02di00aDN2Mmw2IDIgMyAxIDEtMiA0IDEtMyAxMC0xIDRoNWwzLTRoM2wyLTRoNmwxIDQgNCAydjlsNSAxIDEgNiA1IDEgMiAxdjJoM3YybDQgMXY0aDR2Mmw5IDJoM3Y3aDMwbDEgMiA5IDFoMTBsLTItNC0zLTMgMS0zIDEwLTMgMTEtMSAxLTFoN3Y3aC0zbDEgNiA1LTUgMi0yIDMtMi0zLTVoOHYtMmwxMy0xIDMtNmgxMWw1LTUgNC0xIDEtNyAxMC01IDItNCA0LTEgMTktMS00LTItMS0yIDItMS01LTF2LTRsLTQtMSAxMi0xIDItNGgzdi0ybC00LTEtMi0xNiAxLTExIDQtMiAxLTMgMy0xdi00bC01LTF6bTI3IDIxNXoiLz48cGF0aCBmaWxsPSIjMWEyYjkwIiBkPSJNNjU0IDEzNGgydjJsMTYtMnY3bC0zIDEtMSAyaDEwdjIzN0g1MDdsLTMtNXYtM2wtNS0xLTMtMnYtMmwtNS0xLTEtM2gtMnYtMmwtNC0ydi0ybC00LTEtMS00LTUtMnYtMmgtMTVsLTktMi0yLTF2LTJsLTQtMi00LTR2LTJsLTUtMnYtM2wtNi0xLTMtMnYtMmwtNC0ydi0ybC05LTMtNS0zdi0yaC00bDEgNS00IDNoLTJ2LTJsLTUgNGgtM3YyaC0ydjRoLTJsLTEgNC0yIDNoLTEybC00LTEtNS02di0yaC0zdi03bC01LTItMi00LTUtMS02LTUtNiAxdjdsLTQgMXYzaDVsLTEgNSA3IDEgMSA0LTEwIDUgMTEgMyAxIDUtMiAxaC02djNsNiAyIDEgMy0xIDJoLTEzbC0xIDEzLTQgNWgtM3YtMmwtNC0xdi0ybC01LTItNy0zdi0xNGw1LTEzaDJsMi02aDJ2LTRoMmwtMS05LTItMyAxLTVoNWwtMy05LTgtMnYtMmwtMTItMS00LTJoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTEgNC0xMGg1djEwbDUgMiA2IDcgNSA0IDYgMnYybDctMS0xLTd2LTE2bDItOC00LTF2LTJoNmw0IDIgMS01aDR2LTloLTEzbC03LTF2M2gtM2wtMSA2aC0ybC0xLTN2LTEybDEgM2gzbDEtMTBoM3YtOWgtMnYtN2wyLTIgMTQtMSAxMC0xIDEgMTIgMiA3djZoLTExdjJoNGw0IDE0aDlsMiAxdjNoMTF2M2gtMTJsNCA3IDEgMjAgMiAxMSAxIDEgMyAxNSA2IDQgNSAxaDIzbDMtMyAxMC0xIDEtMSAzMSAxaDE5di0zbC0yNy0ydi0yaDN2LTRoLTE4bC0zLTR2LTJoLTJ2LTJoLTNsLTEtNCAzLTEgMS0zaDEybDQgNGgydi02bDItMSAxIDMgMjIgMSAyLTIgMTAtMyAyMSAxIDUtNSA1LTMgNSAxaDRsMi01IDEzLTEgMS01LTE5LTEtOC0yLTE2LTEtMi0yLTEwLTEgNC0yIDI2LTF2LTJsLTUtMS0yLTEgMS00IDktMyAyLTMtMTItMWgtMzFsLTkgMS0xIDQtNCAzLTIgNWgzdjNoLTEydi0zaC0ybC0yLTgtMTEtNC02LTItNi0zIDEgNC0zOCAxLTUtMXYtNWg5bDEgMyAyIDEgMS00IDEyLTEgNzAtMWg0NXYtM2w1LTIgMy01IDQtMyA1LTEgMi02IDUtMnYtMTJsMi02aDJsMiA0IDIgMXYxN2gybDEtNCAxNy01aDN2LTExbDEtM2gtMnYtM2gydi02bDgtM2g2djNoOGw0LTYtMyAyaC00di04aC0xMXYtM2w2LTVoMnYtMmgybDItNSAzLTEgMi00aDV2LTNsMTAtMnYtNWwzIDF6TTQ4MCAyNzl6Ii8+PHBhdGggZmlsbD0iIzIyNDBiYyIgZD0iTTMwMiAxMGgybC0yIDYgOC0xLTMgMXY2bC02IDJoLTRsLTIgNS00IDNoLTN2MmwtNyAyLTEgNCA5LTMgNC0xaDV2LTJoNWw0LTIgOSAxdjJsMTQgMXYtMmwxMC0xIDMtMXYtNmw1LTMgNS0xIDEtMWg2di0yaC04di0ybDgtMSAxLTRoMTV2M2g2djNsLTEwIDF2Mmw0LTEgMTcgMSA3LTIgMy0yIDcgMSAzIDF2MmgtNWwxIDcgMyAxIDUgMTVoMnY4bC0zIDVoLTZ2MTBsNy0zdjRoLTNsLTEgMy00IDJ2Nmw3LTF2NGgybDEtNCA0LTQgMiAyLTEgNGgybC0yIDYtMSAyIDEgOXYxMGgydi0zbDYgMXYyaDE1bDEgM2gybC0xIDQtMSAxLTggMXY0aDEwdjFsLTYgMiA1IDItMSAyLTE5IDEtNCAxLTIgNC01IDMtNCAxLTIgNy02IDMtNCA0LTEwLTEtMiA2LTEgMWgtMTN2MmwtNyAxIDMgNS01IDMtNSA1LTIgMXYtN2gzdi03bC03IDEtMSAxLTE2IDItNSAxdjRsNCAzdjNsLTEyIDEtNy0xLTMtMi0yOC0xdi03bC02IDEtNy0yIDEtM2gtNHYtNGwtNS0yaC02bDEtM3YyaDN2LTJsLTctMi0xLTYtNS0xdi05bC01LTJ2LTRsLTcgMi0xIDItMyAxLTMgNC01LTEgMS02IDItNiAxLTItNC0xLTEgM2gtM2wtMS0yLTYtMSAxLTMtMyAxIDEgNi01IDUgMyAzLTE5IDJ2M2gtM2wtMSA0LTUgMy00LTF2LTNoLTlsLTEgNy0xIDMgNy0xdi0zbDYgMiAyIDF2NWwtNSA4aC0ybC0xIDQtNyAyLTEyIDEtMyA0aDR2MmgtMnYybC0xMCA0LTYgMWgtMTdsLTItMXYtM2wxMy0yLTEyLTEgMS00IDctMSA1LTMgNC0xdi0ybC00LTItMS0xdi0xNGwtMiAyaC0zbC0yLTkgMS0ydi0xMGgtM3YtN2wtNC0xLTQtMXY0bC01LTEtMS0zLTE3IDEtNiAzaC0ybC0xIDQtNSA1LTIgMTFoLTFsLTEtMTAtMi0xIDMtNyAyLTJoMnYtNGw0LTMgMS00LTQtMWgxMHYtM2gxM2w2IDEtMy00IDItMyA0LTEgMTIgMi0yIDJoLTVsLTEgNmgydjJoNWw1IDUgMSA4IDUgMSAxLTRoMmwxLTMtNC0xLTItMy01LTV2LTFoNWwyLTkgNS0zLTEtMyA2LTIgMy0zIDItNWg3di0zbDYtMiAxLTEgMTQtMSAzIDJ2MmwtNCAxdjJsLTEwIDMtOCAyLTIgOSAyLTEgMjItMSAxLTItOSAxaC05bC0xLTMgNS0xIDUtMnYtNGgxMXYtNGg5bC0xIDIgOS0yIDUtMiA0LTFoM3YtNmwzLTYtNy0xdi0zbDQtMSAxIDIgMyAxdi0yaDR2LTRoMnYybDQgMXYtM2wtMy0xdi0zaDN2LTJsNC0yIDcgMSA0LTF2LTJoLTV2LTRsNS0zIDEtMmgzbDItNSAzLTJoN2wzLTNoOHYtNGgxMGwxLTNoNXYtMmg4di02aDNsMS01em05NCA5em0tMTIyIDd6bTQgMHptLTEyIDR6bTE1OSA0MnptLTI5NyAzMXoiLz48cGF0aCBmaWxsPSIjMWIyOThlIiBkPSJNNTY0IDBoMTE0djEwNmwtNSAzLTMgM2gtMmwxIDUtNCAydjNsLTIgMSAxIDQtNCAxdjJoLTZsMi05LTEtMyAyLTEgMS05LTQgMmgtNWwtMSA0LTUtMS0xLTF2LTVsNi0zIDItM2gtM3YtNGwtNSAxdi0yaDNsMS0xMC0xLTRoLTJsLTIgMTAtMiA0LTUgMS0yLTEtOCAxLTMtMS0xIDNoLTR2LTNsNS0yIDItNSAyLTItMS0zaC03bC0xIDRoMnYzaC0ydjJoLThsLTQtMS01IDJ2MmgtM3YybC0zIDFoLTEwdjJoM3YzbC0yIDFoLTEybC0yLTIgMS0xIDEwLTEtMi01IDQtMSAxLTQtMTMgMy0xNiAxLTItMi0xNS0xdi00bC03LTItNy0zdi00aC00di0ybC00LTItMy0zLTEtMlY1N2gybC0xLTEyLTEtMVYzNGwyLTZoM2wxLTcgMi0xdjJoNWwxLTcgNS01IDUtMyA1LTIgNC0xdjRsMi0xaDEwVjVoMmwxLTN6Ii8+PHBhdGggZmlsbD0iIzE4MTYzNyIgZD0iTTI4MCAyNzZoNHY0aDJ2MmgybDIgNSA2IDJ2NWwxNiAydjJsOCAxIDMgOHYyaC01djVsMiAzdjloLTJ2NGgtMmwtMSA0LTEgMmgtMmwtMSA1LTMgOC0xIDE0IDUgMSA3IDR2Mmw0IDF2Mmw1LTMgMi04IDEtN2gxM3YtNWwtNi0ydi0zbDgtMS0xLTQtMTItMyAzLTMgNy0zdi00bC03LTF2LTRsLTQtMXYtM2w0LTF2LTdsNy0yIDYgNiA0IDEgNSA1IDIgMXY3aDNsNSA2djJoMTZsMy02aDJ2LTRoMnYtMmw1LTMgMy0xdjJsNS00di00aDR2Mmw1IDIgOSA0IDUgNiA4IDN2M2w1IDIgNiA3IDIgMXYybDEyIDIgMTQgMXYybDUgMiAxIDQgNCAxIDQgNHYyaDJsMiAzIDQgMSAzIDMgNSAyIDMgNXYzSDE5M3YtM2gybDItNSA0LTVoMnYtNGg1di0yaDJ2LTJoMnYtMmgydi0ybDQtMiAzLTYgOC00IDEtMmgybDItNCAzLTJoM3YtMmgydi0ybDYtMnYtMmgzdi0ybDQtMiAxLTJoMnYtMmw1LTIgNS0zdi04bDcgMXYtMmwtNi0xIDItMS0xLTItMi0ydi01bC0yLTF2LTJoLTJ2LTRoMnYtNGgzbDEtNCAyLTN6Ii8+PHBhdGggZmlsbD0iIzEzMTU0OSIgZD0iTTY1NCAxMzRoMnYybDE2LTJ2N2wtMyAxLTEgMmgxMHYyMzdoLTk3di0zbDctMiA4LTEgMjAtMSA4LTEtNC0xIDEtNS02LTItMTAtMXYtM2w2LTJoNWwxLTEgMTgtMSA5LTJ2LTNsOC0xdi0zbC00LTEtMS0yLTEyLTEtMy0xaC0xNnYtMmwtMzMgMS0xIDJoLTE4di0zaDR2LTJsMy0zIDEzLTF2LTJsLTE2LTEtMjQtM3YtNmgzMXYtMmwtOC0xdi0zbC03LTJ2LTJsNy0xIDMtMmg0NmwxLTQgMiAxdi0ybC03LTNoLTlsLTMtMnYtM2w4LTQgOC0xLTEtM2gybDItNiAzLTF2LTJoMnYtMmgxNXYtMmwtNS0xIDEtNyAxLTIgNC0xaDlsMS0zaDNsMS04IDMtMTEgMi0xOSAxLTIwLTMtM3YtNWwtMTEgMS02IDItMTAtMXYtM2wtNiAydi0yaC0ydjhsLTQgMmgtNXYtM2wtMiAxLTEgNy0yMSAzLTItMSAyLTQgMTctNWgzdi0xMWwxLTNoLTJ2LTNoMnYtNmw4LTNoNnYzaDhsNC02LTMgMmgtNHYtOGgtMTF2LTNsNi01aDJ2LTJoMmwyLTUgMy0xIDItNGg1di0zbDEwLTJ2LTVsMyAxeiIvPjxwYXRoIGZpbGw9IiMyNzQ3YzEiIGQ9Ik02MDQgOThoMmwtMiA3LTEgMiA5LTMgMS0yIDYtMSAzIDEgMTItMyA2LTF2MmgtMnYyaC0ybC0xIDQtNyAyLTEgMmgtNWwtMiA0LTMgM3YxMGwzLTF2NWwtNCAxdi0zbC01IDJoLTV2LTNoLTNsLTEgNCA0IDF2M2wxNi0xIDQtM2gzbDEgNi00IDF2NmwtMSAxaC01di0yaC0zbC0yIDUtNSAyLTEgMi05IDMtNyAxLTEgMWgtOHYybC01IDEtMSA1aC0ybC0xIDRoLTVsLTIgNS00IDEtMiAzaC0ybC0xIDQtNyA2LTIgNC00LTEgMi00IDItNy05IDEtMiA0LTYgMy01IDMtMTEgMmgtMTBsLTMtMWgtMjhsLTItNy00LTItMTQgMS0xNS0xaC02bDItNCA1LTIgMS0yaDJ2LTJoMTJsMSAzIDgtMWg5djNoNmwxLTNoMnYtOGw0LTEgMSA0IDEwIDJ2MmgtM3YyaDJ2MmgtMnYzbDIwIDJ2LTJsNy0xIDEtNCA0LTl2LThsLTItMTAtMy01LTYtNS01LTFoLThsLTIgMnY1bC02IDJoLTNsLTIgNC00IDJoLTd2LTJsLTUgMmgtNHYtMmwtOSAyIDIgMTYtOCAxLTItMXYtMmgydi0xMmgtM2wxLTQgOC0zaDJ2LTRsLTggMS0yLTJoMnYtM2w3LTIgMS0zLTkgMS03IDItMS02IDQtNGg0bDEtMSA5LTEtMS00IDQtNyA5LTEgNS0zaDJsLTEtMTBoMnYtM2gzdjZoMmwxLTUgNCAyIDIgNyA1LTUgMiAxLTUgNiA3IDEgMSA2IDE1IDEgNSAxdi0zbC0xMi0xLTItNS0yLTJ2LTNoMnYybDQtMSAzIDEgMSA0aDJ2LTVoOXYyaC02djZoNWw4IDMgMiA0IDMgMS0xLTNoNmwtMS02di0ybC0xLTVoMTVsNiAydjNoN2wxIDQgMTAgMXYtNGgtNnYtMmg0bC0xLTQgNy0xaDEwdi0ybDMtMnoiLz48cGF0aCBmaWxsPSIjMjQxODU1IiBkPSJNMzg0IDIwN2g0bDEgMTIgMiA3djZoLTExdjJoNGw0IDE0aDlsMiAxdjNoMTF2M2gtMTJsNCA3IDEgMjAgMiAxMSAxIDEgMSAxOCA0IDEgNSAyIDE0IDMgMSA1IDUgMSAxIDMgMTMgMSA2LTEgMiAxaDM0djJsOCAxdjJsMi0xIDktMSAzLTFoNXYybC0xNiAyLTEgNi0xMSAxLTYtMWgtMTdsLTUgMS0xLTMgMi0xIDI0LTF2LTJoLTE0di0zaC0yNHY0bDggNSA1IDIgMSAzIDggM3YxaC0xM2wtOS0yLTItMXYtMmwtNC0yLTQtNHYtMmwtNS0ydi0zbC02LTEtMy0ydi0ybC00LTJ2LTJsLTktMy01LTN2LTJoLTRsMSA1LTQgM2gtMnYtMmwtNSA0aC0zdjJoLTJ2NGgtMmwtMSA0LTIgM2gtMTJsLTQtMS01LTZ2LTJoLTN2LTdsLTUtMi0yLTQtNS0xLTYtNS02IDF2N2wtNCAxdjNoNWwtMSA1IDcgMSAxIDQtMTAgNSAxMSAzIDEgNS0yIDFoLTZ2M2w2IDIgMSAzLTEgMmgtMTNsLTEgMTMtNCA1aC0zdi0ybC00LTF2LTJsLTUtMi03LTN2LTE0bDUtMTNoMmwyLTZoMnYtNGgybC0xLTktMi0zIDEtNWg1bC0zLTktOC0ydi0ybC0xMi0xLTQtMmgzdi0ybDExLTEgMi0yaDRsMi00IDYtMSAyLTUgNS02IDItMSA0LTEwaDV2MTBsNSAyIDYgNyA1IDQgNiAydjJsNy0xLTEtN3YtMTZsMi04LTQtMXYtMmg2bDQgMiAxLTVoNHYtOWgtMTNsLTctMXYzaC0zbC0xIDZoLTJsLTEtM3YtMTJsMSAzaDNsMS0xMGgzdi05aC0ydi03bDItMiAxNC0xeiIvPjxwYXRoIGZpbGw9IiMxMTFiNWQiIGQ9Ik01ODAgMTkwaDJsMiA0IDIgMXYxM2wxIDQgMiAxIDEtMyAxIDIgMTMtMmg2di03bDMtMXYzbDktMnYtOGwzIDEgNS0xdjNoMTBsNi0yaDExbDIgNiAyIDItMiAzMS0zIDE2LTMgMTEtMyAxLTEgMi0xMyAxLTIgOSA1IDF2MmgtMTV2MmgtMnYybC0zIDItMyA2IDEgMy05IDEtNiAzaC0ydjNsNyAxIDggMSAxIDEgOCAxdjFoLTV2MmwtMzEtMi0yMS0zIDEtNGg0bDEtNSAxMS0xLTItMyAyLTcgMi0yaDR2Mmg2di0ybDYtMyAxLTEwaC0zdi0yaC0xNnYtMmgtM3YtMmgtNXYtMmwyLTFoMjJ2NGg3bDQgMWgxM3YtNWwtMTAgMS0zLTF2LTJoLTN2MmwtOC0xLTItMXYtMmwtMjYgMS0xIDFoLTdsLTEtNGg1di0ybDI2LTEgMS00aDJ2LTJsMi0xIDEtM2g0di0zaC00djJsLTEwIDEtNiAyLTEwIDEtNiAyaC04djNsLTE3IDItNC0xIDEtNCA5LTMgMi0zLTEyLTFoLTMxbC05IDEtMSA0LTQgMy0yIDVoM3YzaC0xMnYtM2gtMmwtMi04LTExLTQtNi0yLTYtMyAxIDQtMzggMS01LTF2LTVoOWwxIDMgMiAxIDEtNCAxMi0xIDcwLTFoNDV2LTNsNS0yIDMtNSA0LTMgNS0xIDItNiA1LTJ2LTEyeiIvPjxwYXRoIGZpbGw9IiMyOTQzYjMiIGQ9Ik0yNDAgMjM5aDEybDIgMi0xIDItOCAxdjJsOCAxLTQgMS0xIDItNiAyLTYgNC0xIDkgNy0xdi0yaDZ2N2wtNCAxdjJoLTJ2M2gtMmwyIDR2M2w3LTMgNS0xdjRsNSAxIDMgMSAyIDkgMyAxM3Y0bC03IDItOSAxLTMgMXYtNWwtMTEgMS05IDJoLTlsLTEtNGgtN3Y1aC0xMWwtMTgtM2gtMzBsLTEgMy0xLTItNiAxIDMtNnYtNmwtMS0xLTEwLTF2LTJoMnYtMmgydi03bC00LTEgMS04IDQtMyAxLTdoLThsNC0ydi03bDE3LTIgMS0xaDE1bDQgMSAyLTNoMnYzbDItMmgxOXYtMmgxN3YtNGwxMS00IDQtMnYtMnoiLz48cGF0aCBmaWxsPSIjYzU5YzNjIiBkPSJNNTY0IDBoMzV2Mmw1IDEgMSA5aDN2M2w2IDF2MmgybDEgOC0yIDdoLTJsMSA1djE0bC0yIDEtMiA5aC0ydjNoLTJsLTEgNS04IDQtMiA3LTUgMi0yIDZoLTIzdjNoLTd2LTZoLTR2MmwtNy0ydi01aC00bC0xLTQtMi0xLTItMTMtNy0yIDQgNnYzaC0zdi00aC0ybC02LTEwLTItOFYzMGgydi00aDJsMSA2IDEtNiAxLTEwIDYtMXY2aDJsMS01IDUtMSAxIDMgMiAxdi03bDQtNWg3VjVoMmwxLTN6Ii8+PHBhdGggZmlsbD0iIzNlNTRhMiIgZD0iTTUwNCAxMzhoOGw3IDIgMiA0IDQgMiAyIDQgMiAxMHY4bC00IDggMiAxLTMgMS0xIDMtNyAxdjJoLTEybC04LTJ2LTNoMnYtMmgtMnYtMmgzdi0ybC04LTEtMi0xLTEtM2gtNHY4aC0ybC0xIDQtNi0xdi0zbC0xNyAxLTItMi0xMS0xdjJoLTJsLTEgMy01IDItMSAyaDEybDE1IDEgNy0xIDUgMyAyIDZoMjdsMyAxaDEwbDE0LTMgNS00aDNsMi01IDktMSAxIDItMyA3LTEgM2gzbDMtNSA2LTUgMS0zIDQtNGg0bDItNWg1bDEtNCA1LTJoNXY0bDYtMSA2IDEtMSAyaC0ybC0xIDNoLTJ2M2wtNyAyLTEwIDUtNS0xdi0zaC0ydjJsLTMgM2gtNGwtMSAzLTMgMS0zIDVoLTJ2MmwtMyAxIDE3IDJ2M2wtNiAydjVoLTNsLTEgNC02IDQtMTAgMmgtMTVsLTQgMmgtMjV2LTVsLTI2LTEtMy0ydi0ybC0xMC0yLTItNWgtMTJ2LTNsLTMgMSAyLTVoLTEwbC0xLTYtNyAyLTEwIDItMyAydi00bC0yLTEtMS00LTggMS0zLTEtMiA2LTggMS0xLTMgOS00IDUtM2gydi00aC01bDMtNGg4djRoOHYtNGw1LTMgMTUtMiA2LTNoOWw1IDJoOGwtMi02di0xMGw0LTJoNXYybDUtMmg0djJsOC0xIDUtNSA4LTJ2LTZ6Ii8+PHBhdGggZmlsbD0iIzFiMmQ5MCIgZD0iTTI2NyAzMDdoMXY1bC00IDMtNyAyLTEgMS04IDEtNiAyLTQgOC01IDQtOSAxLTEgNS04IDctMTAgNS0zIDEtMSAzLTYgMi0xIDNoLTJ2MmgtMTNsLTEwLTNoLTlsLTggMi0yNC0xLTMgMS0xMS0xIDEtNSAxLTEgMjItMXYtMmgtMnYtMmg0di0yaDl2LTJsLTIwLTEtMTAgMS0yIDIgNSAzdjJoLTE4bC0xNC00LTctMXYtMmwyLTFoMTF2MmwxMCAxIDEtNWgtM2wxLTUgNyAxdi0xMGwtNSAxLTMgMS0xLTJoLTRsLTUgMy00LTMtMiAxLTIgMy02IDJINTRsLTMtMS0xLTItMiAxdi0xMGw1IDJoM3YtMmwyNC0yIDItMiA3LTF2LTFoNnYtMmg5djJsNS0xIDIxIDEgNiAxdjJsLTggMi0xOCAxdjJsMTUtMSAzLTEgMTYtMSAzLTEgMS00aC0zbC0xLTQgNi0xIDEgMSAxLTIgMzItMSAxNiAzaDlsMi00aDdsMSA0IDE2LTIgMi0xaDExdjVsMy0yIDE2LTJ6Ii8+PHBhdGggZmlsbD0iIzFlNDJiNyIgZD0iTTUwOCAyMzZoMzFsMTMgMS00IDYtOCAyLTEgMyA3IDJ2MmwtMjYgMiA4IDF2MmwxNiAxIDggMiAxOSAydjVsLTEgMS0xMyAxLTIgNWgtNGwtNi0xLTUgNC00IDRoLTlsLTEyLTEtMTAgMy0yIDItMjItMS0yLTN2N2wtNC0xLTMtM2gtMTJsLTMgNCAxIDIgMyAxLTEgMiA0IDEgMSA0IDE4IDF2NGgtM3YyaDE2bDExIDEgMSAyLTEgMi0zIDFoLTE2bC0zMS0xLTEgMS0xMCAxLTMgM2gtMjNsLTktMy0zLTMtMy0xNS0yLTYtMS02di0yMGgxbDEgMjBoMjh2LTJoLTE2di0yaC0ydi00aDR2LTJoMjVsMS0zIDEzLTIgMS0zaDIydi0zaDI0djJsMjQgMXYtMmg4di0ybC0yNy0xdi0xaC00MXYtM2wtNTQgMXYtM2wxMC0yIDU2LTEtMi00di00aC0ybDEtMiA0IDR2NmgydjNoMTJ2LTNoLTNsMi02IDQtMiAxLTR6bS0yOCA0M3oiLz48cGF0aCBmaWxsPSIjMzQ0NDhkIiBkPSJNNjU0IDEzNGgydjJsMTYtMnY3bC0zIDEtMSAyaDEwdjEyMmgtMmwtMiA0LTEzIDEwLTEwIDYtMSAxLTE3IDN2LTJsNy02IDMtNiA1LTIgMy0xMmgybDEtOCAzLTExIDItMTkgMS0yMC0zLTN2LTVsLTExIDEtNiAyLTEwLTF2LTNsLTYgMnYtMmgtMnY4bC00IDJoLTV2LTNsLTIgMS0xIDctMjEgMy0yLTEgMi00IDE3LTVoM3YtMTFsMS0zaC0ydi0zaDJ2LTZsOC0zaDZ2M2g4bDQtNi0zIDJoLTR2LThoLTExdi0zbDYtNWgydi0yaDJsMi01IDMtMSAyLTRoNXYtM2wxMC0ydi01bDMgMXoiLz48cGF0aCBmaWxsPSIjMjczMzg4IiBkPSJNMTI1IDIwNmgxOXYybC0xNCAzLTUgNi0xIDR2MTRsMiAxMSAzIDEwaDJ2Mmw2IDEgMS0zaDJ2LTJsNC0xdjJsMy0xIDEtMmgtMTdsLTItMSAxLTIgNS0xaDQ5bDMzIDF2NGgtMTd2MmwtMTggMS0zIDF2LTNoLTJsLTIgNC00LTFoLTE1bC0xIDEtMTYgMnY2bC0xIDEgNCAxdjdsLTQgMy0xIDggMyAxdjdoLTJ2MmgtMnYyaDEwbDIgMnY2bC0zIDV2NWgzbC0xIDUtMyAxLTE2IDEtMyAxaC0xNXYtMmwyLTEgMTYtMSA4LTF2LTJsLTMyLTF2LTJoLTl2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTEgMS01aDh2Mmg3bDEtNC0xNS0xdi0zbDgtMy0xLTQgMS0xaDd2LTJoMTB2LTNINzJsLTItMXYtM2w4LTMtMi00aDEzdi0ySDc3di0ybDUtM2gzbDEtNWg2bC0xIDhoNGwxIDZoLTJ2M2gtNHYybDEwLTMgNC0zIDgtMXYtM2g0bDEtM2gzbC0yLTYgNSAxIDUgM2gzbC04LTQtMy0zLTgtNXYtMmgtMnYtMmgtMmwtMy04di0xMGw4LTE2IDYtNCA1LTJ6Ii8+PHBhdGggZmlsbD0iIzQ1NTg5ZSIgZD0iTTIxOCAxNDRoMTlsMyA3IDEgMyA2IDF2NGg1djRsLTUgMy0xIDJoMnYybDUtMmg2djJoNWw0LTJ2N2wtOCAzLTIgMWgxMGw0LTMgMyAxIDIgNi03IDMtNSAxaC05djJsNSAxIDE1IDMgNCAzdjNoOHYxbC0xMSAyLTUgMi0zMi0ydi0zbC0xNi0xLTgtMS0xLTItNi0yLTE3LTF2LTRoOGwyLTQtMS02LTEtNGgtMmwtMS00di04aDNsMS03IDctNiA4LTN6Ii8+PHBhdGggZmlsbD0iIzU5NWU4YiIgZD0iTTU4MSAxNjRoNXY0bDYtMSA2IDEtMSAyaC0ybC0xIDNoLTJ2M2wtNyAyLTEwIDUtNS0xdi0zaC0ydjJsLTMgM2gtNGwtMSAzLTMgMS0zIDVoLTJ2MmwtMyAxIDE3IDJ2M2wtNiAydjVoLTNsLTEgNC02IDQtMTAgMmgtMTVsLTQgMmgtMjV2LTVsLTI2LTEtMy0ydi0ybC0xMC0yLTItNWgtMTJsMS00IDItMyA3LTF2LTFsLTUtMXYtMmw2LTNoMTJsMS0yaDVsMiAydjRsLTUgMXYyaDJ2MmgzbDEtMyA5LTFoMzNsMTQtMyA1LTRoM2wyLTUgOS0xIDEgMi0zIDctMSAzaDNsMy01IDYtNSAxLTMgNC00aDRsMi01aDVsMS00eiIvPjxwYXRoIGZpbGw9IiMyYzQ2YzEiIGQ9Ik00OCAxMzdsNSAxdjFsLTUgMS0xIDRoMThsLTEtNCAyLTIgNCAydjJoMnYybDIgMWgzbDItMS0xIDUtNCAzLTEgNGg0bDMgN3Y5bDEgNi0xIDZoMmwxIDZoNXYybDMgMXY3bC05LTItMi0xaC03bC01IDEtMiA0LTMgNy03LTF2LTJsLTE2LTEtMS0xdi0yMGwtMy0xLTItM3YtM2wtOC0yLTItMi0xNi01LTctNC0xLTQgMTQgMyAyIDRoOGwxLTVoM3YtOWwtNC0ydi0ybDEwIDEgNSAyIDItNiAzLTIgMi02eiIvPjxwYXRoIGZpbGw9IiM2NDY3N2QiIGQ9Ik01NjQgMGgzNXYybDUgMSAxIDloM3YzbDYgMXYyaDJsMSA4LTIgN2gtMmwxIDV2MTRsLTIgMS0yIDloLTJ2M2gtMmwtMSA1LTggNC0yIDctNSAyLTIgNmgtMjN2M2gtN3YtNmgtNHYybC03LTJ2LTVoLTRsLTEtNC0yLTEtMi0xMy03LTIgNCA2djNoLTN2LTRoLTJsLTYtMTAtMi04VjMwaDJ2LTRoMmwxIDYgMS02IDEtMTAgNi0xdjZoMmwxLTN2NGwtNCAxdjhsLTMgMXY2bC0zIDggMSA2IDUgMXYyaDVsMiA2IDMgM2gxMHYtMmg0djJoMnYzaDh2M2gtNmwtMiA1IDMtMWg3bDEgMWgxM2w4LTQgMi00aDJ2LTJsMi0xdi02aDJsMS01aC0ybDEtNC03LTEtMS00IDItNWgtMmwtMS0xMyAxLTQtNC0xLTItMnYtOGwtMTMtM2gtOGwtOCAxLTMtMmgzVjVoMmwxLTN6Ii8+PHBhdGggZmlsbD0iIzMzNmJkZSIgZD0iTTQ1NSAyMzJsNyAzIDYgMiA4IDN2MmgybDIgOC04IDEtNDggMS0xMCAxdjNsMTAtMWg0NHYzbDEyLTFoMzJ2MWwyMiAxIDIgMXYyaC04djJoLTE4bC02LTF2LTJoLTI0djNsNCAxaC0xNmwtMTAtMS0xIDQtMTMgMi0xIDJoLTI1djJoLTR2NGgydjJsOC0xaDE2djFoLTh2MmwtNSAyLTEtMS0yMi0xLTEtMnYtMThoLTJsLTMtNHYtM2gxMnYtM2gtMTF2LTNsLTMtMXYtM2g3di0ybDItMWg3bC0xLTcgOCAyIDM3LTF6Ii8+PHBhdGggZmlsbD0iI2YxZDgxNCIgZD0iTTYzMSAxNTlsMTAgMSA4IDMgMTMgNSAxMiA4IDQgM3Y4N2gtMmwtMiA0LTEzIDEwLTEwIDYtMSAxLTE3IDN2LTJsNy02IDMtNiA1LTIgMy0xMmgybDEtOCAzLTExIDItMTkgMS0yMC0xLTEtMi0xNi05LTE1LTMtMnYtMmwtMy0xdi0zbC03LTF6Ii8+PHBhdGggZmlsbD0iIzExMTY0ZSIgZD0iTTE1NSAyMTJoMnYxMWgzbDEtNGgybDEgNCA0IDIgMS04IDUtMSAzIDEwIDkgMiAxLTggNCAyIDQgOSA1IDIgOCAxIDQ2IDJ2MWwtNiAyLTE2IDJ2MmwtNiA0LTcgMmgtODRsLTUgMSAxIDFoMTNsNCAxLTEgMy03LTF2MmwtMyAzLTYtMXYtMmgtMmwtNC0xMC0yLTExdi0xMWg0bDEgNCAxMCAxdi00bDktNGg1eiIvPjxwYXRoIGZpbGw9IiM3NTUyOGQiIGQ9Ik0zMzcgMjYxaDV2N2gtMnYtM2gtM2wtMSA5LTkgMTEtNiA0IDEgM2gzbDEgNC0xIDkgMi0xIDEzLTF2LTZsNiAzdjRoOWwtMSAzaC04bDggNCA1IDUgMSAzaDJsMi00IDctM2g1di0zaDN2LTJoNHYxMmwtNCAyLTUtMS01IDYtMSAzaDNsLTIgNGgtM2wtMy0zdi0yaC0zdi03bC01LTItMi00LTUtMS02LTUtNiAxdjdsLTQgMXYzaDVsLTEgNSA3IDEgMSA0LTEwIDUgMTEgMyAxIDUtMiAxaC02djNsNiAyIDEgMy0xIDJoLTEzbC0xIDEzLTQgNWgtM3YtMmwtNC0xdi0ybC01LTItNy0zdi0xNGw1LTEzaDJsMi02aDJ2LTRoMmwtMS05LTItMyAxLTVoNWwtMy05LTgtMnYtMmwtMTItMS00LTJoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTF6Ii8+PHBhdGggZmlsbD0iIzMxMjg4NyIgZD0iTTM4NCAyMDdoNGwxIDEyIDIgN3Y2aC0xMXYyaDRsNCAxNGg5bDIgMXYzaDExdjNoLTEybDQgNyAxIDIwIDIgMTEgMSAxdjdsLTItMS0zLTE1LTEtMjMtNi0yLTUtMS0zIDF2Mmg0bDEgMTggMSA0aDJ2MmgzbDEgNi00IDJ2MmgybDIgMy0xIDYtMyAzLTExLTJ2LTVsLTQgMS0yLTItNS0ydi02aC01bC0xLTQgNS0xLTEtN3YtMTZsMi04LTQtMXYtMmg2bDQgMiAxLTVoNHYtOWgtMTNsLTctMXYzaC0zbC0xIDZoLTJsLTEtM3YtMTJsMSAzaDNsMS0xMGgzdi05aC0ydi03bDItMiAxNC0xeiIvPjxwYXRoIGZpbGw9IiMxNzI3ODgiIGQ9Ik01OSAzNjBoMzNsMTUgMyA4IDQgOSAxdjNoMjh2LTJoMnYtMmw2LTFoMjJsLTIgNS0zIDItMSAzaC0ybC0xIDVINDR2LTZsLTctMS0yLTRoMTNsNCAxdjJoMTJ2M2wyLTQgMTQtMXYtM0g0M3YtNWw1LTJ6Ii8+PHBhdGggZmlsbD0iIzQyNTI3MiIgZD0iTTEzMSAwaDIzbC0xIDcgMTIgMiAxIDQtMSAzaDJsMiAzIDEtMWg4djExbC0yIDUtNSAxLTIgNC0xIDMtNiAzLTEwIDJoLTExbC0xMC03LTgtMi0zLTR2LTJoLTJsLTItNnYtOWwzLTUgMTMtMi0xLTN6Ii8+PHBhdGggZmlsbD0iIzBmMTg2MSIgZD0iTTU2OSAzMTBoNDd2MmwzLTEgMiA5IDMgMSAxIDQgMiAxdjdsLTIgMyA3LTEgMiA2aDJ2MmgtMjB2LTJsLTMzIDEtMSAyaC0xOHYtM2g0di0ybDMtMyAxMy0xdi0ybC0xNi0xLTI0LTN2LTZoMzF2LTJsLTgtMXYtM2wtNy0ydi0ybDctMXoiLz48cGF0aCBmaWxsPSIjNGE1ODliIiBkPSJNNTQyIDRoM3Y0bDUtMS0zIDUtMSA3LTMtMXYtM2wtNSAxLTEgNWgtMnYtNmwtNiAxdjEzbC0yIDQtMS0xdi02aC0ydjRoLTJsMSAxOCAzIDEwIDQgNnYyaDJ2NGwzLTItNC01di0ybDcgMSAyIDR2MTBsMyAxdjRoNHY1bDUgMSAyIDF2LTJoNHY2aDd2LTNoMjNsMS02IDYtMyAyLTcgNC0yIDMgMS0xIDIgMy0xIDItMyA0IDEtMSA1aDJsLTEgNi0xIDNoLTJsLTEgNC03IDVoLTJ2MmgtM3YybC0zIDFoLTEwdjJoM3YzbC0yIDFoLTEybC0yLTIgMS0xIDEwLTEtMi01IDQtMSAxLTQtMTMgMy0xNiAxLTItMi0xNS0xdi00bC03LTItNy0zdi00aC00di0ybC00LTItMy0zLTEtMlY1N2gybC0xLTEyLTEtMVYzNGwyLTZoM2wxLTcgMi0xdjJoNWwxLTcgNS01IDUtMyA1LTJ6Ii8+PHBhdGggZmlsbD0iIzRlNzdkYyIgZD0iTTE5NCAxOTZoMTJsMiAydjE1bDExLTEgNSAxIDEgNmg2djNoLTZ2N2w5LTMgMy0yIDExIDF2Mmw4IDEtMSA0IDIgMS0xIDFoLTU2bC02LTMtNS0xMC0yLTEtMSA4LTktMi0zLTh2LTJsLTQgMS0yIDgtNS0ydi00aC0ybC0xIDRoLTN2LTEybDYtMiAxLTdoLTR2LTJoMnYtMmgxMnYyaDR2MmwxMC0xIDYtMnoiLz48cGF0aCBmaWxsPSIjNTE1YTgyIiBkPSJNMTE5IDEyMGw1IDEgMiA0IDEgMTEtMSA5IDMtMS0xIDEwLTQgMi0zLTEtMSA0LTIgNmgtMTF2LTRsLTE5IDEtNyAxLTEtMXYtNWwzLTQgMS0xOSAzLTNoNHYtNWw2LTRoMTdsNSAyeiIvPjxwYXRoIGZpbGw9IiM1MTU2ODUiIGQ9Ik04NiAyNjBoNmwtMSA4aDRsMSA2aC0ydjNoLTRsMSAzaDVsMSAyaDJ2LTJsOS0xLTIgNC0zIDEtNCA4LTE3IDJ2MWw5IDIgOSAxdjRoLTJ2Mmw0LTF2MmgxMHYyaC0zdjVsMTktMSAxNiAxIDEgNGgzbC0xIDUtMyAxLTE2IDEtMyAxaC0xNXYtMmwyLTEgMTYtMSA4LTF2LTJsLTMyLTF2LTJoLTl2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTEgMS01aDh2Mmg3bDEtNC0xNS0xdi0zbDgtMy0xLTQgMS0xaDd2LTJoMTB2LTNINzJsLTItMXYtM2w4LTMtMi00aDEzdi0ySDc3di0ybDUtM2gzeiIvPjxwYXRoIGZpbGw9IiM0YjU2ODAiIGQ9Ik0yMTggMTQ0aDE5bDMgNyAxIDMgNiAxdjRoNXY0bC01IDMtMSAyaDJ2Mmw0IDEtNSA1aC05bC00IDRoLTJ2NWgtN2wtNC00di0yaC04bC03LTEtMS0xNC0xLTF2LTdsNC03IDgtM3oiLz48cGF0aCBmaWxsPSIjOGU3ZTVlIiBkPSJNNTMyIDE1aDN2NmgybDEtM3Y0bC00IDF2OGwtMyAxdjZsLTMgOCAxIDYgNSAxdjJoNWwyIDYgMyAzaDEwdi0yaDR2MmgydjNoOHYzaC02bC0yIDUgMy0xaDdsMSAxaDEzbDgtNCAyLTRoMnYtMmwyLTF2LTZoMmwxLTVoLTJsMS00LTctMS0xLTQgMi01aC0ybC0xLTEzIDMtNWgybDEgNSAyIDF2M2g0djlsMyAzdjdsLTIgNmgtMnYxMWwtNiAzLTEgM2gtMnY2bC0xIDEtMTEgMi01IDNoLTE0bDEtNi03LTF2Mmw0IDEtNCAxaC0xM2wtMS00LTItMS0yLTEzLTctMiA0IDZ2M2gtM3YtNGgtMmwtNi0xMC0yLThWMzBoMnYtNGgybDEgNiAxLTYgMS0xMHoiLz48cGF0aCBmaWxsPSIjMzcxMjYxIiBkPSJNMjgwIDI3Nmg0djRoMnYyaDJsMiA1IDYgMnY1bDE2IDJ2Mmw4IDEgMyA4djJoLTVsLTEgOS0zIDRoLTV2LTEybC00IDEtMSAzaC04bC02LTFoLTEwbC04LTItNC00IDcgMXYtMmwtNi0xIDItMS0xLTItMi0ydi01bC0yLTF2LTJoLTJ2LTRoMnYtNGgzbDEtNCAyLTN6Ii8+PHBhdGggZmlsbD0iIzE1MjQ2OSIgZD0iTTM1NiAyMTVsNCAxdjVsLTMgMi0yIDYtMSAxNCAyIDd2Mmg2djNoLTM1di0ybDE1LTEtNy0xMi0xMCAxdi0ybC0zIDFoLTE0bDEgOWgtM3YtOWgtOWwxIDV2N2wtMS0yaC0ydi0ybC03LTEgMiA5LTEgNy04IDF2LThsLTMtMTYtMS00IDEtMTIgMS0yaDNsMS00aDRsMiA2IDUgMSAxIDkgMSAzIDQtMiAyMC0yaDI2di0zaDN2LTRoMmwxLTNoMnoiLz48cGF0aCBmaWxsPSIjNGU3MmQ1IiBkPSJNMCAxNjBsMTQgMyAyIDRoOGwxLTUgMy0xaDEybDUgNSAxIDUgNSAyLTEgNmgtMmwtMSA1IDQgMiA3IDkgNCAxdi00aDJ2LTJoMmwxLTNoMnYtNWwxMSAxIDMgM3Y0aDV2MmwzIDF2N2wtOS0yLTItMWgtN2wtNSAxLTIgNC0zIDctNy0xdi0ybC0xNi0xLTEtMXYtMjBsLTMtMS0yLTN2LTNsLTgtMi0yLTItMTYtNS03LTR6Ii8+PHBhdGggZmlsbD0iIzMyNDM4ZCIgZD0iTTQ1MyA2NGg1bDMgMyAxMSAxIDUtMSAzIDggMyA4IDEgNWg0djNsLTMgMi0xIDMtMyAxLTEgM2gtMnYzbC03IDQtNSAxaC0xNmwtMi01LTEtMTIgMS0xMSA0LTIgMS0zIDMtMXYtNGwtNS0xeiIvPjxwYXRoIGZpbGw9IiMyNjU1YzUiIGQ9Ik0xNzcgMjU0aDJ2M2wyLTJoMTlsMyAydjVoMnYtNmwxMCAyIDEgMyA1IDIgMSAzLTIgNGgydjJoMnYyaC0ybC0xIDQtMyAyLTEtMS03LTEtMS04LTEgMS0yMS0xdjZsLTcgMnYybDEwIDQgMSA0LTMgMmgtM2wtMSA2aDVsLTIgMmgtMTFsLTEyLTJ2LTNsNC0yIDYtMXYtM2gydi0ybC04LTEtMi0xdi02aDExdi0yaC02di0xN2g1eiIvPjxwYXRoIGZpbGw9IiMyODI0NWQiIGQ9Ik0zMzcgMjYxaDV2N2gtMnYtM2gtM2wtMSA5LTkgMTEtNiA0IDEgM2gzbDEgNC0xIDkgMi0xIDEzLTF2LTZsNiAzdjRoOWwtMSAzaC04bDggNCA1IDUgMSAzaDJsMi00IDctM2g1di0zaDN2LTJoNHYxMmwtNCAyLTUtMS01IDYtMSAzaDNsLTIgNGgtM2wtMy0zdi0yaC0zdi03bC01LTItMi00LTUtMS02LTUtNiAxdjdsLTQgMXYzbC0xMCAzLTIgMS0yLTEwLTEtNCAxLTJoNWwtMy05LTgtMnYtMmwtMTItMS00LTJoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTF6Ii8+PHBhdGggZmlsbD0iIzJlMmY1NiIgZD0iTTI2OCAzMTFsMSA0LTcgNWgtNHYyaC0ybC0yIDRoLTN2MmgtM3YybC02IDJ2MmgtMnYybC02IDMtMiAzaC0ybC0yIDQtNyAzLTMgNi00IDF2MmgtMnYyaC0ydjJoLTJ2MmgtNXY0bC01IDUtMyA1aC0ydjNoLTIwbDEtNWgybDEtNCA0LTRoM2wxLTQgMy0yaDR2LTJsNi01aDNsMS00IDExLTUgNi00IDQtNCAxLTQgMTEtMyA1LTcgMi00IDYtMiA4LTEgMi0yIDctMnoiLz48cGF0aCBmaWxsPSIjMWUzMTk2IiBkPSJNMjA4IDIzNGg1NHY1bC0zIDF2NWwzIDEgMSA2IDQgMSAyIDEtMSAxMGgtMnYyaDJsMSA0IDMtM2gzbC0xIDMtNSAyLTEgNGgtMmwtMi05aC0zbDEgNy0yIDEtMSAzaDRsLTEgNi01LTEtMy0xdi00bC03IDMtNSAxLTItNHYtM2gydi0zaDJ2LTJsMy0xIDEtN2gtNnYybC03IDF2LTlsNS00IDYtMyAzLTEtNC0ydi0ybDgtMS0xLTMtNC0yIDEtMS00MS0yeiIvPjxwYXRoIGZpbGw9IiMyMDI0NGUiIGQ9Ik02NTAgMjYybDEgMi0zIDEwLTUgMy0zIDYtNSA1aC0ydjJsMTAtM2g1bDEgM2g0bDEgMy02IDFoLTEybC0xMi0xIDEgMyA5IDF2MmwtNCAxIDIgMSAxNCAxIDcgMnYxbC01IDFoLTExbC0xIDRoLTE5di0zaDJ2LTJsLTctM2gtOWwtMy0ydi0zbDgtNCA4LTEtMS0zaDJsMi02IDMtMXYtMmgydi0yaDE1di0ybC01LTEgMS03IDEtMiA0LTFoOXoiLz48cGF0aCBmaWxsPSIjNTA1ZmI1IiBkPSJNMzk1IDE4MGg3djRsLTYgMy00IDMtNSAxdjNsNy0xdjNsLTggMy0xMiAzaC00bC0yIDZoLTd2MWwtMjMgMS0xIDEtMTggMS0xIDRoLTEybC00LTEzLTgtMnYtMWgxMmwxNC0xaDExbC0xIDUgNiAxdi0zbDI4LTIgMi0zIDUtMSAxLTMgMTEtMiAzLTV6Ii8+PHBhdGggZmlsbD0iI2U5ZDIyOCIgZD0iTTEyNSAyMDZoMTl2MmwtMTQgMy01IDYtMSA0djE0bDIgMTEgMyAxMGgydjJsNSAxIDIgNS01IDEtMTAtNS0zLTMtOC01di0yaC0ydi0yaC0ybC0zLTh2LTEwbDgtMTYgNi00IDUtMnoiLz48cGF0aCBmaWxsPSIjMjIzNmIzIiBkPSJNODggMzYxaDhsMTMgMyA2IDMgOSAxdjNoMjh2LTJoMnYtMmw2LTFoMjJsLTIgNS0zIDItMSAzaC0ybC0xIDVoLTIxbC03LTEtMS0zaC0xMWwtMSAxaC0xNmwtMS0yaDVsMi01aC0xMHY1bDIgMWgtMTBsLTgtMXYtNGw1LTF2LTJoLTdsLTQtNS0yLTF6Ii8+PHBhdGggZmlsbD0iIzM4NTBhYiIgZD0iTTYyNiAxNjNoN2w3IDN2MTBoMnY3bC04IDF2OWwtNCA1di0zbC02IDJ2LTJoLTJ2OGwtNCAyaC01di0zbC0yIDEtMSA3LTIxIDMtMi0xIDItNCAxNy01aDN2LTExbDEtM2gtMnYtM2gydi02bDgtM2g2djNoOGw0LTYtMyAyaC00di04aC0xMWwzLTIgNS0xeiIvPjxwYXRoIGZpbGw9IiM3ODY0M2IiIGQ9Ik02NDQgMzEzbDE2IDIgMSAyLTEzIDFoLTExdjJsLTcgMnYybDUtMWgxM2w1IDF2LTJoMTF2NGwtMTMgMyA3IDJ2MmwxMiAzIDEgMy05IDJoLTR2M2gtMjNsMS0zaC0ybC0yLTYtNyAxIDItMTAtMy0xdi0xMGgyMHoiLz48cGF0aCBmaWxsPSIjM2E1M2E3IiBkPSJNMzAwIDY0aDlsMyAzdjdsLTQgNCAxIDQgNyAzIDEgMi0xIDktNCAxIDUgNXYxMGwzIDEtMTEgNi04LTEtNS0yIDEtMTYgMS0yaDEwbC0zLTctNC0yLTEtNiAzLTN2LTJoLTVsLTMtNHYtN3oiLz48cGF0aCBmaWxsPSIjMzA0N2E0IiBkPSJNMzY4IDI4aDEwbDYgMiAxIDMtMyA4djNsLTcgMS0zIDNoLTJ2LTRsLTEgMXY3bC0xIDQtMTAgMmgtNWwtMy01LTUtNS0xLTFWMzZsMS0xIDE1LTF2LTRoOHoiLz48cGF0aCBmaWxsPSIjM2Y3Y2Q3IiBkPSJNNTA4IDIzNmgzMWwxMyAxLTQgNi04IDItMSAzIDcgMnYybC0xMCAxaC0yNGwtMi0xdi0yaC0xMGwtNi0yIDEtNSAzLTEgMS00eiIvPjxwYXRoIGZpbGw9IiM0ZDk4ZjAiIGQ9Ik00NTUgMjMybDcgMyA2IDIgOCAzdjJoMmwyIDgtOCAxaC01OWwtMS04IDIgMSAxLTYgMTMgMS0yIDEgMSA0IDEwIDF2LTRsMTkgMi0xLTQtMzEtMXYtMWwzMi0xeiIvPjxwYXRoIGZpbGw9IiMxZDQzYjYiIGQ9Ik0zODggMjA3bDQgMXYyaDJsMiA1IDUgNCA1IDEgMiA4IDMgMmg5di01aDJsMiA2IDMgMS0xIDQtMy0xdi0zbC04IDEtMiAzLTItMSAxIDctOSAxdjJoLTd2MmwtMyAyaC01bC0zLTktMS02aC00di0yaDExbC0zLTEzeiIvPjxwYXRoIGZpbGw9IiM4YTc2NDciIGQ9Ik0xNDQgMTBoMTZsNSAzIDEgM3YxNGwtMSAzLTcgMi0yIDYtOS0xLTUtMXYtM2gydi00aC00di0ybC02LTF2LTdsNC0yIDEtNGgydi0yaDN6Ii8+PHBhdGggZmlsbD0iIzFiMWU0ZCIgZD0iTTY1OCAzNDdoMTRsNiAxdjIxbC0xNCAxLTQtMi0xLTFoLThsLTEgMWgtNnYtM2wtNC0xLTEtNC0yLTIgNS0zaDJ2LTNsMTMtM3oiLz48cGF0aCBmaWxsPSIjMjQzZGEzIiBkPSJNNTgzIDE4M2wyIDEtMSA1LTEtMy00IDF2MmwzIDFoLTJsLTIgMTgtNSAzLTIgNi03IDItMyAzLTIgNC01IDF2M2gtMzJsMy0xdi0ybDMtMWgxNHYtMmgydi0yaDN2LTJoM3YtM2wtMi0xIDgtNSAxLTNoM3YtNWw3LTIgMi03IDItMyA0LTEgMi02eiIvPjxwYXRoIGZpbGw9IiMzNjMzNGMiIGQ9Ik00NTggMzQ4aDlsNyAxdjJsNSAyIDEgNCA0IDEgNCA0djJoMmwyIDMgNCAxIDMgMyA1IDIgMyA1djNoLTI0bC0xLTMtNS01di0zaC0zdi0yaC0ybC0yLTYtNC0yLTItMXYtMmwtNC0xLTItMnoiLz48cGF0aCBmaWxsPSIjNjM1ODhiIiBkPSJNMjgzIDIxOGg0bDIgNiA1IDEgMSA5IDEgNWgyMnYxaC0xMGwxIDloLTN2LTloLTlsMSA1djdsLTEtMmgtMnYtMmwtNy0xIDIgOS0xIDctOCAxdi04bC0zLTE2LTEtNCAxLTEyIDEtMmgzeiIvPjxwYXRoIGZpbGw9IiM1ZTVhNmUiIGQ9Ik01NDIgNGgzdjRsNS0xLTMgNS0xIDctMy0xdi0zbC01IDEtMSA1aC0ydi02bC02IDF2MTNsLTIgNC0xLTF2LTZoLTJ2NGgtMmwxIDE4IDMgMTAgNCA2djJoMmwtMSA0aC0ybC03LTEtNC03LTItMTgtNC0xdi05bDItNmgzbDEtNyAyLTF2Mmg1bDEtNyA1LTUgNS0zIDUtMnptLTI2IDM5eiIvPjxwYXRoIGZpbGw9IiM1MDVlOGYiIGQ9Ik00NjcgMTg2aDVsMiAydjRsLTUgMXYyaDJ2MmgzbDEtMyA5LTFoMzZsLTIgMyA2IDItMyAzLTkgMS00LTEtMSA1aC02djJoLTExdi0ybDItMWgxMXYtNWwtOS0yLTctMi0yIDQtMTggMi0xIDFoLTlsLTEtMiAyLTFoNnYtMmgtMTFsLTkgMiAyLTQgNy0xdi0xbC01LTF2LTJsNi0zaDEyeiIvPjxwYXRoIGZpbGw9IiM1YzYxODciIGQ9Ik0xMzMgMjcwaDdsLTMgMTYgMyAxdjdoLTJ2MmgtMnYyaDh2M2gtNnYzaC0zdi0yaC00bDEgMiAxMiAydjFsLTE2IDFoLTExdi0yaDd2LTJsLTEyLTEgMS00IDMtMyA4LTJoNnYtMmwtMTUtMXYtMmg1di0ybDItMSAyLTdoNWwxLTZoMnoiLz48cGF0aCBmaWxsPSIjNTY2NGEwIiBkPSJNMTc3IDI1NGgydjRoM2wxIDEwaDJsMiA0djRsLTcgMnYybDEwIDQgMSA0LTMgMmgtM2wtMSA2aDVsLTIgMmgtMTFsLTEyLTJ2LTNsNC0yIDYtMXYtM2gydi0ybC04LTEtMi0xdi02aDExdi0yaC02di0xN2g1eiIvPjxwYXRoIGZpbGw9IiMxMDBkNjEiIGQ9Ik0yOTUgMjk0bDEyIDEgNSAxdjJsOCAxIDMgOHYyaC01bC0xIDktMyA0aC01di0xMmwtNCAxLTEgM2gtOGwtNy0ydi0xNHoiLz48cGF0aCBmaWxsPSIjNGI1Mjc4IiBkPSJNNjMyIDE2MWwxMCAzIDEgMyA2IDUgOSAxNSAxIDV2MTBsLTItMXYtNWwtMTEgMS02IDItOS0xIDItNSAxLTkgOC0xdi03aC0ybC0xLTEwLTYtMnoiLz48cGF0aCBmaWxsPSIjMjczYzc4IiBkPSJNMTMxIDBoMTRsLTEgNC0yIDEtMSA1aC01bC0yIDZoLTJ2MmgtMnY0aDJsMSAxMCA1IDEtMSAzLTUgMS0xIDMtOC0yLTMtNHYtMmgtMmwtMi02di05bDMtNSAxMy0yLTEtM3oiLz48cGF0aCBmaWxsPSIjZDBiNTUxIiBkPSJNMTAzIDEzMmgxMGw4IDIgMSA1LTMgMXY4bC0yIDEtMSAzaDJ2NGgtNXYtMmwtNiAyLTEgMy02LTItNC01LTEtMTEgMS00aDNsMS00eiIvPjxwYXRoIGZpbGw9IiM4MjdkNmQiIGQ9Ik05NiAxMjVoMTdsNyA0djJoMmwyIDQtMSA2LTEgNWgzbDIgNmgtMnYyaC00bC00IDYtMyAzLTYgMXYtM2wtMTctMi0zLTJ2LTJoMmwtMS01aDJsMS02IDEtMnYtN2wyLTd6bTcgN2wtNCAydjNoLTNsLTEgOSAxIDcgNSA1IDUgMSAxLTMgNi0ydjJoNXYtNGgtMmwxLTMgMi0xdi04bDMtMS0xLTUtMTAtMnoiLz48cGF0aCBmaWxsPSIjNDAxMjYwIiBkPSJNMzA2IDM2MGwxIDMgNSAxIDcgNHYybDQgMXYybDIgMS0xIDdoLTM2di01bDgtOGgydi0ybDQtM2gydi0yeiIvPjxwYXRoIGZpbGw9IiMzYTNlNmUiIGQ9Ik0yNCAyNzJoOGwzIDF2MmgtM3YzbDEwIDEgMSAxdjVsLTUgMXY0aC00bC0xIDMgOSAzdjFIMTZsLTItNCA2LTF2LTJsLTE0LTF2LTNsNS0yaDl2LTNsOC0xdi0ybC03LTEgMy0xdi0ybC0zLTF6Ii8+PHBhdGggZmlsbD0iIzYxOWZlMiIgZD0iTTMyMiAyMzloM3YybDEwLTIgNyAxMXYyaC0xMWwtNS0xLTEtMy0xIDRoLTE0djNoLTN2LTNoLTlsLTEtMTJoOXY5aDNsLTEtOXoiLz48cGF0aCBmaWxsPSIjMjEyZTgwIiBkPSJNODAgMzIwaDEzdjJoOHYybC0xMyAySDc2bDEgMiA3IDJ2M2wtNCAxSDU0bC0zLTEtMS0yLTIgMXYtMTBsNSAyaDN2LTJ6Ii8+PHBhdGggZmlsbD0iIzE5M2JhNCIgZD0iTTQ3NiAyNDBsNCAyIDEgMnY2aDJ2M2gxMnYtM2gtM2wxLTUgMSAzIDE2IDJ2MmwxMCAxdjFsOCAxLTIgMi0yNS0xLTUtMS04MiAxdi0zbDEwLTIgNTYtMS0yLTR2LTRoLTJ6Ii8+PHBhdGggZmlsbD0iIzNmNDM4MCIgZD0iTTUxMiA0M2w0IDEgMyAxOCAzIDV2Mmw3IDEgMS0yIDUgMS00LTZ2LTJsNyAxIDIgNHYxMGwzIDF2NGg0djVsNSAxIDIgMXYtMmw0IDEtMSAzaC04bC0zLTItOS0yLTEtNCAzIDEtMS01LTYtMS0xMi0yLTYtMS0yLTRWNTdoMmwtMS0xMnptNCAweiIvPjxwYXRoIGZpbGw9IiM0MjI3NjMiIGQ9Ik0zNDAgMjk3bDYgM3Y0aDlsLTEgM2gtOGw4IDQgNSA1IDEgM2gybDItNCA3LTNoNXYtM2gzdi0yaDR2MTJsLTQgMi01LTEtNSA2LTEgM2gzbC0yIDRoLTNsLTMtM3YtMmgtM3YtN2wtNS0yLTItNC01LTEtNi01LTQgMS0yLTQgMi0zaDJ6Ii8+PHBhdGggZmlsbD0iIzYxNDA3NSIgZD0iTTMzMiAzMzZsMTMgMyAxIDUtMiAxaC02djNsNiAyIDEgMy0xIDJoLTEzbC0xIDEzLTQgNWgtM3YtMmwtNC0xdi0yaDJsMi0xNiAzLTEwIDItNGg0eiIvPjxwYXRoIGZpbGw9IiM1ODU4NjkiIGQ9Ik01NjQgMGgzNXYybDUgMSAxIDloM3YzbDYgMXYyaDJsMSA4LTItNGgtN2wtNC00di0yaC0zbC0xIDN2LTJsLTMtMS0yLTQtMi0xIDEgNS0xIDFoLTVsLTEtNi0zLTMtMS0zLTcgMWgtNFYzbC04LTJ6Ii8+PHBhdGggZmlsbD0iIzE2MTQ4NyIgZD0iTTI0MiAyNTFsMTAgMSAzIDloM2wyLTloMmwtMiAxMi0yIDktNSAyLTQgNS0zIDJoLTRsLTItNHYtM2gydi0zaDJ2LTJsMy0xIDEtN2gtNnYybC03IDF2LTlsNS00eiIvPjxwYXRoIGZpbGw9IiMzNzQyODEiIGQ9Ik02MjEgMzFsMSAzaDJ2MTZsLTMgMTZoLTN2OGgtNGwtMSA0di0yaC0ydi01aC0zbC0yIDNoLTNsMy05aDJ2LTNoMmwxLTkgMy0xLTEtMTkgMy0xIDIgMTBoMlYzMnoiLz48cGF0aCBmaWxsPSIjMWMzNWJhIiBkPSJNMCA5MGgxMGwxIDVoMmwxIDYgNiAxdi0zbDEwIDIgMiA0aC02bC0yIDMgMiAxaC0ybDQgNHYyaDdsMyA0IDEgMy00IDQtMSAyaC02di02bC00LTJ2LTJsLTQtMi00LTJ2LTJoLTJ2LTNoMnYtNGwtOC0xdi0ySDZsLTItNkgweiIvPjxwYXRoIGZpbGw9IiM3OTZjNjEiIGQ9Ik01NjIgMWw4IDEgMiAxdjNsNy0xIDQtMSAyIDYgMyAxdjZsNS0xdi01bDMgMSAyIDRoNmw0IDUgNyAxIDEgNS0xIDMtNC0xLTMtMmgtM3Y5bDMgMnY3aC0ybC0xLTUtMy0xIDEtOWgtNHYtM2wtMy0xdi01bC00IDN2LTJsLTQtMS0yLTJ2LThsLTEzLTNoLThsLTggMS0zLTJoM1Y1aDJsMS0zeiIvPjxwYXRoIGZpbGw9IiMyZTM2N2QiIGQ9Ik04MiAzMDBoOGwtMiA1aDEwbDUgMiAxIDUgNSAxIDEgMSAxMiAxdjFoLTE4di0yaC05djJIODJsLTEyLTIgMi01IDgtMS0xNS0xIDEtNWg4djJoN3oiLz48cGF0aCBmaWxsPSIjMWIxZTYwIiBkPSJNMzgzIDI0MGw0IDMgMSA1aDlsMiAxdjNoMTF2M2gtMTJsMiA1LTQtMnYtMmwtMTIgMi0xIDctMSAxLTEgMjEtMSAzaC0zbC01LTUgMS05aDNsMi0xNyAyLTZ2LTJoM3oiLz48cGF0aCBmaWxsPSIjMWQxOTRhIiBkPSJNNjQ0IDMxM2wxNiAyIDEgMi0xMyAxaC0xMXYybC03IDJ2M2gtMnY0aDE5bDMgMy0yIDItOCAyIDEyIDEgMiA0aC0xN3YzbC0yLTEgMS0yaC0ybC0yLTYtNyAxIDItMTAtMy0xdi0xMGgyMHoiLz48cGF0aCBmaWxsPSIjMmM0NTlmIiBkPSJNMzA3IDMybDkgMXYybDE0IDEtNiA5aC02bDIgMyAzIDEtMSAzLTEwIDEtNiA1LTItMVY0MWwyLTNoLTJ2LTV6bTI4IDFsMyAyLTggMXYtMnoiLz48cGF0aCBmaWxsPSIjNWE2ZGEzIiBkPSJNNTgxIDE2NGg1djRsNi0xIDYgMS0xIDJoLTJsLTEgM2gtMnYzbC03IDItMTAgNS01LTF2LTNoLTJ2MmwtMyAzaC00bC0xIDMtMyAxLTEgMmgtM2wxLTQgNS00IDEtMyA0LTRoNGwyLTVoNWwxLTR6Ii8+PHBhdGggZmlsbD0iIzk0ODk1YiIgZD0iTTQ1NyA3OWw4IDEgMSAyLTUgMXYzbDEzLTEgMiAyLTEgMTAtMyA2LTUtMS0yLTF2LTJsLTEwLTEtMi0yLTItMTIgNC00eiIvPjxwYXRoIGZpbGw9IiM5ZDkwNTYiIGQ9Ik0yMTUgMTQ5bDkgMSA4IDEgMiAzLTEgMTItNSAyLTEgMmgtOWwtNC0yLTItOCAxLTl6Ii8+PHBhdGggZmlsbD0iIzY5Njk2YyIgZD0iTTIyMCAxNDdoMTNsMiAydjNoMnYzaC0ybDEgOCAzIDF2NmwtNCAyLTIgNC0yIDFoLTE3bC0zLTUtMS02di0xMGwyLTYgMi0yem0tNSAybC0yIDItMSAxMSAyIDYgNCAyaDlsNC00aDJsMS0xMi0yLTMtMTEtMnoiLz48cGF0aCBmaWxsPSIjMmY1NWQ3IiBkPSJNNTYyIDEyNGw1IDEgMTcgMSAxLTJ2M2wxMCAxdi0ybDExLTEgMSAzaC00bC0xIDQgNCAxdjJsLTIgMiAxIDMtMiAxLTExLTEtMS0zIDEtMmgzdi0zbC0zMCAxLTUgMXYtNnoiLz48cGF0aCBmaWxsPSIjNGEyYzY4IiBkPSJNMzgzIDMxMmg1bDIgOC0xIDEwaC0ybC0xIDQtMiAzaC0xMmwtNC0xIDEtNCAyLTNoLTNsMS00IDQtNiA2IDEgNC0xeiIvPjxwYXRoIGZpbGw9IiM2NTY2NTkiIGQ9Ik0xNDQgMTBoMTZsNSAzIDEgM3YxNGwtMSAzLTcgMi0yIDYtOS0xLTUtMXYtM2gydi00aC00di0ybC02LTF2LTdsNC0yIDEtNGgybC0xIDEyIDYtMSAxIDNoM3YyaDEydi0yaDJWMTVoLTIweiIvPjxwYXRoIGZpbGw9IiMyNTRhYzEiIGQ9Ik00NTggMjY0aDEwbDEyIDF2MWwtNyAxIDMgMi02IDEgMS0zaC0zdjRsNiAyLTEgNS0zIDRoLTZsLTMtMnYtMmgtMTRsLTctMnYtMWw2LTIgMy00IDctMXoiLz48cGF0aCBmaWxsPSIjNGI4M2RlIiBkPSJNNDU1IDIzMmw3IDMgNiAyIDggM3YyaDJsMiA4LTggMWgtMTZsLTEtMTItMzEtMXYtMWwzMi0xeiIvPjxwYXRoIGZpbGw9IiMyYjJiNTQiIGQ9Ik01MjYgMGgzOGwtNSA1aC0ydjJsLTEyIDFWNGwtNSAzLTggMy00IDVoLTJsLTEgN2gtNXYtN2gzdi01aC03VjlsNi0xIDMtNHoiLz48cGF0aCBmaWxsPSIjMmI0ZWJmIiBkPSJNMjQwIDIzOWgxMmwyIDItMSAyLTggMXYybDggMS00IDEtMSAyLTYgMi04IDQtMy0xIDEtMi01IDF2LTJsLTggMi0yIDF2LTZsMTEtNCA0LTJ2LTJ6Ii8+PHBhdGggZmlsbD0iIzY1NzNhZSIgZD0iTTM5NSAxODBoN3Y0bC02IDMtNCAzLTUgMXYzbDctMXYzbC04IDMtMTIgM2gtNGwtMiA2aC00di0zaC03bC0yLTIgMS0xaDhsMi01IDUtMSAxLTMgMTEtMiAzLTV6Ii8+PHBhdGggZmlsbD0iIzI4M2ZjNSIgZD0iTTE3NiAzNDZsNSAxIDMgMXYzaDE4bC0xIDQtNiAyLTEgM2gtMnYyaC0xM2wtNS0yLTEtMnYtNmgtNmwxLTV6Ii8+PHBhdGggZmlsbD0iIzIxMmM4MyIgZD0iTTY0MCAzNjdoM3YybDggMXYybDQtMiAxMi0xaDExdjhoLTM5bC0zLTF2LTh6Ii8+PHBhdGggZmlsbD0iIzIyMjhhNyIgZD0iTTI4MiAyMTFsMTEgMXYyaDN2NWwtMyA1aC00bC0yLTN2LTNoLTRsLTEgNGgtM2wtMSAxNC0xLTItOSAzaC00bDEtN2gzbDEtNGgybDItN2g0bDEtNnoiLz48cGF0aCBmaWxsPSIjM2Y0ZTlkIiBkPSJNMjI4IDI3NGgzdjNoM3YyaC0ydjJsNiAxdjJoMnY3aDJsLTIgNC02IDItOSAxLTEtMy0zLTEgMy0xLTItN3YtNWgydi00aDN6Ii8+PHBhdGggZmlsbD0iIzE5MTM1NSIgZD0iTTI2MiAyMzRoMnYzbDktM2g0bDIgNiAzIDE2LTEgOC02IDEtMS0xLTEtMTAgMS0xdi03bDEtNC02IDItMiA0aC0zbC0xIDMtMi01LTItMS0xLTZoNHoiLz48cGF0aCBmaWxsPSIjNGU1OWI0IiBkPSJNMzY5IDI2N2gxbDEgMjAtNyAxdi0ybC03LTItNy02LTMtNWgydi0zaDE0djJoNnoiLz48cGF0aCBmaWxsPSIjNjY2NjZkIiBkPSJNNDY0IDc3aDZsMiAxdjNsNCAyIDIgMnY5bC0zIDEwLTQgMWgtMTNsLTYtNS00LTF2LTZsMS0yIDEtOSA1LTItMSAyaC0ybDEgOSAyIDYgMTAgMnYybDcgMiAzLTExdi01bC01LTFoLTl2LTNsNC0yLTQtMnoiLz48cGF0aCBmaWxsPSIjMWMzNDhkIiBkPSJNNjE4IDE3N2g2djZsLTggMi0xIDRoLTN2MTNsLTEgMS0xIDctMjEgMy0yLTEgMi00IDE3LTVoM3YtMTFsMS0zaC0ydi0zaDJ2LTZ6Ii8+PHBhdGggZmlsbD0iIzJkMmY2NCIgZD0iTTMwIDI2MGgzdjRoNXY0aC0zbDEgOC00LTFoM3YtMkgyNHY0bDQgMXYybC04IDF2M2wtNC0xSDV2LTRsMy0yaDExdi0ySDh2LTJsNi0xIDQgMSAzLTJoM3YtNWgybDEtNHoiLz48cGF0aCBmaWxsPSIjMTEyNzdmIiBkPSJNMzU2IDIxNWw0IDF2NWwtMyAyLTIgNi0xIDE0IDIgN3YyaDZ2M2gtMzV2LTJsMTUtMS00LTd2LTJsNS0xIDMgM3Y3bDYgMSAxLTQtMS0xdi0xNWgtNnYtM2gzdi00aDJsMS0zaDJ6Ii8+PHBhdGggZmlsbD0iIzI2MzM5ZSIgZD0iTTM4NCAyMDdoNHYxMGwtNCA0LTMtMS0xLTItMTIgMS00IDF2LTJoLTJ2LTdsMi0yIDE0LTF6Ii8+PHBhdGggZmlsbD0iIzQ0NWZiMSIgZD0iTTIwNSAyNTZsMTAgMiAxIDMgNSAyIDEgMy0yIDRoMnYyaDJ2MmgtMmwtMSA0LTMgMi0xLTEtNy0xLTEtNnYtNmwtNC0yeiIvPjxwYXRoIGZpbGw9IiMxNDJkN2UiIGQ9Ik02MTIgMjI1bDE2IDIgNiAxdjRsLTUgMmgtOWwxIDEyLTUgMy0zLTF2LTJoLTJsLTEtNGgydi0yaDJsLTEtOC0xLTF6Ii8+PHBhdGggZmlsbD0iIzQ0NzFkNyIgZD0iTTYwMyAxOTFoNWwxIDJ2MTBsLTIwIDYtMiAzdi0xMmg0di0ybDUtMnYtNHoiLz48cGF0aCBmaWxsPSIjNjQ1ZTgzIiBkPSJNNTIwIDIwOWwxNSAxdjRsLTcgMS00IDQtMyAxaC0yNXYtNWwxNS0xIDEtM3oiLz48cGF0aCBmaWxsPSIjNDUzMGEyIiBkPSJNMjYyIDI1Mmw1IDEgMiAxLTEgMTBoLTJ2MmgybDEgNCAzLTNoM2wtMSAzLTUgMi0xIDRoLTJsLTItOWgtM2wxIDctMiAxLTEgM2g0bC0xIDYtNS0xLTMtMXYtNGwtMy0xIDItMyA1LTEgMi0xM3oiLz48cGF0aCBmaWxsPSIjYWE5NjU1IiBkPSJNMTAzIDEzMmgxMGw4IDIgMSA1LTMgMXY4bC0yIDEtMSAzaDJ2NGgtNXYtMmwtNiAyLTEgMy02LTItNC01di0zaDJ2M2gydi00bDUgMSA1IDF2M2wzLTEgNC03LTMtMS0yLTgtMTAtMnYyaC0zbDEtM3oiLz48cGF0aCBmaWxsPSIjM2MzYjRiIiBkPSJNMjQgMTgybDEzIDEgMiAxdjExaC0xbC0xLTYtMSA5LTctMS0yLTItNy0xLTEtMnYtNmw1LTF6Ii8+PHBhdGggZmlsbD0iIzMzMzk3MSIgZD0iTTU4NSAyNjVoMTV2MmgzdjEwbC00IDNoLTN2MmgtNnYtMmgybC0xLTctMiAxdi0ybC03LTEgMi0xeiIvPjxwYXRoIGZpbGw9IiMyNTI1NGMiIGQ9Ik02NzIgMzM2aDZ2MTJsLTIwLTEtMSAzaC01di0ybC00LTEtMS0zaDExdi0zbDYtMmg3eiIvPjxwYXRoIGZpbGw9IiM1MjRmNzQiIGQ9Ik02NjggMTQ2aDEwdjRsLTEyIDJ2MmwtMyAxLTEgMiAyIDEtOCA1IDIgMy02LTEtMTAtMy0xLTIgOS0zIDYtNCA4LTV6Ii8+PHBhdGggZmlsbD0iIzYxNWNhMyIgZD0iTTM2MyAyNDBoMTdsMyAxdjlsLTQgMS0xIDQtNi0yLTEtMi02LTF2LTJoLTJ2LTRsLTMtMWgzeiIvPjxwYXRoIGZpbGw9IiM4Yzc1NDUiIGQ9Ik02NTggMzQ3aDE0bDYgMXY3aC0zNHYtM2wxMy0zeiIvPjxwYXRoIGZpbGw9IiMyZDQ0Y2YiIGQ9Ik0zMDQgMjE2aDExbDEgNS0xIDFoLTEybC0xIDRoLTJsLTEgNmgxN2w0IDItMjAgMi00IDEtMi01IDItNmgydi04aDZ6Ii8+PHBhdGggZmlsbD0iIzNiNGE5MCIgZD0iTTM2NiA3M2w3IDEgNCA0djlsLTIgM2gtMTB2LTJoLTJWNzZ6Ii8+PHBhdGggZmlsbD0iIzMzNjFhZCIgZD0iTTUwOCAyMzZoMzFsMTMgMS00IDYtNyAxLTEtNGgtNDF2LTJ6Ii8+PHBhdGggZmlsbD0iIzJjNDZhOCIgZD0iTTE1MiA1Mmg1bDIgNC03IDMtNSAzaC0zdjJoLTEzdi01bC0xLTJoOWwyLTR6Ii8+PHBhdGggZmlsbD0iIzViNTE2MiIgZD0iTTY0NSAxNzBsNCAyIDkgMTUgMSA1djhoLTF2LTZsLTEzIDJoLTEwdi05bDItMmg0bDQgNmg4di0yaDJsLTEtNS00LTQtMy02eiIvPjxwYXRoIGZpbGw9IiM1OTU3OWQiIGQ9Ik0yOTggMjU1bDIgMnYzaDJ2NGwxMS0xIDMgMSAyLTQgMy00aDN2MTBsLTQgNS0yIDItNC0yLTEtMmgtNXYybC00LTEtMS0zLTUtM3oiLz48cGF0aCBmaWxsPSIjNGM0ZjhhIiBkPSJNNjYgMzAyaDh2Mmg5bDMgMyAyIDF2MmwtNSAyIDEgMSA5IDF2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTF6Ii8+PHBhdGggZmlsbD0iIzU5NGU0OSIgZD0iTTYyNCAyODdoMTFsLTIgMXYybDEwLTNoNWwxIDNoNGwxIDMtNiAxaC0xMmwtMTgtM3YtM3oiLz48cGF0aCBmaWxsPSIjMDgwNTRmIiBkPSJNMjk2IDI5NGwxNiAydjJsOCAxIDMgOHYyaC02di00bC0xMC0zLTktMnYtMmgtMnoiLz48cGF0aCBmaWxsPSIjNjk0YWEyIiBkPSJNMzc5IDMwN2g0djEybC00IDItOS0xaC03bDEtNSA3LTNoNXYtM2gzeiIvPjxwYXRoIGZpbGw9IiMyYzJjNjMiIGQ9Ik02OSAyNjNoMTRsMiAyLTUgM2gtM3YyaDEydjJINzZsNCA1aC02bC0yLTItNC0ydi0zaC0ybDEtNXoiLz48cGF0aCBmaWxsPSIjN2U3NjY4IiBkPSJNMzAxIDEwMGgxMGwzIDZ2NmwtMiAxaC0xMWwtMS0xdi0xMXoiLz48cGF0aCBmaWxsPSIjOGI4MTVhIiBkPSJNMzAwIDY0aDZsMyAydjlsLTMgM2gtOGwtMy00di03eiIvPjxwYXRoIGZpbGw9IiM2YTY4ODMiIGQ9Ik04MCAzMjBoMTN2Mmg4djJsLTEzIDJINjlsLTctMiAxLTJ6Ii8+PHBhdGggZmlsbD0iIzkyODE2NSIgZD0iTTQ4NyAxOTZoNmwzIDIgNyAydjVoLTE1bC0xMy0yLTEtMyAxMS0xeiIvPjxwYXRoIGZpbGw9IiM2NzY0NzgiIGQ9Ik0xNiAyODhoMTNsNCAydjNsOSAzdjFIMTZsLTItNCA2LTF2LTJoLTR6Ii8+PHBhdGggZmlsbD0iIzQzNTM4YSIgZD0iTTQ3OCA4OGg1djhsLTIgMS0xIDNoLTJ2M2wtMyAxem0tMzAgMTFsNSAxIDUgNGgxN2wtMSAyLTggMmgtMTZsLTItNXoiLz48cGF0aCBmaWxsPSIjNjA2NTgwIiBkPSJNMzQ4IDM4aDhsMiAxdjRsNCAxLTEgNGgtNGwtMSA0aC00di0ybC00LTEtMi0zdi03eiIvPjxwYXRoIGZpbGw9IiM1NDY2YTUiIGQ9Ik00NjAgMjY3aDd2M2w3IDMtMSA1LTMgNGgtNmwtNC00LTEtMTB6Ii8+PHBhdGggZmlsbD0iIzRiNWVhNSIgZD0iTTIyOCAyNzRoM3YzaDN2MmgtMnYybDMgMS0xIDkgNCAxdjFsLTExLTEgMS0zaDR2LTJoLTlsLTEtMXYtNWgydi00aDN6Ii8+PHBhdGggZmlsbD0iIzgzODE3OCIgZD0iTTU0NSAxODVoMmwtMSA0LTMgMy01IDF2N2wtMiAxaC04bC0xLTQtMy0xdi0zbDctMSA0LTIgMy0zeiIvPjxwYXRoIGZpbGw9IiMyZDJjOTQiIGQ9Ik0zMTIgMjg4bDQgMSAxIDMgNSAyIDEgMnY4aC0ybC0xLTQtOC0ydi0ybC0xMi0xLTQtMmgzdi0ybDExLTF6Ii8+PHBhdGggZmlsbD0iIzU0NTY2MiIgZD0iTTY1MSAzNThoMTNsMTQgMnY4bC0xNC0xLTItMXYtMmg2di0zaC0xOHoiLz48cGF0aCBmaWxsPSIjNWQ1YTVlIiBkPSJNNjMyIDMwMmgxNGw3IDJ2MWwtNSAxaC0xMWwtMSA0aC0xNXYtM2w1LTF2LTJ6Ii8+PHBhdGggZmlsbD0iIzU4NTY3NCIgZD0iTTI0IDI3Mmg4bDMgMXYyaC0zdjVoM3Y2SDI0bC0zLTJ2LTNsNy0xdi0ybC03LTEgMy0xdi0ybC0zLTF6Ii8+PHBhdGggZmlsbD0iIzM4MTE1NCIgZD0iTTI4MiAyMDBoMTBsLTEgOC0xOSAxdi01bDUtM3oiLz48cGF0aCBmaWxsPSIjM2E0MDZiIiBkPSJNNTY0IDBoMzV2Mmw1IDEgMSA5aDN2MmwtNC0xLTEtMy0zIDFWOWwtMi0xIDEtMi01LTEtMS0zaC0xM2wtMSAxaC05bC02LTJ6Ii8+PHBhdGggZmlsbD0iIzI5NDJjNiIgZD0iTTQ2OCAzMzloMTdsNSAxdjRsLTIgMWgtMjJsLTItMXYtNHoiLz48cGF0aCBmaWxsPSIjYmNhOWJhIiBkPSJNMzQwIDI5N2w2IDN2NGg5bC0xIDNoLThsOCA0IDMgNS04LTEtNy02LTQgMS0yLTQgMi0zaDJ6Ii8+PHBhdGggZmlsbD0iIzQyMzY3MyIgZD0iTTI3OCAyMjRsMyAxLTIgNCAxIDR2MmgybDEgMmg2bDUtMSAyLTJ2OWwtMS0xLTQtMS02IDEtMiAydjlsLTIgMy0zLTE2LTEtNHoiLz48cGF0aCBmaWxsPSIjN2U3NzY3IiBkPSJNNjQ0IDMxM2wxNiAyIDEgMi0xMyAxaC0xMXYybC0xMSAxdi0zaC0ydi0zaDIweiIvPjxwYXRoIGZpbGw9IiMzNTMyODEiIGQ9Ik0zNjQgMjM0aDIwbDIgOC02LTFoLTEwbC03LTF2M2wtMy0xaDJsMS03eiIvPjxwYXRoIGZpbGw9IiM2MzZjODciIGQ9Ik0zNDYgMTEwbDYgMSAzIDYtMSA1LTQgMS01LTItNS0xdi04eiIvPjxwYXRoIGZpbGw9IiMzZjRiN2QiIGQ9Ik0zMDcgMTZoM3Y0aDEydjdsLTIxIDEgMS0zIDUtMXoiLz48cGF0aCBmaWxsPSIjMjEwNDQyIiBkPSJNMjgwIDI3Nmg0bDEgNy01IDNoLTl2MmwtNS0xdi0zaDNsMS00IDItM3oiLz48cGF0aCBmaWxsPSIjMjY0YWM0IiBkPSJNMzQ5IDI3MGgxNGwxIDMtMyA4aC04bC02LThoMnoiLz48cGF0aCBmaWxsPSIjM2Y0YzhhIiBkPSJNMzMwIDYwaDhsMiAxdjExbC03LTEtNC0xdi0yaC0zbDEtNnoiLz48cGF0aCBmaWxsPSIjODY3YTU4IiBkPSJNMjMzIDE2MGgxdjdsLTMgM2gtMmwxIDZoLTE0bC0xLTF2LTVoLTN2LThsMiA0djJsOCAxIDUgMSAxLTMgMi0xIDItNHoiLz48cGF0aCBmaWxsPSIjNGI2ZmQwIiBkPSJNMzA0IDI1NmgxN2wtMyA1LTIgM2gtMTR2LTRoLTJ2LTN6Ii8+PHBhdGggZmlsbD0iIzM2NTRhMiIgZD0iTTU5NiAxODRoNmwtMiA0aC0zdjJoLTJsLTEgNy0zIDF2MmgtNHYxMmwtMi00di0xNGgydi0yaDR2LTV6Ii8+PHBhdGggZmlsbD0iIzZhNmRhOCIgZD0iTTI2NiAxOTRsOSAxIDMgMi0xIDUtNSAyLTEtMS0xMC0xLTItMXYtNWg3eiIvPjxwYXRoIGZpbGw9IiMzZjZhZDUiIGQ9Ik0yMzUgMjQxaDd2NGwtNSAyaC0zdjJsLTE1IDUtMiAxdi02bDExLTQgNC0zeiIvPjxwYXRoIGZpbGw9IiNkNmJiNTkiIGQ9Ik01NjUgOWwyIDQgMSAxM2gtMnYzbC02IDFWMTZsMi01eiIvPjxwYXRoIGZpbGw9IiM2NDkyZjIiIGQ9Ik0yOCAxNjFoMTJsMSA1LTEgMi04IDF2MmgtNmwtMS05eiIvPjxwYXRoIGZpbGw9IiMyMjI1NjQiIGQ9Ik0zNDIgMjcxbDUgMiA2IDcgNSA0IDYgMnYyaDJsMSA0aC0ydi0ybC01IDF2LTNoLTVsLTQtM3YtMmgtNHYtM2gtMnoiLz48cGF0aCBmaWxsPSIjMWExMDYxIiBkPSJNMzczIDIwOGg1djJoM3YyaC0ydjRsLTE2IDF2LTdsMS0xeiIvPjxwYXRoIGZpbGw9IiM1MTM3NzMiIGQ9Ik0yODYgMjk4aDNsMSAxNWgtMTB2LTExaDJ2LTJ6Ii8+PHBhdGggZmlsbD0iIzdhNzU4NiIgZD0iTTY2IDMyOWgxNGw0IDF2M2wtNCAxSDU1bDEtM3oiLz48cGF0aCBmaWxsPSIjNTc2NDhjIiBkPSJNMzEzIDM2aDN2Mmg4djVoLThsLTIgNS02LTEtMS01IDItNGg0eiIvPjxwYXRoIGZpbGw9IiNiN2EwNWIiIGQ9Ik02MDAgNDh2M2wtMSAyaDJsLTEgNWgtMmwxIDdoLTN2MmwtMiAxLTIgNC0yLTEgMi0xMyAyLTJ2LTVsMi0yeiIvPjxwYXRoIGZpbGw9IiM2ZDY2NzkiIGQ9Ik03NiAyNzJoOWwzIDMgMSA1aC05djJINzB2LTNsOC0zeiIvPjxwYXRoIGZpbGw9IiM1Nzg2ZTgiIGQ9Ik0zNjAgMjQ0aDN2NGgydjJoNmwxIDNoLTRsMSA2LTEgMS0xMSAxdi0zaDd2LTVsLTctMXYtMmgyeiIvPjxwYXRoIGZpbGw9IiMzODVhZDIiIGQ9Ik00MTAgMzdsNCAxIDMgNmgydjhsLTMgNWgtM2wtMy0xMnoiLz48cGF0aCBmaWxsPSIjM2E0ZTkwIiBkPSJNMzY4IDI5bDEwIDF2MTJoLTV2LTJsLTQtMS0xLTF6Ii8+PHBhdGggZmlsbD0iIzIxMzhhZCIgZD0iTTQ1NSAzMjRoMjV2NGwtOCAxaC0xNGwtMy0zeiIvPjxwYXRoIGZpbGw9IiM2ZTc1ODciIGQ9Ik0xMzMgMjcwaDdsLTIgNy00IDF2M2gydjJoLTExbDEtNGgzbDEtNmgyeiIvPjxwYXRoIGZpbGw9IiMzNzc0ZWUiIGQ9Ik00MDQgMjY0aDExbDUgMXYyaC0ydjJsNSAxdjFoLTE5eiIvPjxwYXRoIGZpbGw9IiM3NjY3NWIiIGQ9Ik02MzUgMzIzaDEzbDQgM2gtOGwxIDNoLTE3di00eiIvPjxwYXRoIGZpbGw9IiNlMmQxMzQiIGQ9Ik02NDYgMjc0bDIgMS0zIDN2M2wzIDEtMiAyIDYtMiA2LTEtNCAzLTQgMy0xNyAzdi0ybDctNiAzLTZ6Ii8+PHBhdGggZmlsbD0iIzIzMzlhYiIgZD0iTTQ0MCAzMTloOHYzaDN2NGgtMTRsLTUtM3YtM3oiLz48cGF0aCBmaWxsPSIjMmE0MmM3IiBkPSJNMjE2IDMyNmgxNHY2aC0xOGwtMS00aDV6Ii8+PHBhdGggZmlsbD0iIzUzM2U3OCIgZD0iTTM3MSAyODJsMSAzIDQgMiAxIDVoMnY2aC03di02aC01bC0xLTQgNS0xeiIvPjxwYXRoIGZpbGw9IiM0ZDQ2NTMiIGQ9Ik02NTIgMzM3aDEwbDUgMS0zIDItNiAxdjNoLTIwdi0zaDE2eiIvPjxwYXRoIGZpbGw9IiM3ZDY5NjgiIGQ9Ik01MjggMjEwaDd2NGwtMTAgMi0yIDJoLTE5di0xbDEyLTIgNi00eiIvPjxwYXRoIGZpbGw9IiMzNjYzZGMiIGQ9Ik00ODMgMjcwaDE2djNoLTN2MmgtMTZsLTctMiA0LTJ6Ii8+PHBhdGggZmlsbD0iIzVmODFjYSIgZD0iTTMzOSAyNTlsOSAyIDMgMyAxIDZoLTN2M2wtNS0xLTItMS0xLTEweiIvPjxwYXRoIGZpbGw9IiMyZjQ3YTQiIGQ9Ik0zNTYgMjE1bDQgMXY1bC0zIDItMiA2LTIgMTBoLTF2LTZoLTZ2LTNoM3YtNGgybDEtM2gyeiIvPjxwYXRoIGZpbGw9IiMyMzMwODgiIGQ9Ik0yMDkgOTlsNyAydjZsLTIgMmgtOWwxLTIgMy0xLTgtMSAxLTR6Ii8+PHBhdGggZmlsbD0iIzNmM2Q2NCIgZD0iTTYwOCAyOTVoMTdsOSAydjJoLTI5bDEtM3oiLz48cGF0aCBmaWxsPSIjMzkzZDZlIiBkPSJNNzQgMjUwbDYgMS0yIDEwaC05di0zaC00di0ybDgtNHoiLz48cGF0aCBmaWxsPSIjOTQ4YzY1IiBkPSJNNDU3IDc5bDggMSAxIDItNSAxdjNsLTUgMXY2aC0ybC0xIDMtMi0xMiA0LTR6Ii8+PHBhdGggZmlsbD0iIzQ3NGE3OSIgZD0iTTUxMiA0M2w0IDEgMyAxOCAzIDYtNS0xdi0ybC00LTEtMS03aDJsLTEtMTJ6bTQgMHoiLz48cGF0aCBmaWxsPSIjMmE0Y2E4IiBkPSJNMjk4IDI1Mmg5djNoM3YtM2gxM3Y0bC0yNCAxeiIvPjxwYXRoIGZpbGw9IiMzMjQyOTAiIGQ9Ik0yOTggMjI1aDF2N2gxN2w0IDItMjAgMi00IDEtMi01IDItNnoiLz48cGF0aCBmaWxsPSIjNDE0NDUxIiBkPSJNOCAxODNoNnY3SDlsLTEgNC02IDF2LTJIMHYtM2w1LTEgMi01eiIvPjxwYXRoIGZpbGw9IiMyNzM3NzgiIGQ9Ik0xNjUgOGwzIDEgMiA0djNoOWw0IDktMiAzaC0ybC0xIDMtMS0yIDEtMTEtOCAxaC0zdi0zaC0yeiIvPjxwYXRoIGZpbGw9IiNkOWM0NGUiIGQ9Ik0yMTYgMTU2aDlsMSAxdjdoLTJ2MmwtMyAyaC01bDEtNSAxLTZ6Ii8+PHBhdGggZmlsbD0iI2QxYzI0ZCIgZD0iTTQ2NCA4Nmg0bDEgNmgtMmwxIDQtMSAyaC02bC0yLTV2LTV6Ii8+PHBhdGggZmlsbD0iIzNkNGRhNiIgZD0iTTM3NCA3Nmw1IDEgMiA2LTEgMTAtMiAzLTUtMi02LTN2LTFsOC0xIDEtMiAxLTktMy0xeiIvPjxwYXRoIGZpbGw9IiM5YTg2NTgiIGQ9Ik01MjggNDN2M2wxIDYgNSAxdjJoNWwyIDctMy0xdi0ybC0xMC0yLTEtMi0zLTEgMS0xMHoiLz48cGF0aCBmaWxsPSIjYTk5MjRjIiBkPSJNNTQwIDE1aDN2MmwtMyAxLTEgMTB2NmgtM3Y3aC0xdi01bC00IDF2LTVsMi0xIDEtOCA0LTF2LTZ6Ii8+PHBhdGggZmlsbD0iIzRmOTZlYiIgZD0iTTM5NiAyNDVoMTJsMyAzdjRoLTEydi0zbC0zLTF6Ii8+PHBhdGggZmlsbD0iIzM1NTNkNiIgZD0iTTYzNiA5OGg0djJoLTJ2MmgtMmwtMSA0LTcgMi0xIDJoLTV2MmgtNHYtNGw4LTMgNC0zaDJ2LTJ6Ii8+PHBhdGggZmlsbD0iI2FlYTE2NCIgZD0iTTczIDIzMWg3bC0xIDNoLTJsMiAxMi02LTItMi0ydi05eiIvPjxwYXRoIGZpbGw9IiMyOTFhMjUiIGQ9Ik02NjQgMzIyaDJ2NWwtNCA0IDYgMnYybC0xMi0xIDItMXYtMmwtNy0xLTMtMiAxNi0yeiIvPjxwYXRoIGZpbGw9IiNkYmQxNGEiIGQ9Ik02NjAgMjEwaDF2MjlsLTIgMTBoLTJsLTIgMTAtMiAyIDItMTAgMy0xNnoiLz48cGF0aCBmaWxsPSIjYTdhYTcxIiBkPSJNNDU1IDIzMmw3IDMgMiAzLTEgOC0zIDJoLTNsLTEtMTJ6Ii8+PHBhdGggZmlsbD0iIzMwMjgzNCIgZD0iTTYyOCAzMjloMTlsMyAzLTIgMi0xMCAzaC0zdi00aDJ2LTJsLTktMXoiLz48cGF0aCBmaWxsPSIjNTQ0NjQyIiBkPSJNNjUzIDMyMmgxMXY0bC0xMyAzLTIgMi01LTN2LTJsNi0xIDMtMXoiLz48cGF0aCBmaWxsPSIjNzg3NzhmIiBkPSJNMzk1IDE4MGg3djRsLTYgMy0zIDJoLTdsMi01eiIvPjxwYXRoIGZpbGw9IiNhYzk1NWUiIGQ9Ik01NTAgN2w2IDEgMSAzLTQgNS01IDMtMiAyLTMtMSAxLTIgMiAxdi03eiIvPjxwYXRoIGZpbGw9IiM5NzY4OTciIGQ9Ik0zMzAgMzI3aDEzbDEgNC02IDMtNy0xLTEtMXoiLz48cGF0aCBmaWxsPSIjMjA0Mjk1IiBkPSJNMzM4IDI0M2w1IDEgMiA0djVsMSAyaC0xOXYtMmwxNS0xLTQtN3oiLz48cGF0aCBmaWxsPSIjYzBiMTRkIiBkPSJNMTI1IDIwNmgxOXYybC0xNCAzLTMgMnYtM2wtOCAxIDMtMnoiLz48cGF0aCBmaWxsPSIjNmU4M2FjIiBkPSJNMjA1IDI1NmwxMCAyIDEgNCA0IDItMSAyaC04bC0xLTMtNS0yeiIvPjxwYXRoIGZpbGw9IiMyMzM3ODIiIGQ9Ik02NDYgMTk2aDExdjVoLTd2LTNoLTRsLTEgNWgtOHYtMmgybDEtM3oiLz48cGF0aCBmaWxsPSIjM2Q1M2E3IiBkPSJNMzQ0IDkyaDdsMSAxdjhsLTEgMWgtN2wtMS02eiIvPjxwYXRoIGZpbGw9IiNhMzhjNTMiIGQ9Ik01NjUgN2g4bDEzIDR2OGwtNC0xIDEtMy00LTEtMS00aC04bC0yLTF2NGgtMnoiLz48cGF0aCBmaWxsPSIjNDM0OTg4IiBkPSJNMjAgMzAxaDEydjJoLTJsMiA1SDE4bC0yLTIgNi0xLTItMXoiLz48cGF0aCBmaWxsPSIjNzA3ODllIiBkPSJNMTY0IDI5M2gxNGw1IDIgNiAxLTIgMmgtMTFsLTEyLTJ6Ii8+PHBhdGggZmlsbD0iI2IzYTI1NiIgZD0iTTQ1OCA4Nmg2bC00IDIgMSAxMGg2bDEtMiAyIDEtMSA0aC00di0ybC0xMC0xLTEtNWgydi02eiIvPjxwYXRoIGZpbGw9IiMwZjMyOWQiIGQ9Ik00MTQgMjUzaDM0djJsLTM0IDF6Ii8+PHBhdGggZmlsbD0iIzFhMzRhNCIgZD0iTTQzNCAxNjBsNiAxdjJsLTYgMXYyaC0zbDEgNS02LTEtMi0yIDMtNXoiLz48cGF0aCBmaWxsPSIjMjQzNjhmIiBkPSJNNjI0IDE5M2w4IDEtMiA0di0zbC02IDJ2LTJoLTJ2OGwtNCAyaC01bDEtMiAzIDEtMS0ydi02aDJ2LTJ6Ii8+PHBhdGggZmlsbD0iI2U5YzY0NyIgZD0iTTEwMCAxMzZoOGwxIDQtMiAyLTEgNC01IDEtMS0xeiIvPjxwYXRoIGZpbGw9IiMzOTZlZTIiIGQ9Ik0xOTIgMjYzaDEzbDQgMnYzaC0xNXoiLz48cGF0aCBmaWxsPSIjZjBkYTBhIiBkPSJNNjQyIDE2M2w5IDIgOCA0IDEgNC01LTEtNi0ydi0yaC02eiIvPjxwYXRoIGZpbGw9IiM2YzZlN2IiIGQ9Ik0zMDAgNjRoNmwzIDJ2OWwtMyAzaC04bC0zLTR2LTd6bTAgM2wtNCAxIDEgNyAxIDFoOGwyLTJ2LTVoLTN2LTJ6Ii8+PHBhdGggZmlsbD0iIzUwNmRlNSIgZD0iTTI3MyAyMTVoNWwtMSA0aC00bC0yIDdoLTJsLTEgM2gtMmwxLTEwIDMtM3oiLz48cGF0aCBmaWxsPSIjODY2YWQ3IiBkPSJNMzc5IDMwN2gydjdsLTkgM2gtN2wxLTMgNS0yaDV2LTNoM3oiLz48cGF0aCBmaWxsPSIjMzk0NzhhIiBkPSJNNTA4IDIwMWwxMiAxLTIgNC0zIDJoLTExdi0yaDN6Ii8+PHBhdGggZmlsbD0iIzY5NWU0OSIgZD0iTTY0NSAxNzBsNCAyIDkgMTUgMSA1djhoLTF2LTZoLTVsMS0xMC00LTQtMy02eiIvPjxwYXRoIGZpbGw9IiM2Zjc0ODIiIGQ9Ik0zMDcgODZoNmwzIDJ2OGgtNmwtMi01eiIvPjxwYXRoIGZpbGw9IiMyMjJkN2IiIGQ9Ik02NDUgMjA3aDE1bC0xIDRoLTE5di0yeiIvPjxwYXRoIGZpbGw9IiM3YjgwOWYiIGQ9Ik0yMjYgMjgzaDh2OGw0IDF2MWwtMTEtMSAxLTNoNHYtMmgtOHYtMmgyeiIvPjxwYXRoIGZpbGw9IiNkMWM4NTYiIGQ9Ik02MzEgMTU5bDEwIDEgOCAzIDEzIDUgNiA0LTIgMS0xNS03LTktMi03LTF6Ii8+PHBhdGggZmlsbD0iIzk3N2I4ZCIgZD0iTTM0OCAzMDRoN2wtMSAzaC04bDggNCAzIDUtOC0xLTYtNyAxLTN6Ii8+PHBhdGggZmlsbD0iIzMyMzAyZSIgZD0iTTY0OCAyNjdoMmwtMiA3LTUgMy0zIDYtNCA0LTMtMSAyLTUgNC0xIDEtNC0xLTUgOCAydi01eiIvPjxwYXRoIGZpbGw9IiMzODVkZDIiIGQ9Ik0yNDIgMjYyaDZ2N2wtMTEgMXYtNWw1LTF6Ii8+PHBhdGggZmlsbD0iIzNlNTc5ZCIgZD0iTTI5OCA2NGwyIDEtMiAyaC0zbDIgOSA0IDJ2MmgtM2wtMSAyLTYtMnYtNGgybC0xLTh6Ii8+PHBhdGggZmlsbD0iIzdmODM5MCIgZD0iTTE3NSAyNjRoNWwzIDR2NGgtMTB2LTVoMnoiLz48cGF0aCBmaWxsPSIjMGMxNDdiIiBkPSJNMjI2IDI2Mmg0djExbC0zIDNoLTJsLTEtN3oiLz48cGF0aCBmaWxsPSIjY2NjMjVlIiBkPSJNMTI4IDI1NGwxIDJoMnYybDUgMSAyIDUtNSAxLTEwLTUgMS0yIDQgMXYtMnoiLz48cGF0aCBmaWxsPSIjNTg2NTk5IiBkPSJNMjk4IDk5aDE0bDQgNnY3aC0ybC0yLTktMS0zLTEwIDEtMSAxMWgtMmwtMS0xMnoiLz48cGF0aCBmaWxsPSIjOGU4Yzc2IiBkPSJNMzY4IDc5aDVsMyAydjVsLTkgMi0xLTh6Ii8+PHBhdGggZmlsbD0iIzY3N2ViNyIgZD0iTTMwNCAyNzdoOWwxIDUtNCAyaC04eiIvPjxwYXRoIGZpbGw9IiM1MjVhN2QiIGQ9Ik0zNzIgNzZsNSAydjlsLTIgM2gtOGwtMi00di01bDIgMiAxIDQgOC0xdi01bC02LTIgMi0xeiIvPjxwYXRoIGZpbGw9IiM2YTcwODkiIGQ9Ik0zMzMgNjJsNyAxdjlsLTctMXoiLz48cGF0aCBmaWxsPSIjNGQ3NWQzIiBkPSJNNDI0IDIzN2gzM3YxMWw1LTItMSA1aC01bC0xLTEyLTMxLTF6Ii8+PHBhdGggZmlsbD0iIzFmMTgyMCIgZD0iTTc1IDIyOWg1bDEgNS0xIDJ2OGgtMmwtMS0ydi04aDJ2LTJoLTZsLTEgMS0xIDloLTJ2LThsMS00eiIvPjxwYXRoIGZpbGw9IiMzNzJmMWEiIGQ9Ik0xMDQgMjI4aDJ2MTJsMiA4aDJ2MmgydjJsNCAyIDcgNC0xIDItMTEtNi00LTV2LTJoLTJsLTEtNnoiLz48cGF0aCBmaWxsPSIjYWFhMjY5IiBkPSJNMjEzIDE1Mmw0IDEtMSA0aDJ2NmwtMiA1aC0ybC0yLTh6Ii8+PHBhdGggZmlsbD0iIzIyMmM2OSIgZD0iTTQzIDIwNWgxMGwzIDF2M2wtNCAxSDQyeiIvPjxwYXRoIGZpbGw9IiMyNzIzN2IiIGQ9Ik0zNTYgMzA4aDlsMyAxdjJoNWwtMiAyLTYgMnYtMmwtOS0yeiIvPjxwYXRoIGZpbGw9IiMzZTQyNzEiIGQ9Ik0xNDQgMzAwbDMgMXY0bC0zIDFoLThsLTUtMnYtMmg0djJoM3YtM3oiLz48cGF0aCBmaWxsPSIjNDA0NTgwIiBkPSJNNjcgMzI1bDkgMSAxIDMtMTkgMiAxLTN6Ii8+PHBhdGggZmlsbD0iIzJmMzc2NiIgZD0iTTEyMiAzMTZoOGw2IDF2MmwtOCAyaC0xNnYtMWwxMi0xeiIvPjxwYXRoIGZpbGw9IiMyODIwMTkiIGQ9Ik02NzYgMjY2aDJsLTIgNy0zIDNoLTV2MmwtMyAyLTQtMSAxMy0xMHoiLz48cGF0aCBmaWxsPSIjMzczNjU3IiBkPSJNMTExIDI1M2wxMSA2IDExIDUgNCAyLTktMS03LTQtOS0zeiIvPjxwYXRoIGZpbGw9IiM2NDYyNjEiIGQ9Ik02NDkgMTU4aDN2MmgydjNsNCAzLTYtMS0xMC0zLTEtMnoiLz48cGF0aCBmaWxsPSIjNDM1MTljIiBkPSJNMTY1IDEwNmw5IDEtMSA1aC0xMHYtMmgyeiIvPjxwYXRoIGZpbGw9IiMxYjJiN2MiIGQ9Ik02NTAgMjM0aDd2N2wtMTEtMXYtMmg0eiIvPjxwYXRoIGZpbGw9IiMxNTMyOGUiIGQ9Ik02MjYgMTU4aDJsMSAyIDQgMnYxaC03djJsLTUgMmgtM3YtMmw2LTVoMnoiLz48cGF0aCBmaWxsPSIjNjY2OTdhIiBkPSJNOTYgMTI1aDE3bDIgMi0xMiAydi0zaC0zdjJoLTJ2MmgtM3oiLz48cGF0aCBmaWxsPSIjMDkxNjU5IiBkPSJNMTM3IDM2NWw2IDEgMSA0aC0xNmwyLTJ6Ii8+PHBhdGggZmlsbD0iIzYyNmM3OSIgZD0iTTM3MSAzMmg0bDIgNXY0bC02LTEtMS03eiIvPjxwYXRoIGZpbGw9IiM1OTU0NmYiIGQ9Ik01NDIgNGgzdjRsNS0xLTEgMi02IDFWOGwtMyAxLTEgMi03LTEgNC0zIDUtMnoiLz48cGF0aCBmaWxsPSIjMWQzNzk0IiBkPSJNNTk2IDE4NGg2bC0yIDRoLTN2MmwtNiAxIDEtNXoiLz48cGF0aCBmaWxsPSIjNDc1MmFhIiBkPSJNMjg4IDI2Nmg1bDMgN3YzbDggMXY1aC0ydi00aC02bC00LTgtNC0xeiIvPjxwYXRoIGZpbGw9IiM1ODYyOTYiIGQ9Ik0xMTEgMjE3djNsLTQgNy00LTF2LThsMiA0aDJ2LTN6Ii8+PHBhdGggZmlsbD0iIzdiNmU2MSIgZD0iTTY0NyAzNTFsMiAxLTEgMmgzMHYxaC0zNHYtM3oiLz48cGF0aCBmaWxsPSIjMWIyYTdmIiBkPSJNNjQwIDI0MWgxMHYyaC0ydjNoLTh6Ii8+PHBhdGggZmlsbD0iIzM4NDY5NiIgZD0iTTEyNiAyMTRsMSAyLTEgNyAzIDF2Mmw5IDF2MmgtN2wtMy0xLTEtNGgtNGwyLTl6Ii8+PHBhdGggZmlsbD0iI2UyYjQzOCIgZD0iTTU2MSAzMmgybDEgNGgydjZsLTEgMi00LTF6Ii8+PHBhdGggZmlsbD0iIzRjNGIzYiIgZD0iTTY1OCAxNjZsNSAxIDMgMXYybDUgMiA0IDJ2MmgzbC0xIDMtMTUtMTAtNC0yeiIvPjxwYXRoIGZpbGw9IiM5Yjk1NzMiIGQ9Ik01OTggNjFoNHY1bC02IDMtMSAzLTMtMSAyLTRoMnYtMmwyLTF6Ii8+PHBhdGggZmlsbD0iI2M1YWYyNCIgZD0iTTc0IDIzMmgybDEgMTAtMyAxdi0yaC0ydi03eiIvPjxwYXRoIGZpbGw9IiM0ZDQ1NWIiIGQ9Ik02NDggMjg4bDEgMmg0bDEgMy02IDFoLTEydi0yaDEweiIvPjxwYXRoIGZpbGw9IiMyMzFlNDMiIGQ9Ik01NTMgMGgxMWwtNSA1aC0ydjJoLTNWMnoiLz48cGF0aCBmaWxsPSIjMzExYjMzIiBkPSJNMzQ1IDMwNmg5bDEgNS02LTF6Ii8+PHBhdGggZmlsbD0iIzM0MzU5OCIgZD0iTTI4NiAyNjhsMiAxLTEgMXY4bDIgMiAzIDgtNC0ydi00aC0ybC0xLTJ2LTExeiIvPjxwYXRoIGZpbGw9IiM1ZTcwYWMiIGQ9Ik02MDcgNzFoM3Y3aC02bDEtNHoiLz48cGF0aCBmaWxsPSIjNzE5MzllIiBkPSJNNDU2IDIzN2gxdjExbDUtMi0xIDVoLTV6Ii8+PHBhdGggZmlsbD0iIzdlN2I2NyIgZD0iTTMzNCA2M2w1IDF2NmwtNC0xLTEtMXoiLz48cGF0aCBmaWxsPSIjNDg0OTdkIiBkPSJNMTI0IDIwNGwyMCAxdjFoLTE5bC0xIDMtMS00eiIvPjxwYXRoIGZpbGw9IiMxZjFlNGQiIGQ9Ik0zNCAyOTBoNWwxIDUtNy0xLTEtMmgyeiIvPjxwYXRoIGZpbGw9IiNiZGFmMmQiIGQ9Ik00NTggMjM2bDMgMXY5aC0zeiIvPjxwYXRoIGZpbGw9IiM3YjY5NTgiIGQ9Ik0xMjEgMTQ0bDEgMmgzbC0xIDItMy0xLTEgNWgtNGwxLTRoMnoiLz48cGF0aCBmaWxsPSIjNWE2YThmIiBkPSJNMTQxIDIwOGgydjJsLTEwIDItMiAyLTQtMSAzLTN6Ii8+PHBhdGggZmlsbD0iI2IwYTU3NCIgZD0iTTEyNSAyMDZoMTl2MmwtNiAxdi0xaC0xM3oiLz48cGF0aCBmaWxsPSIjNTA1YzczIiBkPSJNNjMzIDE1NWg0djRsMyAxLTktMXoiLz48cGF0aCBmaWxsPSIjMTkyYzk1IiBkPSJNMjAzIDkybDcgMS0xIDNoLTd6Ii8+PHBhdGggZmlsbD0iIzI4MWI3ZCIgZD0iTTI3MSAyMDVsMSA0LTEgNWgtMmwtMiAzdi03aDJ6Ii8+PHBhdGggZmlsbD0iIzdjNzI1NiIgZD0iTTQ1MyA5NmwxMiAzdjJsMiAxLTMgMS0xLTNoLTl6Ii8+PHBhdGggZmlsbD0iIzBmMjk3NSIgZD0iTTE4NyAyMjBsNCAyIDEgNGgtMnYyaC0yeiIvPjxwYXRoIGZpbGw9IiMyNzNjYTAiIGQ9Ik0yMjQgMjczbDEgMyAyIDFoLTNsLTEgNC0zLTEgMi02eiIvPjxwYXRoIGZpbGw9IiMyNjI4M2IiIGQ9Ik02NTIgMjAyaDdsMiAyLTEgNC0yLTRoLTZ6Ii8+PHBhdGggZmlsbD0iI2VmZDIxYSIgZD0iTTEyNCAyMTBoM3YzaC0zdjJoLTZ2LTJsNi0xeiIvPjxwYXRoIGZpbGw9IiMyNDMwNjgiIGQ9Ik0xODggMzYyaDR2MmwtOCA0IDEtNHoiLz48cGF0aCBmaWxsPSIjMmEyOTMwIiBkPSJNMTI3IDI0OGw0IDUgMSA0aDNsLTEgMi0zLTF2LTJoLTJsLTItNHoiLz48cGF0aCBmaWxsPSIjNzk4MDhhIiBkPSJNNTIyIDIwMmg2djNsLTYgMXoiLz48cGF0aCBmaWxsPSIjMjEyZTY4IiBkPSJNMzYgMTgzbDMgMXYxMWgtMWwtMi03eiIvPjxwYXRoIGZpbGw9IiNiN2E3NDEiIGQ9Ik0yMTYgMTU3aDJ2NmwtMiA1aC0xdi04eiIvPjxwYXRoIGZpbGw9IiM5YTkwNjUiIGQ9Ik05NiAxNDloMnYzbDMgMSAxIDUtNi01eiIvPjxwYXRoIGZpbGw9IiMyNzFhMGEiIGQ9Ik02NTkgMjgwaDJsLTEgMy04IDQtMi0xeiIvPjxwYXRoIGZpbGw9IiNkYWNmNGMiIGQ9Ik02NTQgMjgxbDQgMS04IDUtMy0xeiIvPjxwYXRoIGZpbGw9IiNjZGMxMzkiIGQ9Ik0xMjggMjU0bDEgMmgybDMgN2gtMnYtMmgtNHYtNHoiLz48cGF0aCBmaWxsPSIjMTcyNTkyIiBkPSJNMzg0IDIwN2gzdjNsLTYgMS0zLTJ6Ii8+PHBhdGggZmlsbD0iI2RkZDIyYSIgZD0iTTY0MiAxNjNsNiAxLTEgMmgtMnYybC0zLTF6Ii8+PHBhdGggZmlsbD0iIzE3M2U5MiIgZD0iTTM1NiAyNTJoNnYzaC01eiIvPjxwYXRoIGZpbGw9IiMyNDFjMzQiIGQ9Ik00NTggMjMyaDVsMSA1LTYtNHoiLz48cGF0aCBmaWxsPSIjNGY0MzFlIiBkPSJNNjQ4IDI2N2gybC0yIDctMi0xeiIvPjxwYXRoIGZpbGw9IiNlNWQ0MzgiIGQ9Ik02NzYgMjY0aDJ2MmgtMmwtMiA0LTEtM3oiLz48cGF0aCBmaWxsPSIjYWRhYjc2IiBkPSJNMTM0IDI1OWgybDIgNS01IDEgMi0xeiIvPjxwYXRoIGZpbGw9IiNkZGQwNGEiIGQ9Ik02NjggMTczbDUgMiAxIDItNS0xeiIvPjxwYXRoIGZpbGw9IiMxMjA2MzgiIGQ9Ik0zNTEgMzA3aDNsMSA0aC0zeiIvPjxwYXRoIGZpbGw9IiM0MTM0MTUiIGQ9Ik02MzUgMjgzbDMgMS0yIDMtMy0xeiIvPjxwYXRoIGZpbGw9IiM0ODU4YjgiIGQ9Ik0zNTUgMjE3bDEgMy0yIDMtMi0xeiIvPjxwYXRoIGZpbGw9IiM2ZjczOTkiIGQ9Ik04MSAzMzBoM3YzbC00LTF6Ii8+PHBhdGggZmlsbD0iIzZiNWMxZCIgZD0iTTYzNSAyODlsNCAxLTUgMi0xLTJ6Ii8+PHBhdGggZmlsbD0iIzU1NzhlNiIgZD0iTTI1IDE2MmgzbC0xIDNoLTJ6Ii8+PC9zdmc+`;
            // 屏蔽头像位置图标
            let blockAvatar = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRpc3BsYXk9ImJsb2NrIiB2aWV3Qm94PSIwIDAgMjI1IDIyNSI+PHBhdGggZmlsbD0iI2I3OGI1YiIgZD0iTTAgMGgyMjV2MjI1SDBWMHoiLz48cGF0aCBmaWxsPSIjYzU5YTYxIiBkPSJNMCAwaDE2M3YzaC0zdjNoLTR2MTNoM3YzaC02djNoLTZ2M2gtMTB2M2gtNnYzaC0zdjNoLTZ2NGgtOXYzaC0xM3YzSDY5djNoLTl2MThoNnY0aDN2OWgzdjE2aDl2Nmg3di0zaDN2MTJoM3YxM2gtM3YyNWg2di0zaDN2LTNoM3YzaDN2M2g0djNoNnYtM2g2djEyaDN2MTNoLTZ2LTNoLTEzdjZoM3Y3aDN2M2g0djZoM3YzaDN2NmgzdjNoM3Y3aDN2NmgtM3YtNGgtM3YtM2gtM3YtM2gtM3YtM2gtM3YtM2gtN3YxMmgtMmwtMS0yLTMtMXYtNmgtM3YtM2gtM3YtM2gtM3YtM2gtM3YtN2gtM2MtMS42ODgtMS4zMTMtMS42ODgtMS4zMTMtMy0zdi0zaC00djdoM3Y5aDN2M2g0djZoM3YxNkgwVjB6Ii8+PHBhdGggZmlsbD0iI2I3YzdjYiIgZD0iTTE2MyAwaDZ2M2gzdjNoLTN2NmgzdjEwaC0zdjNoLTNWMTJsLTMgMS0xIDloLTJ2M2gydjNoN3Y2aDN2M2gzdjZoM3Y3aDN2NTNoLTN2MTBoLTNWOTNoLTN2N2gtM3YxMmgtNnYtM2gtM3YtOWgtM3YtM2gtMTB2MTJoLTN2N2gtOXYzaC00djNoLTl2LTNoLTEzdi03aC0zdi0zaDZ2LTNoMTlWOTRoLTE2di0zaC05djloLTZ2MTJoM3Y3aDN2M2gxMHYzaDE4di0zaDEwdjloLTR2OWgtNmwxIDdoLTEwdjNoLTl2M2gtNnYtM2gtNHYtM2gtM3YtM2gtM3YzaC0zdjNoLTZ2LTI1aDN2LTEzaC0zdi0xMmgtM3YzaC03di02aC05VjgxaC0zdi05aC0zdi00aC02VjUwaDl2LTNoMzF2LTNoMTN2LTNoOXYtNGg2di0zaDN2LTNoNnYtM2gxMHYtM2g2di0zaDZ2LTNoLTNWNmg0VjNoM1YweiIvPjxwYXRoIGZpbGw9IiNiODgwNDEiIGQ9Ik0yMTkgOTBoM3Y0NGgzdjkxaC05MXYtNmgxM3YzaDl2LTNoM3YtM2gtOXYtN2gtM3YtM2gtM3YtNmgtNHYtNmgtOXY2aC0zdi05aDN2LTdoLTN2LTZoNnYtMTBoNGwtLjA3LTEuODYzLS4wNTUtMi40NS0uMDctMi40MjVDMTM4IDE1OSAxMzggMTU5IDE0MCAxNTZoNGwuNDM4LTEuODc1QzE0NSAxNTIgMTQ1IDE1MiAxNDYgMTUwaDd2M2gzdjZoNnYtOWgxMHYtNmgzdi02aDN2LTRoM2wxLTNoMnYxNmgzdjNoNHYtOWgzdi0xM2g5djNsMTIgMXYyNGg0VjkweiIvPjxwYXRoIGZpbGw9IiM1ODUxNDYiIGQ9Ik00NyAxMzFoM3YzaDN2LTNoM3Y2aC0zdjdoM3YtM2gzdjloM3YzaDR2LTE1aDN2M2gzdjNoM3YzaDZ2M2gzdjNoM3YzaDR2M2gydi05aDR2LTNoM3YtM2gzdjNoM3YzaDR2M2g2di0zaDZ2MTJoM3YxM2gtNnYtM2gtMTN2NmgzdjdoM3YzaDR2NmgzdjNoM3Y2aDN2M2gzdjdoM3Y2aC0zdi00aC0zdi0zaC0zdi0zaC0zdi0zaC0zdi0zaC03djEyaC0ybC0xLTItMy0xdi02aC0zdi0zaC0zdi0zaC0zdi0zaC0zdi03aC0zYy0xLjY4OC0xLjMxMy0xLjY4OC0xLjMxMy0zLTN2LTNoLTR2N2gzdjloM3YzaDR2NmgzdjE2SDI1di0zaDN2LTMxaC0zdi0xM2gtM3YtMTVoM3YtNGgzdi0yaDE1djNoM3YzaDR2M2gzdjNoM3Y2aDN2M2gzdi02aC0zdi0xNmgtM3YtOWgtM3YzSDM0di0zaDE2di02aC0zdi0xMHoiLz48cGF0aCBmaWxsPSIjOTM4MzZjIiBkPSJNNTAgMGgxMTN2M2gtM3YzaC00djEzaDN2M2gtNnYzaC02djNoLTEwdjNoLTZ2M2MtMy42MTkgMS4yMDYtNi45MjUgMS4xMDgtMTAuNjg4IDEuMDYzbC0yLjEyNi0uMDE0Yy0xLjcyOS0uMDEyLTMuNDU4LS4wMy01LjE4Ni0uMDQ5bC0xIDNINjB2NmgtNHY2aC0zdjNoLTN2N2gtM3YzaC0zdjZoLTZ2MjFoM3YzNWg2Yy4wNDMgMS42NjYuMDQgMy4zMzQgMCA1LTEgMS0xIDEtMy41NjMgMS4wNjNMNDEgMTMxdjNoLTZ2LTloMlY5MWgtM1Y3NWgtM3YtNmgzVjU2SDIydi02aDN2LTZoNnYtNGgzdi0zaDZ2LTVoLTN2LTRoLTNWMTJoM1Y5aDNWNmg0VjNoNlYweiIvPjxwYXRoIGZpbGw9IiM3Yzg0OGIiIGQ9Ik0xMDYgOTFoOXYzaDE2djEyaC0xOXYzaC02djNoM3Y3aDEzdjNoOXYtM2g0di0zaDl2LTdoM1Y5N2gxMHYzaDN2OWgzdjNoNnYtMTJoM3YtN2gzdjI5aC0zdjloLTN2N2gtM3YxMmgtNHY5aC02di02aC0zdi0zaC03bC0yIDZoLTRsLTIgMTJoLTR2MTBoLTZ2NmgzdjdoLTN2OWgzdi02aDl2Nmg0djZoM3YzaDN2N2g5djNoLTN2M2gtOXYtM2gtMTN2Nkg5NHYtMTZoLTN2LTZoLTR2LTNoLTN2LTloLTN2LTdoNHYzbDMgMXYyaDN2N2gzdjNoM3YzaDN2M2gzdjZsNCAxdjJoMnYtMTJoN3YzaDN2M2gzdjNoM3YzaDN2NGgzdi02aC0zdi03aC0zdi0zaC0zdi02aC0zdi0zaC0zdi02aC00di0zaC0zdi03aC0zdi02aDEzdjNoNnYtMTNoLTN2LTEyaDN2LTNoMTBsLTEtN2g2di05aDR2LTloLTEwdjNoLTE4di0zaC0xMHYtM2gtM3YtN2gtM3YtMTJoNnYtOXoiLz48cGF0aCBmaWxsPSIjODhiNGJhIiBkPSJNMTEzIDM1aDE1djJoLTZ2NGgtOXYzaC0xM3YzSDY5djNoLTl2MThoNnY0aDN2OWgzdjE2aDl2Nmg3di0zaDN2MTJoM3YxM2gtM3YyNWgydjloLTJ2LTNoLTR2LTNoLTN2LTNoLTN2LTNoLTZ2LTNoLTN2LTNoLTN2LTNoLTN2MTVoLTR2LTNoLTN2LTloLTN2M2gtM3YtN2gzdi02aC0zdjNoLTN2LTNoLTN2LTZoLTZWOTBoLTNWNjloNnYtNmgzdi0zaDN2LTdoM3YtM2gzdi02aDR2LTZsNTItMSAxLTJ6Ii8+PHBhdGggZmlsbD0iI2YyZjRmMyIgZD0iTTE2MyAwaDZ2M2gzdjNoLTN2NmgzdjEwaC0zdjNoLTNWMTJsLTMgMS0xIDloLTJ2M2gybC4zNzUgMi45MzhMMTYzIDMxbDIgMXY5aDN2Nmg0djI4aC0zdjZoLTR2NmgtMlY3MmgtM1Y2MmgtN3YxM2gtM3YzaC0zdi0zaC00djloLTJ2LTNoLTN2LTZoLTR2LTZoLTNWNTloLTZ2NmgtM3YtM2gtM3YtNmgtM3YtNmgtNHYzaC0zdjNoLTN2NmgtM3YxNmgtM3YzaC02di02aC00djNoLTJ2LTloLTR2NmgtM3YxM2gtM3Y2aC02VjgxaC0zdi05aC0zdi00aC02VjUwaDl2LTNoMzF2LTNoMTN2LTNoOXYtNGg2di0zaDN2LTNoNnYtM2gxMHYtM2g2di0zaDZ2LTNoLTNWNmg0VjNoM1YweiIvPjxwYXRoIGZpbGw9IiNkZGNlYjciIGQ9Ik0xOTAgMGgyM3YyNWgydjUwaDN2MzRoLTJ2LTNoLTN2LTNoLTEwdi0zaC05Vjg4aC0zVjIyaDl2LTZoM1Y3aC02djNoLTdWMHoiLz48cGF0aCBmaWxsPSIjZTc2NTQ2IiBkPSJNNzIgMGg5MXYzaC0zdjNoLTRWM2gtM3Y2aC0zdjRoLTZ2M2gtM3YzaC03djNoLTI1djNIODh2LTNINjZ2LTRoLTl2LTVoM3YtM2wyLTEgMS0zaDNWM2g2VjB6Ii8+PHBhdGggZmlsbD0iI2EwN2Q1ZiIgZD0iTTE2OSAwaDIxdjEwaDdWN2g2djloLTN2NmgtMTB2NjZoLTJ2NmgtM3YzNGgtN3YtM2gtM3Y2aC0zdi05aDN2LTloM3YtMTBoM1Y1MGgtM3YtN2gtM3YtNmgtM3YtM2gtM3YtNmgtN3YtM2gtMnYtM2gydi05bDQtMXYxM2gzdi0zaDNWMTJoLTNWNmgzVjNoLTNWMHoiLz48cGF0aCBmaWxsPSIjYjAzODJmIiBkPSJNMjggMTU3aDE1djNoM3YzaDR2M2gzdjNoM3Y2aDN2M2g2djloLTN2N2gtM3Y2aDN2OUgzN3YzaC05di0yMWgtM3YtMTNoLTN2LTE1aDN2LTRoM3YtMnoiLz48cGF0aCBmaWxsPSIjYTMyOTIyIiBkPSJNNTAgMGgyMnYzaC02djNoLTNsLTEgNGgtMnYzaC0zdjVoOXY0aDIydjNoMjF2LTNoMjV2LTNoN3YtM2gzdi0zaDZWOWgzVjNoM3YxNmgzdjNoLTZ2M2gtNnYtM2gtOXYzaC03djNoLTN2M0g0NHYtM2gtM3YtM2gtNFY5aDNWNmg0VjNoNlYweiIvPjxwYXRoIGZpbGw9IiNjYTk3NTkiIGQ9Ik0xOTQgMTI4aDl2M2wxMiAxdjI3aC0zdjNoLTEydi0zaC0zdjEwaC0xM3YzaC0xNXYtN2gtM3YtMTVoNnYtNmgzdi02aDN2LTRoM2wxLTNoMnYxNmgzdjNoNHYtOWgzdi0xM3oiLz48cGF0aCBmaWxsPSIjZjJmNGY0IiBkPSJNNjkgNDdoMzdsMSA1IDMgMS0xIDNoLTN2NmgtM3YxNmgtM3YzaC02di02aC00djNoLTJ2LTloLTR2NmgtM3YxM2gtM3Y2aC02VjgxaC0zdi05aC0zdi00aC02VjUwaDl2LTN6Ii8+PHBhdGggZmlsbD0iI2JlNzk0NSIgZD0iTTE5IDE2M2gzdjE1aDN2MTNoM3YzMWgtM3YzSDB2LTQ3aDE5di0xNXoiLz48cGF0aCBmaWxsPSIjYmM4OTUzIiBkPSJNODEgMTg0aDR2M2wzIDF2MmgzdjdoM3YzaDN2M2gzdjNoM3Y2bDQgMXYyaDJ2LTEyaDd2M2gzdjNoM3YzaDN2M2gzdjRoM3YtNmgtM3YtN2gtM3YtM2gtM3YtM2gzdi0zaDN2M2gzdi02aDl2Nmg0djZoM3YzaDN2N2g5djNoLTN2M2gtOXYtM2gtMTN2Nkg5NHYtMTZoLTN2LTZoLTR2LTNoLTN2LTloLTN2LTd6Ii8+PHBhdGggZmlsbD0iIzhjM2EzNCIgZD0iTTY1IDE4MmgzYzEuNDc4IDIuOTU3IDEuMDYgNS43NDIgMSA5aDN2NmgzdjNoM3Y3aDN2MTJoMTB2LTZoMnYxMkgyNXYtM2gzdi0xMGg5di0zaDI1di05aC0zdi02aDN2LTdoM3YtNXoiLz48cGF0aCBmaWxsPSIjY2M4OTdjIiBkPSJNMTA2IDkxaDl2M2gxNnYxMmgtMTl2M2gtNnYzaDN2N2gxM3YzaDl2LTNoNHYtM2g5di03aDNWOTdoMTB2M2gzdjloM3YyM2gtNmwtMSAzaC05bC0uNTg2LTYuOTM0TDE0NiAxMjZsLTItMXYtM2gtMTB2M2gtMTh2LTNoLTEwdi0zaC0zdi03aC0zdi0xMmg2di05eiIvPjxwYXRoIGZpbGw9IiNiMzZlMzEiIGQ9Ik0xNDEgMTYzaDZ2OWgxMHYzaDJ2LTZoNHY2aDIxdjZoLTN2M2gtM3YzaC0zdi0zaC02bC0xIDRoLTV2LTRoLTdsLTEgNC01LTF2MTNoM3Y5aDN2M2g3djNoM3YzaDZ2NGgzdjNoLTQxdi02aDEzdjNoOXYtM2gzdi0zaC05di03aC0zdi0zaC0zdi02aC00di02aC05djZoLTN2LTloNHYtM2g2di05aDN2LTE2eiIvPjxwYXRoIGZpbGw9IiNmNWU5ZDQiIGQ9Ik0xMDAgMTEzaDN2NmgzdjNoMTB2M2gxOHYtM2gxMHY5aC00djloLTZsMSA3aC0xMHYzaC05djNoLTZ2LTNoLTR2LTNoLTN2LTNoLTN2LTZoLTN2LTIyaDN2LTN6Ii8+PHBhdGggZmlsbD0iI2Y2ZTJkMCIgZD0iTTEyNSA2OWgzdjZoM3YzaDN2M2gtOXYzaDZ2NGg5djNoNHY2aDN2MTJoLTN2N2gtOXYzaC00djNoLTl2LTNoLTEzdi03aC0zdi0zaDZ2LTNoMTlWOTNoLTE1di0zaC0xMHYtM2gzdi0zaDN2LTZoNHYtM2gzdi0zaDZ2LTN6Ii8+PHBhdGggZmlsbD0iIzk5YmVjNiIgZD0iTTExMyAzNWgxNXYyaC02djRoLTl2M2gtMTN2M0g2OXYzaC05djE4aDZ2NGgzdjloM3YxM2gtM1Y4NGgtNmMtMS4yNjItMi41MjUtMS4wOTktNC4zMTItMS4wNjMtNy4xMjVsLjAyOC0yLjc1OEw2MiA3MmgtMnYzaC00djE4bDQgMXYxNWgyYzEuNDkxIDIuOTgyIDEuMTIgNS43MTYgMSA5LTEgMS0xIDEtNC4wNjMgMS4wNjNMNTYgMTE5di02bC0zLTFWNjJoM1Y0NGg0di02bDUyLTEgMS0yeiIvPjxwYXRoIGZpbGw9IiNjY2FlODciIGQ9Ik05IDI1aDEzdjM1aDN2MzRoLTN2NkgxMlY4OEg5VjI1eiIvPjxwYXRoIGZpbGw9IiM4YjYwNDAiIGQ9Ik0yMDkgMTgxaDE2djQxaC0xOXYtM2g0di0zaDN2LTdoLTd2LTZoLTl2M2gtM3Y0aC03di03aDN2LTNoN3YtM2gtM3YtNGgtN3YtNmg3di0zaDE1di0zeiIvPjxwYXRoIGZpbGw9IiM3ODRiMzQiIGQ9Ik0yMTMgMGgxMnYxMzRoLTNWOTBoLTNWNzVoLTRWMjVoLTJWMHoiLz48cGF0aCBmaWxsPSIjYzJhNDg3IiBkPSJNNiAwaDQ0djNoLTZ2M2gtNHYzaC0zdjNoLTN2MTZoM3Y0aDN2NWgtNnYzaC0zdjRoLTZ2NmgtM1YyNUgxMlYxM0g2VjB6Ii8+PHBhdGggZmlsbD0iIzhhYTVhYyIgZD0iTTM4IDY5aDZ2M2gzdjNoLTN2MTloMmMxLjE3NSAyLjM1IDEuMiAzLjk1IDEuMzE2IDYuNTdsLjEyNyAyLjcxNS4xMiAyLjg0LjEzIDIuODYzYy4xMDcgMi4zMzcuMjA5IDQuNjc1LjMwNyA3LjAxMmgydjZsNCAxLTEgMmgzbDEgOWg5di02aDN2LTNjMS44MTItLjAyNyAzLjYyNS0uMDQ2IDUuNDM4LS4wNjNsMy4wNTgtLjAzNUM4MCAxMjUgODAgMTI1IDgxIDEyNmMuMDg3IDEuNTYyLjEwNyAzLjEyNy4wOTggNC42OTFsLS4wMSAyLjg2Mi0uMDI2IDMuMDEtLjAxMyAzLjAyMWMtLjAxMiAyLjQ3Mi0uMDI4IDQuOTQ0LS4wNDkgNy40MTZoLTZ2LTNoLTN2LTNoLTN2LTNoLTN2MTVoLTR2LTNoLTN2LTloLTN2M2gtM3YtN2gzdi02aC0zdjNoLTN2LTNoLTN2LTZoLTZWOTBoLTNWNjl6Ii8+PHBhdGggZmlsbD0iIzhiYTVhOSIgZD0iTTE3MiA5M2gzdjI5aC0zdjloLTN2N2gtM3YxMmgtNHY5aC02di02aC0zdi0zaC0zdi0zaC0zdi02aC0zbC0xIDVoLTJ2LTNsLTcgMXYtNGg2di05aDR2LTZsMyAxdjlsNC40MzgtLjM3NSAyLjQ5Ni0uMjFMMTU2IDEzNGwxLTJoNnYtMjBoNnYtMTJoM3YtN3oiLz48cGF0aCBmaWxsPSIjZTZkY2NkIiBkPSJNMjA2IDIybDQgMS0xIDI3aC0zdjEyaC0zdjE5aC0zdjEzaC02VjI4aDZ2LTNoNnYtM3oiLz48cGF0aCBmaWxsPSIjZjZkZGMzIiBkPSJNMTg4IDE5NGg2djNoM3YzaC03djNoLTN2N2g3di00aDN2LTNoOXY2aDd2N2gtM3YzaC00djNoMTl2M2gtNTB2LTZoM3YtMTNoM3YtM2gzdi02aDR2LTN6Ii8+PHBhdGggZmlsbD0iIzhjYmNjNyIgZD0iTTcyIDk3aDl2Nmg3di0zaDN2MTJoM3YxM2gtM3YyNWgydjloLTJ2LTNoLTR2LTNoLTN2LTNoLTNsLTEtMjQtMi0xdi0xMmgtM3YtMTNoLTN2LTN6Ii8+PHBhdGggZmlsbD0iIzViNTM0ZCIgZD0iTTEzOCAyMmg5djZoLTEwdjNoLTZ2M2MtMy42MTkgMS4yMDYtNi45MjUgMS4xMDgtMTAuNjg4IDEuMDYzbC0yLjEyNi0uMDE0Yy0xLjcyOS0uMDEyLTMuNDU4LS4wMy01LjE4Ni0uMDQ5bC0xIDNINTl2NWgtOXYtM2gtNnYtNWg2di00aDc4di0zaDN2LTNoN3YtM3oiLz48cGF0aCBmaWxsPSIjNTg1MDQ1IiBkPSJNOTcgMTUzaDN2NmgzdjEwaDN2OWgzdjdoM3YzaDR2NmgzdjNoM3Y2aDN2M2gzdjdoM3Y2aC0zdi00aC0zdi0zaC0zdi0zaC0zdi0zaC0zdi0zaC03djEyaC0yYy0xLjU5NC0zLjE4OC0xLjEwMi02LjYyOS0xLjA2My0xMC4xMjVsLjAxNC0yLjI4NWMuMDEyLTEuODYzLjAzLTMuNzI3LjA0OS01LjU5aC0zdi02aC0zdi00aC0zbC0uMTg0LTIuMDEyQzk2LjI5NCAxNzkuNDg3IDk1Ljc1NCAxNzQuMjYzIDk0IDE2OWgzdi0xNnoiLz48cGF0aCBmaWxsPSIjOTI2MDNjIiBkPSJNMTAwIDE0NGgzdjNoM3YzaDR2M2g2di0zaDZ2MTJoM3YxM2gtNnYtM2gtMTN2LTNoLTN2LTEwaC0zdi02aC0zdjE2aC0zdi02aC00di02bC0zLTFoNHYzaDJ2LTloNHYtM2gzdi0zeiIvPjxwYXRoIGZpbGw9IiNjMzgwMmYiIGQ9Ik0xNTYgMTg0aDd2NGw1LTEgMS0zaDZ2MjNsLTMtMSAuMDYzIDIuNDM4QzE3MiAyMTEgMTcyIDIxMSAxNzEgMjEyYy0yLjUzLjA3My01LjAzMy4wOTItNy41NjMuMDYzbC0yLjE1NC0uMDE0Yy0xLjc2LS4wMTItMy41MjItLjAzLTUuMjgzLS4wNDl2LTNoLTN2LTloLTN2LTEzaDVsMS0zeiIvPjxwYXRoIGZpbGw9IiNiOTg3MzciIGQ9Ik0xNiAxODdsMyAxdjIyaC0zdjE1SDB2LTMxaDd2LTNoOXYtNHoiLz48cGF0aCBmaWxsPSIjYjhjM2M1IiBkPSJNMTEyIDUwaDR2NmgzdjdoMnYzaDR2NmgtNnYzaC0zdjNoLTR2NmgtM3YzaC0zdjNoMTB2M2gxNXYxaC0xNnYtM2gtOXY5aC02Vjg1aDJsMS0yM2gzdi02aDN2LTNoM3YtM3oiLz48cGF0aCBmaWxsPSIjZDJiZmE2IiBkPSJNMTkwIDBoMjN2MjVoLTFsLTEtNmgtOHY2aC0zdjNoLTZ2NjBoLTNWMjJoOXYtNmgzVjdoLTZ2M2gtN1YweiIvPjxwYXRoIGZpbGw9IiNkMWE1NmYiIGQ9Ik04MSAxODRoNHYzbDMgMXYyaDN2N2gzdjNoM3YzaDN2M2gzdjZsNCAxdjJoMnYtMTJoNnYxMmwtMiAxLTEgM2gzdjNoM3YzSDk0di0xNmgtM3YtNmgtNHYtM2gtM3YtOWgtM3YtN3oiLz48cGF0aCBmaWxsPSIjODliNGJiIiBkPSJNMTEzIDM1aDE1djJoLTZ2NGgtOXYzaC0xM3YzSDU3bC0xIDN2LTZoNHYtNmw1Mi0xIDEtMnoiLz48cGF0aCBmaWxsPSIjZDZkN2QzIiBkPSJNMTYyIDI4aDd2NmgzdjNoM3Y2aDN2N2gzdjUwaC0zVjg0aC0zdi02aC0zVjQ3aC00di02aC0zdi05bC0zLTF2LTN6Ii8+PHBhdGggZmlsbD0iIzdiNjk1YyIgZD0iTTc1IDE3MmgzdjNoM3Y2aDN2M2gtM3Y3aDN2OWgzdjNoNHY2aDN2MTZoLTF2LTEyaC0ydjZIODF2LTEyaC0zdi03aC0zdi0zaC0zdi02aC0zdi02aDN2LTRoM3Y0aDN2LTdoLTN2LTZ6Ii8+PHBhdGggZmlsbD0iIzhmODM3NSIgZD0iTTE0NiAxNTBoN3YzaDN2Nmg2di05aDF2MTZoLTR2LTNoLTZ2OWgtNnYtOWgtNnYxNmgtM3Y5aC02bC0xIDN2LTdoLTN2LTZoNnYtMTBoNGwtLjA3LTEuODYzLS4wNTUtMi40NS0uMDctMi40MjVDMTM4IDE1OSAxMzggMTU5IDE0MCAxNTZoNGwuNDM4LTEuODc1QzE0NSAxNTIgMTQ1IDE1MiAxNDYgMTUweiIvPjxwYXRoIGZpbGw9IiNjN2E1ODIiIGQ9Ik0yMiA1NmgxMnYxM2gtM3Y2aDN2MTZoM3YxNWgtNlY5NGgtM3YzaC02di0zaDNWNjBoLTN2LTR6Ii8+PHBhdGggZmlsbD0iIzZlNjM1NSIgZD0iTTQ3IDEzMWgzdjNoM3YtM2gzdjZoLTN2N2gzdi0zaDN2OWgzdjNoNHYtMTVoM3YzaDN2M2gtM3Y2aDZ2M2gtM3YzaC0zdjdoLTZ2MTVoLTF2LTZoLTN2LTE2aC0zdi05aC0zdjNIMzR2LTNoMTZ2LTZoLTN2LTEweiIvPjxwYXRoIGZpbGw9IiNkOGM2YTIiIGQ9Ik0xOSA1NmgzdjRoM3YzNGgtM3Y2aC05VjY5aDN2LTNoM1Y1NnoiLz48cGF0aCBmaWxsPSIjOTZhMWE1IiBkPSJNNjkgMTI1YzEuODEyLS4wMjcgMy42MjUtLjA0NiA1LjQzOC0uMDYzbDMuMDU4LS4wMzVDODAgMTI1IDgwIDEyNSA4MSAxMjZjLjA4NyAxLjU2Mi4xMDcgMy4xMjcuMDk4IDQuNjkxbC0uMDEgMi44NjItLjAyNSAzLjAxLS4wMTQgMy4wMjFjLS4wMTIgMi40NzItLjAyOCA0Ljk0NC0uMDQ5IDcuNDE2aC02di0zaC0zdi0zaC0zdi0zaC0zdjE1aC00di0zaC0zdi05aC0zdjNoLTN2LTdjMy44MjUtMi4zOSA3LjU5Ny0yLjU2IDEyLTNsMS02aDN2LTN6Ii8+PHBhdGggZmlsbD0iI2VkZGRjZSIgZD0iTTEwNiAxNzJoMTN2M2g2djNoM3Y2aDN2N2gtM3Y2aC0zdjNoLTN2LTNoLTN2LTNoLTN2LTZoLTR2LTNoLTN2LTdoLTN2LTZ6Ii8+PHBhdGggZmlsbD0iI2I3OTU5NCIgZD0iTTE0NyA5N2gxMHYzaDN2OWgzdjIzaC02bC0xIDNoLTlhNTQ5LjkxOCA1NDkuOTE4IDAgMCAxLS41NjMtNC44MTNsLS4zMTYtMi43MDdDMTQ2IDEyNSAxNDYgMTI1IDE0NyAxMjJoM3YzaDN2M2gzdi0zaDN2LTZoLTZ2LTdoM3YtM2gtOVY5N3oiLz48cGF0aCBmaWxsPSIjYTZjNWQzIiBkPSJNMTY5IDc1aDN2M2gzdjZoM3YxNmgzdjNoLTN2MTBoLTNWOTNoLTN2N2gtM3YxMmgtNmMtMS4yNS03LjY1LTEuMDktMTUuMjc0LTEtMjNsMy0xdi03aDR2LTZ6Ii8+PHBhdGggZmlsbD0iI2NiOGI3ZiIgZD0iTTEwNSAxMDlsMSAzaDN2N2gxM3YzaDl2LTNoNHYtM2g5di03aDEydjNoLTN2N2g2djZoLTN2M2gtM3YtM2gtM3YtM2gtM3YzaC0zdi0zaC0xMHYzaC0xOHYtM2gtMTB2LTNoLTN2LTZoMnYtNHoiLz48cGF0aCBmaWxsPSIjZDVhNjU1IiBkPSJNMyAxNTZoNWwyIDRoMmwxLTRoOWwtMSA2aC0ydjE2SDB2LTE1bDItMWMuNjU4LTMuMDMuNjU4LTMuMDMgMS02eiIvPjxwYXRoIGZpbGw9IiM2MDRlNDMiIGQ9Ik0yMTAgMTk3aDE1djI1aC0xOXYtM2g0di0zaDN2LTdoLTN2LTEyeiIvPjxwYXRoIGZpbGw9IiM4MzY2NTYiIGQ9Ik0zNCAxMmgzdjEzaDR2M2gzdjNoNnY0aC02djVoM3Y0aC0zdjloLTNWNDNoLTR2N2gtM3YzSDIydi0zaDN2LTZoNnYtNGgzdi0zaDZ2LTVoLTN2LTRoLTNWMTJ6Ii8+PHBhdGggZmlsbD0iI2Q2NzY1MiIgZD0iTTEzMSAxOTRoOXY2aDR2NmgzdjNoM3Y3aC0xNnYtN2gtNnYtM2gtM3YtM2gtM3YtM2gzdi0zaDN2M2gzdi02eiIvPjxwYXRoIGZpbGw9IiM5ZjY1MzQiIGQ9Ik0yMTkgOTBoM3Y0NGgzdjMxaC05di05aDNWOTB6Ii8+PHBhdGggZmlsbD0iI2I4OTc3NCIgZD0iTTE2IDBoMzR2M2gtNnYzaC00djNoLTNWNmgtM3YzaC02djE2aC0zdi05aC0zbC0xLTMtNS0xVjB6Ii8+PHBhdGggZmlsbD0iI2EwOTE4NSIgZD0iTTUzIDIxM2gxNnYzaC02djNoOXY2SDMxdi0zaDd2LTNoNnYtM2g5di0zeiIvPjxwYXRoIGZpbGw9IiNlZWQyYzMiIGQ9Ik01MyAxNDdoM3Y5aDN2MTZoM3Y2aC0zdi0zaC0zdi02aC0zdi0zaC0zdi00aC0zdi0zaC0zdi0zSDI4di0zaDd2LTNoMTh2LTN6Ii8+PHBhdGggZmlsbD0iIzc5NGUzZSIgZD0iTTYyIDIwMGgxdjloNnY0SDUzdjNoLTl2M2gtNnYzaC03djNoLTZ2LTNoM3YtMTBoOXYtM2gyNXYtOXoiLz48cGF0aCBmaWxsPSIjNzQ0ODJkIiBkPSJNMTUwIDIwOWg2djNoN3YzaDN2M2g2djRoM3YzaC00MXYtNmgxM3YzaDl2LTNoM3YtM2gtOXYtN3oiLz48cGF0aCBmaWxsPSIjOWE0ZTQxIiBkPSJNMTUzIDNoM3YxNmgzdjNoLTZ2M2gtNnYtM2gtOXYzaC0yOXYtM2gyNXYtM2g3di0zaDN2LTNoNlY5aDNWM3oiLz48cGF0aCBmaWxsPSIjNzI2ZDYyIiBkPSJNOTEgMTc4aDZ2OWgzdjRoM3Y2aDN2MTVoLTN2LTZoLTN2LTNoLTN2LTNoLTN2LTNoLTN2LTdoLTNjLTEuNjg4LTEuMzEzLTEuNjg4LTEuMzEzLTMtM3YtM2gydi0zaDR2LTN6Ii8+PHBhdGggZmlsbD0iI2QwYmQ5ZiIgZD0iTTIyIDI1djI1SDEwVjI2YzItMSAyLTEgMTItMXoiLz48cGF0aCBmaWxsPSIjYjdiM2I0IiBkPSJNOTYgMTAwaDR2MTJsMyAxaC0zdjNoLTN2MjJoM3Y5aC0zdjNoLTZ2LTI1aDNsLTEtMTZoM3YtOXoiLz48cGF0aCBmaWxsPSIjYjBhYmE0IiBkPSJNMTEyIDUwaDR2NmgzdjdoMnYzaDR2NmgtNnYtM2gtNHYtM2gtNXYybDMgMXYzaC03di0zaC0zdi03aDN2LTZoM3YtM2gzdi0zeiIvPjxwYXRoIGZpbGw9IiNiYzQwMzIiIGQ9Ik01OSA5bDMgMWgtMnYzaC0zdjVoOXY0aDIydjNoMTV2M0g1OXYtNmgtM1YxMmgzVjl6Ii8+PHBhdGggZmlsbD0iIzhiM2EzMSIgZD0iTTEwMyAyNWgyOHYzaC0zdjNINjZ2LTNoMzd2LTN6Ii8+PHBhdGggZmlsbD0iI2E2NzMzYiIgZD0iTTE2IDE4N2wzIDF2MjJoLTN2MTVoLTN2LTI1SDB2LTZoN3YtM2g5di00eiIvPjxwYXRoIGZpbGw9IiNlMmQ4YzMiIGQ9Ik04MSAxODRoNHYzbDMgMXYyaDN2N2gzdjNoM3YzaDN2M2gzdjZoM3Y0aC02di0zaC02di00aC0zdi02aC00di0zaC0zdi05aC0zdi03eiIvPjxwYXRoIGZpbGw9IiM4YzZmNWEiIGQ9Ik0yMDAgMTk0aDI1djNoLTE1djEyaC00di02aC05djNoLTN2NGgtN3YtN2gzdi0zaDd2LTNsLTMtMWg2di0yeiIvPjxwYXRoIGZpbGw9IiNkYmJiYWYiIGQ9Ik0xNjMgMGg2djNoM3YzaC0zdjZoM3YxMGgtM3YzaC0zVjEybC0zIDEtMSA5aC0ybC0xIDN2LTZoLTNWNmg0VjNoM1YweiIvPjxwYXRoIGZpbGw9IiM2MzZlNmIiIGQ9Ik01OSAzOGgxdjZoLTR2NmgtM3YzaC0zdjdoLTN2M0gzN1Y1M2g3di05aDN2LTRoM3YzaDl2LTV6Ii8+PHBhdGggZmlsbD0iI2UwNzg1MyIgZD0iTTE0NCAwaDE5djNoLTN2M2gtNFYzaC0zdjZoLTN2NGgtNnYzaC00bC0xIDJ2LTJoLTExdi00bDktMVY5aDNWNmg0VjB6Ii8+PHBhdGggZmlsbD0iIzllODU2OSIgZD0iTTEwMCAxNDRoM3YzaDN2M2g0bC0xIDloLTN2NmgtM3YtNmgtM3YtNmgtM3YxNmgtM3YtNmgtNHYtNmwtMy0xaDR2M2gydi05aDR2LTNoM3YtM3oiLz48cGF0aCBmaWxsPSIjZThiZmFhIiBkPSJNMTkgMTk0aDZ2MzFoLTl2LTE1aDN2LTE2eiIvPjxwYXRoIGZpbGw9IiNkNGM3YmUiIGQ9Ik0xNjIgMjhoN3Y2aDN2M2gzdjZoM3Y3aDN2OWMtMS42NjYuMDQzLTMuMzM0LjA0LTUgMC0xLTEtMS0xLTEuMDYzLTMuNTYzTDE3NSA1M2gtM3YtNmgtNHYtNmgtM3YtOWwtMy0xdi0zeiIvPjxwYXRoIGZpbGw9IiNkYWJjYWEiIGQ9Ik0yMDMgMjA2aDN2M2g3djdoLTN2M2gtNHYzaDE5djNoLTI1di02aDN2LTNoLTZ2LTNoM3YtNGgzdi0zeiIvPjxwYXRoIGZpbGw9IiNjMGE4OGMiIGQ9Ik0xOTAgMGgyM3YyNWgtMVYxMmgtMlY2aC00djZoLTNWN2gtNnYzaC03VjB6Ii8+PHBhdGggZmlsbD0iI2I3NmYyMiIgZD0iTTIxNSAxNTZoMXY5aDl2N2gtOXYzaC03djNoLTZ2LTEwbDYuMDU1LjI5M0wyMTEgMTY4bDItM2gydi05eiIvPjxwYXRoIGZpbGw9IiNhNzY3NGUiIGQ9Ik0xMjggMjA5aDZ2N2gyNXYzaC0zdjNoLTl2LTNoLTEzdjZoLTZ2LTZoM3YtNmgtM3YtNHoiLz48cGF0aCBmaWxsPSIjZDlkZmRkIiBkPSJNMTUzIDIyaDJsLTEgNS00LTF2NWgtMTB2OWwtMTggMXYtNGg2di0zaDN2LTNoNnYtM2gxMHYtM2g2di0zeiIvPjxwYXRoIGZpbGw9IiM4NzI3MjEiIGQ9Ik00NCAxMnYxMGg2djNoLTN2M2gxOXYzSDQ0di0zaC0zdi0zaC0zVjEzYzItMSAyLTEgNi0xeiIvPjxwYXRoIGZpbGw9IiM3Y2FmYzMiIGQ9Ik0xNzIgOTNoM3YyM2gtM3YzaC05di03aDZ2LTEyaDN2LTd6Ii8+PHBhdGggZmlsbD0iI2Q4NjM1MSIgZD0iTTUwIDE5MGgzdjRoM3YzaDN2M2gzdjlINTB2LTE5eiIvPjxwYXRoIGZpbGw9IiNhNTU3NWMiIGQ9Ik0xNDcgMTA5aDl2M2gtM3Y3aDZ2NmgtM3YzaC0zdi0zaC0zdi0zaC0zdjNoLTN2LTZoM3YtMTB6Ii8+PHBhdGggZmlsbD0iIzg2N2E1ZiIgZD0iTTM4IDkxaDJ2MzRoN2MuMDQzIDEuNjY2LjA0IDMuMzM0IDAgNS0xIDEtMSAxLTMuNTYzIDEuMDYzTDQxIDEzMXYzaC02di05aDNWOTF6Ii8+PHBhdGggZmlsbD0iI2JmN2QzNSIgZD0iTTIxNiAxNzJoOXY5aC0yNXYtMmgybDEtM3YyaDZ2LTNoN3YtM3oiLz48cGF0aCBmaWxsPSIjYTM4OTcxIiBkPSJNMTgxIDUwaDFsMSA0NiAyLTJ2MjNoLTF2LTVsLTIuMjUgMS4wNjNjLTIuODgyLjk4Mi0zLjk2Mi45Ny02Ljc1LS4wNjNoM3YtMTBoM1Y1MHoiLz48cGF0aCBmaWxsPSIjOTkzNzJlIiBkPSJNNTAgMGg2djZoLTNsLTEgMmMtMi42NDkuNTk0LTUuMjkyLjc0Mi04IDF2M2wtNiAxdjEyaC0xVjloM1Y2aDRWM2g2VjB6Ii8+PHBhdGggZmlsbD0iI2FmOTk5OSIgZD0iTTE2MiAxMDloMXYyM2gtNmwtMSAzaC05YTU0OS45MTggNTQ5LjkxOCAwIDAgMS0uNTYzLTQuODEzbC0uMzE2LTIuNzA3QzE0NiAxMjUgMTQ2IDEyNSAxNDcgMTIyaDN2M2gzbDIgNWg3di0yMXoiLz48cGF0aCBmaWxsPSIjYmJjNGM0IiBkPSJNMTI1IDU5aDZ2MTBoM2wyIDloLTV2LTNoLTN2LTZoLTN2LTNoLTR2LTNsLTItMWgzdjNoM3YtNnoiLz48cGF0aCBmaWxsPSIjZTlkZWM3IiBkPSJNOTEgMjAzaDl2M2gzdjZoM3Y0aC02di0zaC02di00aC0zdi02eiIvPjxwYXRoIGZpbGw9IiNlZWRhYzgiIGQ9Ik0xMzEgOTRoMWwuMTQ4IDIuMTk1Yy40MDYgNS4yNDUuOTQ4IDkuODU2IDIuODUyIDE0LjgwNXYybC0yIDEgMTEgMXYxaC05djNoLTZjLTEuMjM4LTMuNTc3LS44MTMtNi4zNDIgMC0xMGwxLTEtMTctMS0xIDJ2LTNoMTlWOTR6Ii8+PHBhdGggZmlsbD0iI2YyZGNjNSIgZD0iTTExMiAxNDRsNCAxLTEgMmg3bDEtM2gxMnYzaC0xMHYzaC05djNoLTZjLjQ4Ni0zLjEyMy45OTktNS45OTYgMi05eiIvPjxwYXRoIGZpbGw9IiM5NjgxNmMiIGQ9Ik0xNDAgMTYzaDF2MTZoLTN2OWgtNmwtMSAzdi03aC0ydi01bDIuODc1LS45MzhjMi45ODYtLjkzNiAyLjk4Ni0uOTM2IDUuMTI1LTIuMDYybDMgMXYtMTR6Ii8+PHBhdGggZmlsbD0iI2E4MzMyNiIgZD0iTTI4IDE1N2gxNXYyaC0ybC0xIDNoLTN2M2gtNmwtMi00LTQgNC0zLTJoM3YtNGgzdi0yeiIvPjxwYXRoIGZpbGw9IiNhNzMzMjUiIGQ9Ik0yMiAxNjZoMnYxMGw1IDEgMiA3LTIgMSAxLjU2MyAyLjEyNWMxLjc0MSAzLjQ4NCAxLjM4NCA1LjE3My40MzcgOC44NzVsLTMtMXYtNGgtM3YtMTNoLTN2LTEyeiIvPjxwYXRoIGZpbGw9IiM4MzdhNmQiIGQ9Ik0zNyA0M2g0djEwaC00djVsLTIgMXYtM0gyMnYtM2gxMnYtM2gzdi03eiIvPjxwYXRoIGZpbGw9IiNjNGM2YzEiIGQ9Ik0xMDMgODZsMyAxdjNoMTB2M2gxNXYxaC0xNnYtM2gtOXY5aC02Yy4xMTQtMS43NzIuMjQyLTMuNTQyLjM3NS01LjMxMy4wNy0uOTg2LjE0LTEuOTcyLjIxLTIuOTg4QzEwMSA4OSAxMDEgODkgMTAzIDg2eiIvPjxwYXRoIGZpbGw9IiM4NTUxNDIiIGQ9Ik02MiAyMDBoMXY5aDZ2NEg1M3YybC00LTEgMS01aDEydi05eiIvPjxwYXRoIGZpbGw9IiNhOTgyNjciIGQ9Ik0xNjYgMTJ2MTNoM3YtM2w0IDFjLTEuNzUgMy44NzUtMS43NSAzLjg3NS00IDUtMi4zMzMuMDQtNC42NjcuMDQzLTcgMHYtM2gtMnYtM2gybC0uMDM1LTEuOTM0LS4wMjgtMi41MDMtLjAzNS0yLjQ5N0MxNjIuMDYgMTEuNzIzIDE2Mi41OTYgMTIgMTY2IDEyeiIvPjxwYXRoIGZpbGw9IiM4ZjczNWQiIGQ9Ik0xOTAgMjAwaDdjMSAzIDEgMyAwIDZoLTN2NGgtN3YtN2gzdi0zeiIvPjxwYXRoIGZpbGw9IiM4OTU4MzMiIGQ9Ik0xNTAgMjA5aDZ2M2g3djNoM3YzaDZ2MWgtN3YtM2gtM3YtM2gtMmwxIDMtMiAzdi0zaC05di03eiIvPjxwYXRoIGZpbGw9IiNhNGMzYzkiIGQ9Ik01NyA0N2gxMnYzaC05djE4aDZ2MWgtN1Y1NWgtMmMtLjgtMy4yODctMS4wOTctNC43MSAwLTh6Ii8+PHBhdGggZmlsbD0iI2FmNmEzOSIgZD0iTTE0MSAxNjNoNnY5bC00IDEtMSA1aC0xdi0xNXoiLz48cGF0aCBmaWxsPSIjODU4MjdjIiBkPSJNMzcgNTh2NWg3djZoLTZ2MjFoLTFWNjhsNi0xdi0yYTg0Ljc2IDg0Ljc2IDAgMCAwLTcgMmMtLjg3OS02LjE1Mi0uODc5LTYuMTUyLTEtOCAxLTEgMS0xIDItMXoiLz48cGF0aCBmaWxsPSIjYmJjNGM0IiBkPSJNMTM1IDc5aDJsLTEgNyAzIDFoLTh2LTNoLTZ2LTNoMTB2LTJ6Ii8+PHBhdGggZmlsbD0iI2I3M2YzYSIgZD0iTTQ3IDE2M2gzdjNoM3YzaDN2NmMtMS44MTMtLjE4OC0xLjgxMy0uMTg4LTQtMS0zLTQuMTc5LTMtNC4xNzktMy03bC0zIDEgMS01eiIvPjxwYXRoIGZpbGw9IiM5YmFmYjAiIGQ9Ik0xNDAgMTMxaDFsLjM3NSAzLjM3NWMuMjcyIDMuNjU2LjI3MiAzLjY1NiAyLjYyNSA1LjYyNS0uMzc1IDMuMTI1LS4zNzUgMy4xMjUtMSA2aC0ydi0zbC03IDF2LTRoNnYtOXoiLz48cGF0aCBmaWxsPSIjOTBiNmJiIiBkPSJNODAgMTI1aDJ2MjRoMnYtMmgybC0xIDVoMmwxLTIgMSAzLTIgM3YtM2gtM3YtM2gtM2wtMS0yNXoiLz48cGF0aCBmaWxsPSIjOGY3ZjZmIiBkPSJNMzQgNTZoMWMuODk2IDYuMDQ4IDEuMTEzIDExLjg5IDEgMThsLTUgMXYtNmgzVjU2eiIvPjxwYXRoIGZpbGw9IiNlZWRhYzMiIGQ9Ik05NyAxMzRoNWwyIDQtMiAzIDIgMnYzbDIgMWgtM3YtM2gtM3YtNmgtM3YtNHoiLz48cGF0aCBmaWxsPSIjOWY4MTY0IiBkPSJNOTUgMTU0aDJ2MTVoLTN2LTdoLTN2LTJoNWwtMS02eiIvPjxwYXRoIGZpbGw9IiNiZGNjZDEiIGQ9Ik04NCA2OWg0djlsLTEtNC0zIDF2LTZ6bS0zIDZsMyAxLTEgMmMtLjIyNSAxLjUzNy0uNDA4IDMuMDgtLjU2MyA0LjYyNWwtLjI1MyAyLjQ3N0w4MiA4N2gtMVY3NXoiLz48cGF0aCBmaWxsPSIjZWNlM2QyIiBkPSJNMTQ0IDEyMnY5aC0zbDEtNS03LTFjMi42MS0zLjQ4IDQuODMxLTMuMjc4IDktM3oiLz48cGF0aCBmaWxsPSIjNzc2ZDYwIiBkPSJNNTYgMTQxaDN2OWgtMWwtMSA2aC0xdi05aC0zdi0zaDN2LTN6Ii8+PHBhdGggZmlsbD0iI2Q5Y2RiOSIgZD0iTTgxIDE4NGg0djNoMmwtMSA1LTUtMXYtN3oiLz48cGF0aCBmaWxsPSIjYjQ0MTNiIiBkPSJNNTkgMTc4aDZ2OWMtMy0xLTMtMS00LjI1LTIuODc1QzYwIDE4MiA2MCAxODIgNjEgMTc5bC0yLTF6Ii8+PHBhdGggZmlsbD0iI2IzOGY1ZiIgZD0iTTMzIDEyMGw0IDF2NGgtMnY5aDV2MWgtNmwtMS0xNXoiLz48cGF0aCBmaWxsPSIjOGM3ZDZmIiBkPSJNNTkgMTU2aDF2MTJoMmMxLjYwNyAzLjIxNSAxLjA1NyA2LjQzNiAxIDEwaC0xdi02aC0zdi0xNnoiLz48cGF0aCBmaWxsPSIjYjk5MjY5IiBkPSJNMTg4IDg4aDZ2MTJoLTFsLTItNy0yIDIgLjA2My0yLjM3NWMuMTI0LTIuNjA2LjEyNC0yLjYwNi0xLjA2My00LjYyNXoiLz48cGF0aCBmaWxsPSIjYjY4ODU2IiBkPSJNMTg0IDE4N2gzdjZoN3YxaC02djNoLTRsMS0zYy4zNDItMS4zMzEuNjc4LTIuNjY0IDEtNGgtMnYtM3oiLz48cGF0aCBmaWxsPSIjZTlkNmM2IiBkPSJNMTA2IDE3MmgxM3YzaC0ydi0yaC04bDEgNC00IDF2LTZ6Ii8+PHBhdGggZmlsbD0iIzgwOTA5NyIgZD0iTTE0NCAxNDFoM3Y2aC03di0zbC0zLTFoNHYzaDJsMS01eiIvPjxwYXRoIGZpbGw9IiM5ZjgzNmQiIGQ9Ik0xODcgMjAzaDRsLTEgNSA0IDJoLTd2LTd6Ii8+PHBhdGggZmlsbD0iI2U0ZTVlMiIgZD0iTTE1MyAyMmgybC0xIDUtNC0xdjRsLTQtMSAxLTRoNnYtM3oiLz48cGF0aCBmaWxsPSIjNzM0ODJiIiBkPSJNMTUwIDIxMGg1bDEgNWgtNnYtNXoiLz48cGF0aCBmaWxsPSIjZWJkMGJhIiBkPSJNMzUgMTUwaDJ2Mmw0IDFjLTQuNDYyIDEuODA2LTcuMzEgMi4xMTctMTIgMWwtMSAydi0zaDd2LTN6Ii8+PHBhdGggZmlsbD0iI2I0OGM3NCIgZD0iTTE2MiAxM2gxYy4yMjIgMS45MzYuNDI3IDMuODc0LjYyNSA1LjgxM2wuMzUyIDMuMjY5QzE2NCAyNSAxNjQgMjUgMTYyIDI4di0zaC0ydi0zaDJ2LTl6Ii8+PHBhdGggZmlsbD0iI2FlNmEzOCIgZD0iTTEzOCAxNzloNWwtMiA1aC0ybC0xIDR2LTl6Ii8+PHBhdGggZmlsbD0iI2YxZTJkNSIgZD0iTTEwOSAxNzNoOGwtMS44NzUuMTI1TDExMyAxNzRjLTEuMzA1IDIuOTk2LTEuMzA1IDIuOTk2LTIgNmwtMS0yLTMtMSAyLTR6Ii8+PHBhdGggZmlsbD0iI2YxZDhiZCIgZD0iTTE5MyAxOTRsMSAzaDN2M2gtNmMuNTA2LTIuMTY5IDEtNCAyLTZ6Ii8+PHBhdGggZmlsbD0iI2RlN2Y1ZCIgZD0iTTE2MiAwbDEgM2gtM3YzaC00VjJoNlYweiIvPjxwYXRoIGZpbGw9IiM4MTQ4M2MiIGQ9Ik0yOCAyMTJoOXYxbC0yLjkzOC44NzVjLTMuMTY5Ljc2Ny0zLjE2OS43NjctNC4wNjIgMy4xMjVoLTJ2LTV6Ii8+PHBhdGggZmlsbD0iI2M4OTQ4NyIgZD0iTTEzMSAxMTlsMyAxYzEuNTU5LjIxOCAzLjEyMi40MDQgNC42ODguNTYzbDIuNDQ5LjI1M0wxNDMgMTIxdjFoLTl2M2wtMy0xaDJ2LTJoLTJ2LTN6Ii8+PHBhdGggZmlsbD0iI2JiNDMzYiIgZD0iTTUzIDE5Mmg2djVoLTN2LTNoLTN2LTJ6Ii8+PHBhdGggZmlsbD0iIzlkNjg1OCIgZD0iTTEyOCAyMTBsNSAxLTEgOGgtMXYtNmgtM3YtM3oiLz48cGF0aCBmaWxsPSIjNjA1ODRjIiBkPSJNNzYgMTc4aDJ2N2gtM2wxLTd6Ii8+PHBhdGggZmlsbD0iI2E2MzMyNyIgZD0iTTMwIDIwOWgydjJsNS0ydjNoLTlsMi0zeiIvPjxwYXRoIGZpbGw9IiNhZTZiMzkiIGQ9Ik0xNDcgMTcyaDZ2M2wtNCAxdi0yaC0ydi0yeiIvPjxwYXRoIGZpbGw9IiNiNGNjZDQiIGQ9Ik0xNjUgODFoNGwtMiA2aC0ydi02eiIvPjxwYXRoIGZpbGw9IiM4OGE5YWQiIGQ9Ik01MyA1MGwzIDFjLS43NSAxLjkzOC0uNzUgMS45MzgtMiA0LTIuMTI1Ljc1LTIuMTI1Ljc1LTQgMXYtM2gzdi0zeiIvPjwvc3ZnPg==`;
            // 屏蔽按钮图标
            let blockBtnIcon = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjQgNDRDMzUuMDQ1NyA0NCA0NCAzNS4wNDU3IDQ0IDI0QzQ0IDEyLjk1NDMgMzUuMDQ1NyA0IDI0IDRDMTIuOTU0MyA0IDQgMTIuOTU0MyA0IDI0QzQgMzUuMDQ1NyAxMi45NTQzIDQ0IDI0IDQ0WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNSAxNUwzMyAzMyIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`;

            this.css = {
                blockBtn: `.brlb-block-btn .brlb-block-btn-icon {
                    pointer-events: none;
                    user-select: none;
                    width: 22px;
                    height: 22px;
                    color: #fff
                }
                
                .brlb-block-btn-icon {
                    pointer-events: none;
                    user-select: none;
                    width: 22px;
                    height: 22px;
                    color: #fff;
                    background-image:url(${blockBtnIcon})
                }
                
                .brlb-block-btn {
                    display: -webkit-flex;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 72px;
                    right: 8px;
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    cursor: pointer;
                    background-color: rgba(33, 33, 33, .8);
                    z-index: 9;
                    transform: translateZ(0)
                }
                
                .brlb-block-btn .brlb-block-btn-tip {
                    pointer-events: none;
                    user-select: none;
                    position: absolute;
                    bottom: -6px;
                    right: -10px;
                    transform: translateY(100%);
                    font-size: 12px;
                    color: #fff;
                    border-radius: 4px;
                    line-height: 18px;
                    padding: 4px 8px;
                    background-color: rgba(0, 0, 0, .8);
                    white-space: nowrap
                }`,
                blockPic: `.brlb-block .v-img.bili-video-card__cover {
                    background-image: url(${blockPic})
                }`,
                blockAvatar: `.brlb-block .v-img.v-avatar__face {
                    background-image: url(${blockAvatar})
                }`,
            };
            // 样式
            let styleDom = document.createElement('style');
            styleDom.innerHTML = this.css.blockBtn + this.css.blockPic + this.css.blockAvatar;
            document.head.appendChild(styleDom);
        }

        // 添加屏蔽按钮
        addBlockBtn(cardView) {
            let blockBtn = createElement('div', {
                className: 'brlb-block-btn',
                style: {
                    display: 'none'
                },
                event: {
                    click: (event) => {
                        let cardView = event.currentTarget.parentElement;
                        let cardInfo = cardView.getElementsByClassName("bili-video-card__info")[0];
                        let uidStr = cardInfo.firstElementChild["href"]
                        if (uidStr.length > 0) {
                            let uid = uidStr.substr(uidStr.lastIndexOf("/") + 1);
                            console.log(uid + " 已屏蔽");
                            if (this.blockList.add(uid) == true) {
                                this.blockCardView(cardView, uid);
                            }
                            this.addBlockBtn(cardView);
                            this.setCardViewEvent(cardView);
                        }
                        return false;
                    },
                    mouseleave: () => {
                        this.isEnterBtnDiv = false;
                    },
                    mouseenter: () => {
                        this.isEnterBtnDiv = true;
                    }
                }
            }, [createElement('svg', {
                className: 'brlb-block-btn-icon'
            })]);
            cardView.insertBefore(blockBtn, cardView.childNodes[1]);
        }

        // mouseEnter才显示按钮
        setCardViewEvent(cardView) {
            let cardImage = cardView.getElementsByClassName("bili-video-card__image--wrap")[0];
            cardImage.addEventListener("mouseenter", (event) => {
                let cardView = event.currentTarget.parentElement.parentElement.parentElement;
                // console.log(cardView)
                let blockDiv = cardView.getElementsByClassName("brlb-block-btn")[0];
                blockDiv.setAttribute("style", "");
            });
            cardView.addEventListener("mouseleave", (event) => {
                let cardView = event.currentTarget;
                let blockDiv = cardView.getElementsByClassName("brlb-block-btn")[0];
                if (this.isEnterBtnDiv == false) {
                    blockDiv.setAttribute("style", "display: none;");
                }
            });
        }

        blockCardView(cardView, uid) {
            let newCardView = createElement('div', {
                className: 'bili-video-card__wrap __scale-wrap brlb-block',
                "data-uid": uid.toString()
            }, [
                createElement('a', {
                    target: '_blank',
                }, [
                    createElement('div', {
                        className: 'bili-video-card__image __scale-player-wrap',
                    }, [
                        createElement('div', {
                            className: 'bili-video-card__image--wrap',
                        }, [
                            createElement('picture', {
                                className: 'v-img bili-video-card__cover'
                            })
                        ])
                    ])
                ]),
                createElement('div', {
                    className: 'bili-video-card__info __scale-disable',
                }, [
                    createElement('a', {
                        target: '_blank',
                    }, [
                        createElement('div', {
                            className: 'v-avatar bili-video-card__avatar',
                        }, [
                            createElement('picture', {
                                className: 'v-img v-avatar__face'
                            })
                        ])
                    ]),
                    createElement('div', {
                        className: 'bili-video-card__info __scale-disable',
                    }, [
                        createElement('div', {
                            className: 'bili-video-card__info--right',
                        }, [
                            createElement('a', {
                                target: '_blank',
                            }, [
                                createElement('h3', {
                                    className: 'bili-video-card__info--tit',
                                    title: "黑名单内容"
                                }, "黑名单内容")
                            ]),
                            createElement('div', {
                                className: 'bili-video-card__info--bottom'
                            }, [
                                createElement('a', {
                                    className: 'bili-video-card__info--owne'
                                }, [
                                    createElement('span', {
                                        className: 'bili-video-card__info--author'
                                    }, "已屏蔽")
                                ])
                            ])
                        ])
                    ])
                ])
            ]);
            cardView.replaceWith(newCardView);
        }

        getUid(cardView) {
            let cardInfo = cardView.getElementsByClassName("bili-video-card__info")[0];
            let uidStr = cardInfo.firstElementChild["href"]
            if (uidStr.length > 0) {
                let uid = uidStr.substr(uidStr.lastIndexOf("/") + 1);
                return uid;
            } else {
                return null;
            }
        }

        isAd(cardView) {
            return cardView.getElementsByClassName("bili-video-card__info--ad-img").length > 0 ? true : false;
        }

        addRollEvent() {
            // "换一换"按钮监听事件
            let rollBtn = document.getElementsByClassName("roll-btn-wrap")[0].firstElementChild;
            rollBtn.addEventListener("click", () => {
                setTimeout(() => {
                    let recommendList = document.querySelectorAll('div[class^="recommend-container__"]')[0].getElementsByClassName('bili-video-card__wrap');
                    this.run(recommendList);
                }, 1000);
            });
        }

        run(cardViewList) {
            for (let cardView of cardViewList) {
                if (this.isAd(cardView)) {
                    // 推广链接
                    this.blockCardView(cardView, 0);
                    this.addBlockBtn(cardView);
                    this.setCardViewEvent(cardView);
                } else {
                    // 普通视频
                    let uid = this.getUid(cardView);
                    if (uid != null) {
                        if (this.blockList.isContained(uid)) {
                            this.blockCardView(cardView, uid);
                        }
                    }
                    this.addBlockBtn(cardView);
                    this.setCardViewEvent(cardView);
                }
            }
        }
    }

    class BlockList {
        constructor() {
            this.list = JSON.parse(GM_getValue('blockList') || '[]');
            this.list.sort();
            this.removeDuplicates(this.list);
            console.log(this.list)
        }

        *[Symbol.iterator]() {
            yield* this.list;
        }
        length() {
            return this.list.length;
        }
        isContained(item) {
            return (this.list[this.search(item)] == item);
        }

        add(item) {
            let index = this.search(item);
            if (this.list[index] !== item) {
                this.list.splice(index, 0, item);
                GM_setValue('blockList', JSON.stringify(this.list));
                return true;
            }
            return false;
        }

        remove(item) {
            let index = this.search(item);
            if (this.list[index] == item) {
                this.list.splice(index, 1);
                GM_setValue('blockList', JSON.stringify(this.list));
                return true;
            }
            return false;
        }

        clr() {
            console.log('清空黑名单')
            GM_setValue("blockList", '[]');
            this.list = [];
        };

        search(target) {
            const n = this.list.length;
            let left = 0,
                right = n - 1,
                ans = n;
            while (left <= right) {
                let mid = ((right - left) >> 1) + left;
                if (target <= this.list[mid]) {
                    ans = mid;
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            return ans;
        };

        removeDuplicates() {
            const n = this.list.length;
            if (n === 0) {
                return 0;
            }
            let r = 1,
                l = 1;
            while (r < n) {
                if (this.list[r] !== this.list[r - 1]) {
                    this.list[l] = this.list[r];
                    ++l;
                }
                ++r;
            }
            return l;
        };
    }

    /**
     * refer to: https://github.com/ipcjs/bilibili-helper
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
                props[n] !== undefined && elem.setAttribute(n, props[n]);
            }
        }
        if (children) {
            if (typeof children === 'string') {
                elem.innerHTML = children;
            } else {
                for (let i = 0; i < children.length; i++) {
                    if (children[i] != null) {
                        elem.appendChild(children[i]);
                    }
                }
            }
        }
        return elem;
    }

    let blockList = new BlockList();
    let biliBlocker = new BiliBlocker(blockList, true);

    window.addEventListener("DOMContentLoaded", function () {
        let recommendContainer = document.querySelectorAll('div[class^="recommend-container__"]');
        if (recommendContainer.length > 0) {
            //推荐列表
            let recommendList = recommendContainer[0].getElementsByClassName('bili-video-card__wrap');
            biliBlocker.run(recommendList);
            //推广列表
            let evaList = document.querySelectorAll('div[class^="eva-extension-area"]')[0].getElementsByClassName('bili-video-card__wrap');
            biliBlocker.run(evaList);
            biliBlocker.addRollEvent();
        }
    }, false);
})();