import BiliBlocker from './biliBlocker';
import BlockList from './blockList';

window.addEventListener('DOMContentLoaded', () => {
  const blockList = new BlockList();
  const biliBlocker = new BiliBlocker(blockList);
  const isNewVer = document.querySelectorAll('div[class="bili-feed4"]').length;
  if (isNewVer === 1) {
    // 新版
    const recommendContainer = document.querySelectorAll('div[class="feed-recommend2"]')[0];
    biliBlocker.register(recommendContainer);
    // var index = 0;
    // var evaContainer = document.querySelectorAll('div[class="feed2-floors"]')[0];
    // const evaCallback = (mutationsList, observer) => {
    //   var timer = null;
    //   clearTimeout(timer);
    //   evaContainer = document.querySelectorAll('div[class="feed-floor"]');
    //   timer = setTimeout(() => {
    //     var i = 0;
    //     for (i = index; i < evaContainer.length; i++) {
    //       biliBlocker.register(evaContainer[i], evaContainer[i].id);
    //     }
    //     index = i;
    //     // evaObse.disconnect();
    //   }, 500);
    // };
    // const evaObse = new MutationObserver(evaCallback);
    // const config = {attributes: false, childList: true, subtree: true};
    // evaObse.observe(evaContainer, config);

    // 延迟一会，避免重复处理
    setTimeout(() => {
      biliBlocker.rollObserver(recommendContainer);
    }, 100);
  } else {
    // 旧版
    const recommendContainer = document.querySelectorAll('div[class^="recommend-container__"]')[0];
    evaContainer = document.querySelectorAll('div[class^="eva-extension-body"]')[0];
    biliBlocker.register(recommendContainer, recommendContainer.className);
    biliBlocker.register(evaContainer, evaContainer.className);

    // 延迟一会，避免重复处理
    setTimeout(() => {
      biliBlocker.rollObserver(recommendContainer);
    }, 100);
  }
}, false);

