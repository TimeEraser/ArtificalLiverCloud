/**
 * Created by kenzhou on 5/6/16.
 */

import React, {PropTypes} from 'react';
import {Table,Tag} from 'antd';
import Button from '../../components/Button.jsx';
import {connect} from 'react-redux';
import {
  getServers,
  deleteServer,
  stopServer,
  resumeServer,
  disableServer,
  relaunchServer,
  deleteOfflineMachine
} from '../../redux/modules/jobCenter/jobDetail';

const style = {
  inline: {display: 'inline-block', width: '100%', textAlign: 'center'}
};

@connect((state) => ({
  job: state.jobDetail.job.job,
  servers: state.jobDetail.server.servers,
}), {getServers, deleteServer, stopServer, resumeServer, disableServer, relaunchServer, deleteOfflineMachine})
export default class JobServerTable extends React.Component {
  static propTypes = {
    servers: PropTypes.array.isRequired,
    job: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const {query} = this.props.location;
    this.props.getServers(query);
  }


  render() {
    const {servers, job} = this.props;
    const transformObj = (obj)=> {
      _.merge(obj, {
        key: obj.host
      });
      return obj;
    };
    const handleStopped = (e, param)=> {
      e.preventDefault();
      if (!param.server.stopped) {
        this.props.stopServer(param);
      } else {
        this.props.resumeServer(param);
      }
    };

    const handleDelete = (e, param) => {
      e.preventDefault();
      this.props.deleteServer(param);
    };

    const handleDisabled = (e, param)=> {
      e.preventDefault();
      if (!param.server.disabled) {
        this.props.disableServer(param);
      } else {
        this.props.relaunchServer(param);
      }
    };

    const handleDeleteOfflineMachine = (e, param) => {
      e.preventDefault();
      this.props.deleteOfflineMachine(param);
    }

    const columns = [
      {
        title: '机器IP', dataindex: 'host', key: 'host',
        render(text, server){
          return (<span>{server.host}</span>)
        }
      },
      {
        title: '当前拥有的分片', dataindex: 'sharding', key: 'sharding',
        render(text, server){
          return (<span>{server.sharding}</span>)
        }
      },
      {
        title: '状态', dataindex: 'status', key: 'status',
        render(text, server){
          return (<span>{server.status ? server.status : '离线'}</span>)
        }
      },
      {
        title: '是否暂停执行', dataindex: 'stopped', key: 'stopped',
        render(text, server){
          return (<span>{server.stopped ? '暂停' : '正常'}</span>)
        }
      },
      {
        title: '是否停用', dataindex: 'disabled', key: 'disabled',
        render(text, server){
          return (<span>{server.disabled ? '停用' : '启用中'}</span>)
        }
      },
      {
        title: '操作', dataIndex:'operation', key:'operation',
        render(text, server){
          return (
            <span>
              <Button size="small" type="warning" style={server.status==="离线"?{display:true}:{display:'none'}}
                      onClick={(e)=>{handleDeleteOfflineMachine(e, Object.assign({},{job:job,server:server}));}}>删除</Button>
            </span>
          );
        }
      }
      // ,
      // {
      //   title: '操作', dataIndex: 'operation', key: 'operation',
      //   render(text, app) {
      //     const labelStopped = app.stopped ? '恢复' : '暂停';
      //     const labelDisabled = app.disabled ? '启用' : '停用';
      //     return (
      //       <span>
      //       <Button size="small" type="warning"
      //               onClick={(e)=>{handleStopped(e, Object.assign({},{job:job,server:app}));}}>{labelStopped}</Button>
      //       <Button size="small" type="warning"
      //               onClick={(e)=>{handleDisabled(e, Object.assign({},{job:job,server:app}));}}>{labelDisabled}</Button>
      //       <Button size="small" type="danger" style={{display:'none'}}
      //               onClick={(e)=>{handleDelete(e,Object.assign({},{job:job,server:app}));}}>删除</Button>
      //       </span>
      //     );
      //   }
      // }
    ];
    const dataSource = servers.map(server=>transformObj(server));
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }}/>
      </div>
    );
  }
}

