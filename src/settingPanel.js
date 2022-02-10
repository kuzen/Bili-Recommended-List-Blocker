import { createElement } from './utils';

function createBlockListWarp(addEvent) {
  return createElement('div', {
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
                click: addEvent,
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
}

function createSettingWarp(closeEvent, clrEvent, addEvent) {
  brlbBlockListWrap = createBlockListWarp(addEvent);
  return createElement('div', {
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
      click(event) {
        if (event.target === this) {
          document.body.style.overflow = '';
          this.remove();
        }
      }
    },
  }, [
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
            click: clrEvent,
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
}


export { createBlockListWarp, createSettingWarp };
