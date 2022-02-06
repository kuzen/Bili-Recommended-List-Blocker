// ==UserScript==
// @name         b站首页黑名单 屏蔽首页视频
// @description  屏蔽b站首页推荐中的指定up
// @namespace    https://github.com/kuzen
// @version      1.7.4
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

(function() {
  'use strict';

  class Setting {
    constructor(blockList) {
      this.blockList = blockList;
      const deleteIcon = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGQ9Ik05IDEwVjQ0SDM5VjEwSDlaIiBmaWxsPSJub25lIiBzdHJva2U9IiM0YTRhNGEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMCAyMFYzMyIgc3Ryb2tlPSIjNGE0YTRhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yOCAyMFYzMyIgc3Ryb2tlPSIjNGE0YTRhIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik00IDEwSDQ0IiBzdHJva2U9IiM0YTRhNGEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE2IDEwTDE5LjI4OSA0SDI4Ljc3NzFMMzIgMTBIMTZaIiBmaWxsPSJub25lIiBzdHJva2U9IiM0YTRhNGEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`;
      this.css = {
        settingsPanel: `#brlb-settings {
                    font-size: 12px;
                    color: #6d757a
                }
                
                #brlb-settings h1 {
                    color: #161a1e
                }
                
                #brlb-settings a {
                    color: #00a1d6
                }
                
                #brlb-settings a:hover {
                    color: #f25d8e
                }
                
                #brlb-settings input {
                    margin-left: 3px;
                    margin-right: 3px
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
                
                #brlb-settings input[type=radio] {
                    -webkit-appearance: radio;
                    -moz-appearance: radio;
                    appearance: radio
                }
                
                #brlb-settings input[type=checkbox] {
                    -webkit-appearance: checkbox;
                    -moz-appearance: checkbox;
                    appearance: checkbox
                }
                
                .brlb-block-line-delete {
                    background:url(${deleteIcon});
                    width: 16px;
                    background-repeat: no-repeat;
                    background-position: center
                }`,

        bui: `.bui,
                .bui-tabs .bui-tabs-header {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex
                }
                
                .bui {
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
                
                .bui-button.bui-button-border,
                .bui-button.bui-button-transparent {
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, .2)
                }
                
                .bui-button.bui-button-border:hover,
                .bui-button.bui-button-transparent:hover {
                    color: #00a1d6;
                    border-color: #00a1d6
                }
                
                .bui-button,
                .bui-button.bui-button-border {
                    cursor: pointer
                }
                
                .bui-button.bui-button-border.bui-button-disabled {
                    background: 0 0;
                    color: rgba(255, 255, 255, .2);
                    border: 1px solid rgba(255, 255, 255, .1)
                }
                
                .bui-button.bui-button-border.bui-button-disabled:hover {
                    background: 0 0;
                    color: rgba(255, 255, 255, .2)
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
                    border: 0
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
                
                .brlb-block-empty,
                .brlb-block-list-function {
                    text-align: center;
                    color: #9499a0;
                    color: var(--text3, #9499a0)
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
                    line-height: 24px
                }
                
                .brlb-block-empty {
                    display: none;
                    width: 100%;
                    height: 100%;
                    line-height: 100px
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
                    text-overflow: ellipsis
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
                    padding-right: 16px
                }
                
                .brlb-block-line-delete {
                    padding-right: 36px
                }`,
      };
      this.listWrap = null;

      const btnWarpCallback = (mutationsList, _observer) => {
        setTimeout(() => {
          this.addSettingBtn();
        }, 100);
        this.btnWarpObserver.disconnect();
      };
      this.btnWarpObserver = new MutationObserver(btnWarpCallback);
      const targetNode = document.getElementById('i_cecream');
      const config = {attributes: false, childList: true, subtree: false};
      this.btnWarpObserver.observe(targetNode, config);
    }

    // TODO
    refreshList(key) {
      if (this.listWrap) {
        this.listWrap.innerHTML = '';
        this.addItems(key);
      }
    }

    addItems(key, text) {
      const itemDom = createElement('div', {
        className: 'brlb-block-line',
      }, [createElement('div', {
        className: 'brlb-block-line-content',
      }), createElement('span', {
        className: 'brlb-block-line-delete',
      })]);
      if (this.listWrap) {
        if (text == null) {
          for (const uid of this.blockList.list[key]) {
            const item = itemDom.cloneNode(true);
            item.getElementsByClassName('brlb-block-line-content')[0].innerText = uid;
            this.listWrap.appendChild(item);
          }
        } else {
          const item = itemDom.cloneNode(true);
          item.getElementsByClassName('brlb-block-line-content')[0].innerText = text;
          this.listWrap.appendChild(item);
        }
      }
    }

    addSettingBtn() {
      const addBtnClick = (event) => {
        // TODO
        const uid = event.currentTarget.parentElement.getElementsByClassName('brlb-block-string')[0].value;
        if (uid.length > 0) {
          console.log(uid);
          this.blockList.add('uid', uid);
          this.addItems('uid', uid);
        }
      };
      const brlbBlockListWrap = createElement('div', {
        className: 'brlb-block-setting',
      }, [
        createElement('div', {
          className: 'brlb-block-label',
        }, '屏蔽列表'),
        createElement('div', {
          className: 'brlb-block brlb-block-wrap',
        }, [
          createElement('div', {
            className: 'brlb-block-tablist',
          }, [
            createElement('div', {
              className: 'brlb-block-tabpanel',
              role: 'list',
            }, [
              createElement('div', {
                className: 'brlb-block-tabpanel-row input-row',
              }, [
                createElement('input', {
                  type: 'text',
                  className: 'brlb-block-string',
                  placeholder: '添加屏蔽词，正则以&quot;/&quot;开头&quot;/&quot;结尾',
                }),
                createElement('div', {
                  className: 'brlb-block-string-btn bui bui-button bui-button-gray',
                  role: 'button',
                  event: {
                    click: addBtnClick,
                  },
                }, [createElement('span', {}, '添加')]),
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
                      'className': 'bui-tabs-header-item bui-tabs-header-item-active',
                      'data-brlb-Index': '0',
                    }, '屏蔽用户'),
                    // createElement('div', {
                    //   'className': 'bui-tabs-header-item',
                    //   'data-index': '1',
                    // }, '正则屏蔽用户'),
                    // createElement('div', {
                    //   'className': 'bui-tabs-header-item',
                    //   'data-index': '2',
                    // }, '正则屏蔽视频'),
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
                className: 'brlb-block-tabpanel-row brlb-border',
              }, [
                createElement('div', {
                  className: 'brlb-block-list-function',
                }, [
                  createElement('div', {
                    className: 'brlb-block-list-function-content',
                  }, '内容'),
                  createElement('div', {
                    className: 'brlb-state-wrap',
                  }, [createElement('div', {
                    className: 'brlb-block-list-function-delete',
                  }, '操作')]),
                ]),
                createElement('div', {
                  className: 'brlb-block-list-wrap',
                  style: {
                    'height': '265px',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden',
                  },
                }),
              ]),
            ]),
          ]),
        ]),
      ]);

      const settingsPanelDom = createElement('div', {
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
          cursor: 'pointer',
        },
        event: {
          click(e) {
            if (e.target === this) {
              document.body.style.overflow = '';
              this.remove();
            }
          },
        },
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
            cursor: 'default',
          },
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
              'href': 'javascript:',
              'data-sign': 'in',
              'event': {
                click: this.blockList.clr,
              },
            }, [
              createElement('text', '清空黑名单 (刷新生效)'),
            ]),
            createElement('text', ' '),
            createElement('br'),
            createElement('br'),
            createElement('div', {
              style: {
                whiteSpace: 'pre-wrap',
              },
            }, [
              createElement('a', {
                href: 'https://greasyfork.org/zh-CN/scripts/437528-bili-recommended-list-blocker',
                target: '_blank',
              }, [createElement('text', '脚本主页')]),
              createElement('text', '　'),
              createElement('a', {
                href: 'https://github.com/kuzen/Bili-Recommended-List-Blocker/blob/master/README.md',
                target: '_blank',
              }, [createElement('text', '帮助说明')]),
            ]),
          ]),
        ]),
      ]);
      const settingBtn = createElement('button', {
        className: 'primary-btn brlb-setting-btn',
        style: {
          'padding': '0 4px',
          'height': '40px',
          'text-align': 'center',
          'font-size': '12px',
        },
        event: {
          click: () => {
            document.body.appendChild(settingsPanelDom);
            this.refreshList('uid');
          },
        },
      }, '屏蔽设置');
      const btnWrap = document.getElementsByClassName('palette-button-wrap')[0];
      const firstBtn = btnWrap.getElementsByClassName('primary-btn')[1];
      this.listWrap = settingsPanelDom.getElementsByClassName('brlb-block-list-wrap')[0];
      this.listWrap.onclick = (ev) => {
        ev = ev || window.event;
        const target = ev.target;
        if (target.className.toLowerCase() === 'brlb-block-line-delete') {
          const uid = target.parentElement.firstChild.innerText;
          this.blockList.remove('uid', uid);
          ev.currentTarget.removeChild(target.parentElement);
        }
      };
      const tabsWrap = settingsPanelDom.getElementsByClassName('bui-tabs-header')[0];
      tabsWrap.onclick = (ev) => {
        ev = ev || window.event;
        const target = ev.target;
        if (target.className.toLowerCase() === 'bui-tabs-header-item') {
          const index = target.dataset.index;
          for (const tab of ev.currentTarget.getElementsByClassName('bui-tabs-header-item')) {
            tab.classList.remove('bui-tabs-header-item-active');
          }
          target.classList.add('bui-tabs-header-item-active');
          // TODO
        }
      };

      btnWrap.insertBefore(settingBtn, firstBtn);
    }
  }
  class BiliBlocker {
    constructor(blockList) {
      this.blockList = blockList;
      this.setting = new Setting(this.blockList);
      this.history = {};

      // 屏蔽主图
      const blockPic = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRpc3BsYXk9ImJsb2NrIiB2aWV3Qm94PSIwIDAgNjc4IDM4MSI+PHBhdGggZmlsbD0iIzE4MmI5YSIgZD0iTTAgMGg2Nzh2MzgxSDB6Ii8+PHBhdGggZmlsbD0iIzE2MTk1YyIgZD0iTTY1NCAxMzRoMnYybDE2LTJ2N2wtMyAxLTEgMmgxMHYyMzdIMFYxNjNsMTAgNSAxNCA0IDQgMyA2IDIgMyA2IDIgMSAxIDIwIDEzIDEgMyAxdjJsNyAxIDEtNiA0LTUgNS0yaDdsOCAzIDUgMiAxIDMgNiAxIDIgMyAyIDE4IDIgMXYxM2wyIDhoMnYyaDJ2Mmw0IDIgNyA0IDMgMyAxMSA0djFsLTktMS0xMC01IDIgM3YzbC0zIDEtMSAyaC00djNsLTEwIDMtMiAyLTUgMmgtNXYtMmg0di0zaDJsLTEtNmgtNGwxLTgtNiAxLTEgNC01IDNoLTN2MmgxMnYySDc2bDQgNS0xMCAydjNsMjIgMXYzSDgydjJsLTcgMSAxIDUtOSAydjNoMTNsMiAxLTEgNGgtN3YtMmgtOGwtMSA1aDE2bC0xIDItOCAxLTIgNGg3bDE4IDJ2LTJoOXYybDUtMSAyMSAxIDYgMXYybC04IDItMTggMXYybDE1LTEgMy0xIDE2LTEgMy0xIDEtNGgtM2wtMS00IDYtMSAxIDEgMS0yIDMyLTEgMTYgM2g5bDItNGg3bDEgNCAxNi0yIDItMWgxMXY1bDMtMiAxNi0yLTQtMTctMS0ydi03bC01LTEtMy0xdi00bC03IDMtNSAxLTItNHYtM2gydi0zaDJ2LTJsMy0xIDEtN2gtNnYybC03IDF2LTlsNS00IDYtMyAzLTEtNC0ydi0ybDgtMS0xLTNoLTEybC04IDF2MmwtNiA0LTcgMmgtODRsLTUgMSAxIDFoMTNsNCAxLTEgMy03LTF2MmwtMyAzLTYtMXYtMmgtMmwtNC0xMC0yLTExdi0xMWg0bDEgNCAxMCAxdi00bDktNGg1bDMtOWgydjExaDNsMS00aDJsMSA0IDQgMiAxLTggNS0xIDMgMTAgOSAyIDEtOCA0IDIgNCA5IDUgMiA2NSAxdi00aDNsMS00aDJsMi03aDRsMS00LTExIDJ2LTdoMmwyLTUgNi00IDExLTJoN2w0IDIgNCAyIDMgOXY0aC0ydjJoLTZ2OGgtMmwtMSA4IDEgMyA0LTIgMjAtMmgyNnYtM2gzdi00aDJsMS0zaDJsMi04IDQgMXY1bC0zIDItMiA2LTEgMTQgMiA3djJoNnYzaC0zNXYtMmwxNS0xLTctMTItMTAgMXYtMmwtMyAxaC0xNGwxIDloLTN2LTloLTlsMSA1IDEgMTkgNSAzIDEgMyAzIDF2LTJsNS0xIDIgMyAzIDItMyA0aC0xNWwtNC0xLTMtMTBoLTVsLTEgNHY4bDIgMiAzIDcgNCAydjRoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTEgNC0xMGg1djEwbDUgMiA2IDcgNSA0IDYgMnYybDctMS0xLTd2LTE2bDItOC00LTF2LTJoNmw0IDIgMS01aDR2LTloLTEzbC03LTF2M2gtM2wtMSA2aC0ybC0xLTN2LTEybDEgM2gzbDEtMTBoM3YtOWgtMnYtN2wyLTIgMTQtMSAxMC0xIDEgMTIgMiA3djZoLTExdjJoNGw0IDE0aDlsMiAxdjNoMTF2M2gtMTJsNCA3IDEgMjAgMiAxMSAxIDEgMyAxNSA2IDQgNSAxaDIzbDMtMyAxMC0xIDEtMSAzMSAxaDE5di0zbC0yNy0ydi0yaDN2LTRoLTE4bC0zLTR2LTJoLTJ2LTJoLTNsLTEtNCAzLTEgMS0zaDEybDQgNGgydi02bDItMSAxIDMgMjIgMSAyLTIgMTAtMyAyMSAxIDUtNSA1LTMgNSAxaDRsMi01IDEzLTEgMS01LTE5LTEtOC0yLTE2LTEtMi0yLTEwLTEgNC0yIDI2LTF2LTJsLTUtMS0yLTEgMS00IDktMyAyLTMtMTItMWgtMzFsLTkgMS0xIDQtNCAzLTIgNWgzdjNoLTEydi0zaC0ybC0yLTgtMTEtNC02LTItNi0zIDEgNC0zOCAxLTUtMXYtNWg5bDEgMyAyIDEgMS00IDEyLTEgNzAtMWg0NXYtM2w1LTIgMy01IDQtMyA1LTEgMi02IDUtMnYtMTJsMi02aDJsMiA0IDIgMXYxN2gybDEtNCAxNy01aDN2LTExbDEtM2gtMnYtM2gydi02bDgtM2g2djNoOGw0LTYtMyAyaC00di04aC0xMXYtM2w2LTVoMnYtMmgybDItNSAzLTEgMi00aDV2LTNsMTAtMnYtNWwzIDF6TTQ4MCAyNzl6Ii8+PHBhdGggZmlsbD0iIzM3NTRjMSIgZD0iTTQ1MyA2NGg1bDMgMyAxMSAxIDUtMSAzIDggMyA4IDEgNWg0djNsLTMgMi0yIDloMnYtM2gzdjZoMmwxLTUgNCAyIDIgNyA1LTUgMiAxLTUgNiA3IDEgMSA2IDE1IDEgNSAxdi0zbC0xMi0xLTItNS0yLTJ2LTNoMnYybDQtMSAzIDEgMSA0aDJ2LTVoOXYyaC02djZoNWw4IDMgMiA0IDMgMS0xLTNoNmwtMS02di0ybC0xLTVoMTVsNiAydjNoN2wxIDQgMTAgMXYtNGgtNnYtMmg0bC0xLTQgNy0xaDEwdi0ybDMtMiAxLTRoMmwtMiA3LTEgMiA5LTMgMS0yIDYtMSAzIDEgMTItMyA2LTF2MmgtMnYyaC0ybC0xIDQtNyAyLTEgMmgtNWwtMiA0LTMgM3YxMGwzLTF2NWwtNCAxdi0zbC01IDJoLTV2LTNoLTNsLTEgNCA0IDF2M2wxNi0xIDQtM2gzbDEgNi00IDF2NmwtMSAxaC01di0yaC0zbC0yIDUtNSAydjVoLTMgNGw1LTJoM3YtMmgydi0yaDZsLTEgMy03IDRoLTV2Mmw1IDItMSA3aDExdjhsNy0yLTIgNS0yIDItOC0xdi0zbC0xMyAzLTEgNmgtMnYzaDJsLTEgMTQtMjAgNi0xIDNoLTJsLTEtNHYtMTBsMS0zLTMtMS0xLTRoLTJsLTIgMTgtNSAzLTIgNi03IDItMyAzLTIgNC01IDF2M2wtNDUgMS03MCAxLTEyIDEtMSAzLTMtMXYtM2wtOCAxLTEgNCA0Mi0xLTEtNCA3IDMgNiAyIDExIDQgMiAzdjZoMnYzaDEydi0zaC0zbDItNiA0LTIgMS00IDktMmgzMWwxMyAxLTQgNi04IDItMSAzIDcgMnYybC0yNiAyIDggMXYybDE2IDEgOCAyIDE5IDJ2NWwtMSAxLTEzIDEtMiA1aC00bC02LTEtNSA0LTQgNGgtOWwtMTItMS0xMCAzLTIgMi0yMi0xLTItM3Y3bC00LTEtMy0zaC0xMmwtMyA0IDEgMiAzIDEtMSAyIDQgMSAxIDQgMTggMXY0aC0zdjJoMTZsMTEgMSAxIDItMSAyLTMgMWgtMTZsLTMxLTEtMSAxLTEwIDEtMyAzaC0yM2wtOS0zLTMtMy0zLTE1LTItNi0xLTYtMS0yMC0zLTR2LTNoMTJ2LTNoLTExdi0zbC01LTEtMSAxaC01bC0zLTktMS02aC00di0yaDExbC0zLTEzdi0xMmwtNiAyaC05bC05IDEtMSAxLTEgN2gydjloLTN2N2wtMSAzaC0zdjEyaDJsMS02aDN2LTNoMTdsMyAxdjlsLTQgMS0xIDQtMTAtMnYybDQgMXY2bC0xIDJ2MjNsLTcgMXYtMmwtNy0yLTctNi00LTUtNC0ydi0xMGgtNWwtMyAxMC01IDUtNSA3LTcgMy0xIDItNSAyLTEgMWgtMTF2MmgtM3YtNGwtNS0yLTQtOC0xLTF2LThsMi00aDVsMyA3djNoMTlsMi0zLTQtNGgtNXYybC00LTEtMS0zLTUtMy0xLTI0aDl2OWgzbC0xLTkgMTctMXYybDEwLTIgNyAxMXYybC02IDFoLTl2MmwxOS0xaDExbDUgMXYtM2gtNmwtMy05IDEtMTQgMy03IDMtMS0xLTUtMy0xdjVsLTUgNmgtMnY0aC0zdjNsLTcgMWgtMTlsLTIwIDItNCAxLTItNSAyLTZoMnYtOGg2di0yaDJsLTQtMTMtOC0ydi0xbC0xMiAxLTkgMy00IDZoLTJ2N2w2LTJoNWwtMSA0aC00bC0yIDdoLTJsLTEgNGgtM3Y0aC02NWwtNi0zLTUtMTAtMi0xLTEgOC05LTItMy04di0ybC00IDEtMiA4LTUtMnYtNGgtMmwtMSA0aC0zdi0xMWgtMmwtMyA5LTEwIDMtNCAxdjRoLTdsLTMtMS0xLTRoLTRsMiAxOCA0IDEydjJoMnYybDYgMSAxLTNoMnYtMmw0LTF2MmwzLTEgMS0yaC0xN2wtMi0xIDEtMiA1LTFoODRsOS0zIDQtMnYtMmw4LTJoMTJsMiAyLTEgMi04IDF2Mmw4IDEtNCAxLTEgMi02IDItNiA0LTEgOSA3LTF2LTJoNnY3bC00IDF2MmgtMnYzaC0ybDIgNHYzbDctMyA1LTF2NGw1IDEgMyAxIDIgOSAzIDEzdjRsLTcgMi05IDEtMyAxdi01bC0xMSAxLTkgMmgtOWwtMS00aC03djVoLTExbC0xOC0zaC0zMGwtMSAzLTEtMi01IDJ2M2gzbC0xIDUtMyAxLTE2IDEtMyAxaC0xNXYtMmwyLTEgMTYtMSA4LTF2LTJsLTMyLTF2LTJoLTl2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTEgMS01aDh2Mmg3bDEtNC0xNS0xdi0zbDgtMy0xLTQgMS0xaDd2LTJoMTB2LTNINzJsLTItMXYtM2w4LTMtMi00aDEzdi0ySDc3di0ybDUtM2gzbDEtNWg2bC0xIDhoNGwxIDZoLTJ2M2gtNHYybDEwLTMgNC0zIDgtMXYtM2g0bDEtM2gzbC0yLTYgNSAxIDUgM2gzbC04LTQtMy0zLTgtNXYtMmgtMnYtMmgtMmwtMy04di0xMGwxLTMtMy0xLTItMTgtMy0zLTQtMS0yLTMtMTAtMy0yLTFoLTdsLTUgMS0yIDQtMyA3LTctMXYtMmwtMTYtMS0xLTF2LTIwbC0zLTEtMi0zdi0zbC04LTItMi0yLTE2LTUtNy00LTEtNCAxNCAzIDIgNGg4bDEtNWgzdi05bC00LTJ2LTJsMTAgMSA1IDIgMi02IDMtMiAyLTYgMy0xIDQgMi01IDEtMSA0aDE4bC0xLTQgMi0yIDQgMnYyaDJ2MmwyIDFoM2wzLTF2LThsMy01IDMtMSAyLTYgOC00aDE3bDIgMyA0IDF2LTRsNSAxIDMgMXY3aDNsMSAxMC0xIDQgMSAxdjZsNi0zdjE1bDUgNXYxbC05IDMtNSAyaC0zbC0xIDNoMTVsLTMgMi0zIDFoLTEwdjNoMTlsNy0yIDUtMmg0di0yaDJ2LTJoLTRsMi00IDEtMSAxOS0yIDEtNCAzLTMgMy01IDEtNS02LTItMi0xdjNsLTcgMSAyLTEwaDl2M2w2LTEgMy0yIDEtM2gzdi0zbDItMSAxNS0yLTMtMiA1LTIgMS02di00aDN2Mmw2IDIgMyAxIDEtMiA0IDEtMyAxMC0xIDRoNWwzLTRoM2wyLTRoNmwxIDQgNCAydjlsNSAxIDEgNiA1IDEgMiAxdjJoM3YybDQgMXY0aDR2Mmw5IDJoM3Y3aDMwbDEgMiA5IDFoMTBsLTItNC0zLTMgMS0zIDEwLTMgMTEtMSAxLTFoN3Y3aC0zbDEgNiA1LTUgMi0yIDMtMi0zLTVoOHYtMmwxMy0xIDMtNmgxMWw1LTUgNC0xIDEtNyAxMC01IDItNCA0LTEgMTktMS00LTItMS0yIDItMS01LTF2LTRsLTQtMSAxMi0xIDItNGgzdi0ybC00LTEtMi0xNiAxLTExIDQtMiAxLTMgMy0xdi00bC01LTF6bTI3IDIxNXoiLz48cGF0aCBmaWxsPSIjMWEyYjkwIiBkPSJNNjU0IDEzNGgydjJsMTYtMnY3bC0zIDEtMSAyaDEwdjIzN0g1MDdsLTMtNXYtM2wtNS0xLTMtMnYtMmwtNS0xLTEtM2gtMnYtMmwtNC0ydi0ybC00LTEtMS00LTUtMnYtMmgtMTVsLTktMi0yLTF2LTJsLTQtMi00LTR2LTJsLTUtMnYtM2wtNi0xLTMtMnYtMmwtNC0ydi0ybC05LTMtNS0zdi0yaC00bDEgNS00IDNoLTJ2LTJsLTUgNGgtM3YyaC0ydjRoLTJsLTEgNC0yIDNoLTEybC00LTEtNS02di0yaC0zdi03bC01LTItMi00LTUtMS02LTUtNiAxdjdsLTQgMXYzaDVsLTEgNSA3IDEgMSA0LTEwIDUgMTEgMyAxIDUtMiAxaC02djNsNiAyIDEgMy0xIDJoLTEzbC0xIDEzLTQgNWgtM3YtMmwtNC0xdi0ybC01LTItNy0zdi0xNGw1LTEzaDJsMi02aDJ2LTRoMmwtMS05LTItMyAxLTVoNWwtMy05LTgtMnYtMmwtMTItMS00LTJoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTEgNC0xMGg1djEwbDUgMiA2IDcgNSA0IDYgMnYybDctMS0xLTd2LTE2bDItOC00LTF2LTJoNmw0IDIgMS01aDR2LTloLTEzbC03LTF2M2gtM2wtMSA2aC0ybC0xLTN2LTEybDEgM2gzbDEtMTBoM3YtOWgtMnYtN2wyLTIgMTQtMSAxMC0xIDEgMTIgMiA3djZoLTExdjJoNGw0IDE0aDlsMiAxdjNoMTF2M2gtMTJsNCA3IDEgMjAgMiAxMSAxIDEgMyAxNSA2IDQgNSAxaDIzbDMtMyAxMC0xIDEtMSAzMSAxaDE5di0zbC0yNy0ydi0yaDN2LTRoLTE4bC0zLTR2LTJoLTJ2LTJoLTNsLTEtNCAzLTEgMS0zaDEybDQgNGgydi02bDItMSAxIDMgMjIgMSAyLTIgMTAtMyAyMSAxIDUtNSA1LTMgNSAxaDRsMi01IDEzLTEgMS01LTE5LTEtOC0yLTE2LTEtMi0yLTEwLTEgNC0yIDI2LTF2LTJsLTUtMS0yLTEgMS00IDktMyAyLTMtMTItMWgtMzFsLTkgMS0xIDQtNCAzLTIgNWgzdjNoLTEydi0zaC0ybC0yLTgtMTEtNC02LTItNi0zIDEgNC0zOCAxLTUtMXYtNWg5bDEgMyAyIDEgMS00IDEyLTEgNzAtMWg0NXYtM2w1LTIgMy01IDQtMyA1LTEgMi02IDUtMnYtMTJsMi02aDJsMiA0IDIgMXYxN2gybDEtNCAxNy01aDN2LTExbDEtM2gtMnYtM2gydi02bDgtM2g2djNoOGw0LTYtMyAyaC00di04aC0xMXYtM2w2LTVoMnYtMmgybDItNSAzLTEgMi00aDV2LTNsMTAtMnYtNWwzIDF6TTQ4MCAyNzl6Ii8+PHBhdGggZmlsbD0iIzIyNDBiYyIgZD0iTTMwMiAxMGgybC0yIDYgOC0xLTMgMXY2bC02IDJoLTRsLTIgNS00IDNoLTN2MmwtNyAyLTEgNCA5LTMgNC0xaDV2LTJoNWw0LTIgOSAxdjJsMTQgMXYtMmwxMC0xIDMtMXYtNmw1LTMgNS0xIDEtMWg2di0yaC04di0ybDgtMSAxLTRoMTV2M2g2djNsLTEwIDF2Mmw0LTEgMTcgMSA3LTIgMy0yIDcgMSAzIDF2MmgtNWwxIDcgMyAxIDUgMTVoMnY4bC0zIDVoLTZ2MTBsNy0zdjRoLTNsLTEgMy00IDJ2Nmw3LTF2NGgybDEtNCA0LTQgMiAyLTEgNGgybC0yIDYtMSAyIDEgOXYxMGgydi0zbDYgMXYyaDE1bDEgM2gybC0xIDQtMSAxLTggMXY0aDEwdjFsLTYgMiA1IDItMSAyLTE5IDEtNCAxLTIgNC01IDMtNCAxLTIgNy02IDMtNCA0LTEwLTEtMiA2LTEgMWgtMTN2MmwtNyAxIDMgNS01IDMtNSA1LTIgMXYtN2gzdi03bC03IDEtMSAxLTE2IDItNSAxdjRsNCAzdjNsLTEyIDEtNy0xLTMtMi0yOC0xdi03bC02IDEtNy0yIDEtM2gtNHYtNGwtNS0yaC02bDEtM3YyaDN2LTJsLTctMi0xLTYtNS0xdi05bC01LTJ2LTRsLTcgMi0xIDItMyAxLTMgNC01LTEgMS02IDItNiAxLTItNC0xLTEgM2gtM2wtMS0yLTYtMSAxLTMtMyAxIDEgNi01IDUgMyAzLTE5IDJ2M2gtM2wtMSA0LTUgMy00LTF2LTNoLTlsLTEgNy0xIDMgNy0xdi0zbDYgMiAyIDF2NWwtNSA4aC0ybC0xIDQtNyAyLTEyIDEtMyA0aDR2MmgtMnYybC0xMCA0LTYgMWgtMTdsLTItMXYtM2wxMy0yLTEyLTEgMS00IDctMSA1LTMgNC0xdi0ybC00LTItMS0xdi0xNGwtMiAyaC0zbC0yLTkgMS0ydi0xMGgtM3YtN2wtNC0xLTQtMXY0bC01LTEtMS0zLTE3IDEtNiAzaC0ybC0xIDQtNSA1LTIgMTFoLTFsLTEtMTAtMi0xIDMtNyAyLTJoMnYtNGw0LTMgMS00LTQtMWgxMHYtM2gxM2w2IDEtMy00IDItMyA0LTEgMTIgMi0yIDJoLTVsLTEgNmgydjJoNWw1IDUgMSA4IDUgMSAxLTRoMmwxLTMtNC0xLTItMy01LTV2LTFoNWwyLTkgNS0zLTEtMyA2LTIgMy0zIDItNWg3di0zbDYtMiAxLTEgMTQtMSAzIDJ2MmwtNCAxdjJsLTEwIDMtOCAyLTIgOSAyLTEgMjItMSAxLTItOSAxaC05bC0xLTMgNS0xIDUtMnYtNGgxMXYtNGg5bC0xIDIgOS0yIDUtMiA0LTFoM3YtNmwzLTYtNy0xdi0zbDQtMSAxIDIgMyAxdi0yaDR2LTRoMnYybDQgMXYtM2wtMy0xdi0zaDN2LTJsNC0yIDcgMSA0LTF2LTJoLTV2LTRsNS0zIDEtMmgzbDItNSAzLTJoN2wzLTNoOHYtNGgxMGwxLTNoNXYtMmg4di02aDNsMS01em05NCA5em0tMTIyIDd6bTQgMHptLTEyIDR6bTE1OSA0MnptLTI5NyAzMXoiLz48cGF0aCBmaWxsPSIjMWIyOThlIiBkPSJNNTY0IDBoMTE0djEwNmwtNSAzLTMgM2gtMmwxIDUtNCAydjNsLTIgMSAxIDQtNCAxdjJoLTZsMi05LTEtMyAyLTEgMS05LTQgMmgtNWwtMSA0LTUtMS0xLTF2LTVsNi0zIDItM2gtM3YtNGwtNSAxdi0yaDNsMS0xMC0xLTRoLTJsLTIgMTAtMiA0LTUgMS0yLTEtOCAxLTMtMS0xIDNoLTR2LTNsNS0yIDItNSAyLTItMS0zaC03bC0xIDRoMnYzaC0ydjJoLThsLTQtMS01IDJ2MmgtM3YybC0zIDFoLTEwdjJoM3YzbC0yIDFoLTEybC0yLTIgMS0xIDEwLTEtMi01IDQtMSAxLTQtMTMgMy0xNiAxLTItMi0xNS0xdi00bC03LTItNy0zdi00aC00di0ybC00LTItMy0zLTEtMlY1N2gybC0xLTEyLTEtMVYzNGwyLTZoM2wxLTcgMi0xdjJoNWwxLTcgNS01IDUtMyA1LTIgNC0xdjRsMi0xaDEwVjVoMmwxLTN6Ii8+PHBhdGggZmlsbD0iIzE4MTYzNyIgZD0iTTI4MCAyNzZoNHY0aDJ2MmgybDIgNSA2IDJ2NWwxNiAydjJsOCAxIDMgOHYyaC01djVsMiAzdjloLTJ2NGgtMmwtMSA0LTEgMmgtMmwtMSA1LTMgOC0xIDE0IDUgMSA3IDR2Mmw0IDF2Mmw1LTMgMi04IDEtN2gxM3YtNWwtNi0ydi0zbDgtMS0xLTQtMTItMyAzLTMgNy0zdi00bC03LTF2LTRsLTQtMXYtM2w0LTF2LTdsNy0yIDYgNiA0IDEgNSA1IDIgMXY3aDNsNSA2djJoMTZsMy02aDJ2LTRoMnYtMmw1LTMgMy0xdjJsNS00di00aDR2Mmw1IDIgOSA0IDUgNiA4IDN2M2w1IDIgNiA3IDIgMXYybDEyIDIgMTQgMXYybDUgMiAxIDQgNCAxIDQgNHYyaDJsMiAzIDQgMSAzIDMgNSAyIDMgNXYzSDE5M3YtM2gybDItNSA0LTVoMnYtNGg1di0yaDJ2LTJoMnYtMmgydi0ybDQtMiAzLTYgOC00IDEtMmgybDItNCAzLTJoM3YtMmgydi0ybDYtMnYtMmgzdi0ybDQtMiAxLTJoMnYtMmw1LTIgNS0zdi04bDcgMXYtMmwtNi0xIDItMS0xLTItMi0ydi01bC0yLTF2LTJoLTJ2LTRoMnYtNGgzbDEtNCAyLTN6Ii8+PHBhdGggZmlsbD0iIzEzMTU0OSIgZD0iTTY1NCAxMzRoMnYybDE2LTJ2N2wtMyAxLTEgMmgxMHYyMzdoLTk3di0zbDctMiA4LTEgMjAtMSA4LTEtNC0xIDEtNS02LTItMTAtMXYtM2w2LTJoNWwxLTEgMTgtMSA5LTJ2LTNsOC0xdi0zbC00LTEtMS0yLTEyLTEtMy0xaC0xNnYtMmwtMzMgMS0xIDJoLTE4di0zaDR2LTJsMy0zIDEzLTF2LTJsLTE2LTEtMjQtM3YtNmgzMXYtMmwtOC0xdi0zbC03LTJ2LTJsNy0xIDMtMmg0NmwxLTQgMiAxdi0ybC03LTNoLTlsLTMtMnYtM2w4LTQgOC0xLTEtM2gybDItNiAzLTF2LTJoMnYtMmgxNXYtMmwtNS0xIDEtNyAxLTIgNC0xaDlsMS0zaDNsMS04IDMtMTEgMi0xOSAxLTIwLTMtM3YtNWwtMTEgMS02IDItMTAtMXYtM2wtNiAydi0yaC0ydjhsLTQgMmgtNXYtM2wtMiAxLTEgNy0yMSAzLTItMSAyLTQgMTctNWgzdi0xMWwxLTNoLTJ2LTNoMnYtNmw4LTNoNnYzaDhsNC02LTMgMmgtNHYtOGgtMTF2LTNsNi01aDJ2LTJoMmwyLTUgMy0xIDItNGg1di0zbDEwLTJ2LTVsMyAxeiIvPjxwYXRoIGZpbGw9IiMyNzQ3YzEiIGQ9Ik02MDQgOThoMmwtMiA3LTEgMiA5LTMgMS0yIDYtMSAzIDEgMTItMyA2LTF2MmgtMnYyaC0ybC0xIDQtNyAyLTEgMmgtNWwtMiA0LTMgM3YxMGwzLTF2NWwtNCAxdi0zbC01IDJoLTV2LTNoLTNsLTEgNCA0IDF2M2wxNi0xIDQtM2gzbDEgNi00IDF2NmwtMSAxaC01di0yaC0zbC0yIDUtNSAyLTEgMi05IDMtNyAxLTEgMWgtOHYybC01IDEtMSA1aC0ybC0xIDRoLTVsLTIgNS00IDEtMiAzaC0ybC0xIDQtNyA2LTIgNC00LTEgMi00IDItNy05IDEtMiA0LTYgMy01IDMtMTEgMmgtMTBsLTMtMWgtMjhsLTItNy00LTItMTQgMS0xNS0xaC02bDItNCA1LTIgMS0yaDJ2LTJoMTJsMSAzIDgtMWg5djNoNmwxLTNoMnYtOGw0LTEgMSA0IDEwIDJ2MmgtM3YyaDJ2MmgtMnYzbDIwIDJ2LTJsNy0xIDEtNCA0LTl2LThsLTItMTAtMy01LTYtNS01LTFoLThsLTIgMnY1bC02IDJoLTNsLTIgNC00IDJoLTd2LTJsLTUgMmgtNHYtMmwtOSAyIDIgMTYtOCAxLTItMXYtMmgydi0xMmgtM2wxLTQgOC0zaDJ2LTRsLTggMS0yLTJoMnYtM2w3LTIgMS0zLTkgMS03IDItMS02IDQtNGg0bDEtMSA5LTEtMS00IDQtNyA5LTEgNS0zaDJsLTEtMTBoMnYtM2gzdjZoMmwxLTUgNCAyIDIgNyA1LTUgMiAxLTUgNiA3IDEgMSA2IDE1IDEgNSAxdi0zbC0xMi0xLTItNS0yLTJ2LTNoMnYybDQtMSAzIDEgMSA0aDJ2LTVoOXYyaC02djZoNWw4IDMgMiA0IDMgMS0xLTNoNmwtMS02di0ybC0xLTVoMTVsNiAydjNoN2wxIDQgMTAgMXYtNGgtNnYtMmg0bC0xLTQgNy0xaDEwdi0ybDMtMnoiLz48cGF0aCBmaWxsPSIjMjQxODU1IiBkPSJNMzg0IDIwN2g0bDEgMTIgMiA3djZoLTExdjJoNGw0IDE0aDlsMiAxdjNoMTF2M2gtMTJsNCA3IDEgMjAgMiAxMSAxIDEgMSAxOCA0IDEgNSAyIDE0IDMgMSA1IDUgMSAxIDMgMTMgMSA2LTEgMiAxaDM0djJsOCAxdjJsMi0xIDktMSAzLTFoNXYybC0xNiAyLTEgNi0xMSAxLTYtMWgtMTdsLTUgMS0xLTMgMi0xIDI0LTF2LTJoLTE0di0zaC0yNHY0bDggNSA1IDIgMSAzIDggM3YxaC0xM2wtOS0yLTItMXYtMmwtNC0yLTQtNHYtMmwtNS0ydi0zbC02LTEtMy0ydi0ybC00LTJ2LTJsLTktMy01LTN2LTJoLTRsMSA1LTQgM2gtMnYtMmwtNSA0aC0zdjJoLTJ2NGgtMmwtMSA0LTIgM2gtMTJsLTQtMS01LTZ2LTJoLTN2LTdsLTUtMi0yLTQtNS0xLTYtNS02IDF2N2wtNCAxdjNoNWwtMSA1IDcgMSAxIDQtMTAgNSAxMSAzIDEgNS0yIDFoLTZ2M2w2IDIgMSAzLTEgMmgtMTNsLTEgMTMtNCA1aC0zdi0ybC00LTF2LTJsLTUtMi03LTN2LTE0bDUtMTNoMmwyLTZoMnYtNGgybC0xLTktMi0zIDEtNWg1bC0zLTktOC0ydi0ybC0xMi0xLTQtMmgzdi0ybDExLTEgMi0yaDRsMi00IDYtMSAyLTUgNS02IDItMSA0LTEwaDV2MTBsNSAyIDYgNyA1IDQgNiAydjJsNy0xLTEtN3YtMTZsMi04LTQtMXYtMmg2bDQgMiAxLTVoNHYtOWgtMTNsLTctMXYzaC0zbC0xIDZoLTJsLTEtM3YtMTJsMSAzaDNsMS0xMGgzdi05aC0ydi03bDItMiAxNC0xeiIvPjxwYXRoIGZpbGw9IiMxMTFiNWQiIGQ9Ik01ODAgMTkwaDJsMiA0IDIgMXYxM2wxIDQgMiAxIDEtMyAxIDIgMTMtMmg2di03bDMtMXYzbDktMnYtOGwzIDEgNS0xdjNoMTBsNi0yaDExbDIgNiAyIDItMiAzMS0zIDE2LTMgMTEtMyAxLTEgMi0xMyAxLTIgOSA1IDF2MmgtMTV2MmgtMnYybC0zIDItMyA2IDEgMy05IDEtNiAzaC0ydjNsNyAxIDggMSAxIDEgOCAxdjFoLTV2MmwtMzEtMi0yMS0zIDEtNGg0bDEtNSAxMS0xLTItMyAyLTcgMi0yaDR2Mmg2di0ybDYtMyAxLTEwaC0zdi0yaC0xNnYtMmgtM3YtMmgtNXYtMmwyLTFoMjJ2NGg3bDQgMWgxM3YtNWwtMTAgMS0zLTF2LTJoLTN2MmwtOC0xLTItMXYtMmwtMjYgMS0xIDFoLTdsLTEtNGg1di0ybDI2LTEgMS00aDJ2LTJsMi0xIDEtM2g0di0zaC00djJsLTEwIDEtNiAyLTEwIDEtNiAyaC04djNsLTE3IDItNC0xIDEtNCA5LTMgMi0zLTEyLTFoLTMxbC05IDEtMSA0LTQgMy0yIDVoM3YzaC0xMnYtM2gtMmwtMi04LTExLTQtNi0yLTYtMyAxIDQtMzggMS01LTF2LTVoOWwxIDMgMiAxIDEtNCAxMi0xIDcwLTFoNDV2LTNsNS0yIDMtNSA0LTMgNS0xIDItNiA1LTJ2LTEyeiIvPjxwYXRoIGZpbGw9IiMyOTQzYjMiIGQ9Ik0yNDAgMjM5aDEybDIgMi0xIDItOCAxdjJsOCAxLTQgMS0xIDItNiAyLTYgNC0xIDkgNy0xdi0yaDZ2N2wtNCAxdjJoLTJ2M2gtMmwyIDR2M2w3LTMgNS0xdjRsNSAxIDMgMSAyIDkgMyAxM3Y0bC03IDItOSAxLTMgMXYtNWwtMTEgMS05IDJoLTlsLTEtNGgtN3Y1aC0xMWwtMTgtM2gtMzBsLTEgMy0xLTItNiAxIDMtNnYtNmwtMS0xLTEwLTF2LTJoMnYtMmgydi03bC00LTEgMS04IDQtMyAxLTdoLThsNC0ydi03bDE3LTIgMS0xaDE1bDQgMSAyLTNoMnYzbDItMmgxOXYtMmgxN3YtNGwxMS00IDQtMnYtMnoiLz48cGF0aCBmaWxsPSIjYzU5YzNjIiBkPSJNNTY0IDBoMzV2Mmw1IDEgMSA5aDN2M2w2IDF2MmgybDEgOC0yIDdoLTJsMSA1djE0bC0yIDEtMiA5aC0ydjNoLTJsLTEgNS04IDQtMiA3LTUgMi0yIDZoLTIzdjNoLTd2LTZoLTR2MmwtNy0ydi01aC00bC0xLTQtMi0xLTItMTMtNy0yIDQgNnYzaC0zdi00aC0ybC02LTEwLTItOFYzMGgydi00aDJsMSA2IDEtNiAxLTEwIDYtMXY2aDJsMS01IDUtMSAxIDMgMiAxdi03bDQtNWg3VjVoMmwxLTN6Ii8+PHBhdGggZmlsbD0iIzNlNTRhMiIgZD0iTTUwNCAxMzhoOGw3IDIgMiA0IDQgMiAyIDQgMiAxMHY4bC00IDggMiAxLTMgMS0xIDMtNyAxdjJoLTEybC04LTJ2LTNoMnYtMmgtMnYtMmgzdi0ybC04LTEtMi0xLTEtM2gtNHY4aC0ybC0xIDQtNi0xdi0zbC0xNyAxLTItMi0xMS0xdjJoLTJsLTEgMy01IDItMSAyaDEybDE1IDEgNy0xIDUgMyAyIDZoMjdsMyAxaDEwbDE0LTMgNS00aDNsMi01IDktMSAxIDItMyA3LTEgM2gzbDMtNSA2LTUgMS0zIDQtNGg0bDItNWg1bDEtNCA1LTJoNXY0bDYtMSA2IDEtMSAyaC0ybC0xIDNoLTJ2M2wtNyAyLTEwIDUtNS0xdi0zaC0ydjJsLTMgM2gtNGwtMSAzLTMgMS0zIDVoLTJ2MmwtMyAxIDE3IDJ2M2wtNiAydjVoLTNsLTEgNC02IDQtMTAgMmgtMTVsLTQgMmgtMjV2LTVsLTI2LTEtMy0ydi0ybC0xMC0yLTItNWgtMTJ2LTNsLTMgMSAyLTVoLTEwbC0xLTYtNyAyLTEwIDItMyAydi00bC0yLTEtMS00LTggMS0zLTEtMiA2LTggMS0xLTMgOS00IDUtM2gydi00aC01bDMtNGg4djRoOHYtNGw1LTMgMTUtMiA2LTNoOWw1IDJoOGwtMi02di0xMGw0LTJoNXYybDUtMmg0djJsOC0xIDUtNSA4LTJ2LTZ6Ii8+PHBhdGggZmlsbD0iIzFiMmQ5MCIgZD0iTTI2NyAzMDdoMXY1bC00IDMtNyAyLTEgMS04IDEtNiAyLTQgOC01IDQtOSAxLTEgNS04IDctMTAgNS0zIDEtMSAzLTYgMi0xIDNoLTJ2MmgtMTNsLTEwLTNoLTlsLTggMi0yNC0xLTMgMS0xMS0xIDEtNSAxLTEgMjItMXYtMmgtMnYtMmg0di0yaDl2LTJsLTIwLTEtMTAgMS0yIDIgNSAzdjJoLTE4bC0xNC00LTctMXYtMmwyLTFoMTF2MmwxMCAxIDEtNWgtM2wxLTUgNyAxdi0xMGwtNSAxLTMgMS0xLTJoLTRsLTUgMy00LTMtMiAxLTIgMy02IDJINTRsLTMtMS0xLTItMiAxdi0xMGw1IDJoM3YtMmwyNC0yIDItMiA3LTF2LTFoNnYtMmg5djJsNS0xIDIxIDEgNiAxdjJsLTggMi0xOCAxdjJsMTUtMSAzLTEgMTYtMSAzLTEgMS00aC0zbC0xLTQgNi0xIDEgMSAxLTIgMzItMSAxNiAzaDlsMi00aDdsMSA0IDE2LTIgMi0xaDExdjVsMy0yIDE2LTJ6Ii8+PHBhdGggZmlsbD0iIzFlNDJiNyIgZD0iTTUwOCAyMzZoMzFsMTMgMS00IDYtOCAyLTEgMyA3IDJ2MmwtMjYgMiA4IDF2MmwxNiAxIDggMiAxOSAydjVsLTEgMS0xMyAxLTIgNWgtNGwtNi0xLTUgNC00IDRoLTlsLTEyLTEtMTAgMy0yIDItMjItMS0yLTN2N2wtNC0xLTMtM2gtMTJsLTMgNCAxIDIgMyAxLTEgMiA0IDEgMSA0IDE4IDF2NGgtM3YyaDE2bDExIDEgMSAyLTEgMi0zIDFoLTE2bC0zMS0xLTEgMS0xMCAxLTMgM2gtMjNsLTktMy0zLTMtMy0xNS0yLTYtMS02di0yMGgxbDEgMjBoMjh2LTJoLTE2di0yaC0ydi00aDR2LTJoMjVsMS0zIDEzLTIgMS0zaDIydi0zaDI0djJsMjQgMXYtMmg4di0ybC0yNy0xdi0xaC00MXYtM2wtNTQgMXYtM2wxMC0yIDU2LTEtMi00di00aC0ybDEtMiA0IDR2NmgydjNoMTJ2LTNoLTNsMi02IDQtMiAxLTR6bS0yOCA0M3oiLz48cGF0aCBmaWxsPSIjMzQ0NDhkIiBkPSJNNjU0IDEzNGgydjJsMTYtMnY3bC0zIDEtMSAyaDEwdjEyMmgtMmwtMiA0LTEzIDEwLTEwIDYtMSAxLTE3IDN2LTJsNy02IDMtNiA1LTIgMy0xMmgybDEtOCAzLTExIDItMTkgMS0yMC0zLTN2LTVsLTExIDEtNiAyLTEwLTF2LTNsLTYgMnYtMmgtMnY4bC00IDJoLTV2LTNsLTIgMS0xIDctMjEgMy0yLTEgMi00IDE3LTVoM3YtMTFsMS0zaC0ydi0zaDJ2LTZsOC0zaDZ2M2g4bDQtNi0zIDJoLTR2LThoLTExdi0zbDYtNWgydi0yaDJsMi01IDMtMSAyLTRoNXYtM2wxMC0ydi01bDMgMXoiLz48cGF0aCBmaWxsPSIjMjczMzg4IiBkPSJNMTI1IDIwNmgxOXYybC0xNCAzLTUgNi0xIDR2MTRsMiAxMSAzIDEwaDJ2Mmw2IDEgMS0zaDJ2LTJsNC0xdjJsMy0xIDEtMmgtMTdsLTItMSAxLTIgNS0xaDQ5bDMzIDF2NGgtMTd2MmwtMTggMS0zIDF2LTNoLTJsLTIgNC00LTFoLTE1bC0xIDEtMTYgMnY2bC0xIDEgNCAxdjdsLTQgMy0xIDggMyAxdjdoLTJ2MmgtMnYyaDEwbDIgMnY2bC0zIDV2NWgzbC0xIDUtMyAxLTE2IDEtMyAxaC0xNXYtMmwyLTEgMTYtMSA4LTF2LTJsLTMyLTF2LTJoLTl2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTEgMS01aDh2Mmg3bDEtNC0xNS0xdi0zbDgtMy0xLTQgMS0xaDd2LTJoMTB2LTNINzJsLTItMXYtM2w4LTMtMi00aDEzdi0ySDc3di0ybDUtM2gzbDEtNWg2bC0xIDhoNGwxIDZoLTJ2M2gtNHYybDEwLTMgNC0zIDgtMXYtM2g0bDEtM2gzbC0yLTYgNSAxIDUgM2gzbC04LTQtMy0zLTgtNXYtMmgtMnYtMmgtMmwtMy04di0xMGw4LTE2IDYtNCA1LTJ6Ii8+PHBhdGggZmlsbD0iIzQ1NTg5ZSIgZD0iTTIxOCAxNDRoMTlsMyA3IDEgMyA2IDF2NGg1djRsLTUgMy0xIDJoMnYybDUtMmg2djJoNWw0LTJ2N2wtOCAzLTIgMWgxMGw0LTMgMyAxIDIgNi03IDMtNSAxaC05djJsNSAxIDE1IDMgNCAzdjNoOHYxbC0xMSAyLTUgMi0zMi0ydi0zbC0xNi0xLTgtMS0xLTItNi0yLTE3LTF2LTRoOGwyLTQtMS02LTEtNGgtMmwtMS00di04aDNsMS03IDctNiA4LTN6Ii8+PHBhdGggZmlsbD0iIzU5NWU4YiIgZD0iTTU4MSAxNjRoNXY0bDYtMSA2IDEtMSAyaC0ybC0xIDNoLTJ2M2wtNyAyLTEwIDUtNS0xdi0zaC0ydjJsLTMgM2gtNGwtMSAzLTMgMS0zIDVoLTJ2MmwtMyAxIDE3IDJ2M2wtNiAydjVoLTNsLTEgNC02IDQtMTAgMmgtMTVsLTQgMmgtMjV2LTVsLTI2LTEtMy0ydi0ybC0xMC0yLTItNWgtMTJsMS00IDItMyA3LTF2LTFsLTUtMXYtMmw2LTNoMTJsMS0yaDVsMiAydjRsLTUgMXYyaDJ2MmgzbDEtMyA5LTFoMzNsMTQtMyA1LTRoM2wyLTUgOS0xIDEgMi0zIDctMSAzaDNsMy01IDYtNSAxLTMgNC00aDRsMi01aDVsMS00eiIvPjxwYXRoIGZpbGw9IiMyYzQ2YzEiIGQ9Ik00OCAxMzdsNSAxdjFsLTUgMS0xIDRoMThsLTEtNCAyLTIgNCAydjJoMnYybDIgMWgzbDItMS0xIDUtNCAzLTEgNGg0bDMgN3Y5bDEgNi0xIDZoMmwxIDZoNXYybDMgMXY3bC05LTItMi0xaC03bC01IDEtMiA0LTMgNy03LTF2LTJsLTE2LTEtMS0xdi0yMGwtMy0xLTItM3YtM2wtOC0yLTItMi0xNi01LTctNC0xLTQgMTQgMyAyIDRoOGwxLTVoM3YtOWwtNC0ydi0ybDEwIDEgNSAyIDItNiAzLTIgMi02eiIvPjxwYXRoIGZpbGw9IiM2NDY3N2QiIGQ9Ik01NjQgMGgzNXYybDUgMSAxIDloM3YzbDYgMXYyaDJsMSA4LTIgN2gtMmwxIDV2MTRsLTIgMS0yIDloLTJ2M2gtMmwtMSA1LTggNC0yIDctNSAyLTIgNmgtMjN2M2gtN3YtNmgtNHYybC03LTJ2LTVoLTRsLTEtNC0yLTEtMi0xMy03LTIgNCA2djNoLTN2LTRoLTJsLTYtMTAtMi04VjMwaDJ2LTRoMmwxIDYgMS02IDEtMTAgNi0xdjZoMmwxLTN2NGwtNCAxdjhsLTMgMXY2bC0zIDggMSA2IDUgMXYyaDVsMiA2IDMgM2gxMHYtMmg0djJoMnYzaDh2M2gtNmwtMiA1IDMtMWg3bDEgMWgxM2w4LTQgMi00aDJ2LTJsMi0xdi02aDJsMS01aC0ybDEtNC03LTEtMS00IDItNWgtMmwtMS0xMyAxLTQtNC0xLTItMnYtOGwtMTMtM2gtOGwtOCAxLTMtMmgzVjVoMmwxLTN6Ii8+PHBhdGggZmlsbD0iIzMzNmJkZSIgZD0iTTQ1NSAyMzJsNyAzIDYgMiA4IDN2MmgybDIgOC04IDEtNDggMS0xMCAxdjNsMTAtMWg0NHYzbDEyLTFoMzJ2MWwyMiAxIDIgMXYyaC04djJoLTE4bC02LTF2LTJoLTI0djNsNCAxaC0xNmwtMTAtMS0xIDQtMTMgMi0xIDJoLTI1djJoLTR2NGgydjJsOC0xaDE2djFoLTh2MmwtNSAyLTEtMS0yMi0xLTEtMnYtMThoLTJsLTMtNHYtM2gxMnYtM2gtMTF2LTNsLTMtMXYtM2g3di0ybDItMWg3bC0xLTcgOCAyIDM3LTF6Ii8+PHBhdGggZmlsbD0iI2YxZDgxNCIgZD0iTTYzMSAxNTlsMTAgMSA4IDMgMTMgNSAxMiA4IDQgM3Y4N2gtMmwtMiA0LTEzIDEwLTEwIDYtMSAxLTE3IDN2LTJsNy02IDMtNiA1LTIgMy0xMmgybDEtOCAzLTExIDItMTkgMS0yMC0xLTEtMi0xNi05LTE1LTMtMnYtMmwtMy0xdi0zbC03LTF6Ii8+PHBhdGggZmlsbD0iIzExMTY0ZSIgZD0iTTE1NSAyMTJoMnYxMWgzbDEtNGgybDEgNCA0IDIgMS04IDUtMSAzIDEwIDkgMiAxLTggNCAyIDQgOSA1IDIgOCAxIDQ2IDJ2MWwtNiAyLTE2IDJ2MmwtNiA0LTcgMmgtODRsLTUgMSAxIDFoMTNsNCAxLTEgMy03LTF2MmwtMyAzLTYtMXYtMmgtMmwtNC0xMC0yLTExdi0xMWg0bDEgNCAxMCAxdi00bDktNGg1eiIvPjxwYXRoIGZpbGw9IiM3NTUyOGQiIGQ9Ik0zMzcgMjYxaDV2N2gtMnYtM2gtM2wtMSA5LTkgMTEtNiA0IDEgM2gzbDEgNC0xIDkgMi0xIDEzLTF2LTZsNiAzdjRoOWwtMSAzaC04bDggNCA1IDUgMSAzaDJsMi00IDctM2g1di0zaDN2LTJoNHYxMmwtNCAyLTUtMS01IDYtMSAzaDNsLTIgNGgtM2wtMy0zdi0yaC0zdi03bC01LTItMi00LTUtMS02LTUtNiAxdjdsLTQgMXYzaDVsLTEgNSA3IDEgMSA0LTEwIDUgMTEgMyAxIDUtMiAxaC02djNsNiAyIDEgMy0xIDJoLTEzbC0xIDEzLTQgNWgtM3YtMmwtNC0xdi0ybC01LTItNy0zdi0xNGw1LTEzaDJsMi02aDJ2LTRoMmwtMS05LTItMyAxLTVoNWwtMy05LTgtMnYtMmwtMTItMS00LTJoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTF6Ii8+PHBhdGggZmlsbD0iIzMxMjg4NyIgZD0iTTM4NCAyMDdoNGwxIDEyIDIgN3Y2aC0xMXYyaDRsNCAxNGg5bDIgMXYzaDExdjNoLTEybDQgNyAxIDIwIDIgMTEgMSAxdjdsLTItMS0zLTE1LTEtMjMtNi0yLTUtMS0zIDF2Mmg0bDEgMTggMSA0aDJ2MmgzbDEgNi00IDJ2MmgybDIgMy0xIDYtMyAzLTExLTJ2LTVsLTQgMS0yLTItNS0ydi02aC01bC0xLTQgNS0xLTEtN3YtMTZsMi04LTQtMXYtMmg2bDQgMiAxLTVoNHYtOWgtMTNsLTctMXYzaC0zbC0xIDZoLTJsLTEtM3YtMTJsMSAzaDNsMS0xMGgzdi05aC0ydi03bDItMiAxNC0xeiIvPjxwYXRoIGZpbGw9IiMxNzI3ODgiIGQ9Ik01OSAzNjBoMzNsMTUgMyA4IDQgOSAxdjNoMjh2LTJoMnYtMmw2LTFoMjJsLTIgNS0zIDItMSAzaC0ybC0xIDVINDR2LTZsLTctMS0yLTRoMTNsNCAxdjJoMTJ2M2wyLTQgMTQtMXYtM0g0M3YtNWw1LTJ6Ii8+PHBhdGggZmlsbD0iIzQyNTI3MiIgZD0iTTEzMSAwaDIzbC0xIDcgMTIgMiAxIDQtMSAzaDJsMiAzIDEtMWg4djExbC0yIDUtNSAxLTIgNC0xIDMtNiAzLTEwIDJoLTExbC0xMC03LTgtMi0zLTR2LTJoLTJsLTItNnYtOWwzLTUgMTMtMi0xLTN6Ii8+PHBhdGggZmlsbD0iIzBmMTg2MSIgZD0iTTU2OSAzMTBoNDd2MmwzLTEgMiA5IDMgMSAxIDQgMiAxdjdsLTIgMyA3LTEgMiA2aDJ2MmgtMjB2LTJsLTMzIDEtMSAyaC0xOHYtM2g0di0ybDMtMyAxMy0xdi0ybC0xNi0xLTI0LTN2LTZoMzF2LTJsLTgtMXYtM2wtNy0ydi0ybDctMXoiLz48cGF0aCBmaWxsPSIjNGE1ODliIiBkPSJNNTQyIDRoM3Y0bDUtMS0zIDUtMSA3LTMtMXYtM2wtNSAxLTEgNWgtMnYtNmwtNiAxdjEzbC0yIDQtMS0xdi02aC0ydjRoLTJsMSAxOCAzIDEwIDQgNnYyaDJ2NGwzLTItNC01di0ybDcgMSAyIDR2MTBsMyAxdjRoNHY1bDUgMSAyIDF2LTJoNHY2aDd2LTNoMjNsMS02IDYtMyAyLTcgNC0yIDMgMS0xIDIgMy0xIDItMyA0IDEtMSA1aDJsLTEgNi0xIDNoLTJsLTEgNC03IDVoLTJ2MmgtM3YybC0zIDFoLTEwdjJoM3YzbC0yIDFoLTEybC0yLTIgMS0xIDEwLTEtMi01IDQtMSAxLTQtMTMgMy0xNiAxLTItMi0xNS0xdi00bC03LTItNy0zdi00aC00di0ybC00LTItMy0zLTEtMlY1N2gybC0xLTEyLTEtMVYzNGwyLTZoM2wxLTcgMi0xdjJoNWwxLTcgNS01IDUtMyA1LTJ6Ii8+PHBhdGggZmlsbD0iIzRlNzdkYyIgZD0iTTE5NCAxOTZoMTJsMiAydjE1bDExLTEgNSAxIDEgNmg2djNoLTZ2N2w5LTMgMy0yIDExIDF2Mmw4IDEtMSA0IDIgMS0xIDFoLTU2bC02LTMtNS0xMC0yLTEtMSA4LTktMi0zLTh2LTJsLTQgMS0yIDgtNS0ydi00aC0ybC0xIDRoLTN2LTEybDYtMiAxLTdoLTR2LTJoMnYtMmgxMnYyaDR2MmwxMC0xIDYtMnoiLz48cGF0aCBmaWxsPSIjNTE1YTgyIiBkPSJNMTE5IDEyMGw1IDEgMiA0IDEgMTEtMSA5IDMtMS0xIDEwLTQgMi0zLTEtMSA0LTIgNmgtMTF2LTRsLTE5IDEtNyAxLTEtMXYtNWwzLTQgMS0xOSAzLTNoNHYtNWw2LTRoMTdsNSAyeiIvPjxwYXRoIGZpbGw9IiM1MTU2ODUiIGQ9Ik04NiAyNjBoNmwtMSA4aDRsMSA2aC0ydjNoLTRsMSAzaDVsMSAyaDJ2LTJsOS0xLTIgNC0zIDEtNCA4LTE3IDJ2MWw5IDIgOSAxdjRoLTJ2Mmw0LTF2MmgxMHYyaC0zdjVsMTktMSAxNiAxIDEgNGgzbC0xIDUtMyAxLTE2IDEtMyAxaC0xNXYtMmwyLTEgMTYtMSA4LTF2LTJsLTMyLTF2LTJoLTl2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTEgMS01aDh2Mmg3bDEtNC0xNS0xdi0zbDgtMy0xLTQgMS0xaDd2LTJoMTB2LTNINzJsLTItMXYtM2w4LTMtMi00aDEzdi0ySDc3di0ybDUtM2gzeiIvPjxwYXRoIGZpbGw9IiM0YjU2ODAiIGQ9Ik0yMTggMTQ0aDE5bDMgNyAxIDMgNiAxdjRoNXY0bC01IDMtMSAyaDJ2Mmw0IDEtNSA1aC05bC00IDRoLTJ2NWgtN2wtNC00di0yaC04bC03LTEtMS0xNC0xLTF2LTdsNC03IDgtM3oiLz48cGF0aCBmaWxsPSIjOGU3ZTVlIiBkPSJNNTMyIDE1aDN2NmgybDEtM3Y0bC00IDF2OGwtMyAxdjZsLTMgOCAxIDYgNSAxdjJoNWwyIDYgMyAzaDEwdi0yaDR2MmgydjNoOHYzaC02bC0yIDUgMy0xaDdsMSAxaDEzbDgtNCAyLTRoMnYtMmwyLTF2LTZoMmwxLTVoLTJsMS00LTctMS0xLTQgMi01aC0ybC0xLTEzIDMtNWgybDEgNSAyIDF2M2g0djlsMyAzdjdsLTIgNmgtMnYxMWwtNiAzLTEgM2gtMnY2bC0xIDEtMTEgMi01IDNoLTE0bDEtNi03LTF2Mmw0IDEtNCAxaC0xM2wtMS00LTItMS0yLTEzLTctMiA0IDZ2M2gtM3YtNGgtMmwtNi0xMC0yLThWMzBoMnYtNGgybDEgNiAxLTYgMS0xMHoiLz48cGF0aCBmaWxsPSIjMzcxMjYxIiBkPSJNMjgwIDI3Nmg0djRoMnYyaDJsMiA1IDYgMnY1bDE2IDJ2Mmw4IDEgMyA4djJoLTVsLTEgOS0zIDRoLTV2LTEybC00IDEtMSAzaC04bC02LTFoLTEwbC04LTItNC00IDcgMXYtMmwtNi0xIDItMS0xLTItMi0ydi01bC0yLTF2LTJoLTJ2LTRoMnYtNGgzbDEtNCAyLTN6Ii8+PHBhdGggZmlsbD0iIzE1MjQ2OSIgZD0iTTM1NiAyMTVsNCAxdjVsLTMgMi0yIDYtMSAxNCAyIDd2Mmg2djNoLTM1di0ybDE1LTEtNy0xMi0xMCAxdi0ybC0zIDFoLTE0bDEgOWgtM3YtOWgtOWwxIDV2N2wtMS0yaC0ydi0ybC03LTEgMiA5LTEgNy04IDF2LThsLTMtMTYtMS00IDEtMTIgMS0yaDNsMS00aDRsMiA2IDUgMSAxIDkgMSAzIDQtMiAyMC0yaDI2di0zaDN2LTRoMmwxLTNoMnoiLz48cGF0aCBmaWxsPSIjNGU3MmQ1IiBkPSJNMCAxNjBsMTQgMyAyIDRoOGwxLTUgMy0xaDEybDUgNSAxIDUgNSAyLTEgNmgtMmwtMSA1IDQgMiA3IDkgNCAxdi00aDJ2LTJoMmwxLTNoMnYtNWwxMSAxIDMgM3Y0aDV2MmwzIDF2N2wtOS0yLTItMWgtN2wtNSAxLTIgNC0zIDctNy0xdi0ybC0xNi0xLTEtMXYtMjBsLTMtMS0yLTN2LTNsLTgtMi0yLTItMTYtNS03LTR6Ii8+PHBhdGggZmlsbD0iIzMyNDM4ZCIgZD0iTTQ1MyA2NGg1bDMgMyAxMSAxIDUtMSAzIDggMyA4IDEgNWg0djNsLTMgMi0xIDMtMyAxLTEgM2gtMnYzbC03IDQtNSAxaC0xNmwtMi01LTEtMTIgMS0xMSA0LTIgMS0zIDMtMXYtNGwtNS0xeiIvPjxwYXRoIGZpbGw9IiMyNjU1YzUiIGQ9Ik0xNzcgMjU0aDJ2M2wyLTJoMTlsMyAydjVoMnYtNmwxMCAyIDEgMyA1IDIgMSAzLTIgNGgydjJoMnYyaC0ybC0xIDQtMyAyLTEtMS03LTEtMS04LTEgMS0yMS0xdjZsLTcgMnYybDEwIDQgMSA0LTMgMmgtM2wtMSA2aDVsLTIgMmgtMTFsLTEyLTJ2LTNsNC0yIDYtMXYtM2gydi0ybC04LTEtMi0xdi02aDExdi0yaC02di0xN2g1eiIvPjxwYXRoIGZpbGw9IiMyODI0NWQiIGQ9Ik0zMzcgMjYxaDV2N2gtMnYtM2gtM2wtMSA5LTkgMTEtNiA0IDEgM2gzbDEgNC0xIDkgMi0xIDEzLTF2LTZsNiAzdjRoOWwtMSAzaC04bDggNCA1IDUgMSAzaDJsMi00IDctM2g1di0zaDN2LTJoNHYxMmwtNCAyLTUtMS01IDYtMSAzaDNsLTIgNGgtM2wtMy0zdi0yaC0zdi03bC01LTItMi00LTUtMS02LTUtNiAxdjdsLTQgMXYzbC0xMCAzLTIgMS0yLTEwLTEtNCAxLTJoNWwtMy05LTgtMnYtMmwtMTItMS00LTJoM3YtMmwxMS0xIDItMmg0bDItNCA2LTEgMi01IDUtNiAyLTF6Ii8+PHBhdGggZmlsbD0iIzJlMmY1NiIgZD0iTTI2OCAzMTFsMSA0LTcgNWgtNHYyaC0ybC0yIDRoLTN2MmgtM3YybC02IDJ2MmgtMnYybC02IDMtMiAzaC0ybC0yIDQtNyAzLTMgNi00IDF2MmgtMnYyaC0ydjJoLTJ2MmgtNXY0bC01IDUtMyA1aC0ydjNoLTIwbDEtNWgybDEtNCA0LTRoM2wxLTQgMy0yaDR2LTJsNi01aDNsMS00IDExLTUgNi00IDQtNCAxLTQgMTEtMyA1LTcgMi00IDYtMiA4LTEgMi0yIDctMnoiLz48cGF0aCBmaWxsPSIjMWUzMTk2IiBkPSJNMjA4IDIzNGg1NHY1bC0zIDF2NWwzIDEgMSA2IDQgMSAyIDEtMSAxMGgtMnYyaDJsMSA0IDMtM2gzbC0xIDMtNSAyLTEgNGgtMmwtMi05aC0zbDEgNy0yIDEtMSAzaDRsLTEgNi01LTEtMy0xdi00bC03IDMtNSAxLTItNHYtM2gydi0zaDJ2LTJsMy0xIDEtN2gtNnYybC03IDF2LTlsNS00IDYtMyAzLTEtNC0ydi0ybDgtMS0xLTMtNC0yIDEtMS00MS0yeiIvPjxwYXRoIGZpbGw9IiMyMDI0NGUiIGQ9Ik02NTAgMjYybDEgMi0zIDEwLTUgMy0zIDYtNSA1aC0ydjJsMTAtM2g1bDEgM2g0bDEgMy02IDFoLTEybC0xMi0xIDEgMyA5IDF2MmwtNCAxIDIgMSAxNCAxIDcgMnYxbC01IDFoLTExbC0xIDRoLTE5di0zaDJ2LTJsLTctM2gtOWwtMy0ydi0zbDgtNCA4LTEtMS0zaDJsMi02IDMtMXYtMmgydi0yaDE1di0ybC01LTEgMS03IDEtMiA0LTFoOXoiLz48cGF0aCBmaWxsPSIjNTA1ZmI1IiBkPSJNMzk1IDE4MGg3djRsLTYgMy00IDMtNSAxdjNsNy0xdjNsLTggMy0xMiAzaC00bC0yIDZoLTd2MWwtMjMgMS0xIDEtMTggMS0xIDRoLTEybC00LTEzLTgtMnYtMWgxMmwxNC0xaDExbC0xIDUgNiAxdi0zbDI4LTIgMi0zIDUtMSAxLTMgMTEtMiAzLTV6Ii8+PHBhdGggZmlsbD0iI2U5ZDIyOCIgZD0iTTEyNSAyMDZoMTl2MmwtMTQgMy01IDYtMSA0djE0bDIgMTEgMyAxMGgydjJsNSAxIDIgNS01IDEtMTAtNS0zLTMtOC01di0yaC0ydi0yaC0ybC0zLTh2LTEwbDgtMTYgNi00IDUtMnoiLz48cGF0aCBmaWxsPSIjMjIzNmIzIiBkPSJNODggMzYxaDhsMTMgMyA2IDMgOSAxdjNoMjh2LTJoMnYtMmw2LTFoMjJsLTIgNS0zIDItMSAzaC0ybC0xIDVoLTIxbC03LTEtMS0zaC0xMWwtMSAxaC0xNmwtMS0yaDVsMi01aC0xMHY1bDIgMWgtMTBsLTgtMXYtNGw1LTF2LTJoLTdsLTQtNS0yLTF6Ii8+PHBhdGggZmlsbD0iIzM4NTBhYiIgZD0iTTYyNiAxNjNoN2w3IDN2MTBoMnY3bC04IDF2OWwtNCA1di0zbC02IDJ2LTJoLTJ2OGwtNCAyaC01di0zbC0yIDEtMSA3LTIxIDMtMi0xIDItNCAxNy01aDN2LTExbDEtM2gtMnYtM2gydi02bDgtM2g2djNoOGw0LTYtMyAyaC00di04aC0xMWwzLTIgNS0xeiIvPjxwYXRoIGZpbGw9IiM3ODY0M2IiIGQ9Ik02NDQgMzEzbDE2IDIgMSAyLTEzIDFoLTExdjJsLTcgMnYybDUtMWgxM2w1IDF2LTJoMTF2NGwtMTMgMyA3IDJ2MmwxMiAzIDEgMy05IDJoLTR2M2gtMjNsMS0zaC0ybC0yLTYtNyAxIDItMTAtMy0xdi0xMGgyMHoiLz48cGF0aCBmaWxsPSIjM2E1M2E3IiBkPSJNMzAwIDY0aDlsMyAzdjdsLTQgNCAxIDQgNyAzIDEgMi0xIDktNCAxIDUgNXYxMGwzIDEtMTEgNi04LTEtNS0yIDEtMTYgMS0yaDEwbC0zLTctNC0yLTEtNiAzLTN2LTJoLTVsLTMtNHYtN3oiLz48cGF0aCBmaWxsPSIjMzA0N2E0IiBkPSJNMzY4IDI4aDEwbDYgMiAxIDMtMyA4djNsLTcgMS0zIDNoLTJ2LTRsLTEgMXY3bC0xIDQtMTAgMmgtNWwtMy01LTUtNS0xLTFWMzZsMS0xIDE1LTF2LTRoOHoiLz48cGF0aCBmaWxsPSIjM2Y3Y2Q3IiBkPSJNNTA4IDIzNmgzMWwxMyAxLTQgNi04IDItMSAzIDcgMnYybC0xMCAxaC0yNGwtMi0xdi0yaC0xMGwtNi0yIDEtNSAzLTEgMS00eiIvPjxwYXRoIGZpbGw9IiM0ZDk4ZjAiIGQ9Ik00NTUgMjMybDcgMyA2IDIgOCAzdjJoMmwyIDgtOCAxaC01OWwtMS04IDIgMSAxLTYgMTMgMS0yIDEgMSA0IDEwIDF2LTRsMTkgMi0xLTQtMzEtMXYtMWwzMi0xeiIvPjxwYXRoIGZpbGw9IiMxZDQzYjYiIGQ9Ik0zODggMjA3bDQgMXYyaDJsMiA1IDUgNCA1IDEgMiA4IDMgMmg5di01aDJsMiA2IDMgMS0xIDQtMy0xdi0zbC04IDEtMiAzLTItMSAxIDctOSAxdjJoLTd2MmwtMyAyaC01bC0zLTktMS02aC00di0yaDExbC0zLTEzeiIvPjxwYXRoIGZpbGw9IiM4YTc2NDciIGQ9Ik0xNDQgMTBoMTZsNSAzIDEgM3YxNGwtMSAzLTcgMi0yIDYtOS0xLTUtMXYtM2gydi00aC00di0ybC02LTF2LTdsNC0yIDEtNGgydi0yaDN6Ii8+PHBhdGggZmlsbD0iIzFiMWU0ZCIgZD0iTTY1OCAzNDdoMTRsNiAxdjIxbC0xNCAxLTQtMi0xLTFoLThsLTEgMWgtNnYtM2wtNC0xLTEtNC0yLTIgNS0zaDJ2LTNsMTMtM3oiLz48cGF0aCBmaWxsPSIjMjQzZGEzIiBkPSJNNTgzIDE4M2wyIDEtMSA1LTEtMy00IDF2MmwzIDFoLTJsLTIgMTgtNSAzLTIgNi03IDItMyAzLTIgNC01IDF2M2gtMzJsMy0xdi0ybDMtMWgxNHYtMmgydi0yaDN2LTJoM3YtM2wtMi0xIDgtNSAxLTNoM3YtNWw3LTIgMi03IDItMyA0LTEgMi02eiIvPjxwYXRoIGZpbGw9IiMzNjMzNGMiIGQ9Ik00NTggMzQ4aDlsNyAxdjJsNSAyIDEgNCA0IDEgNCA0djJoMmwyIDMgNCAxIDMgMyA1IDIgMyA1djNoLTI0bC0xLTMtNS01di0zaC0zdi0yaC0ybC0yLTYtNC0yLTItMXYtMmwtNC0xLTItMnoiLz48cGF0aCBmaWxsPSIjNjM1ODhiIiBkPSJNMjgzIDIxOGg0bDIgNiA1IDEgMSA5IDEgNWgyMnYxaC0xMGwxIDloLTN2LTloLTlsMSA1djdsLTEtMmgtMnYtMmwtNy0xIDIgOS0xIDctOCAxdi04bC0zLTE2LTEtNCAxLTEyIDEtMmgzeiIvPjxwYXRoIGZpbGw9IiM1ZTVhNmUiIGQ9Ik01NDIgNGgzdjRsNS0xLTMgNS0xIDctMy0xdi0zbC01IDEtMSA1aC0ydi02bC02IDF2MTNsLTIgNC0xLTF2LTZoLTJ2NGgtMmwxIDE4IDMgMTAgNCA2djJoMmwtMSA0aC0ybC03LTEtNC03LTItMTgtNC0xdi05bDItNmgzbDEtNyAyLTF2Mmg1bDEtNyA1LTUgNS0zIDUtMnptLTI2IDM5eiIvPjxwYXRoIGZpbGw9IiM1MDVlOGYiIGQ9Ik00NjcgMTg2aDVsMiAydjRsLTUgMXYyaDJ2MmgzbDEtMyA5LTFoMzZsLTIgMyA2IDItMyAzLTkgMS00LTEtMSA1aC02djJoLTExdi0ybDItMWgxMXYtNWwtOS0yLTctMi0yIDQtMTggMi0xIDFoLTlsLTEtMiAyLTFoNnYtMmgtMTFsLTkgMiAyLTQgNy0xdi0xbC01LTF2LTJsNi0zaDEyeiIvPjxwYXRoIGZpbGw9IiM1YzYxODciIGQ9Ik0xMzMgMjcwaDdsLTMgMTYgMyAxdjdoLTJ2MmgtMnYyaDh2M2gtNnYzaC0zdi0yaC00bDEgMiAxMiAydjFsLTE2IDFoLTExdi0yaDd2LTJsLTEyLTEgMS00IDMtMyA4LTJoNnYtMmwtMTUtMXYtMmg1di0ybDItMSAyLTdoNWwxLTZoMnoiLz48cGF0aCBmaWxsPSIjNTY2NGEwIiBkPSJNMTc3IDI1NGgydjRoM2wxIDEwaDJsMiA0djRsLTcgMnYybDEwIDQgMSA0LTMgMmgtM2wtMSA2aDVsLTIgMmgtMTFsLTEyLTJ2LTNsNC0yIDYtMXYtM2gydi0ybC04LTEtMi0xdi02aDExdi0yaC02di0xN2g1eiIvPjxwYXRoIGZpbGw9IiMxMDBkNjEiIGQ9Ik0yOTUgMjk0bDEyIDEgNSAxdjJsOCAxIDMgOHYyaC01bC0xIDktMyA0aC01di0xMmwtNCAxLTEgM2gtOGwtNy0ydi0xNHoiLz48cGF0aCBmaWxsPSIjNGI1Mjc4IiBkPSJNNjMyIDE2MWwxMCAzIDEgMyA2IDUgOSAxNSAxIDV2MTBsLTItMXYtNWwtMTEgMS02IDItOS0xIDItNSAxLTkgOC0xdi03aC0ybC0xLTEwLTYtMnoiLz48cGF0aCBmaWxsPSIjMjczYzc4IiBkPSJNMTMxIDBoMTRsLTEgNC0yIDEtMSA1aC01bC0yIDZoLTJ2MmgtMnY0aDJsMSAxMCA1IDEtMSAzLTUgMS0xIDMtOC0yLTMtNHYtMmgtMmwtMi02di05bDMtNSAxMy0yLTEtM3oiLz48cGF0aCBmaWxsPSIjZDBiNTUxIiBkPSJNMTAzIDEzMmgxMGw4IDIgMSA1LTMgMXY4bC0yIDEtMSAzaDJ2NGgtNXYtMmwtNiAyLTEgMy02LTItNC01LTEtMTEgMS00aDNsMS00eiIvPjxwYXRoIGZpbGw9IiM4MjdkNmQiIGQ9Ik05NiAxMjVoMTdsNyA0djJoMmwyIDQtMSA2LTEgNWgzbDIgNmgtMnYyaC00bC00IDYtMyAzLTYgMXYtM2wtMTctMi0zLTJ2LTJoMmwtMS01aDJsMS02IDEtMnYtN2wyLTd6bTcgN2wtNCAydjNoLTNsLTEgOSAxIDcgNSA1IDUgMSAxLTMgNi0ydjJoNXYtNGgtMmwxLTMgMi0xdi04bDMtMS0xLTUtMTAtMnoiLz48cGF0aCBmaWxsPSIjNDAxMjYwIiBkPSJNMzA2IDM2MGwxIDMgNSAxIDcgNHYybDQgMXYybDIgMS0xIDdoLTM2di01bDgtOGgydi0ybDQtM2gydi0yeiIvPjxwYXRoIGZpbGw9IiMzYTNlNmUiIGQ9Ik0yNCAyNzJoOGwzIDF2MmgtM3YzbDEwIDEgMSAxdjVsLTUgMXY0aC00bC0xIDMgOSAzdjFIMTZsLTItNCA2LTF2LTJsLTE0LTF2LTNsNS0yaDl2LTNsOC0xdi0ybC03LTEgMy0xdi0ybC0zLTF6Ii8+PHBhdGggZmlsbD0iIzYxOWZlMiIgZD0iTTMyMiAyMzloM3YybDEwLTIgNyAxMXYyaC0xMWwtNS0xLTEtMy0xIDRoLTE0djNoLTN2LTNoLTlsLTEtMTJoOXY5aDNsLTEtOXoiLz48cGF0aCBmaWxsPSIjMjEyZTgwIiBkPSJNODAgMzIwaDEzdjJoOHYybC0xMyAySDc2bDEgMiA3IDJ2M2wtNCAxSDU0bC0zLTEtMS0yLTIgMXYtMTBsNSAyaDN2LTJ6Ii8+PHBhdGggZmlsbD0iIzE5M2JhNCIgZD0iTTQ3NiAyNDBsNCAyIDEgMnY2aDJ2M2gxMnYtM2gtM2wxLTUgMSAzIDE2IDJ2MmwxMCAxdjFsOCAxLTIgMi0yNS0xLTUtMS04MiAxdi0zbDEwLTIgNTYtMS0yLTR2LTRoLTJ6Ii8+PHBhdGggZmlsbD0iIzNmNDM4MCIgZD0iTTUxMiA0M2w0IDEgMyAxOCAzIDV2Mmw3IDEgMS0yIDUgMS00LTZ2LTJsNyAxIDIgNHYxMGwzIDF2NGg0djVsNSAxIDIgMXYtMmw0IDEtMSAzaC04bC0zLTItOS0yLTEtNCAzIDEtMS01LTYtMS0xMi0yLTYtMS0yLTRWNTdoMmwtMS0xMnptNCAweiIvPjxwYXRoIGZpbGw9IiM0MjI3NjMiIGQ9Ik0zNDAgMjk3bDYgM3Y0aDlsLTEgM2gtOGw4IDQgNSA1IDEgM2gybDItNCA3LTNoNXYtM2gzdi0yaDR2MTJsLTQgMi01LTEtNSA2LTEgM2gzbC0yIDRoLTNsLTMtM3YtMmgtM3YtN2wtNS0yLTItNC01LTEtNi01LTQgMS0yLTQgMi0zaDJ6Ii8+PHBhdGggZmlsbD0iIzYxNDA3NSIgZD0iTTMzMiAzMzZsMTMgMyAxIDUtMiAxaC02djNsNiAyIDEgMy0xIDJoLTEzbC0xIDEzLTQgNWgtM3YtMmwtNC0xdi0yaDJsMi0xNiAzLTEwIDItNGg0eiIvPjxwYXRoIGZpbGw9IiM1ODU4NjkiIGQ9Ik01NjQgMGgzNXYybDUgMSAxIDloM3YzbDYgMXYyaDJsMSA4LTItNGgtN2wtNC00di0yaC0zbC0xIDN2LTJsLTMtMS0yLTQtMi0xIDEgNS0xIDFoLTVsLTEtNi0zLTMtMS0zLTcgMWgtNFYzbC04LTJ6Ii8+PHBhdGggZmlsbD0iIzE2MTQ4NyIgZD0iTTI0MiAyNTFsMTAgMSAzIDloM2wyLTloMmwtMiAxMi0yIDktNSAyLTQgNS0zIDJoLTRsLTItNHYtM2gydi0zaDJ2LTJsMy0xIDEtN2gtNnYybC03IDF2LTlsNS00eiIvPjxwYXRoIGZpbGw9IiMzNzQyODEiIGQ9Ik02MjEgMzFsMSAzaDJ2MTZsLTMgMTZoLTN2OGgtNGwtMSA0di0yaC0ydi01aC0zbC0yIDNoLTNsMy05aDJ2LTNoMmwxLTkgMy0xLTEtMTkgMy0xIDIgMTBoMlYzMnoiLz48cGF0aCBmaWxsPSIjMWMzNWJhIiBkPSJNMCA5MGgxMGwxIDVoMmwxIDYgNiAxdi0zbDEwIDIgMiA0aC02bC0yIDMgMiAxaC0ybDQgNHYyaDdsMyA0IDEgMy00IDQtMSAyaC02di02bC00LTJ2LTJsLTQtMi00LTJ2LTJoLTJ2LTNoMnYtNGwtOC0xdi0ySDZsLTItNkgweiIvPjxwYXRoIGZpbGw9IiM3OTZjNjEiIGQ9Ik01NjIgMWw4IDEgMiAxdjNsNy0xIDQtMSAyIDYgMyAxdjZsNS0xdi01bDMgMSAyIDRoNmw0IDUgNyAxIDEgNS0xIDMtNC0xLTMtMmgtM3Y5bDMgMnY3aC0ybC0xLTUtMy0xIDEtOWgtNHYtM2wtMy0xdi01bC00IDN2LTJsLTQtMS0yLTJ2LThsLTEzLTNoLThsLTggMS0zLTJoM1Y1aDJsMS0zeiIvPjxwYXRoIGZpbGw9IiMyZTM2N2QiIGQ9Ik04MiAzMDBoOGwtMiA1aDEwbDUgMiAxIDUgNSAxIDEgMSAxMiAxdjFoLTE4di0yaC05djJIODJsLTEyLTIgMi01IDgtMS0xNS0xIDEtNWg4djJoN3oiLz48cGF0aCBmaWxsPSIjMWIxZTYwIiBkPSJNMzgzIDI0MGw0IDMgMSA1aDlsMiAxdjNoMTF2M2gtMTJsMiA1LTQtMnYtMmwtMTIgMi0xIDctMSAxLTEgMjEtMSAzaC0zbC01LTUgMS05aDNsMi0xNyAyLTZ2LTJoM3oiLz48cGF0aCBmaWxsPSIjMWQxOTRhIiBkPSJNNjQ0IDMxM2wxNiAyIDEgMi0xMyAxaC0xMXYybC03IDJ2M2gtMnY0aDE5bDMgMy0yIDItOCAyIDEyIDEgMiA0aC0xN3YzbC0yLTEgMS0yaC0ybC0yLTYtNyAxIDItMTAtMy0xdi0xMGgyMHoiLz48cGF0aCBmaWxsPSIjMmM0NTlmIiBkPSJNMzA3IDMybDkgMXYybDE0IDEtNiA5aC02bDIgMyAzIDEtMSAzLTEwIDEtNiA1LTItMVY0MWwyLTNoLTJ2LTV6bTI4IDFsMyAyLTggMXYtMnoiLz48cGF0aCBmaWxsPSIjNWE2ZGEzIiBkPSJNNTgxIDE2NGg1djRsNi0xIDYgMS0xIDJoLTJsLTEgM2gtMnYzbC03IDItMTAgNS01LTF2LTNoLTJ2MmwtMyAzaC00bC0xIDMtMyAxLTEgMmgtM2wxLTQgNS00IDEtMyA0LTRoNGwyLTVoNWwxLTR6Ii8+PHBhdGggZmlsbD0iIzk0ODk1YiIgZD0iTTQ1NyA3OWw4IDEgMSAyLTUgMXYzbDEzLTEgMiAyLTEgMTAtMyA2LTUtMS0yLTF2LTJsLTEwLTEtMi0yLTItMTIgNC00eiIvPjxwYXRoIGZpbGw9IiM5ZDkwNTYiIGQ9Ik0yMTUgMTQ5bDkgMSA4IDEgMiAzLTEgMTItNSAyLTEgMmgtOWwtNC0yLTItOCAxLTl6Ii8+PHBhdGggZmlsbD0iIzY5Njk2YyIgZD0iTTIyMCAxNDdoMTNsMiAydjNoMnYzaC0ybDEgOCAzIDF2NmwtNCAyLTIgNC0yIDFoLTE3bC0zLTUtMS02di0xMGwyLTYgMi0yem0tNSAybC0yIDItMSAxMSAyIDYgNCAyaDlsNC00aDJsMS0xMi0yLTMtMTEtMnoiLz48cGF0aCBmaWxsPSIjMmY1NWQ3IiBkPSJNNTYyIDEyNGw1IDEgMTcgMSAxLTJ2M2wxMCAxdi0ybDExLTEgMSAzaC00bC0xIDQgNCAxdjJsLTIgMiAxIDMtMiAxLTExLTEtMS0zIDEtMmgzdi0zbC0zMCAxLTUgMXYtNnoiLz48cGF0aCBmaWxsPSIjNGEyYzY4IiBkPSJNMzgzIDMxMmg1bDIgOC0xIDEwaC0ybC0xIDQtMiAzaC0xMmwtNC0xIDEtNCAyLTNoLTNsMS00IDQtNiA2IDEgNC0xeiIvPjxwYXRoIGZpbGw9IiM2NTY2NTkiIGQ9Ik0xNDQgMTBoMTZsNSAzIDEgM3YxNGwtMSAzLTcgMi0yIDYtOS0xLTUtMXYtM2gydi00aC00di0ybC02LTF2LTdsNC0yIDEtNGgybC0xIDEyIDYtMSAxIDNoM3YyaDEydi0yaDJWMTVoLTIweiIvPjxwYXRoIGZpbGw9IiMyNTRhYzEiIGQ9Ik00NTggMjY0aDEwbDEyIDF2MWwtNyAxIDMgMi02IDEgMS0zaC0zdjRsNiAyLTEgNS0zIDRoLTZsLTMtMnYtMmgtMTRsLTctMnYtMWw2LTIgMy00IDctMXoiLz48cGF0aCBmaWxsPSIjNGI4M2RlIiBkPSJNNDU1IDIzMmw3IDMgNiAyIDggM3YyaDJsMiA4LTggMWgtMTZsLTEtMTItMzEtMXYtMWwzMi0xeiIvPjxwYXRoIGZpbGw9IiMyYjJiNTQiIGQ9Ik01MjYgMGgzOGwtNSA1aC0ydjJsLTEyIDFWNGwtNSAzLTggMy00IDVoLTJsLTEgN2gtNXYtN2gzdi01aC03VjlsNi0xIDMtNHoiLz48cGF0aCBmaWxsPSIjMmI0ZWJmIiBkPSJNMjQwIDIzOWgxMmwyIDItMSAyLTggMXYybDggMS00IDEtMSAyLTYgMi04IDQtMy0xIDEtMi01IDF2LTJsLTggMi0yIDF2LTZsMTEtNCA0LTJ2LTJ6Ii8+PHBhdGggZmlsbD0iIzY1NzNhZSIgZD0iTTM5NSAxODBoN3Y0bC02IDMtNCAzLTUgMXYzbDctMXYzbC04IDMtMTIgM2gtNGwtMiA2aC00di0zaC03bC0yLTIgMS0xaDhsMi01IDUtMSAxLTMgMTEtMiAzLTV6Ii8+PHBhdGggZmlsbD0iIzI4M2ZjNSIgZD0iTTE3NiAzNDZsNSAxIDMgMXYzaDE4bC0xIDQtNiAyLTEgM2gtMnYyaC0xM2wtNS0yLTEtMnYtNmgtNmwxLTV6Ii8+PHBhdGggZmlsbD0iIzIxMmM4MyIgZD0iTTY0MCAzNjdoM3YybDggMXYybDQtMiAxMi0xaDExdjhoLTM5bC0zLTF2LTh6Ii8+PHBhdGggZmlsbD0iIzIyMjhhNyIgZD0iTTI4MiAyMTFsMTEgMXYyaDN2NWwtMyA1aC00bC0yLTN2LTNoLTRsLTEgNGgtM2wtMSAxNC0xLTItOSAzaC00bDEtN2gzbDEtNGgybDItN2g0bDEtNnoiLz48cGF0aCBmaWxsPSIjM2Y0ZTlkIiBkPSJNMjI4IDI3NGgzdjNoM3YyaC0ydjJsNiAxdjJoMnY3aDJsLTIgNC02IDItOSAxLTEtMy0zLTEgMy0xLTItN3YtNWgydi00aDN6Ii8+PHBhdGggZmlsbD0iIzE5MTM1NSIgZD0iTTI2MiAyMzRoMnYzbDktM2g0bDIgNiAzIDE2LTEgOC02IDEtMS0xLTEtMTAgMS0xdi03bDEtNC02IDItMiA0aC0zbC0xIDMtMi01LTItMS0xLTZoNHoiLz48cGF0aCBmaWxsPSIjNGU1OWI0IiBkPSJNMzY5IDI2N2gxbDEgMjAtNyAxdi0ybC03LTItNy02LTMtNWgydi0zaDE0djJoNnoiLz48cGF0aCBmaWxsPSIjNjY2NjZkIiBkPSJNNDY0IDc3aDZsMiAxdjNsNCAyIDIgMnY5bC0zIDEwLTQgMWgtMTNsLTYtNS00LTF2LTZsMS0yIDEtOSA1LTItMSAyaC0ybDEgOSAyIDYgMTAgMnYybDcgMiAzLTExdi01bC01LTFoLTl2LTNsNC0yLTQtMnoiLz48cGF0aCBmaWxsPSIjMWMzNDhkIiBkPSJNNjE4IDE3N2g2djZsLTggMi0xIDRoLTN2MTNsLTEgMS0xIDctMjEgMy0yLTEgMi00IDE3LTVoM3YtMTFsMS0zaC0ydi0zaDJ2LTZ6Ii8+PHBhdGggZmlsbD0iIzJkMmY2NCIgZD0iTTMwIDI2MGgzdjRoNXY0aC0zbDEgOC00LTFoM3YtMkgyNHY0bDQgMXYybC04IDF2M2wtNC0xSDV2LTRsMy0yaDExdi0ySDh2LTJsNi0xIDQgMSAzLTJoM3YtNWgybDEtNHoiLz48cGF0aCBmaWxsPSIjMTEyNzdmIiBkPSJNMzU2IDIxNWw0IDF2NWwtMyAyLTIgNi0xIDE0IDIgN3YyaDZ2M2gtMzV2LTJsMTUtMS00LTd2LTJsNS0xIDMgM3Y3bDYgMSAxLTQtMS0xdi0xNWgtNnYtM2gzdi00aDJsMS0zaDJ6Ii8+PHBhdGggZmlsbD0iIzI2MzM5ZSIgZD0iTTM4NCAyMDdoNHYxMGwtNCA0LTMtMS0xLTItMTIgMS00IDF2LTJoLTJ2LTdsMi0yIDE0LTF6Ii8+PHBhdGggZmlsbD0iIzQ0NWZiMSIgZD0iTTIwNSAyNTZsMTAgMiAxIDMgNSAyIDEgMy0yIDRoMnYyaDJ2MmgtMmwtMSA0LTMgMi0xLTEtNy0xLTEtNnYtNmwtNC0yeiIvPjxwYXRoIGZpbGw9IiMxNDJkN2UiIGQ9Ik02MTIgMjI1bDE2IDIgNiAxdjRsLTUgMmgtOWwxIDEyLTUgMy0zLTF2LTJoLTJsLTEtNGgydi0yaDJsLTEtOC0xLTF6Ii8+PHBhdGggZmlsbD0iIzQ0NzFkNyIgZD0iTTYwMyAxOTFoNWwxIDJ2MTBsLTIwIDYtMiAzdi0xMmg0di0ybDUtMnYtNHoiLz48cGF0aCBmaWxsPSIjNjQ1ZTgzIiBkPSJNNTIwIDIwOWwxNSAxdjRsLTcgMS00IDQtMyAxaC0yNXYtNWwxNS0xIDEtM3oiLz48cGF0aCBmaWxsPSIjNDUzMGEyIiBkPSJNMjYyIDI1Mmw1IDEgMiAxLTEgMTBoLTJ2MmgybDEgNCAzLTNoM2wtMSAzLTUgMi0xIDRoLTJsLTItOWgtM2wxIDctMiAxLTEgM2g0bC0xIDYtNS0xLTMtMXYtNGwtMy0xIDItMyA1LTEgMi0xM3oiLz48cGF0aCBmaWxsPSIjYWE5NjU1IiBkPSJNMTAzIDEzMmgxMGw4IDIgMSA1LTMgMXY4bC0yIDEtMSAzaDJ2NGgtNXYtMmwtNiAyLTEgMy02LTItNC01di0zaDJ2M2gydi00bDUgMSA1IDF2M2wzLTEgNC03LTMtMS0yLTgtMTAtMnYyaC0zbDEtM3oiLz48cGF0aCBmaWxsPSIjM2MzYjRiIiBkPSJNMjQgMTgybDEzIDEgMiAxdjExaC0xbC0xLTYtMSA5LTctMS0yLTItNy0xLTEtMnYtNmw1LTF6Ii8+PHBhdGggZmlsbD0iIzMzMzk3MSIgZD0iTTU4NSAyNjVoMTV2MmgzdjEwbC00IDNoLTN2MmgtNnYtMmgybC0xLTctMiAxdi0ybC03LTEgMi0xeiIvPjxwYXRoIGZpbGw9IiMyNTI1NGMiIGQ9Ik02NzIgMzM2aDZ2MTJsLTIwLTEtMSAzaC01di0ybC00LTEtMS0zaDExdi0zbDYtMmg3eiIvPjxwYXRoIGZpbGw9IiM1MjRmNzQiIGQ9Ik02NjggMTQ2aDEwdjRsLTEyIDJ2MmwtMyAxLTEgMiAyIDEtOCA1IDIgMy02LTEtMTAtMy0xLTIgOS0zIDYtNCA4LTV6Ii8+PHBhdGggZmlsbD0iIzYxNWNhMyIgZD0iTTM2MyAyNDBoMTdsMyAxdjlsLTQgMS0xIDQtNi0yLTEtMi02LTF2LTJoLTJ2LTRsLTMtMWgzeiIvPjxwYXRoIGZpbGw9IiM4Yzc1NDUiIGQ9Ik02NTggMzQ3aDE0bDYgMXY3aC0zNHYtM2wxMy0zeiIvPjxwYXRoIGZpbGw9IiMyZDQ0Y2YiIGQ9Ik0zMDQgMjE2aDExbDEgNS0xIDFoLTEybC0xIDRoLTJsLTEgNmgxN2w0IDItMjAgMi00IDEtMi01IDItNmgydi04aDZ6Ii8+PHBhdGggZmlsbD0iIzNiNGE5MCIgZD0iTTM2NiA3M2w3IDEgNCA0djlsLTIgM2gtMTB2LTJoLTJWNzZ6Ii8+PHBhdGggZmlsbD0iIzMzNjFhZCIgZD0iTTUwOCAyMzZoMzFsMTMgMS00IDYtNyAxLTEtNGgtNDF2LTJ6Ii8+PHBhdGggZmlsbD0iIzJjNDZhOCIgZD0iTTE1MiA1Mmg1bDIgNC03IDMtNSAzaC0zdjJoLTEzdi01bC0xLTJoOWwyLTR6Ii8+PHBhdGggZmlsbD0iIzViNTE2MiIgZD0iTTY0NSAxNzBsNCAyIDkgMTUgMSA1djhoLTF2LTZsLTEzIDJoLTEwdi05bDItMmg0bDQgNmg4di0yaDJsLTEtNS00LTQtMy02eiIvPjxwYXRoIGZpbGw9IiM1OTU3OWQiIGQ9Ik0yOTggMjU1bDIgMnYzaDJ2NGwxMS0xIDMgMSAyLTQgMy00aDN2MTBsLTQgNS0yIDItNC0yLTEtMmgtNXYybC00LTEtMS0zLTUtM3oiLz48cGF0aCBmaWxsPSIjNGM0ZjhhIiBkPSJNNjYgMzAyaDh2Mmg5bDMgMyAyIDF2MmwtNSAyIDEgMSA5IDF2Mkg4MmwtMTItMiAyLTUgOC0xLTE1LTF6Ii8+PHBhdGggZmlsbD0iIzU5NGU0OSIgZD0iTTYyNCAyODdoMTFsLTIgMXYybDEwLTNoNWwxIDNoNGwxIDMtNiAxaC0xMmwtMTgtM3YtM3oiLz48cGF0aCBmaWxsPSIjMDgwNTRmIiBkPSJNMjk2IDI5NGwxNiAydjJsOCAxIDMgOHYyaC02di00bC0xMC0zLTktMnYtMmgtMnoiLz48cGF0aCBmaWxsPSIjNjk0YWEyIiBkPSJNMzc5IDMwN2g0djEybC00IDItOS0xaC03bDEtNSA3LTNoNXYtM2gzeiIvPjxwYXRoIGZpbGw9IiMyYzJjNjMiIGQ9Ik02OSAyNjNoMTRsMiAyLTUgM2gtM3YyaDEydjJINzZsNCA1aC02bC0yLTItNC0ydi0zaC0ybDEtNXoiLz48cGF0aCBmaWxsPSIjN2U3NjY4IiBkPSJNMzAxIDEwMGgxMGwzIDZ2NmwtMiAxaC0xMWwtMS0xdi0xMXoiLz48cGF0aCBmaWxsPSIjOGI4MTVhIiBkPSJNMzAwIDY0aDZsMyAydjlsLTMgM2gtOGwtMy00di03eiIvPjxwYXRoIGZpbGw9IiM2YTY4ODMiIGQ9Ik04MCAzMjBoMTN2Mmg4djJsLTEzIDJINjlsLTctMiAxLTJ6Ii8+PHBhdGggZmlsbD0iIzkyODE2NSIgZD0iTTQ4NyAxOTZoNmwzIDIgNyAydjVoLTE1bC0xMy0yLTEtMyAxMS0xeiIvPjxwYXRoIGZpbGw9IiM2NzY0NzgiIGQ9Ik0xNiAyODhoMTNsNCAydjNsOSAzdjFIMTZsLTItNCA2LTF2LTJoLTR6Ii8+PHBhdGggZmlsbD0iIzQzNTM4YSIgZD0iTTQ3OCA4OGg1djhsLTIgMS0xIDNoLTJ2M2wtMyAxem0tMzAgMTFsNSAxIDUgNGgxN2wtMSAyLTggMmgtMTZsLTItNXoiLz48cGF0aCBmaWxsPSIjNjA2NTgwIiBkPSJNMzQ4IDM4aDhsMiAxdjRsNCAxLTEgNGgtNGwtMSA0aC00di0ybC00LTEtMi0zdi03eiIvPjxwYXRoIGZpbGw9IiM1NDY2YTUiIGQ9Ik00NjAgMjY3aDd2M2w3IDMtMSA1LTMgNGgtNmwtNC00LTEtMTB6Ii8+PHBhdGggZmlsbD0iIzRiNWVhNSIgZD0iTTIyOCAyNzRoM3YzaDN2MmgtMnYybDMgMS0xIDkgNCAxdjFsLTExLTEgMS0zaDR2LTJoLTlsLTEtMXYtNWgydi00aDN6Ii8+PHBhdGggZmlsbD0iIzgzODE3OCIgZD0iTTU0NSAxODVoMmwtMSA0LTMgMy01IDF2N2wtMiAxaC04bC0xLTQtMy0xdi0zbDctMSA0LTIgMy0zeiIvPjxwYXRoIGZpbGw9IiMyZDJjOTQiIGQ9Ik0zMTIgMjg4bDQgMSAxIDMgNSAyIDEgMnY4aC0ybC0xLTQtOC0ydi0ybC0xMi0xLTQtMmgzdi0ybDExLTF6Ii8+PHBhdGggZmlsbD0iIzU0NTY2MiIgZD0iTTY1MSAzNThoMTNsMTQgMnY4bC0xNC0xLTItMXYtMmg2di0zaC0xOHoiLz48cGF0aCBmaWxsPSIjNWQ1YTVlIiBkPSJNNjMyIDMwMmgxNGw3IDJ2MWwtNSAxaC0xMWwtMSA0aC0xNXYtM2w1LTF2LTJ6Ii8+PHBhdGggZmlsbD0iIzU4NTY3NCIgZD0iTTI0IDI3Mmg4bDMgMXYyaC0zdjVoM3Y2SDI0bC0zLTJ2LTNsNy0xdi0ybC03LTEgMy0xdi0ybC0zLTF6Ii8+PHBhdGggZmlsbD0iIzM4MTE1NCIgZD0iTTI4MiAyMDBoMTBsLTEgOC0xOSAxdi01bDUtM3oiLz48cGF0aCBmaWxsPSIjM2E0MDZiIiBkPSJNNTY0IDBoMzV2Mmw1IDEgMSA5aDN2MmwtNC0xLTEtMy0zIDFWOWwtMi0xIDEtMi01LTEtMS0zaC0xM2wtMSAxaC05bC02LTJ6Ii8+PHBhdGggZmlsbD0iIzI5NDJjNiIgZD0iTTQ2OCAzMzloMTdsNSAxdjRsLTIgMWgtMjJsLTItMXYtNHoiLz48cGF0aCBmaWxsPSIjYmNhOWJhIiBkPSJNMzQwIDI5N2w2IDN2NGg5bC0xIDNoLThsOCA0IDMgNS04LTEtNy02LTQgMS0yLTQgMi0zaDJ6Ii8+PHBhdGggZmlsbD0iIzQyMzY3MyIgZD0iTTI3OCAyMjRsMyAxLTIgNCAxIDR2MmgybDEgMmg2bDUtMSAyLTJ2OWwtMS0xLTQtMS02IDEtMiAydjlsLTIgMy0zLTE2LTEtNHoiLz48cGF0aCBmaWxsPSIjN2U3NzY3IiBkPSJNNjQ0IDMxM2wxNiAyIDEgMi0xMyAxaC0xMXYybC0xMSAxdi0zaC0ydi0zaDIweiIvPjxwYXRoIGZpbGw9IiMzNTMyODEiIGQ9Ik0zNjQgMjM0aDIwbDIgOC02LTFoLTEwbC03LTF2M2wtMy0xaDJsMS03eiIvPjxwYXRoIGZpbGw9IiM2MzZjODciIGQ9Ik0zNDYgMTEwbDYgMSAzIDYtMSA1LTQgMS01LTItNS0xdi04eiIvPjxwYXRoIGZpbGw9IiMzZjRiN2QiIGQ9Ik0zMDcgMTZoM3Y0aDEydjdsLTIxIDEgMS0zIDUtMXoiLz48cGF0aCBmaWxsPSIjMjEwNDQyIiBkPSJNMjgwIDI3Nmg0bDEgNy01IDNoLTl2MmwtNS0xdi0zaDNsMS00IDItM3oiLz48cGF0aCBmaWxsPSIjMjY0YWM0IiBkPSJNMzQ5IDI3MGgxNGwxIDMtMyA4aC04bC02LThoMnoiLz48cGF0aCBmaWxsPSIjM2Y0YzhhIiBkPSJNMzMwIDYwaDhsMiAxdjExbC03LTEtNC0xdi0yaC0zbDEtNnoiLz48cGF0aCBmaWxsPSIjODY3YTU4IiBkPSJNMjMzIDE2MGgxdjdsLTMgM2gtMmwxIDZoLTE0bC0xLTF2LTVoLTN2LThsMiA0djJsOCAxIDUgMSAxLTMgMi0xIDItNHoiLz48cGF0aCBmaWxsPSIjNGI2ZmQwIiBkPSJNMzA0IDI1NmgxN2wtMyA1LTIgM2gtMTR2LTRoLTJ2LTN6Ii8+PHBhdGggZmlsbD0iIzM2NTRhMiIgZD0iTTU5NiAxODRoNmwtMiA0aC0zdjJoLTJsLTEgNy0zIDF2MmgtNHYxMmwtMi00di0xNGgydi0yaDR2LTV6Ii8+PHBhdGggZmlsbD0iIzZhNmRhOCIgZD0iTTI2NiAxOTRsOSAxIDMgMi0xIDUtNSAyLTEtMS0xMC0xLTItMXYtNWg3eiIvPjxwYXRoIGZpbGw9IiMzZjZhZDUiIGQ9Ik0yMzUgMjQxaDd2NGwtNSAyaC0zdjJsLTE1IDUtMiAxdi02bDExLTQgNC0zeiIvPjxwYXRoIGZpbGw9IiNkNmJiNTkiIGQ9Ik01NjUgOWwyIDQgMSAxM2gtMnYzbC02IDFWMTZsMi01eiIvPjxwYXRoIGZpbGw9IiM2NDkyZjIiIGQ9Ik0yOCAxNjFoMTJsMSA1LTEgMi04IDF2MmgtNmwtMS05eiIvPjxwYXRoIGZpbGw9IiMyMjI1NjQiIGQ9Ik0zNDIgMjcxbDUgMiA2IDcgNSA0IDYgMnYyaDJsMSA0aC0ydi0ybC01IDF2LTNoLTVsLTQtM3YtMmgtNHYtM2gtMnoiLz48cGF0aCBmaWxsPSIjMWExMDYxIiBkPSJNMzczIDIwOGg1djJoM3YyaC0ydjRsLTE2IDF2LTdsMS0xeiIvPjxwYXRoIGZpbGw9IiM1MTM3NzMiIGQ9Ik0yODYgMjk4aDNsMSAxNWgtMTB2LTExaDJ2LTJ6Ii8+PHBhdGggZmlsbD0iIzdhNzU4NiIgZD0iTTY2IDMyOWgxNGw0IDF2M2wtNCAxSDU1bDEtM3oiLz48cGF0aCBmaWxsPSIjNTc2NDhjIiBkPSJNMzEzIDM2aDN2Mmg4djVoLThsLTIgNS02LTEtMS01IDItNGg0eiIvPjxwYXRoIGZpbGw9IiNiN2EwNWIiIGQ9Ik02MDAgNDh2M2wtMSAyaDJsLTEgNWgtMmwxIDdoLTN2MmwtMiAxLTIgNC0yLTEgMi0xMyAyLTJ2LTVsMi0yeiIvPjxwYXRoIGZpbGw9IiM2ZDY2NzkiIGQ9Ik03NiAyNzJoOWwzIDMgMSA1aC05djJINzB2LTNsOC0zeiIvPjxwYXRoIGZpbGw9IiM1Nzg2ZTgiIGQ9Ik0zNjAgMjQ0aDN2NGgydjJoNmwxIDNoLTRsMSA2LTEgMS0xMSAxdi0zaDd2LTVsLTctMXYtMmgyeiIvPjxwYXRoIGZpbGw9IiMzODVhZDIiIGQ9Ik00MTAgMzdsNCAxIDMgNmgydjhsLTMgNWgtM2wtMy0xMnoiLz48cGF0aCBmaWxsPSIjM2E0ZTkwIiBkPSJNMzY4IDI5bDEwIDF2MTJoLTV2LTJsLTQtMS0xLTF6Ii8+PHBhdGggZmlsbD0iIzIxMzhhZCIgZD0iTTQ1NSAzMjRoMjV2NGwtOCAxaC0xNGwtMy0zeiIvPjxwYXRoIGZpbGw9IiM2ZTc1ODciIGQ9Ik0xMzMgMjcwaDdsLTIgNy00IDF2M2gydjJoLTExbDEtNGgzbDEtNmgyeiIvPjxwYXRoIGZpbGw9IiMzNzc0ZWUiIGQ9Ik00MDQgMjY0aDExbDUgMXYyaC0ydjJsNSAxdjFoLTE5eiIvPjxwYXRoIGZpbGw9IiM3NjY3NWIiIGQ9Ik02MzUgMzIzaDEzbDQgM2gtOGwxIDNoLTE3di00eiIvPjxwYXRoIGZpbGw9IiNlMmQxMzQiIGQ9Ik02NDYgMjc0bDIgMS0zIDN2M2wzIDEtMiAyIDYtMiA2LTEtNCAzLTQgMy0xNyAzdi0ybDctNiAzLTZ6Ii8+PHBhdGggZmlsbD0iIzIzMzlhYiIgZD0iTTQ0MCAzMTloOHYzaDN2NGgtMTRsLTUtM3YtM3oiLz48cGF0aCBmaWxsPSIjMmE0MmM3IiBkPSJNMjE2IDMyNmgxNHY2aC0xOGwtMS00aDV6Ii8+PHBhdGggZmlsbD0iIzUzM2U3OCIgZD0iTTM3MSAyODJsMSAzIDQgMiAxIDVoMnY2aC03di02aC01bC0xLTQgNS0xeiIvPjxwYXRoIGZpbGw9IiM0ZDQ2NTMiIGQ9Ik02NTIgMzM3aDEwbDUgMS0zIDItNiAxdjNoLTIwdi0zaDE2eiIvPjxwYXRoIGZpbGw9IiM3ZDY5NjgiIGQ9Ik01MjggMjEwaDd2NGwtMTAgMi0yIDJoLTE5di0xbDEyLTIgNi00eiIvPjxwYXRoIGZpbGw9IiMzNjYzZGMiIGQ9Ik00ODMgMjcwaDE2djNoLTN2MmgtMTZsLTctMiA0LTJ6Ii8+PHBhdGggZmlsbD0iIzVmODFjYSIgZD0iTTMzOSAyNTlsOSAyIDMgMyAxIDZoLTN2M2wtNS0xLTItMS0xLTEweiIvPjxwYXRoIGZpbGw9IiMyZjQ3YTQiIGQ9Ik0zNTYgMjE1bDQgMXY1bC0zIDItMiA2LTIgMTBoLTF2LTZoLTZ2LTNoM3YtNGgybDEtM2gyeiIvPjxwYXRoIGZpbGw9IiMyMzMwODgiIGQ9Ik0yMDkgOTlsNyAydjZsLTIgMmgtOWwxLTIgMy0xLTgtMSAxLTR6Ii8+PHBhdGggZmlsbD0iIzNmM2Q2NCIgZD0iTTYwOCAyOTVoMTdsOSAydjJoLTI5bDEtM3oiLz48cGF0aCBmaWxsPSIjMzkzZDZlIiBkPSJNNzQgMjUwbDYgMS0yIDEwaC05di0zaC00di0ybDgtNHoiLz48cGF0aCBmaWxsPSIjOTQ4YzY1IiBkPSJNNDU3IDc5bDggMSAxIDItNSAxdjNsLTUgMXY2aC0ybC0xIDMtMi0xMiA0LTR6Ii8+PHBhdGggZmlsbD0iIzQ3NGE3OSIgZD0iTTUxMiA0M2w0IDEgMyAxOCAzIDYtNS0xdi0ybC00LTEtMS03aDJsLTEtMTJ6bTQgMHoiLz48cGF0aCBmaWxsPSIjMmE0Y2E4IiBkPSJNMjk4IDI1Mmg5djNoM3YtM2gxM3Y0bC0yNCAxeiIvPjxwYXRoIGZpbGw9IiMzMjQyOTAiIGQ9Ik0yOTggMjI1aDF2N2gxN2w0IDItMjAgMi00IDEtMi01IDItNnoiLz48cGF0aCBmaWxsPSIjNDE0NDUxIiBkPSJNOCAxODNoNnY3SDlsLTEgNC02IDF2LTJIMHYtM2w1LTEgMi01eiIvPjxwYXRoIGZpbGw9IiMyNzM3NzgiIGQ9Ik0xNjUgOGwzIDEgMiA0djNoOWw0IDktMiAzaC0ybC0xIDMtMS0yIDEtMTEtOCAxaC0zdi0zaC0yeiIvPjxwYXRoIGZpbGw9IiNkOWM0NGUiIGQ9Ik0yMTYgMTU2aDlsMSAxdjdoLTJ2MmwtMyAyaC01bDEtNSAxLTZ6Ii8+PHBhdGggZmlsbD0iI2QxYzI0ZCIgZD0iTTQ2NCA4Nmg0bDEgNmgtMmwxIDQtMSAyaC02bC0yLTV2LTV6Ii8+PHBhdGggZmlsbD0iIzNkNGRhNiIgZD0iTTM3NCA3Nmw1IDEgMiA2LTEgMTAtMiAzLTUtMi02LTN2LTFsOC0xIDEtMiAxLTktMy0xeiIvPjxwYXRoIGZpbGw9IiM5YTg2NTgiIGQ9Ik01MjggNDN2M2wxIDYgNSAxdjJoNWwyIDctMy0xdi0ybC0xMC0yLTEtMi0zLTEgMS0xMHoiLz48cGF0aCBmaWxsPSIjYTk5MjRjIiBkPSJNNTQwIDE1aDN2MmwtMyAxLTEgMTB2NmgtM3Y3aC0xdi01bC00IDF2LTVsMi0xIDEtOCA0LTF2LTZ6Ii8+PHBhdGggZmlsbD0iIzRmOTZlYiIgZD0iTTM5NiAyNDVoMTJsMyAzdjRoLTEydi0zbC0zLTF6Ii8+PHBhdGggZmlsbD0iIzM1NTNkNiIgZD0iTTYzNiA5OGg0djJoLTJ2MmgtMmwtMSA0LTcgMi0xIDJoLTV2MmgtNHYtNGw4LTMgNC0zaDJ2LTJ6Ii8+PHBhdGggZmlsbD0iI2FlYTE2NCIgZD0iTTczIDIzMWg3bC0xIDNoLTJsMiAxMi02LTItMi0ydi05eiIvPjxwYXRoIGZpbGw9IiMyOTFhMjUiIGQ9Ik02NjQgMzIyaDJ2NWwtNCA0IDYgMnYybC0xMi0xIDItMXYtMmwtNy0xLTMtMiAxNi0yeiIvPjxwYXRoIGZpbGw9IiNkYmQxNGEiIGQ9Ik02NjAgMjEwaDF2MjlsLTIgMTBoLTJsLTIgMTAtMiAyIDItMTAgMy0xNnoiLz48cGF0aCBmaWxsPSIjYTdhYTcxIiBkPSJNNDU1IDIzMmw3IDMgMiAzLTEgOC0zIDJoLTNsLTEtMTJ6Ii8+PHBhdGggZmlsbD0iIzMwMjgzNCIgZD0iTTYyOCAzMjloMTlsMyAzLTIgMi0xMCAzaC0zdi00aDJ2LTJsLTktMXoiLz48cGF0aCBmaWxsPSIjNTQ0NjQyIiBkPSJNNjUzIDMyMmgxMXY0bC0xMyAzLTIgMi01LTN2LTJsNi0xIDMtMXoiLz48cGF0aCBmaWxsPSIjNzg3NzhmIiBkPSJNMzk1IDE4MGg3djRsLTYgMy0zIDJoLTdsMi01eiIvPjxwYXRoIGZpbGw9IiNhYzk1NWUiIGQ9Ik01NTAgN2w2IDEgMSAzLTQgNS01IDMtMiAyLTMtMSAxLTIgMiAxdi03eiIvPjxwYXRoIGZpbGw9IiM5NzY4OTciIGQ9Ik0zMzAgMzI3aDEzbDEgNC02IDMtNy0xLTEtMXoiLz48cGF0aCBmaWxsPSIjMjA0Mjk1IiBkPSJNMzM4IDI0M2w1IDEgMiA0djVsMSAyaC0xOXYtMmwxNS0xLTQtN3oiLz48cGF0aCBmaWxsPSIjYzBiMTRkIiBkPSJNMTI1IDIwNmgxOXYybC0xNCAzLTMgMnYtM2wtOCAxIDMtMnoiLz48cGF0aCBmaWxsPSIjNmU4M2FjIiBkPSJNMjA1IDI1NmwxMCAyIDEgNCA0IDItMSAyaC04bC0xLTMtNS0yeiIvPjxwYXRoIGZpbGw9IiMyMzM3ODIiIGQ9Ik02NDYgMTk2aDExdjVoLTd2LTNoLTRsLTEgNWgtOHYtMmgybDEtM3oiLz48cGF0aCBmaWxsPSIjM2Q1M2E3IiBkPSJNMzQ0IDkyaDdsMSAxdjhsLTEgMWgtN2wtMS02eiIvPjxwYXRoIGZpbGw9IiNhMzhjNTMiIGQ9Ik01NjUgN2g4bDEzIDR2OGwtNC0xIDEtMy00LTEtMS00aC04bC0yLTF2NGgtMnoiLz48cGF0aCBmaWxsPSIjNDM0OTg4IiBkPSJNMjAgMzAxaDEydjJoLTJsMiA1SDE4bC0yLTIgNi0xLTItMXoiLz48cGF0aCBmaWxsPSIjNzA3ODllIiBkPSJNMTY0IDI5M2gxNGw1IDIgNiAxLTIgMmgtMTFsLTEyLTJ6Ii8+PHBhdGggZmlsbD0iI2IzYTI1NiIgZD0iTTQ1OCA4Nmg2bC00IDIgMSAxMGg2bDEtMiAyIDEtMSA0aC00di0ybC0xMC0xLTEtNWgydi02eiIvPjxwYXRoIGZpbGw9IiMwZjMyOWQiIGQ9Ik00MTQgMjUzaDM0djJsLTM0IDF6Ii8+PHBhdGggZmlsbD0iIzFhMzRhNCIgZD0iTTQzNCAxNjBsNiAxdjJsLTYgMXYyaC0zbDEgNS02LTEtMi0yIDMtNXoiLz48cGF0aCBmaWxsPSIjMjQzNjhmIiBkPSJNNjI0IDE5M2w4IDEtMiA0di0zbC02IDJ2LTJoLTJ2OGwtNCAyaC01bDEtMiAzIDEtMS0ydi02aDJ2LTJ6Ii8+PHBhdGggZmlsbD0iI2U5YzY0NyIgZD0iTTEwMCAxMzZoOGwxIDQtMiAyLTEgNC01IDEtMS0xeiIvPjxwYXRoIGZpbGw9IiMzOTZlZTIiIGQ9Ik0xOTIgMjYzaDEzbDQgMnYzaC0xNXoiLz48cGF0aCBmaWxsPSIjZjBkYTBhIiBkPSJNNjQyIDE2M2w5IDIgOCA0IDEgNC01LTEtNi0ydi0yaC02eiIvPjxwYXRoIGZpbGw9IiM2YzZlN2IiIGQ9Ik0zMDAgNjRoNmwzIDJ2OWwtMyAzaC04bC0zLTR2LTd6bTAgM2wtNCAxIDEgNyAxIDFoOGwyLTJ2LTVoLTN2LTJ6Ii8+PHBhdGggZmlsbD0iIzUwNmRlNSIgZD0iTTI3MyAyMTVoNWwtMSA0aC00bC0yIDdoLTJsLTEgM2gtMmwxLTEwIDMtM3oiLz48cGF0aCBmaWxsPSIjODY2YWQ3IiBkPSJNMzc5IDMwN2gydjdsLTkgM2gtN2wxLTMgNS0yaDV2LTNoM3oiLz48cGF0aCBmaWxsPSIjMzk0NzhhIiBkPSJNNTA4IDIwMWwxMiAxLTIgNC0zIDJoLTExdi0yaDN6Ii8+PHBhdGggZmlsbD0iIzY5NWU0OSIgZD0iTTY0NSAxNzBsNCAyIDkgMTUgMSA1djhoLTF2LTZoLTVsMS0xMC00LTQtMy02eiIvPjxwYXRoIGZpbGw9IiM2Zjc0ODIiIGQ9Ik0zMDcgODZoNmwzIDJ2OGgtNmwtMi01eiIvPjxwYXRoIGZpbGw9IiMyMjJkN2IiIGQ9Ik02NDUgMjA3aDE1bC0xIDRoLTE5di0yeiIvPjxwYXRoIGZpbGw9IiM3YjgwOWYiIGQ9Ik0yMjYgMjgzaDh2OGw0IDF2MWwtMTEtMSAxLTNoNHYtMmgtOHYtMmgyeiIvPjxwYXRoIGZpbGw9IiNkMWM4NTYiIGQ9Ik02MzEgMTU5bDEwIDEgOCAzIDEzIDUgNiA0LTIgMS0xNS03LTktMi03LTF6Ii8+PHBhdGggZmlsbD0iIzk3N2I4ZCIgZD0iTTM0OCAzMDRoN2wtMSAzaC04bDggNCAzIDUtOC0xLTYtNyAxLTN6Ii8+PHBhdGggZmlsbD0iIzMyMzAyZSIgZD0iTTY0OCAyNjdoMmwtMiA3LTUgMy0zIDYtNCA0LTMtMSAyLTUgNC0xIDEtNC0xLTUgOCAydi01eiIvPjxwYXRoIGZpbGw9IiMzODVkZDIiIGQ9Ik0yNDIgMjYyaDZ2N2wtMTEgMXYtNWw1LTF6Ii8+PHBhdGggZmlsbD0iIzNlNTc5ZCIgZD0iTTI5OCA2NGwyIDEtMiAyaC0zbDIgOSA0IDJ2MmgtM2wtMSAyLTYtMnYtNGgybC0xLTh6Ii8+PHBhdGggZmlsbD0iIzdmODM5MCIgZD0iTTE3NSAyNjRoNWwzIDR2NGgtMTB2LTVoMnoiLz48cGF0aCBmaWxsPSIjMGMxNDdiIiBkPSJNMjI2IDI2Mmg0djExbC0zIDNoLTJsLTEtN3oiLz48cGF0aCBmaWxsPSIjY2NjMjVlIiBkPSJNMTI4IDI1NGwxIDJoMnYybDUgMSAyIDUtNSAxLTEwLTUgMS0yIDQgMXYtMnoiLz48cGF0aCBmaWxsPSIjNTg2NTk5IiBkPSJNMjk4IDk5aDE0bDQgNnY3aC0ybC0yLTktMS0zLTEwIDEtMSAxMWgtMmwtMS0xMnoiLz48cGF0aCBmaWxsPSIjOGU4Yzc2IiBkPSJNMzY4IDc5aDVsMyAydjVsLTkgMi0xLTh6Ii8+PHBhdGggZmlsbD0iIzY3N2ViNyIgZD0iTTMwNCAyNzdoOWwxIDUtNCAyaC04eiIvPjxwYXRoIGZpbGw9IiM1MjVhN2QiIGQ9Ik0zNzIgNzZsNSAydjlsLTIgM2gtOGwtMi00di01bDIgMiAxIDQgOC0xdi01bC02LTIgMi0xeiIvPjxwYXRoIGZpbGw9IiM2YTcwODkiIGQ9Ik0zMzMgNjJsNyAxdjlsLTctMXoiLz48cGF0aCBmaWxsPSIjNGQ3NWQzIiBkPSJNNDI0IDIzN2gzM3YxMWw1LTItMSA1aC01bC0xLTEyLTMxLTF6Ii8+PHBhdGggZmlsbD0iIzFmMTgyMCIgZD0iTTc1IDIyOWg1bDEgNS0xIDJ2OGgtMmwtMS0ydi04aDJ2LTJoLTZsLTEgMS0xIDloLTJ2LThsMS00eiIvPjxwYXRoIGZpbGw9IiMzNzJmMWEiIGQ9Ik0xMDQgMjI4aDJ2MTJsMiA4aDJ2MmgydjJsNCAyIDcgNC0xIDItMTEtNi00LTV2LTJoLTJsLTEtNnoiLz48cGF0aCBmaWxsPSIjYWFhMjY5IiBkPSJNMjEzIDE1Mmw0IDEtMSA0aDJ2NmwtMiA1aC0ybC0yLTh6Ii8+PHBhdGggZmlsbD0iIzIyMmM2OSIgZD0iTTQzIDIwNWgxMGwzIDF2M2wtNCAxSDQyeiIvPjxwYXRoIGZpbGw9IiMyNzIzN2IiIGQ9Ik0zNTYgMzA4aDlsMyAxdjJoNWwtMiAyLTYgMnYtMmwtOS0yeiIvPjxwYXRoIGZpbGw9IiMzZTQyNzEiIGQ9Ik0xNDQgMzAwbDMgMXY0bC0zIDFoLThsLTUtMnYtMmg0djJoM3YtM3oiLz48cGF0aCBmaWxsPSIjNDA0NTgwIiBkPSJNNjcgMzI1bDkgMSAxIDMtMTkgMiAxLTN6Ii8+PHBhdGggZmlsbD0iIzJmMzc2NiIgZD0iTTEyMiAzMTZoOGw2IDF2MmwtOCAyaC0xNnYtMWwxMi0xeiIvPjxwYXRoIGZpbGw9IiMyODIwMTkiIGQ9Ik02NzYgMjY2aDJsLTIgNy0zIDNoLTV2MmwtMyAyLTQtMSAxMy0xMHoiLz48cGF0aCBmaWxsPSIjMzczNjU3IiBkPSJNMTExIDI1M2wxMSA2IDExIDUgNCAyLTktMS03LTQtOS0zeiIvPjxwYXRoIGZpbGw9IiM2NDYyNjEiIGQ9Ik02NDkgMTU4aDN2MmgydjNsNCAzLTYtMS0xMC0zLTEtMnoiLz48cGF0aCBmaWxsPSIjNDM1MTljIiBkPSJNMTY1IDEwNmw5IDEtMSA1aC0xMHYtMmgyeiIvPjxwYXRoIGZpbGw9IiMxYjJiN2MiIGQ9Ik02NTAgMjM0aDd2N2wtMTEtMXYtMmg0eiIvPjxwYXRoIGZpbGw9IiMxNTMyOGUiIGQ9Ik02MjYgMTU4aDJsMSAyIDQgMnYxaC03djJsLTUgMmgtM3YtMmw2LTVoMnoiLz48cGF0aCBmaWxsPSIjNjY2OTdhIiBkPSJNOTYgMTI1aDE3bDIgMi0xMiAydi0zaC0zdjJoLTJ2MmgtM3oiLz48cGF0aCBmaWxsPSIjMDkxNjU5IiBkPSJNMTM3IDM2NWw2IDEgMSA0aC0xNmwyLTJ6Ii8+PHBhdGggZmlsbD0iIzYyNmM3OSIgZD0iTTM3MSAzMmg0bDIgNXY0bC02LTEtMS03eiIvPjxwYXRoIGZpbGw9IiM1OTU0NmYiIGQ9Ik01NDIgNGgzdjRsNS0xLTEgMi02IDFWOGwtMyAxLTEgMi03LTEgNC0zIDUtMnoiLz48cGF0aCBmaWxsPSIjMWQzNzk0IiBkPSJNNTk2IDE4NGg2bC0yIDRoLTN2MmwtNiAxIDEtNXoiLz48cGF0aCBmaWxsPSIjNDc1MmFhIiBkPSJNMjg4IDI2Nmg1bDMgN3YzbDggMXY1aC0ydi00aC02bC00LTgtNC0xeiIvPjxwYXRoIGZpbGw9IiM1ODYyOTYiIGQ9Ik0xMTEgMjE3djNsLTQgNy00LTF2LThsMiA0aDJ2LTN6Ii8+PHBhdGggZmlsbD0iIzdiNmU2MSIgZD0iTTY0NyAzNTFsMiAxLTEgMmgzMHYxaC0zNHYtM3oiLz48cGF0aCBmaWxsPSIjMWIyYTdmIiBkPSJNNjQwIDI0MWgxMHYyaC0ydjNoLTh6Ii8+PHBhdGggZmlsbD0iIzM4NDY5NiIgZD0iTTEyNiAyMTRsMSAyLTEgNyAzIDF2Mmw5IDF2MmgtN2wtMy0xLTEtNGgtNGwyLTl6Ii8+PHBhdGggZmlsbD0iI2UyYjQzOCIgZD0iTTU2MSAzMmgybDEgNGgydjZsLTEgMi00LTF6Ii8+PHBhdGggZmlsbD0iIzRjNGIzYiIgZD0iTTY1OCAxNjZsNSAxIDMgMXYybDUgMiA0IDJ2MmgzbC0xIDMtMTUtMTAtNC0yeiIvPjxwYXRoIGZpbGw9IiM5Yjk1NzMiIGQ9Ik01OTggNjFoNHY1bC02IDMtMSAzLTMtMSAyLTRoMnYtMmwyLTF6Ii8+PHBhdGggZmlsbD0iI2M1YWYyNCIgZD0iTTc0IDIzMmgybDEgMTAtMyAxdi0yaC0ydi03eiIvPjxwYXRoIGZpbGw9IiM0ZDQ1NWIiIGQ9Ik02NDggMjg4bDEgMmg0bDEgMy02IDFoLTEydi0yaDEweiIvPjxwYXRoIGZpbGw9IiMyMzFlNDMiIGQ9Ik01NTMgMGgxMWwtNSA1aC0ydjJoLTNWMnoiLz48cGF0aCBmaWxsPSIjMzExYjMzIiBkPSJNMzQ1IDMwNmg5bDEgNS02LTF6Ii8+PHBhdGggZmlsbD0iIzM0MzU5OCIgZD0iTTI4NiAyNjhsMiAxLTEgMXY4bDIgMiAzIDgtNC0ydi00aC0ybC0xLTJ2LTExeiIvPjxwYXRoIGZpbGw9IiM1ZTcwYWMiIGQ9Ik02MDcgNzFoM3Y3aC02bDEtNHoiLz48cGF0aCBmaWxsPSIjNzE5MzllIiBkPSJNNDU2IDIzN2gxdjExbDUtMi0xIDVoLTV6Ii8+PHBhdGggZmlsbD0iIzdlN2I2NyIgZD0iTTMzNCA2M2w1IDF2NmwtNC0xLTEtMXoiLz48cGF0aCBmaWxsPSIjNDg0OTdkIiBkPSJNMTI0IDIwNGwyMCAxdjFoLTE5bC0xIDMtMS00eiIvPjxwYXRoIGZpbGw9IiMxZjFlNGQiIGQ9Ik0zNCAyOTBoNWwxIDUtNy0xLTEtMmgyeiIvPjxwYXRoIGZpbGw9IiNiZGFmMmQiIGQ9Ik00NTggMjM2bDMgMXY5aC0zeiIvPjxwYXRoIGZpbGw9IiM3YjY5NTgiIGQ9Ik0xMjEgMTQ0bDEgMmgzbC0xIDItMy0xLTEgNWgtNGwxLTRoMnoiLz48cGF0aCBmaWxsPSIjNWE2YThmIiBkPSJNMTQxIDIwOGgydjJsLTEwIDItMiAyLTQtMSAzLTN6Ii8+PHBhdGggZmlsbD0iI2IwYTU3NCIgZD0iTTEyNSAyMDZoMTl2MmwtNiAxdi0xaC0xM3oiLz48cGF0aCBmaWxsPSIjNTA1YzczIiBkPSJNNjMzIDE1NWg0djRsMyAxLTktMXoiLz48cGF0aCBmaWxsPSIjMTkyYzk1IiBkPSJNMjAzIDkybDcgMS0xIDNoLTd6Ii8+PHBhdGggZmlsbD0iIzI4MWI3ZCIgZD0iTTI3MSAyMDVsMSA0LTEgNWgtMmwtMiAzdi03aDJ6Ii8+PHBhdGggZmlsbD0iIzdjNzI1NiIgZD0iTTQ1MyA5NmwxMiAzdjJsMiAxLTMgMS0xLTNoLTl6Ii8+PHBhdGggZmlsbD0iIzBmMjk3NSIgZD0iTTE4NyAyMjBsNCAyIDEgNGgtMnYyaC0yeiIvPjxwYXRoIGZpbGw9IiMyNzNjYTAiIGQ9Ik0yMjQgMjczbDEgMyAyIDFoLTNsLTEgNC0zLTEgMi02eiIvPjxwYXRoIGZpbGw9IiMyNjI4M2IiIGQ9Ik02NTIgMjAyaDdsMiAyLTEgNC0yLTRoLTZ6Ii8+PHBhdGggZmlsbD0iI2VmZDIxYSIgZD0iTTEyNCAyMTBoM3YzaC0zdjJoLTZ2LTJsNi0xeiIvPjxwYXRoIGZpbGw9IiMyNDMwNjgiIGQ9Ik0xODggMzYyaDR2MmwtOCA0IDEtNHoiLz48cGF0aCBmaWxsPSIjMmEyOTMwIiBkPSJNMTI3IDI0OGw0IDUgMSA0aDNsLTEgMi0zLTF2LTJoLTJsLTItNHoiLz48cGF0aCBmaWxsPSIjNzk4MDhhIiBkPSJNNTIyIDIwMmg2djNsLTYgMXoiLz48cGF0aCBmaWxsPSIjMjEyZTY4IiBkPSJNMzYgMTgzbDMgMXYxMWgtMWwtMi03eiIvPjxwYXRoIGZpbGw9IiNiN2E3NDEiIGQ9Ik0yMTYgMTU3aDJ2NmwtMiA1aC0xdi04eiIvPjxwYXRoIGZpbGw9IiM5YTkwNjUiIGQ9Ik05NiAxNDloMnYzbDMgMSAxIDUtNi01eiIvPjxwYXRoIGZpbGw9IiMyNzFhMGEiIGQ9Ik02NTkgMjgwaDJsLTEgMy04IDQtMi0xeiIvPjxwYXRoIGZpbGw9IiNkYWNmNGMiIGQ9Ik02NTQgMjgxbDQgMS04IDUtMy0xeiIvPjxwYXRoIGZpbGw9IiNjZGMxMzkiIGQ9Ik0xMjggMjU0bDEgMmgybDMgN2gtMnYtMmgtNHYtNHoiLz48cGF0aCBmaWxsPSIjMTcyNTkyIiBkPSJNMzg0IDIwN2gzdjNsLTYgMS0zLTJ6Ii8+PHBhdGggZmlsbD0iI2RkZDIyYSIgZD0iTTY0MiAxNjNsNiAxLTEgMmgtMnYybC0zLTF6Ii8+PHBhdGggZmlsbD0iIzE3M2U5MiIgZD0iTTM1NiAyNTJoNnYzaC01eiIvPjxwYXRoIGZpbGw9IiMyNDFjMzQiIGQ9Ik00NTggMjMyaDVsMSA1LTYtNHoiLz48cGF0aCBmaWxsPSIjNGY0MzFlIiBkPSJNNjQ4IDI2N2gybC0yIDctMi0xeiIvPjxwYXRoIGZpbGw9IiNlNWQ0MzgiIGQ9Ik02NzYgMjY0aDJ2MmgtMmwtMiA0LTEtM3oiLz48cGF0aCBmaWxsPSIjYWRhYjc2IiBkPSJNMTM0IDI1OWgybDIgNS01IDEgMi0xeiIvPjxwYXRoIGZpbGw9IiNkZGQwNGEiIGQ9Ik02NjggMTczbDUgMiAxIDItNS0xeiIvPjxwYXRoIGZpbGw9IiMxMjA2MzgiIGQ9Ik0zNTEgMzA3aDNsMSA0aC0zeiIvPjxwYXRoIGZpbGw9IiM0MTM0MTUiIGQ9Ik02MzUgMjgzbDMgMS0yIDMtMy0xeiIvPjxwYXRoIGZpbGw9IiM0ODU4YjgiIGQ9Ik0zNTUgMjE3bDEgMy0yIDMtMi0xeiIvPjxwYXRoIGZpbGw9IiM2ZjczOTkiIGQ9Ik04MSAzMzBoM3YzbC00LTF6Ii8+PHBhdGggZmlsbD0iIzZiNWMxZCIgZD0iTTYzNSAyODlsNCAxLTUgMi0xLTJ6Ii8+PHBhdGggZmlsbD0iIzU1NzhlNiIgZD0iTTI1IDE2MmgzbC0xIDNoLTJ6Ii8+PC9zdmc+`;
      // 屏蔽按钮图标
      const blockBtnIcon = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjQgNDRDMzUuMDQ1NyA0NCA0NCAzNS4wNDU3IDQ0IDI0QzQ0IDEyLjk1NDMgMzUuMDQ1NyA0IDI0IDRDMTIuOTU0MyA0IDQgMTIuOTU0MyA0IDI0QzQgMzUuMDQ1NyAxMi45NTQzIDQ0IDI0IDQ0WiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNSAxNUwzMyAzMyIgc3Ryb2tlPSIjZjNmM2YzIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==`;

      this.css = {
        blockBtn: `.brlb-block-btn .brlb-block-btn-icon,
                .brlb-block-btn-icon {
                    pointer-events: none;
                    user-select: none;
                    width: 22px;
                    height: 22px;
                    color: #fff
                }
                
                .brlb-block-btn-icon {
                    background-image: url(${blockBtnIcon})
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
      };
      // 样式
      const styleDom = document.createElement('style');
      styleDom.innerHTML = this.css.blockBtn + this.css.blockPic;
      document.head.appendChild(styleDom);
    }

    // 添加屏蔽按钮
    addBlockBtn(cardView) {
      if (cardView.getElementsByClassName('brlb-block-btn').length != 0) {
        return ;
      }
      const blockBtn = createElement('div', {
        className: 'brlb-block-btn',
        style: {
          display: 'none',
        },
      }, [createElement('svg', {
        className: 'brlb-block-btn-icon',
      })]);
      cardView.insertBefore(blockBtn, cardView.childNodes[1]);
    }

    // mouseEnter才显示按钮
    setCardViewEvent(cv) {
      cv.onmouseover = (ev) => {
        ev = ev || window.event;
        const target = ev.target;
        if (target.parentElement.className === 'v-img bili-video-card__cover' || target.className === 'v-img bili-video-card__cover') {
          const cardView = target.closest('.bili-video-card__wrap');
          const blockDiv = cardView.getElementsByClassName('brlb-block-btn')[0];
          blockDiv.setAttribute('style', '');
        }
      };
      cv.onmouseout = (ev) => {
        ev = ev || window.event;
        const target = ev.target;
        if (ev.toElement != null && ev.toElement.className === 'brlb-block-btn') {
          return false;
        }
        if (target.parentElement.className === 'v-img bili-video-card__cover' || target.className === 'v-img bili-video-card__cover') {
          const cardView = target.closest('.bili-video-card__wrap');
          const blockDiv = cardView.getElementsByClassName('brlb-block-btn')[0];
          blockDiv.setAttribute('style', 'display: none;');
        }
      };
    }

    setBlockBtnEvent(recommendContainer) {
      recommendContainer.onclick = (ev) => {
        ev = ev || window.event;
        const target = ev.target;
        if (target.className.toLowerCase() === 'brlb-block-btn') {
          let cardView = target.parentElement;
          const id = cardView.parentElement.dataset.brlbId;
          let uid;
          if (this.isAd(cardView)) {
            uid = 0;
          } else {
            uid = this.getUid(cardView);
          }
          if (uid != null) {
            if (cardView.parentElement.dataset.blocked == '1') {
              console.log(`${uid} 取消屏蔽`);
              this.blockList.remove('uid', uid.toString());
              cardView = this.unblockCardView(cardView, id);
              this.addBlockBtn(cardView);
              this.setCardViewEvent(cardView);
            } else {
              if (this.blockList.add('uid', uid.toString()) === true){
                console.log(`${uid} 已屏蔽`);
                cardView = this.blockCardView(cardView, uid);
                this.addBlockBtn(cardView);
                this.setCardViewEvent(cardView);
              }
            }
          }
          cardView.parentElement.dataset.brlbId = id;
        }
      };
    }

    blockCardView(cardView, uid) {
      const newCardView = createElement('div', {
        'className': 'bili-video-card__wrap __scale-wrap brlb-block',
      }, []);
      newCardView.innerHTML = `
      <div>
        <div class="bili-video-card__image __scale-player-wrap">
            <div class="bili-video-card__image--wrap">
                <picture class="v-img bili-video-card__cover"></picture>
            </div>
        </div>
      </div>
      <div class="bili-video-card__info __scale-disable">
        <div class="bili-video-card__info--right">
          <a target="_blank">
            <h3 class="bili-video-card__info--tit" title="黑名单内容">黑名单内容</h3>
          </a>
          <div class="bili-video-card__info--bottom">
            <a class="bili-video-card__info--owner">
              <svg class="bili-video-card__info--owner__up">
              <use xlink:href="#widget-up"></use>
              <span class="bili-video-card__info--author">已屏蔽</span>
            </a>
          </div>
        </div>
      </div>
      `;

      cardView.replaceWith(newCardView);
      newCardView.parentElement.dataset.blocked = '1';
      newCardView.parentElement.dataset.brlbUid = uid.toString();
      return newCardView;
    }

    unblockCardView(cardView, id) {
      // 再次点击取消屏蔽
      const cv = this.history[cardView.parentElement.parentElement.className][id];
      cardView.replaceWith(cv);
      cv.parentElement.dataset.blocked = '0';
      return cv;
    }

    getUid(cardView) {
      const owner = cardView.getElementsByClassName('bili-video-card__info--owner')[0].href;
      if (owner.length > 0) {
        const uid = owner.substr(owner.lastIndexOf('/') + 1);
        return uid;
      } else {
        return cardView.parentElement.dataset.brlbUid;
      }
    }

    isAd(cardView) {
      return cardView.getElementsByClassName('bili-video-card__info--ad-img').length > 0;
    }

    // 换一换
    rollObserver(recommendContainer) {
      const rollCallback = (mutationsList, observer) => {
        const recommendList = recommendContainer.getElementsByClassName('bili-video-card__wrap');
        this.history[recommendContainer.className] = Array.from(recommendList);
        this.run(recommendList);
      };
      const rollObse = new MutationObserver(rollCallback);
      const config = {attributes: false, childList: true, subtree: false};
      rollObse.observe(recommendContainer, config);
    }

    register(container) {
      const cardViewList = container.getElementsByClassName('bili-video-card__wrap');
      this.history[container.className] = Array.from(cardViewList);
      this.run(cardViewList);
      this.setBlockBtnEvent(container);
    }

    run(cardViewList) {
      let index = 0;
      for (let cardView of cardViewList) {
        if (this.isAd(cardView)) {
          // 广告
          cardView = this.blockCardView(cardView, 0);
          this.addBlockBtn(cardView);
          this.setCardViewEvent(cardView);
        } else {
          // 普通视频
          const uid = this.getUid(cardView);
          if (uid != null && this.blockList.isContained('uid', uid) === true) {
            cardView = this.blockCardView(cardView, uid);
          }
          this.addBlockBtn(cardView);
          this.setCardViewEvent(cardView);
        }
        cardView.parentElement.dataset.brlbId = index.toString();
        index++;
      }
    }
  }

  class BlockList {
    constructor() {
      this.list = JSON.parse(GM_getValue('blockList') || '{"uid":[],"username":[],"title":[]}');
      // 历史遗留问题（
      if (this.list instanceof Array) {
        this.list = {'uid': this.list, 'username': [], 'title': []};
      }
      Object.entries(this.list).forEach(([key, value]) => {
        this.list[key] = this.list[key].sort();
        this.removeDuplicates(key);
      });
      console.log(`黑名单列表：`);
      console.log(this.list);
    }

    length(key) {
      return this.list[key].length;
    }

    isContained(key, item) {
      return (this.list[key][this.search(key, item)] === item);
    }

    add(key, item) {
      const index = this.search(key, item);
      if (this.list[key][index] !== item) {
        this.list[key].splice(index, 0, item);
        GM_setValue('blockList', JSON.stringify(this.list));
        return true;
      }
      return false;
    }

    remove(key, item) {
      const index = this.search(key, item);
      if (this.list[key][index] === item) {
        this.list[key].splice(index, 1);
        GM_setValue('blockList', JSON.stringify(this.list));
        return true;
      }
      return false;
    }

    clr() {
      console.log(`清空黑名单`);
      GM_setValue('blockList', '{"uid":[],"username":[],"title":[]}');
      this.list = {'uid': [], 'username': [], 'title': []};
    }

    search(key, target) {
      const n = this.list[key].length;
      let left = 0;
      let right = n - 1;
      let ans = n;
      while (left <= right) {
        const mid = ((right - left) >> 1) + left;
        if (target <= this.list[key][mid]) {
          ans = mid;
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
      return ans;
    }

    removeDuplicates(key) {
      const n = this.list[key].length;
      if (n === 0) {
        return 0;
      }
      let r = 1;
      let l = 1;
      while (r < n) {
        if (this.list[key][r] !== this.list[key][r - 1]) {
          this.list[key][l] = this.list[key][r];
          ++l;
        }
        ++r;
      }
      return l;
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * refer to: https://github.com/ipcjs/bilibili-helper
   */
  function createElement(type, props, children) {
    let elem = null;
    if (type === 'text') {
      return document.createTextNode(props);
    } else {
      elem = document.createElement(type);
    }
    for (const n in props) {
      if (n === 'style') {
        // eslint-disable-next-line guard-for-in
        for (const x in props.style) {
          elem.style[x] = props.style[x];
        }
      } else if (n === 'className') {
        elem.className = props[n];
      } else if (n === 'event') {
        // eslint-disable-next-line guard-for-in
        for (const x in props.event) {
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

  window.addEventListener('DOMContentLoaded', () => {
    const blockList = new BlockList();
    const biliBlocker = new BiliBlocker(blockList, true);
    const recommendContainer = document.querySelectorAll('div[class^="recommend-container__"]')[0];
    if (recommendContainer != null) {
      const evaContainer = document.querySelectorAll('div[class^="eva-extension-body"]')[0];
      biliBlocker.register(recommendContainer);
      biliBlocker.register(evaContainer);

      // 延迟一会，避免重复处理
      setTimeout(() => {
        biliBlocker.rollObserver(recommendContainer);
      }, 100);
    }
  }, false);
})();

