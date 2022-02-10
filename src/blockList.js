export default class BlockList {
  constructor() {
    // 处理历史遗留问题（逃
    this.list = JSON.parse(GM_getValue('blockList') || null);
    if (this.list != null) {
      if (this.list instanceof Array) {
        this.list = {'uid': this.list, 'username': [], 'title': []};
      }
      Object.entries(this.list).forEach(([key, value]) => {
        this.list[key] = this.list[key].sort();
        this.removeDuplicates(key);
        GM_setValue(`blockList.${key}`, JSON.stringify(this.list[key]));
      });
      GM_deleteValue(`blockList`);
    }

    // 新版本读取
    this.list = {'uid': [], 'username': [], 'title': []};
    Object.entries(this.list).forEach(([key, value]) => {
      this.list[key] = JSON.parse(GM_getValue(`blockList.${key}`) || '[]');
      this.list[key] = this.list[key].sort();
      this.removeDuplicates(key);
    });

    GM_log(`黑名单列表：${JSON.stringify(this.list)}`);
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
      GM_setValue(`blockList.${key}`, JSON.stringify(this.list[key]));
      return true;
    }
    return false;
  }

  remove(key, item) {
    const index = this.search(key, item);
    if (this.list[key][index] === item) {
      this.list[key].splice(index, 1);
      GM_setValue(`blockList.${key}`, JSON.stringify(this.list[key]));
      return true;
    }
    return false;
  }

  clr() {
    GM_log(`清空黑名单`);
    GM_setValue('blockList.uid', '[]');
    GM_setValue('blockList.username', '[]');
    GM_setValue('blockList.title', '[]');
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
