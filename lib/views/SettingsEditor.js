'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _alaskaAdminView = require('alaska-admin-view');

var _reactBootstrap = require('react-bootstrap');

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-05
 * @author Liang <liang@maichong.it>
 */

var KEY = 'alaska-settings.settings';

var SettingsEditor = function (_React$Component) {
  (0, _inherits3.default)(SettingsEditor, _React$Component);

  function SettingsEditor(props) {
    (0, _classCallCheck3.default)(this, SettingsEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SettingsEditor).call(this, props));

    _this.refresh = function () {
      _this.props.actions.list({
        service: 'alaska-settings',
        model: 'Settings',
        key: KEY,
        perPage: 10000
      });
      _this.setState({
        values: {}
      });
    };

    _this.handleSave = function () {
      var _this$state = _this.state;
      var values = _this$state.values;
      var map = _this$state.map;

      var save = _this.props.actions.save;
      _lodash2.default.forEach(values, function (value, id) {
        var data = _lodash2.default.assign({}, map[id], { id: id, value: value });
        save({
          service: 'alaska-settings',
          model: 'Settings',
          key: KEY,
          data: data
        });
      });
      _this.refresh();
    };

    _this.state = {
      values: {},
      fields: {},
      map: {}
    };
    return _this;
  }

  (0, _createClass3.default)(SettingsEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.refresh();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      var newState = {};
      if (props.lists[KEY]) {
        (function () {
          var t = _this2.context.t;

          var results = props.lists[KEY].results;
          var map = newState.map = {};
          _lodash2.default.forEach(results, function (item) {
            return map[item._id] = item;
          });

          var fields = newState.fields = {};
          var groups = newState.groups = {};
          _lodash2.default.each(results, function (item) {
            var groupKey = item.group || 'Basic Settings';
            if (!groups[groupKey]) {
              groups[groupKey] = {
                title: t(groupKey, item.service || 'alaska-settings'),
                items: []
              };
            }
            groups[groupKey].items.push(item);
            fields[item._id] = _lodash2.default.assign({
              label: t(item.title, item.service),
              help: t(item.help, item.service)
            }, item.options);
          });
        })();
      }
      this.setState(newState);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(key, value) {
      var values = _lodash2.default.assign({}, this.state.values, (0, _defineProperty3.default)({}, key, value));
      this.setState({ values: values });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _context = this.context;
      var t = _context.t;
      var views = _context.views;
      var lists = this.props.lists;
      var _state = this.state;
      var values = _state.values;
      var groups = _state.groups;
      var fields = _state.fields;

      var content = void 0;
      if (!lists[KEY]) {
        content = _react2.default.createElement(
          'div',
          { className: 'loading' },
          'Loading...'
        );
      } else {
        content = [];
        _lodash2.default.forEach(groups, function (group, index) {
          var items = _lodash2.default.map(group.items, function (item, index) {
            var FieldView = views[item.type] || views.MixedFieldView;
            var value = values[item._id];
            if (value === undefined) {
              value = item.value;
            }
            return _react2.default.createElement(FieldView, {
              key: index,
              field: fields[item._id],
              value: value,
              onChange: _this3.handleChange.bind(_this3, item._id)
            });
          });
          content.push(_react2.default.createElement(
            _reactBootstrap.Panel,
            { header: group.title, key: index },
            items
          ));
        });
      }
      return _react2.default.createElement(
        'div',
        { className: 'editor-content' },
        _react2.default.createElement(
          'div',
          { className: 'content-header' },
          _react2.default.createElement(
            'h4',
            null,
            t('Settings', 'alaska-settings')
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-horizontal' },
          content
        ),
        _react2.default.createElement(
          _reactBootstrap.Navbar,
          { id: 'editorBottomBar', fixedBottom: true, fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Navbar.Form,
            { pullRight: true },
            _react2.default.createElement(
              _reactBootstrap.Button,
              {
                onClick: this.handleSave,
                bsStyle: 'primary'
              },
              t('Save')
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              {
                onClick: this.refresh,
                bsStyle: 'warning'
              },
              t('Refresh')
            )
          )
        )
      );
    }
  }]);
  return SettingsEditor;
}(_react2.default.Component);

SettingsEditor.propTypes = {
  lists: _react2.default.PropTypes.object,
  actions: _react2.default.PropTypes.object
};
SettingsEditor.contextTypes = {
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object,
  t: _react2.default.PropTypes.func
};
exports.default = (0, _reactRedux.connect)(function (_ref) {
  var lists = _ref.lists;
  return { lists: lists };
}, function (dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)(_alaskaAdminView.actions, dispatch)
  };
})(SettingsEditor);