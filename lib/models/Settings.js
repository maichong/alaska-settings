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
Settings.defaultSort = 'service';
Settings.defaultColumns = '_id,title,service';
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
      value: 'text'
    }, {
      label: 'Checkbox',
      value: 'checkbox'
    }, {
      label: 'Number',
      value: 'number'
    }, {
      label: 'Date',
      value: 'date'
    }, {
      label: 'Datetime',
      value: 'datetime'
    }, {
      label: 'Mixed',
      value: 'mixed'
    }, {
      label: 'Html',
      value: 'html'
    }, {
      label: 'Image',
      value: 'image'
    }]
  },
  options: {
    label: 'Options',
    type: Object,
    default: {}
  }
};