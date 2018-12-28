
require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/components/header/header');
require('../../pages/components/calendar/calendar');
require('../../pages/index/index');
require('../../pages/login/login');
require('../../pages/datePage/datePage');
require('../../pages/orderdetail/orderdetail');
require('../../pages/edit/edit');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
