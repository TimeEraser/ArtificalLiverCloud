import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {formatDate,getCurrentDate,getBeforeDate} from '../../help/dateUtils';
import {Form, Select, InputNumber, DatePicker, Button, Col,Row} from 'antd';
export default class JobExecuteForm extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired,
    changeExecuteTimeRange:PropTypes.func.isRequired,
    changeExecuteLimit:PropTypes.func.isRequired,
    updateJobExecuteHistory:PropTypes.func.isRequired,
    timeRange: PropTypes.string.isRequired,
    limit:PropTypes.number.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    const {query} = this.props.location;
    this.props.changeExecuteTimeRange(getCurrentDate()+'~'+getBeforeDate(3));
    this.props.changeExecuteLimit(100);
  }
  handleJobExecuteSearch(){
    var param={
      clusterName:this.props.job.clusterName,
      jobName:this.props.job.jobName,
      timeRange:this.props.timeRange,
      limit:this.props.limit,
    };
    this.props.updateJobExecuteHistory(param);
  }
  render() {
    const FormItem = Form.Item;
    const RangePicker = DatePicker.RangePicker;
    const DefaultTimeRange =[];
    DefaultTimeRange.push(getBeforeDate(3));
    DefaultTimeRange.push(getCurrentDate());
    const disabledDate = function (current) {
      // can not select days after today
      return current && current.getTime() > Date.now();
    };
    return (
    <Form horizontal>
      <Row >
        <Col span="12">
          <FormItem
            label="时间范围"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <RangePicker showTime defaultValue={DefaultTimeRange} onChange={(date,value)=> {this.props.changeExecuteTimeRange(formatDate(date[0].getTime())+'~'+formatDate(date[1].getTime()));}} format="yyyy/MM/dd HH:mm:ss"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem
            label="查询数量"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 9 }}
          >
            <InputNumber min={1} max={200} style={{ width: 100 }} step={10} defaultValue={100} onChange={(e)=> {this.props.changeExecuteLimit(e);}}/>
          </FormItem>
        </Col>
        <Col span="2">
            <Button type="primary" htmlType="submit" onClick={this.handleJobExecuteSearch.bind(this)}>查询</Button>
        </Col>
      </Row>

    </Form>

    )
        }
}
