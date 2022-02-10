import Setting from './setting';
import {createElement} from './utils';
import './style/biliBlocker.css';

export default class BiliBlocker {
  constructor(blockList) {
    this.blockList = blockList;
    this.setting = new Setting(this.blockList);
    this.history = {};
  }

  // 添加屏蔽按钮
  addBlockBtn(cardView) {
    if (cardView.getElementsByClassName('brlb-block-btn').length !== 0) {
      return;
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
          if (cardView.parentElement.dataset.blocked === '1') {
            GM_log(`${uid} 取消屏蔽`);
            this.blockList.remove('uid', uid.toString());
            cardView = this.unblockCardView(cardView, id);
            this.addBlockBtn(cardView);
            this.setCardViewEvent(cardView);
          } else {
            if (this.blockList.add('uid', uid.toString()) === true) {
              GM_log(`${uid} 已屏蔽`);
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

  // TODO: 合并广告链接检测
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
