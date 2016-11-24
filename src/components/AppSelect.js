import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from 'help/raptorMessage';
import {Select, Form} from 'antd';
const FormItem = Form.Item;

export default class AppSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
  }

  componentDidMount() {
    get('/apps/search?q=').then((apps)=> {
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
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const filterOption = (key, option)=> {
      return option.key.indexOf(key) !== -1;
    };
    return (
      <FormItem
        label="请选择应用："
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 12 }}>
        <Select showSearch style={{ width: 400}}
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
      </FormItem>
    );
  }
}
