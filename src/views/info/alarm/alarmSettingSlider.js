/**
 * Created by reky on 2016/11/11.
 */
import React, {PropTypes} from 'react';
import {connect, Provider} from 'react-redux';
import {Button, Table, Icon, Input, Slider, InputNumber, Row, Col} from 'antd'
import _ from 'lodash';
import {receiveAlarmDataFunction, sendAlarmDataFunction, updateAlarmDataLocal, setDirtyAction, resetDirtyAction} from '../../../redux/modules/alarm/alarmCenter.js'



const DecimalStepTemp = React.createClass({

  propTypes:{
    alarmData: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    updateAlarmDataLocal: React.PropTypes.func.isRequired,
    setDirtyAction: PropTypes.func.isRequired,
    resetDirtyAction: PropTypes.func.isRequired,
  },

  getInitialState() {
    // this.props.receiveAlarmDataFunction();
    return {
      inputValue0: this.props.alarmData[this.props.index].floor,
      inputValue1: this.props.alarmData[this.props.index].ceiling,
    };
  },


  handleChangeRange(value) {
    this.setState({
      inputValue0: value[0],
      inputValue1: value[1],
    }, this.props.setDirtyAction(),this.updateState);

  },
  handleChangeRangeFloor(value) {
    this.setState({
      inputValue0: value,
    }, this.props.setDirtyAction(),this.updateState());
  },
  handleChangeRangeCeiling(value) {
    this.setState({
      inputValue1: value,
    }, this.props.setDirtyAction(),this.updateState());
  },

  makeNewState(index,value){
    var result = _.clone(this.props.alarmData);
    result[index].floor= value[0];
    result[index].ceiling= value[1];
    return result;
  },

  updateState(){
    this.props.updateAlarmDataLocal(this.makeNewState(this.props.index,[this.state.inputValue0, this.state.inputValue1]))
  },

  render() {
    return (
      <Row>
        <Col span={5}>
          <InputNumber min={0} max={300} style={{ marginLeft: '0px',marginRight: '20px' }} step={0.1}
                       value={this.state.inputValue0} onChange={this.handleChangeRangeFloor}
          />
        </Col>
        <Col span={14}>
          <Slider style={{ marginLeft: '20px' }} range min={0} max={300} onChange={this.handleChangeRange} value={[this.state.inputValue0 , this.state.inputValue1]} step={0.1} />
        </Col>
        <Col span={5}>
          <InputNumber min={0} max={300} style={{ marginLeft: '8px' }} step={0.1}
                       value={this.state.inputValue1} onChange={this.handleChangeRangeCeiling}
          />
        </Col>
      </Row>
    );
  }
});

export const DecimalStep = connect((state)=>({
  alarmData:state.alarmCenter.data.alarmData,
}), { receiveAlarmDataFunction, sendAlarmDataFunction, updateAlarmDataLocal, setDirtyAction, resetDirtyAction})(DecimalStepTemp);
