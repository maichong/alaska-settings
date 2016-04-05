'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-03-01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

const routes = exports.routes = [{
  component: __dirname + '/views/SettingsEditor',
  path: 'settings'
}];

/**
 * @class SettingsService
 */
class SettingsService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-settings';
    options.dir = __dirname;
    super(options, alaska);
  }

  /**
   * 注册新设置选项
   * @param {Object} data
   * @returns {Settings}
   */
  register(data) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const Settings = _this.model('Settings');

      const id = data.id || data._id;
      let settings = yield Settings.findCache(id);
      if (settings) {
        return settings;
      }
      settings = new Settings(data);
      yield settings.save();
      return settings;
    })();
  }

  get(id) {
    return _asyncToGenerator(function* () {})();
  }

  set(id, value) {
    return _asyncToGenerator(function* () {})();
  }
}
exports.default = SettingsService;