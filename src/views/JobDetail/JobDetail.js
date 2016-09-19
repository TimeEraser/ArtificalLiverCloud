import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Row, Col, Button} from 'antd';
import _ from 'lodash';
import JobForm from './JobForm';
import JobServerTable from './JobServerTable';
import JobShardingTable from './JobShardingTable';
import JobExecuteTable from '../JobExecute/JobExecuteTable';
import JobExecuteForm from '../JobExecute/JobExecuteForm';
import {
  changeReadOnly,
  getJobByClusterAndJobName,
  changeValue,
  updateJob,
  getTriggerTime,
  changeExecuteTimeRange,
  changeExecuteLimit,
  updateJobExecuteHistory,
} from '../../redux/modules/jobCenter/jobDetail';

@connect((state)=>({
  job: state.jobDetail.job.job,
  timeRange:state.jobDetail.jobExecuteHistory.timeRange,
  limit:state.jobDetail.jobExecuteHistory.limit,
  readOnly: state.jobDetail.job.readOnly
}), {changeReadOnly, getJobByClusterAndJobName, changeValue, updateJob,getTriggerTime,changeExecuteTimeRange,changeExecuteLimit,updateJobExecuteHistory})
export default class JobDetail extends React.Component {
  static propTypes = {
    job: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired,
    changeReadOnly: PropTypes.func.isRequired,
    updateJob: PropTypes.func.isRequired,
    getTriggerTime: PropTypes.func.isRequired,
    changeExecuteTimeRange:PropTypes.func.isRequired,
    changeExecuteLimit:PropTypes.func.isRequired,
    updateJobExecuteHistory:PropTypes.func.isRequired,
    timeRange: PropTypes.string.isRequired,
    limit:PropTypes.number.isRequired,
  };

  handleClick(readOnly) {
    this.props.changeReadOnly(readOnly);
  }

  handleSubmit(job, readOnly) {
    this.props.updateJob(job);
    this.props.changeReadOnly(readOnly);
  }

  handleGetTriggerTime(job){
    this.props.getTriggerTime(job);
  }

  render() {
    const rowStyle = {
      marginBottom: '10px'
    };
    return (
      <div>
        <JobForm {...this.props}/>
        <Row type="flex">
          <Col span="4" offset="0" style={rowStyle}>
            <Button type="primary"
                    onClick={this.handleGetTriggerTime.bind(this,this.props.job)}>未来五次触发时间</Button>
          </Col>

          <Col span="2" offset="16" style={rowStyle}>
            <Button type="primary" htmlType="submit" style={this.props.readOnly?{display:'none'}:{display:true}}
                    onClick={this.handleClick.bind(this,true)}>取消</Button>
          </Col>

          <Col span="0" offset="0" style={rowStyle}>
            <Button type="primary" htmlType="submit"
                    onClick={this.props.readOnly?this.handleClick.bind(this,false):this.handleSubmit.bind(this,this.props.job,true)}>{this.props.readOnly ? '修改' : '保存'}</Button>
          </Col>

        </Row >
        <Row style={rowStyle}>
          <JobServerTable location={this.props.location}/>
        </Row>
        <Row style={rowStyle}>
          <JobShardingTable location={this.props.location}/>
        </Row>
        {/*<Row style={rowStyle}>*/}
          {/*<JobExecuteForm {...this.props}/>*/}
        {/*</Row>*/}
        {/*<Row style={rowStyle}>*/}
          {/*<JobExecuteTable location={this.props.location}/>*/}
        {/*</Row>*/}
      </div>
    );
  }
}
