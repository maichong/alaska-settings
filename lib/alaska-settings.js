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

const debug = require('debug')('alaska-settings');

//为 alaska-admin-view 注入设置编辑器
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
      settings._id = id;
      debug('register', id);
      yield settings.save();
      return settings;
    })();
  }

  /**
   * 获取设置
   * @param id
   * @returns {*}
   */
  get(id) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const Settings = _this2.model('Settings');
      let record = yield Settings.findCache(id);
      let value = record ? record.value : undefined;
      debug('get', id, '=>', value);
      return value;
    })();
  }

  /**
   * 保存设置,所要保存的设置项必须已经注册,如未注册则保存失败并返回null
   * @param {string} id
   * @param {*} value
   * @returns {Settings}
   */
  set(id, value) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      debug('set', id, '=>', value);
      const Settings = _this3.model('Settings');
      let record = yield Settings.findCache(id);
      if (!record) {
        return null;
      }
      record.value = value;
      yield record.save();
      return record;
    })();
  }
}
exports.default = SettingsService;