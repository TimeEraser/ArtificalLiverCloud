/**
 * Created by kenzhou on 5/6/16.
 */
/**
 * Created by kenzhou on 5/6/16.
 */
import React, {PropTypes} from 'react';
import {Table, Tag} from 'antd';
import Button from '../../components/Button.jsx';
import {connect} from 'react-redux';
import {getShardings} from '../../redux/modules/jobCenter/jobDetail';

const style = {
  inline: {display: 'inline-block', width: '100%', textAlign: 'center'}
};


@connect((state) => ({
  shardings: state.jobDetail.sharding.shardings
}), {getShardings})
export default class JobShardingTable extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    shardings: PropTypes.array.isRequired,
    getShardings: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const {query} = this.props.location;
    this.props.getShardings(query);
  }


  render() {
    const {shardings} = this.props;
    const handleEdit = (e, job) => {
      this.props.changeReadOnly(true);
      this.props.changeModal(job);
      this.props.changeVisible(true);
    };
    const transformObj = (obj)=> {
      _.merge(obj, {
        key: obj.item
      });
      return obj;
    };

    const handleDelete = (e, job)=> {
      e.preventDefault();
      this.props.deleteJob(job);
    };
    const columns = [
      {
        title: 'item No.', dataindex: 'item', key: 'item',
        sorter: (a, b) => a.item - b.item,
        render(text, sharding){
          return (<span>{sharding.item}</span>)
        }
      },
      {
        title: 'running', dataindex: 'running', key: 'running',
        render(text, sharding){
          if (sharding.running != null)
            return (<Tag color='red'>RUNNING</Tag>)
          else
            return (<span></span>)
        }
      },
      {
        title: 'completed', dataindex: 'completed', key: 'completed',
        render(text, sharding){
          if (sharding.completed != null)
            return (<Tag color='green'>COMPLETED</Tag>)
          else
            return (<span></span>)

        }
      },
      {
        title: 'failover', dataindex: 'failover', key: 'failover',
        render(text, sharding){
          if (sharding.failover != null)
            return (<Tag color="yellow">{sharding.failover}</Tag>)
          else
            return (<span></span>)
        }
      },
      {
        title: 'lastBeginTime', dataindex: 'lastBeginTime', key: 'lastBeginTime',
        render(text, sharding){
          return (<span>{sharding.lastBeginTime}</span>)
        }
      },
      {
        title: 'lastCompleteTime', dataindex: 'lastCompleteTime', key: 'lastCompleteTime',
        render(text, sharding){
          return (<span>{sharding.lastCompleteTime}</span>)
        }
      }, {
        title: 'nextFireTime', dataindex: 'nextFireTime', key: 'nextFireTime',
        render(text, sharding){
          return (<span>{sharding.nextFireTime}</span>)
        }
      }
    ];
    const dataSource = shardings.map(sharding=>transformObj(sharding));
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }}/>
      </div>
    );
  }
}

