import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Input, Row, Col} from 'antd';
import Button from '../../components/Button.jsx';
import {centerLabel} from '../../styles/layout';
import ConfigCenterSelect from './ConfigCenterSelect'
import {
  handleJobNameChange,
  handleJobOwnerChange,
  handleClusterNameChange,
  handleClear,
  queryJob
} from '../../redux/modules/jobCenter/jobCenter';

/**
 * Created by kenzhou on 4/28/16.
 */

@connect((state)=>({
  queryInfo: state.jobCenter.searchBar.queryInfo
}), {handleJobNameChange, handleJobOwnerChange, handleClusterNameChange, handleClear, queryJob})
export default class JobSearchBar extends React.Component {
  static propTypes = {
    queryInfo: PropTypes.object.isRequired,
    queryJob: PropTypes.func.isRequired
  };

  handleConfigCenterChange(value) {
    this.props.handleClusterNameChange(value);
  }

  handleJobNameChange(e) {
    const value = e.target.value;
    this.props.handleJobNameChange(value);
  }

  handleJobOwnerChange(e) {
    const value = e.target.value;
    this.props.handleJobOwnerChange(value);
  }

  handleSearch() {
    this.props.queryJob(this.props.queryInfo);
  }

  handleClear() {
    this.props.handleClear();
  }

  render() {
    const {clusterName, jobName, owner} = this.props.queryInfo;
    const rowStyle = {
      marginBottom: '5px',
      marginTop: '5px'
    };

    return (
      <div>
        <Row style={rowStyle}>
          <Col style={centerLabel} span="2">配置中心:</Col>

          <Col span="4" style={{marginRight: '10px'}}>
            <ConfigCenterSelect value={clusterName}
                                onSelect={this.handleConfigCenterChange.bind(this)}/>
          </Col>
          <Col style={centerLabel} span="2">owner:</Col>
          <Col span="4">
            <Input defaultValue="" id="owner" value={owner} placeholder="请输入job owner"
                   onChange={this.handleJobOwnerChange.bind(this)}/>
          </Col>
          <Col style={centerLabel} span="2">Job名:</Col>
          <Col span="4">
            <Input defaultValue="" id="jobName" value={jobName} placeholder="请输入job name"
                   onChange={this.handleJobNameChange.bind(this)}/>
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col span="2"><Button onClick={this.handleSearch.bind(this)}
                                type="primary">查询</Button></Col>
          <Col span="2"><Button onClick={this.handleClear.bind(this)}
                                type="primary">清除</Button></Col>
        </Row>
      </div>
    );

  }
}
