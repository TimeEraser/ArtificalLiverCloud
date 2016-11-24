import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from '../../help/raptorMessage';
import {Select} from 'antd';
export default class MachineSelect extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.state = {machines: [], value: ''};
  }

  componentDidMount() {
    get('/migration/machine/findByOnline', {isOnline: true})().then((machines)=> {
      this.setState({
        machines: machines
      });
    }, (err)=> {
      message.error(err);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleSelect(value) {
    this.setState({value: value});
    this.props.onSelect(value);
  }

  render() {
    return (
      <Select style={{width: '130px'}}
              placeholder="请选择server节点"
              onSelect={this.handleSelect.bind(this)}
              value={this.state.value}>
        {_.map(this.state.machines, (machine)=> {
          return (<Option key={machine.id}
                          value={machine.id}>{`${machine.ip}(${machine.loadFactor})`}</Option>);
        })}
      </Select>
    );
  }
}
