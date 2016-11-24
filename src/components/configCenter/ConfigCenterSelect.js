/**
 * Created by kenzhou on 4/23/16.
 */
import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from 'help/raptorMessage';
import {Select, Form} from 'antd';
const FormItem = Form.Item;

export default class ConfigCenterSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
  }

  componentDidMount() {
    get('/cluster/findAll').then((apps)=> {
      const options = _.map(apps, v=> {
        return {value: v, label: v};
      });
      this.setState({
        options: options
      });
    }, (err)=> {
      message.error(err);
    });
  }

  handleChange(value) {
    this.setState({value});
    this.props.onSelect(value);
  }

  render() {
    const filterOption = (key, option)=> {
      return option.key.indexOf(key) !== -1;
    };
    return (
      <Select showSearch style={{ width: 300}}
              optionFilterProp="children"
              value={this.props.value}
              notFoundContent="无法找到"
              searchPlaceholder="输入关键词"
              filterOption={filterOption}
              onChange={this.handleChange.bind(this)}>
        {_.map(this.state.options, (option)=> {
          return <Option key={option.value} value={option.value}>{option.label}</Option>;
        })}
      </Select>
    );
  }
}


