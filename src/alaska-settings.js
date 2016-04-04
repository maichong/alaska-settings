/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-01
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * @class SettingsService
 */
export default class SettingsService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-settings';
    options.dir = __dirname;
    super(options, alaska);
  }
}
