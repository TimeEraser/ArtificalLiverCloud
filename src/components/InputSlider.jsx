import React, {PropTypes} from 'react';
import {Slider, InputNumber} from 'antd';

export default class InputSlider extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    min: PropTypes.number,
    max: PropTypes.number
  };

  constructor(props, context) {
    super(props, context);
    const value = this.props.value;
    this.state = {
      lastSendTime: _.now(),
      value: value
    };
  }

  componentWillReceiveProps({value}) {
    this.setState({value: value});
  }

  handleChange(value) {
    const now = _.now();
    this.setState({value: value});
    if (now - this.state.lastSendTime > 1000) {
      this.setState({lastSendTime: now});
      _.delay(()=> {
        this.props.onChange(this.state.value);
      }, 1000, 'later');
    }
  }

  render() {
    let {min, max} = this.props;
    min = min ? min : 1;
    max = max ? max : 1000;
    return (
      <div className="row">
        <div className="col-12">
          <Slider min={min} max={max} onChange={this.handleChange.bind(this)}
                  value={this.state.value}/>
        </div>
        <div className="col-4">
          <InputNumber min={min} max={max} style={{ marginLeft: '10px' }}
                       value={this.state.value} onChange={this.handleChange.bind(this)}/>
        </div>
      </div>
    );
  }
}
