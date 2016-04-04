'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}
exports.default = SettingsService; /**
                                    * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                    * @date 2016-03-01
                                    * @author Liang <liang@maichong.it>
                                    */