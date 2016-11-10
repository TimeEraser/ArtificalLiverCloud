import React, {PropTypes} from 'react';
import {Form, Select, InputNumber, DatePicker, Button, Col,Row} from 'antd';
import {formatDate} from '../../help/dateUtils';
export default class SurgeryForm extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    timeRange: PropTypes.string.isRequired,
    getSurgeries:PropTypes.func.isRequired,
    changeSurgeriesTimeRange:PropTypes.func.isRequired,
  };
  constructor(props, context) {
    super(props, context);
  }
  handleSurgerySearch(){
    var param={
      timeRange:this.props.timeRange,
    };
    this.props.getSurgeries(param);
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
          <Col span="2">
            <Button type="primary" htmlType="submit" onClick={this.handleSurgerySearch.bind(this)}>查询</Button>
          </Col>
        </Row>

      </Form>
    );
  }
}
