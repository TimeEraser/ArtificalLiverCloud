import React, {PropTypes} from 'react';
import {Form, Select, InputNumber, DatePicker, Button, Col,Row} from 'antd';
import {formatDate,getBeforeDate,getCurrentDate} from '../../help/dateUtils';
import {connect} from 'react-redux';
@connect((state)=>({
  timeRange:state.SurgeryData.conditions.timeRange,
  doctor:state.SurgeryData.conditions.doctor,
  patient:state.SurgeryData.conditions.patient,
  doctors:state.SurgeryData.persons.doctors,
  patients:state.SurgeryData.persons.patients,
}),{})
export default class SurgeryForm extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    doctors:PropTypes.array.isRequired,
    patients:PropTypes.array.isRequired,
    timeRange: PropTypes.string.isRequired,
    doctor:PropTypes.string.isRequired,
    patient:PropTypes.string.isRequired,
    getSurgeries: PropTypes.func.isRequired,
    getPersons: PropTypes.func.isRequired,
    changeConditionsDoctor: PropTypes.func.isRequired,
    changeConditionsPatient: PropTypes.func.isRequired,
    changeConditionsTimeRange: PropTypes.func.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.props.getPersons();
  }
  handleSurgerySearch(){
    var param={
      timeRange:this.props.timeRange,
      doctor:this.props.doctor,
      patient:this.props.patient,
    };
    this.props.getSurgeries(param);
  }
  handleChangeConditionsPatient(patient){
    this.props.changeConditionsPatient(patient);
  }
  handleChangeConditionsDoctor(doctor){
    this.props.changeConditionsDoctor(doctor);
  }
  handleChangeConditionsTimeRange(timeRange){
    this.props.changeConditionsTimeRange(timeRange);
  }
  render() {
    const FormItem = Form.Item;
    const RangePicker = DatePicker.RangePicker;
    const DefaultTimeRange =[];
    const doctorsChildren = [];
    const patientsChildren =[];
    for (var doctorIndex=0; doctorIndex < this.props.doctors.length; doctorIndex++){
      doctorsChildren.push(<Option key={this.props.doctors[doctorIndex]}>{this.props.doctors[doctorIndex]}</Option>)
    }
    for (var patientIndex=0; patientIndex < this.props.patients.length; patientIndex++){
      patientsChildren.push(<Option key={this.props.patients[patientIndex]}>{this.props.patients[patientIndex]}</Option>)
    }
    DefaultTimeRange.push(getBeforeDate(3));
    DefaultTimeRange.push(getCurrentDate());
    return (
      <Form horizontal>
        <Row >
          <Col span="8">
            <FormItem
              label="时间范围"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <RangePicker showTime defaultValue={DefaultTimeRange} onChange={(date,value)=> {this.handleChangeConditionsTimeRange(formatDate(date[0].getTime())+'~'+formatDate(date[1].getTime()));}} format="yyyy/MM/dd HH:mm:ss"/>
            </FormItem>
          </Col>
          <Col span="6">
          <FormItem
            label="医生"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              notFoundContent=""
              onSelect={(value)=>this.handleChangeConditionsDoctor(value)}
            >
              {doctorsChildren}
            </Select>
          </FormItem>
          </Col>
          <Col span="6">
            <FormItem
              label="病人"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                notFoundContent=""
                onChange={(value)=>this.handleChangeConditionsPatient(value)}
              >
                {patientsChildren}
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              label="  "
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Button type="primary" htmlType="submit" onClick={this.handleSurgerySearch.bind(this)}>查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
