const {author, description, repository, version} = require('../package.json');

module.exports = {
  'name': 'b站首页黑名单 屏蔽首页视频',
  'version': version,
  'description': description,
  'namespace': 'https://github.com/kuzen',
  'author': author,
  'icon': 'https://www.google.com/s2/favicons?domain=bilibili.com',
  'run-at': 'document-start',
  'include': [
    '*://www.bilibili.com/',
    '*://www.bilibili.com/?*',
  ],
  'require': [],
  'license': 'MIT',
  'grant': [
    'GM_setValue',
    'GM_getValue',
    'GM_deleteValue',
    'GM_addStyle',
    'GM_log',
    'GM_addElement',
  ],
};
