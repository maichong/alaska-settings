'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-03
 * @author Liang <liang@maichong.it>
 */

class Settings extends service.Model {}
exports.default = Settings;
Settings.label = 'Settings';
Settings.defaultSort = 'group service';
Settings.defaultColumns = '_id,title,group,service';
Settings.fields = {
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
    default: 'text',
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