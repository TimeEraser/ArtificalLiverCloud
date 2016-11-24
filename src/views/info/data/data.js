import React, {PropTypes} from 'react';
import _ from 'lodash';
import {Card} from 'antd';
import '../../../../node_modules/antd/lib/card/style/css'
import ReactEcharts from 'echarts-for-react';
import {Slider, Col, Row, Tag, Popover, TimePicker, Radio, Input, InputNumber, Form, Icon, Button, Collapse, Affix} from 'antd';
import Chart from './chart'
import {connect} from 'react-redux';

export default class data extends React.Component {
  constructor(props, context) {
    super(props, context);

  }
  render() {
    return (
      <div>
        <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          </div>
          <div className="custom-card">
            <h3>Europe Street beat</h3>
            <p>www.instagram.com</p>
          </div>
        </Card>
      </div>
    );
  }
}

