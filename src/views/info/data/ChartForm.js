import React, {PropTypes} from 'react';
import {Tag, Form, Select, InputNumber, DatePicker, Button, Col,Row, Icon, Input, Popover} from 'antd';
import {connect} from 'react-redux';
import _ from 'lodash';


const ChartFormT = React.createClass({

  propTypes:{
    currentSurgery: React.PropTypes.object.isRequired,
  },

  getInitialState(){
    if (this.props.currentSurgery == undefined){
      return {
        surgeryNo: 0,
        patient: '未指定',
        doctor: '未指定',
        statement:'',
        state: 1,
        sms: 0
      };
    } else {
      return this.props.currentSurgery
    }
  },

  handleChangePhone(value){
    // var temp = _.clone(this.state);
    // temp.sms = value;
    this.setState({
      sms: value.target.value
    })
  },
  handleChangeStatement(value){
    // var temp = _.clone(this.state);
    // temp.sms = value;
    this.setState({
      statement: value.target.value
    })
  },

  handleSubmitForm(){
    this.props.assignCurrentSurgery(this.state);
  },

  render() {
    const FormItem = Form.Item;
    var trueValue= true;
    var falseValue= false;
    return (
      <Form vertical={trueValue}>
        {/*<Row >*/}
          {/*<Col span="3">*/}
            <FormItem
              label="手术号"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled={trueValue} value={this.props.currentSurgery.surgeryNo}/>
            </FormItem>
          {/*</Col>*/}
          {/*<Col span="3">*/}
            <FormItem
              label="医生"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}>
              <Input disabled={trueValue} value={this.props.currentSurgery.doctor}/>
            </FormItem>
          {/*</Col>*/}
          {/*<Col span="3">*/}
            <FormItem
              label="病人"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}>
              <Input disabled={trueValue} value={this.props.currentSurgery.patient}/>
            </FormItem>
          {/*</Col>*/}
          {/*<Col span="3">*/}
            <FormItem
              label="手术状态"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}>
              <Tag color={this.props.currentSurgery.state==1?"yellow":this.props.currentSurgery.state==2?"red":"green"}>{this.props.currentSurgery.state==1?"初始化":this.state.state==2?"执行中":"已完成"}</Tag>
            </FormItem>
            <FormItem
              label=" "
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Input type="textarea" value={this.props.currentSurgery.description} onChange={this.handleChangeStatement} rows={4}/>
            </FormItem>
            <FormItem
              label="手机"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}>
              <Input type="tel" value={this.props.currentSurgery.alarmPerson} onChange={this.handleChangePhone}/>
            </FormItem>
            <FormItem
              label="  "
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Button type="primary" htmlType="submit" onClick={this.handleSubmitForm.bind(this)}>更改</Button>
            </FormItem>
      </Form>
    );
  }
})

export const ChartForm = connect((state)=>({
  alarmData: state.alarmCenter.data.alarmData,
  dirty: state.alarmCenter.dirty.dirty,
  currentSurgery: state.SurgeryData.currentSurgery.surgery,
}),{})(ChartFormT);

class Statetip extends React.Component {
  render() {
    var state;
    const SURGERY_INIT =1;
    const SURGERY_EXECUTING =2;
    const SURGERY_COMPLETE =3;
    if (this.props.value == SURGERY_INIT) {
      state = <Tag color="yellow">初始化</Tag>
    } else if (this.props.value == SURGERY_EXECUTING) {
      state = <Tag color="red">执行中</Tag>
    } else if (this.props.value == SURGERY_COMPLETE) {
      state = <Tag color="green">已完成</Tag>
    }
    return state;
  }
}
