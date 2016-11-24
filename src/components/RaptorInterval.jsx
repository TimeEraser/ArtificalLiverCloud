import React, {PropTypes} from 'react';
import {Row, Col, Switch, Slider} from 'antd';
import Button from './Button.jsx';
import {centerLabel} from '../styles/layout.js';
import Interval from './Interval.jsx';
export default class RaptorInterval extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {enabled: true, timeout: 5};
  }

  handleSwitchChange(checked) {
    this.setState({enabled: checked});
  }

  handleTimeoutChange(value) {
    this.setState({timeout: value});
  }

  render() {
    const {enabled, timeout} = this.state;
    const {callback} = this.props;
    return (<Row style={{margin: '5px'}}>
      <Col span="2"><Button onClick={()=>callback()} type="primary">刷新</Button></Col>
      <Col span="4" style={centerLabel}>
        <span style={{marginRight: '10px'}}>自动刷新:</span>
        <Switch checked={enabled}
                onChange={this.handleSwitchChange.bind(this)}/></Col>
      <Col span="5">
        <span>刷新间隔:</span>
        <Slider min={1} max={10}
                onChange={this.handleTimeoutChange.bind(this)}
                value={timeout}/>
      </Col>
      <Interval callback={callback} enabled={enabled}
                timeout={timeout}/>
    </Row>);
  }
}
