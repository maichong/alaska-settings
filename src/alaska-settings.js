/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-01
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export const routes = [{
  component: __dirname + '/views/SettingsEditor',
  path: 'settings'
}];

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

  /**
   * 注册新设置选项
   * @param {Object} data
   * @returns {Settings}
   */
  async register(data) {
    const Settings = this.model('Settings');

    const id = data.id || data._id;
    let settings = await Settings.findCache(id);
    if (settings) {
      return settings;
    }
    settings = new Settings(data);
    await settings.save();
    return settings;
  }

  async get(id) {

  }

  async set(id, value) {

  }
}
