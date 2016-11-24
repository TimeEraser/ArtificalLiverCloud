import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from '../../help/raptorMessage';
import {Select} from 'antd';
export default class LogTypeSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
  }

  componentDidMount() {
    get('/migration/log/findAllType')().then((types)=> {
      const options = _.map(types, v=> {
        return {value: v, label: v};
      });
      this.setState({
        options: options
      });
    }, (err)=> {
      message.error(err);
    });
  }

  render() {
    return (
      <Select style={{width: '100'}}
              placeholder="请选择LogType"
              value={this.props.value}
              onSelect={this.props.onSelect}>
        {_.map(this.state.options, (option)=> {
          return <Option key={option.value} value={option.value}>{option.label}</Option>;
        })}
      </Select>
    );
  }
}
