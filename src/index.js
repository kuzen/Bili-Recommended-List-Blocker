import BiliBlocker from './biliBlocker';
import BlockList from './blockList';


window.addEventListener('DOMContentLoaded', () => {
  const blockList = new BlockList();
  const biliBlocker = new BiliBlocker(blockList);
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

