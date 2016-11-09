/**
 * Created by reky on 2016/11/4.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button, Table, Icon, Input, Slider, InputNumber, Row, Col} from 'antd'
import _ from 'lodash';

//表格内部有输入框

function checkType(data){
  var i = 0;
  let a = [];
  let b = [];
  for (i = 0; i < data.length; i++) {
    if (data[i].type == 1) {
      a = a.concat(data[i]);
    }
    else b = b.concat(data[i]);
  }
  return {
    data1: a,
    data2: b,
  }
}




const columns = [{
  title: '指标名称',
  width: 150,
  dataIndex: 'name',
  key: 'name',

  //render: text => <a href="#">{text}</a>,
},{
  title: '正常范围指定',
  align: "center",
  //width: 100,
  dataIndex: 'floorset',
  key: 'floorset',
  render: (text, record) => {
    return (<div>
      <DecimalStep floor={record.floor} ceil={record.ceil} name={record.name}/>
        <p>{record.floor}</p>
    </div>
    )
  }
}];



var data = [{
  key: '1',
  name: '心率',
  floor: 32,
  ceil: 33,
  type: 1,
}, {
  key: '2',
  name: '收缩压',
  floor: 42,
  ceil: 47,
  type: 1,
}, {
  key: '3',
  name: '舒张压',
  floor: 32,
  ceil: 47,
  type: 1,
}, {
  key: '4',
  name: '血氧',
  floor: 32,
  ceil: 47,
  type: 1,
}, {
  key: '5',
  name: '采血压',
  floor: 32,
  ceil: 47,
  type: 2,
}, {
  key: '6',
  name: '血浆入口压',
  floor: 32,
  ceil: 47,
  type: 2,
}, {
  key: '7',
  name: '动脉压',
  floor: 32,
  ceil: 47,
  type: 2,
}, {
  key: '8',
  name: '静脉压',
  floor: 32,
  ceil: 47,
  type: 2,
}, {
  key: '9',
  name: '血浆压',
  floor: 32,
  ceil: 47,
  type: 2,
}, {
  key: '10',
  name: '跨膜压',
  floor: 32,
  ceil: 47,
  type: 2,
}];

var data3 = [
  {
    key: '11',
    name: '采血压',
    floor: 32,
    ceil: 47,
  }, {
    key: '12',
    name: '血浆入口压',
    floor: 32,
    ceil: 47,
  }, {
    key: '13',
    name: '动脉压',
    floor: 32,
    ceil: 47,
  }, {
    key: '14',
    name: '静脉压',
    floor: 32,
    ceil: 47,
  }, {
    key: '15',
    name: '血浆压',
    floor: 32,
    ceil: 47,
  }, {
    key: '16',
    name: '跨膜压',
    floor: 32,
    ceil: 47,
  }
];





const DecimalStep = React.createClass({
  propTypes: {
    floor : React.PropTypes.number.isRequired,
    ceil  : React.PropTypes.number.isRequired,
    name  : React.PropTypes.string.isRequired,
    key   : React.PropTypes.number.isRequired,
  },
  getInitialState() {
      return {
        inputValue0: this.props.floor,
        inputValue1: this.props.ceil,
      };
  },
  onChange(value) {
    this.setState({
      inputValue0: value[0],
      inputValue1: value[1],
    });
  },
  onChange0(value) {
    this.setState({
      inputValue0: value,
    });
  },
  onChange1(value) {
    this.setState({
      inputValue1: value,
    });
  },

  render() {
    return (
      <Row>
        <Col span={6}>
          <InputNumber min={0} max={200} style={{ marginLeft: '16px' }} step={0.1}
                       value={this.state.inputValue0} onChange={this.onChange0}
          />
        </Col>
        <Col span={8}>
          <Slider range min={0} max={200} onChange={this.onChange} value={[this.state.inputValue0 , this.state.inputValue1]} step={0.1} />
        </Col>
        <Col span={6}>
          <InputNumber min={0} max={200} style={{ marginLeft: '16px' }} step={0.1}
                       value={this.state.inputValue1} onChange={this.onChange1}
          />
          <p>{this.state.inputValue1}</p>
        </Col>
      </Row>
    );
  },
});




//job中心总布局
//@connect(()=>({}), {})

export default class alarmsetting extends React.Component {

  render(){
    return (
      <div className="ant-layout-LR">
        <div className="ant-layout-left">
          <h2>基本指标正常范围 </h2>
          <Table columns={columns} dataSource={checkType(data).data1} />
        </div>
        <div className="ant-layout-mid"></div>
        <div className="ant-layout-right">
          <h2>压力数据正常范围 </h2>
          <Table columns={columns} dataSource={checkType(data).data2} />
        </div>
      </div>
    )
  } //, mountNode
}
