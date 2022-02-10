import BiliBlocker from './biliBlocker';
import BlockList from './blockList';
// import './style/main.less'
// import { add } from './example'

/* ==UserConfig==
blockList:
  uid:
    title: uid黑名单
    description: uid黑名单，注意若格式填写有问题则会影响脚本运行！格式为 ["xxx", "xxx"]
    default: s[]
 ==/UserConfig== */

async function main () {
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
}

main().catch((e) => {
  console.log(e)
})

