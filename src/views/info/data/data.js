import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {Slider, Col, Row} from 'antd';
import Chart from './chart'


export default class data extends React.Component{
  render(){
    return (
      <div>
        <h1>实时监测</h1>
        <Row>
          <Col span={12}><Chart/></Col>
          <Col span={12}><Chart/></Col>
        </Row>
        <Row>
          <Col span={8}><Chart/></Col>
          <Col span={8}><Chart/></Col>
          <Col span={8}><Chart/></Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </div>
    )
  }
}

