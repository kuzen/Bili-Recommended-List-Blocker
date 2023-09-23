import {createElement} from './utils';
import {createSettingWarp} from './settingPanel';
import settingStyle from './style/setting.css';

export default class Setting {
  constructor(blockList) {
    this.blockList = blockList;
    GM_addStyle(settingStyle);
    this.listWrap = null;
    const btnWarpCallback = (mutationsList, _observer) => {
      setTimeout(() => {
        this.addSettingBtn();
      }, 1000);
      this.btnWarpObserver.disconnect();
    };
    this.btnWarpObserver = new MutationObserver(btnWarpCallback);
    const targetNode = document.getElementById('i_cecream');
    const config = {attributes: false, childList: true, subtree: true};
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

    const closeEvent = (event) => {
      if (event.target === this) {
        document.body.style.overflow = '';
        this.remove();
      }
    };

    const clrEvent = (event) => {this.blockList.clr();};

    const settingsPanelWarp = createSettingWarp(closeEvent, clrEvent, addBtnClick);
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
          document.body.appendChild(settingsPanelWarp);
          this.refreshList('uid');
        },
      },
    }, '屏蔽设置');

    const btnWrap = document.getElementsByClassName('palette-button-wrap')[0];
    const firstBtn = btnWrap.getElementsByClassName('top-btn-wrap')[0];
    this.listWrap = settingsPanelWarp.getElementsByClassName('brlb-block-list-wrap')[0];
    
    this.listWrap.onclick = (ev) => {
      ev = ev || window.event;
      const target = ev.target;
      if (target.className.toLowerCase() === 'brlb-block-line-delete') {
        const uid = target.parentElement.firstChild.innerText;
        this.blockList.remove('uid', uid);
        ev.currentTarget.removeChild(target.parentElement);
      }
    };

    const tabsWrap = settingsPanelWarp.getElementsByClassName('bui-tabs-header')[0];

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
