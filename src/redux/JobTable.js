import React, {PropTypes} from 'react';
import {Table} from 'antd';
import Button from '../components/Button.jsx';
import {connect} from 'react-redux';
import {history} from '../main';
import {
  changeModal,
  changeReadOnly,
  changeVisible,
  deleteJob
} from './modules/jobCenter/jobCenter';

const style = {
  inline: {display: 'inline-block', width: '100%', textAlign: 'center'}
};

@connect((state) => ({
  jobs: state.jobCenter.table.jobs,
  clusterName: state.jobCenter.searchBar.queryInfo.clusterName
}), {changeModal, changeReadOnly, changeVisible, deleteJob})
export default class JobTable extends React.Component {
  static propTypes = {
    jobs: PropTypes.array.isRequired,
    changeModal:PropTypes.func.isRequired,
    changeReadOnly:PropTypes.func.isRequired,
    changeVisible: PropTypes.func.isRequired,
  };


  render() {
    const {jobs} = this.props;
    const handleEdit = (e, job) => {
      this.props.changeReadOnly(true);
      this.props.changeModal(job);
      this.props.changeVisible(true);
    };
    const transformObj = (obj)=> {
      _.merge(obj, {
        key: obj.jobName,
        clusterName: this.props.clusterName
      });
      return obj;
    };

    const handleDelete = (e, job)=> {
      e.preventDefault();
      this.props.deleteJob(job);
    };

    const handleClick = (e, job) => {
      history.push(`/job/detail?clusterName=${job.clusterName}&jobName=${job.jobName}`);
    };

    const columns = [
      {
        title: 'job名', dataindex: 'jobName', key: 'jobName',
        render(text, job){
          return (<a href="#" onClick={(e)=>{handleClick(e, Object.assign(job,{}));}}>{job.jobName}</a>)
        }
      },
      {
        title: '拥有者', dataindex: 'owner', key: 'owner',
        render(text, job){
          return (<span>{job.owner}</span>)
        }
      },
      {
        title: 'cron表达式', dataindex: 'crond', key: 'crond',
        render(text, job){
          return (<span>{job.crond}</span>)
        }
      },
      {
        title: '获取数据总数', dataindex: 'fetchDataAmount', key: 'fetchDataAmount',
        render(text, job){
          return (<span>{job.fetchDataAmount}</span>)
        }
      },
      {
        title: '分片总数', dataindex: 'shardingTotalCount', key: 'shardingTotalCount',
        render(text, job){
          return (<span>{job.shardingTotalCount}</span>)
        }
      },
      {
        title: '分片参数',
        dataindex: 'shardingItemParameters',
        key: 'shardingItemParameters',
        render(text, job){
          return (<span>{job.shardingItemParameters}</span>)
        }
      },
      {
        title: 'job描述',
        dataindex: 'jobDescription',
        key: 'jobDescription',
        render(text, job){
          return (<span>{job.jobDescription}</span>)
        }
      },
      {
        title: '操作', dataIndex: 'operation', key: 'operation',
        render(text, app) {
          return (
            <span>
              <Button size="small" type="warning"
                      onClick={(e)=>{handleEdit(e, Object.assign(app,{}));}}>修改</Button>
              <Button size="small" type="danger"
                      onClick={(e)=>{handleDelete(e,Object.assign(app,{}));}}>删除</Button>
            </span>
          );
        }
      }
    ];
    const dataSource = jobs.map(job=>transformObj(job));
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 50 }}/>
      </div>
    );
  }
}

