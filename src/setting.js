import {createElement} from './utils';

export default class Setting {
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
                    width: 360px;
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
        GM_log(uid);
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
                placeholder: '添加屏蔽词，正则以 / 开头 / 结尾',
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
                  }, '屏蔽用户uid'),
                  createElement('div', {
                    'className': 'bui-tabs-header-item',
                    'data-index': '1',
                  }, '正则屏蔽用户'),
                  createElement('div', {
                    'className': 'bui-tabs-header-item',
                    'data-index': '2',
                  }, '正则屏蔽视频'),
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
          // width: '600px',
          transform: 'translate(-50%,-50%)',
          cursor: 'default',
        },
      }, [
        createElement('h2', {}, [createElement('text', `${GM_info.script.name} v${GM_info.script.version} 设置`)]),
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
        // if (index === '1')
      }
    };

    btnWrap.insertBefore(settingBtn, firstBtn);
  }
}
