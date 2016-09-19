import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import JobSearchBar from './JobSearchBar';
import JobTable from './JobTable'
import JobCenterModal from './JobCenterModal'


//job中心总布局
@connect(()=>({}), {})
export default class JobCenter extends React.Component {
  static propTypes = {};


  render() {
    const rowStyle = {
      marginBottom: '5px',
      marginTop: '5px'
    };
    return (
      <div>
        <JobCenterModal/>
        <JobSearchBar/>
        <JobTable/>
      </div>
    );
  }
}
