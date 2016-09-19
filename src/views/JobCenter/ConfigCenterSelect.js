/**
 * Created by kenzhou on 5/3/16.
 */
//选择一个配置中心显示该中心所有节点
import React, {PropTypes} from 'react';
import {get} from '../../help/fetchHelp';
import message from '../../help/raptorMessage';
import {Select} from 'antd';
export default class ConfigCenterSelect extends React.Component {

  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {options: [], defaultOption: ""};
  }

  componentDidMount() {
    get('/cluster/findAll')().then((types)=> {
      const options = _.map(types, v=> {
        return {value: v, label: v};
      });
      this.setState({
        options: options,
        defaultOption: options[0].value.clusterName
      });
    }, (err)=> {
      message.error(err);
    });
  }

  render() {
    return (
      <Select disabled={this.props.readOnly} style={{ width : "15em" }} defaultValue={this.state.defaultOption} placeholder="请选择"
              value={this.props.value}
              onSelect={(value)=>this.props.onSelect(value)}>
        {_.map(this.state.options, (option)=> {
          return <Option key={option.value.clusterName}
                         value={option.value.clusterName}>{option.label.clusterName}</Option>;
        })}
      </Select>
    );
  }
}
