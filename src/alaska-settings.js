/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-01
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

const debug = require('debug')('alaska-settings');

//为 alaska-admin-view 注入设置编辑器
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
    settings._id = id;
    debug('register', id);
    await settings.save();
    return settings;
  }

  /**
   * 获取设置
   * @param id
   * @returns {*}
   */
  async get(id) {
    const Settings = this.model('Settings');
    let record = await Settings.findCache(id);
    let value = record ? record.value : undefined;
    debug('get', id, '=>', value);
    return value;
  }

  /**
   * 保存设置,所要保存的设置项必须已经注册,如未注册则保存失败并返回null
   * @param {string} id
   * @param {*} value
   * @returns {Settings}
   */
  async set(id, value) {
    debug('set', id, '=>', value);
    const Settings = this.model('Settings');
    let record = await Settings.findCache(id);
    if (!record) {
      return null;
    }
    record.value = value;
    await record.save();
    return record;
  }
}
