/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-05
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _ from 'lodash';

import { actions } from 'alaska-admin-view';
import { Button, Panel, Navbar } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const KEY = 'alaska-settings.settings';

class SettingsEditor extends React.Component {

  static propTypes = {
    lists: React.PropTypes.object,
    actions: React.PropTypes.object,
  };

  static contextTypes = {
    views: React.PropTypes.object,
    settings: React.PropTypes.object,
    t: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      values: {},
      fields: {},
      map: {}
    };
  }

  componentWillMount() {
    this.refresh();
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
    let newState = {};
    if (props.lists[KEY]) {
      const { t } = this.context;
      const results = props.lists[KEY].results;
      const map = newState.map = {};
      _.forEach(results, item => map[item._id] = item);

      const fields = newState.fields = {};
      const groups = newState.groups = {};
      _.each(results, item => {
        let groupKey = item.group || 'Basic Settings';
        if (!groups[groupKey]) {
          groups[groupKey] = {
            title: t(groupKey, item.service || 'alaska-settings'),
            items: []
          };
        }
        groups[groupKey].items.push(item);
        fields[item._id] = _.assign({
          label: t(item.title, item.service),
          help: t(item.help, item.service)
        }, item.options);
      });
    }
    this.setState(newState);
  }

  refresh = () => {
    this.props.actions.list({
      service: 'alaska-settings',
      model: 'Settings',
      key: KEY,
      perPage: 10000
    });
    this.setState({
      values: {}
    });
  };

  handleChange(key, value) {
    let values = _.assign({}, this.state.values, {
      [key]: value
    });
    this.setState({ values });
  }

  handleSave = () => {
    const { values, map } = this.state;
    const save = this.props.actions.save;
    _.forEach(values, (value, id) => {
      let data = _.assign({}, map[id], { id, value });
      save({
        service: 'alaska-settings',
        model: 'Settings',
        key: KEY,
        data
      });
    });
    this.refresh();
  };

  render() {
    const { t, views } = this.context;
    const { lists } = this.props;
    const { values, groups, fields } = this.state;
    let content;
    if (!lists[KEY]) {
      content = <div className="loading">Loading...</div>;
    } else {
      content = [];
      _.forEach(groups, (group, index) => {
        let items = _.map(group.items, (item, index) => {
          let FieldView = views[item.type] || views.MixedFieldView;
          let value = values[item._id];
          if (value === undefined) {
            value = item.value;
          }
          return (<FieldView
            key={index}
            field={fields[item._id]}
            value={value}
            onChange={this.handleChange.bind(this, item._id)}
          />);
        });
        content.push(<Panel header={group.title} key={index}>{items}</Panel>);
      });
    }
    return (
      <div className="editor-content">
        <div className="content-header">
          <h4>{t('Settings', 'alaska-settings')}</h4>
        </div>
        <div className="form-horizontal">
          {content}
        </div>
        <Navbar id="editorBottomBar" fixedBottom={true} fluid={true}>
          <Navbar.Form pullRight>
            <Button
              onClick={this.handleSave}
              bsStyle="primary"
            >{t('Save')}</Button>
            <Button
              onClick={this.refresh}
              bsStyle="warning"
            >{t('Refresh')}</Button>
          </Navbar.Form>
        </Navbar>
      </div>
    );
  }
}

export default connect(({ lists }) => ({ lists }), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(SettingsEditor);
