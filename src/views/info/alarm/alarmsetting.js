/**
 * Created by reky on 2016/11/4.
 */
import React, {PropTypes} from 'react';
import {connect, Provider} from 'react-redux';
import {Button, Table, Icon, Input, Slider, InputNumber, Row, Col, Tag, Popover, Collapse} from 'antd'
import _ from 'lodash';
import {receiveAlarmDataFunction, sendAlarmDataFunction, updateAlarmDataLocal,defaultAlarmData, defaultAlarmData2, setDirtyAction, resetDirtyAction} from '../../../redux/modules/alarm/alarmCenter.js'
import {DecimalStep} from './alarmSettingSlider'
import {AllReceiveWithRangeFunction,AllReceiveAllFunction,AllInsertFunction,AllBatchInsertFunction} from '../../../redux/modules/chart/chartData'

const Panel = Collapse.Panel;

function callback(key) {
  console.log(key);
}

//表格内部有输入框
@connect((state)=>({
  alarmData: state.alarmCenter.data.alarmData,
  dirty: state.alarmCenter.dirty.dirty,
  currentSurgery: state.SurgeryData.currentSurgery.currentSurgery,
}), {receiveAlarmDataFunction,sendAlarmDataFunction,updateAlarmDataLocal, setDirtyAction, resetDirtyAction})
export default class alarmsetting extends React.Component {
  static propTypes = {
    alarmData: PropTypes.array.isRequired,
    //updateAlarmDataLocal: PropTypes.func.isRequired,
    //sendAlarmDataFunction: PropTypes.func.isRequired,
    //receiveAlarmDataFunction: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    //setDirtyAction: PropTypes.func.isRequired,
    //resetDirtyAction: PropTypes.func.isRequired,
    currentSurgery: PropTypes.object.isRequired,
  };

  constructor(props,context) {
    super(props,context);
    this.props.receiveAlarmDataFunction();
    this.props.updateAlarmDataLocal(defaultAlarmData2);//测试用```
  }

/*
  componentDidMount() {
    this.timer = setTimeout(
      () => {if(this.props.dirty===false){ this.props.receiveAlarmDataFunction.bind(this,this.props.alarmData); this.componentDidMount()}},
      300000//在dirty为false的情况下每5min收集一次数据
    );
  }
  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }
  */
  handleSubmit(){
    this.props.resetDirtyAction();//实际使用时备注掉，测试用
    this.props.sendAlarmDataFunction(this.props.alarmData);
    //this.props.AllReceiveAllFunction({},1);
    this.componentDidMount();
  }

  render(){
    return (
      <div>
        <div>
          <Col span ={12}>
            <div>
              <Collapse defaultActiveKey={['1','2']} onChange={callback}>
                <Panel header={<h2>压力报警参数<Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button>
                </h2>} key="1">
                  <Table pagination={false} columns={columns} dataSource={checkType2(this.props.alarmData).data2} />
                </Panel>
                <Panel header={<h2>生理报警参数<Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button></h2>} key="2">
                  <Table pagination={false} columns={columns} dataSource={checkType2(this.props.alarmData).data1} />
                </Panel>
              </Collapse>
            </div>
          </Col>
          <Col span ={12}>
            <div>
              <Collapse defaultActiveKey={['3','4']} onChange={callback}>
                <Panel header={<h2>泵速报警参数<Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button></h2>} key="3">
                  <Table pagination={false} columns={columns} dataSource={checkType2(this.props.alarmData).data3} />
                </Panel>
                <Panel header={<h2>其他报警参数<Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button></h2>} key="4">
                  <Table pagination={false} columns={columns} dataSource={checkType2(this.props.alarmData).data4} />
                </Panel>
              </Collapse>
            </div>
          </Col>
        </div>
      </div>
    )
  } //, mountNode
}

function checkType(data){
  var i = 0;
  let a = [];
  let b = [];
  let c = [];
  for (i = 0; i < data.length; i++) {
    if (data[i].type == 1) {
      a = a.concat(data[i]);
    }
    else if (data[i].type == 2) b = b.concat(data[i]);
    else c = c.concat(data[i]);
  }
  return {
    data1: a,
    data2: b,
    data3: c,
  }
}
function checkType2(data){
  let a = [];
  let b = [];
  let c = [];
  let d = [];
  var temp = {};
  for (var obj in data) {
    temp = _.clone(data[obj]);
    temp.nameEng = obj.toString();
    if (temp.type == 1) {
      a = a.concat([temp]);
      // alert(a);
    }
    else if (temp.type == 2) b = b.concat([temp]);
    else if (temp.type == 3) c = c.concat([temp]);
    else d = d.concat([temp]);
  }
  return {
    data1: a,
    data2: b,
    data3: c,
    data4: d,
  }
}

const columns = [
  {
    //title: '指标',
    width: 80,
    dataIndex: 'alarmItem',
    key: 'alarmItem',
    render: text => <h3>{text}</h3>,
  },{
    //title: '正常范围指定',
    align: "center",
    //width: 100,
     dataIndex: 'nameEng',
     key: 'id',
    render: (text, record) => {
      return (<div>
          <DecimalStep index={text}/>
          {/*<h4>{text}</h4>*/}
        </div>
      )
    }
  }];

const tablePagination = {
  //total: 19,
  showSizeChanger: false,
  pageSize: 6,
};

class Statetip extends React.Component {
  render() {
    var state;
    const SURGERY_INIT =1;
    const SURGERY_EXECUTING =2;
    const SURGERY_COMPLETE =3;
    if (this.props.value == SURGERY_INIT) {
      state = <Tag color="yellow">初始化</Tag>
    } else if (this.props.valuee == SURGERY_EXECUTING) {
      state = <Tag color="red">执行中</Tag>
    } else if (this.props.value == SURGERY_COMPLETE) {
      state = <Tag color="green">已完成</Tag>
    }
    return state;
  }
}

//but =
