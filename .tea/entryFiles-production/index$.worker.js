
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/login/login');
require('../../pages/datePage/datePage');
require('../../pages/orderdetail/orderdetail');
require('../../pages/edit/edit');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
