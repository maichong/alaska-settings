/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-03
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Settings extends alaska.Model {
  static label = 'Settings';
  static icon = 'cogs';
  static defaultSort = 'group service';
  static defaultColumns = '_id title group service';
  static cache = 600; //缓存10分钟
  static hidden = true;

  static fields = {
    _id: String,
    title: {
      label: 'Title',
      type: String
    },
    service: {
      label: 'Service',
      type: String
    },
    group: {
      label: 'Group',
      type: String
    },
    value: {
      label: 'Value',
      type: Object,
      default: null
    },
    help: {
      label: 'Help',
      type: String
    },
    type: {
      label: 'Type',
      type: 'select',
      default: 'MixedFieldView',
      options: [{
        label: 'Text',
        value: 'TextFieldView'
      }, {
        label: 'Number',
        value: 'NumberFieldView'
      }, {
        label: 'Checkbox',
        value: 'CheckboxFieldView'
      }, {
        label: 'Select',
        value: 'SelectFieldView'
      }, {
        label: 'Date',
        value: 'DateFieldView'
      }, {
        label: 'Datetime',
        value: 'DatetimeFieldView'
      }, {
        label: 'Mixed',
        value: 'MixedFieldView'
      }, {
        label: 'Html',
        value: 'HtmlFieldView'
      }, {
        label: 'Image',
        value: 'ImageFieldView'
      }]
    },
    options: {
      label: 'Options',
      type: Object,
      default: {}
    }
  };
}
