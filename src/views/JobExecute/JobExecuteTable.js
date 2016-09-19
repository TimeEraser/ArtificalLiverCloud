import {connect} from 'react-redux';
//在job列表中点击job名字出现job详情页 - Job执行状态
import React, {PropTypes} from 'react';
import {Table,Icon,Tag,Popover,Button} from 'antd';
import { formatDate } from '../../help/dateUtils'
import {
  getJobExecuteHistories
} from '../../redux/modules/jobCenter/jobDetail';
@connect((state)=>({
  job: state.jobDetail.job.job,
  jobExecuteHistories: state.jobDetail.jobExecuteHistory.jobExecuteHistories
}),{getJobExecuteHistories ,formatDate})
export default class JobExecuteTable extends React.Component {
  static propTypes = {
    jobExecuteHistories: PropTypes.array.isRequired,
    job: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    const {query} = this.props.location;
    this.props.getJobExecuteHistories(query);
  }

  render() {
    const executeSuccess =0;
    const executeFailure =1;
    const executing =2;
    const executeException =3;
    const {jobExecuteHistories, job} = this.props;
    const transformJobExecuteHistory = (obj)=> {
      _.merge(obj, {
        key: obj.jobId
      });
      return obj;
    };
    const mainColumns = [{
      title: '执行开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render(value,record){
        return formatDate(value);
      },
    },{
      title: '执行时间/ms',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration - b.duration,
      render(value,record){
        var state=value;
        if (record.state == 3) {
          state=<Tag color="yellow">未完成</Tag>
        }
        return state;
      },
    },{
      title: '执行状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        { text: '执行成功', value: executeSuccess },
        { text: '执行中', value: executing },
        { text: '执行失败', value: executeFailure },
        { text: '执行异常',value:executeException},
      ],
      onFilter: (value, record) => record.state==value,
      render(value){
        var state;
        if (value == executeSuccess) {
          state=<Tag color="green">执行成功</Tag>
        } else if (value == executing){
          state=<Tag color="yellow">执行中</Tag>
        } else if (value == executeFailure){
          state=<Tag color="red">执行失败</Tag>
        } else {
          state=<Tag color="blue">系统错误</Tag>
        }
        return state;
      },
    }, {
      title: '分片总数',
      dataIndex: 'launchedTasks',
      key: 'launchedTasks',
    },
      {
      title: '派发分片数',
      dataIndex: 'distributedTasks',
      key: 'distributedTasks',
    },
      {
        title: '完成分片数',
        dataIndex: 'completeTasks',
        key: 'completeTasks',
      }];
    const subColumns = [
      {
        title: '分片ID',
        dataIndex: 'taskId',
        key: 'taskId',
        sorter: (a, b) => a.taskId - b.taskId,
      },{
        title: '执行开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render(value,record){
          return formatDate(value);
        },
    },{
      title: '执行结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a, b) => a.endTime - b.endTime,
      render(value,record){
        var state=value;
        if (record.state == 0) {
          state=<Tag color="yellow">未完成</Tag>
        } else {
          state = formatDate(value);
        }
        return state;
      }
    },{
      title: '执行状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        { text: '执行成功', value: executeSuccess },
        { text: '执行中', value: executing },
        { text: '执行失败', value: executeFailure },
        { text: '执行异常',value:executeException},
      ],
      onFilter: (value, record)=> record.state==value,
      render(value){
        var state;
        if (value == executeSuccess) {
          state=<Tag color="green">执行成功</Tag>
        } else if (value == executing){
          state=<Tag color="yellow">执行中</Tag>
        } else if (value == executeFailure){
          state=<Tag color="red">执行失败</Tag>
        } else {
          state=<Tag color="blue">系统错误</Tag>
        }
        return state;
      },
    }, {
      title: '机器ip',
      dataIndex: 'machineIp',
      key: 'machineIp',
    },
      {
        title: '错误信息',
        dataIndex: 'failureException',
        key: 'failureException',
        render(text, record){
          var failureException=text;
          if (record.state == 1) {
            failureException=<Popover placement="topRight" title="错误信息sdfad asdfcawawefasfsfaaawecsaadssaf" trigger="click">
            <Button>点我</Button>
          </Popover>
        }
        return failureException;
        }
      }];
    return (
      <div>
        <Table columns={mainColumns} dataSource={jobExecuteHistories.map(jobExecuteHistory=>transformJobExecuteHistory(jobExecuteHistory))}
               expandedRowRender={record => <Table columns={subColumns} dataSource={record.taskExecuteHistories.map(taskExecuteHistory=>taskExecuteHistory)} />}
        />
      </div>
    );
  }
}
