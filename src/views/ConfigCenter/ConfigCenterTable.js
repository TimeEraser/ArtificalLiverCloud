import React, {PropTypes} from 'react';
import {Table} from 'antd';
import Button from '../../components/Button.jsx';
import {connect} from 'react-redux';


import {
   changeModal,
  changeReadOnly,
  changeVisible,
  deleteCluster
} from '../../redux/modules/configCenter';

//配置中心列表
@connect((state) => ({
  apps: state.configCenter.table.clusters,
  isAdmin: state.configCenter.table.isAdmin
}), {deleteCluster, changeModal, changeVisible, changeReadOnly})
export default class ConfigCenterTable extends React.Component {
  static propTypes = {
    apps: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    deleteCluster: PropTypes.func.isRequired,
    changeModal: PropTypes.func.isRequired,
    changeVisible: PropTypes.func.isRequired,
    changeReadOnly: PropTypes.func.isRequired,
  };

  render() {
    const {apps} = this.props;
    const handleDelete = (e, clusterName) => {
      e.preventDefault();
      this.props.deleteCluster(clusterName);
    };
    const handleEdit = (e, app) => {
      this.props.changeReadOnly(true);
      this.props.changeModal(app);
      this.props.changeVisible(true);
    };

    const transformObj = (obj)=> {
      _.merge(obj, {
        key: obj.clusterName
      });
      return obj;
    };

    const columns = [
      {
        title: '配置中心名', dataIndex: 'clusterName', key: 'clusterName', width: '100',
        render(text, cluster){
          return (<span>{cluster.clusterName}</span>)
        }
      },
      {
        title: 'zookeeper', dataIndex: 'curatorConfig', key: 'curatorConfig',width : '300',
        render (text) {
          return (<span>{text.zkConnect}</span>)
        }
      },
      {
        title: '描述', dataIndex: 'zkDescription', key: 'zkDescription', width: '200',
        render (text, cluster) {
          return (<span>{cluster.zkDescription}</span>)
        }
      },
      {
        title: '操作', dataIndex: 'operation', key: 'operation', width:'50',
        render(text, app) {
          return (
            <span>
            <Button size="small" type="warning"
                    onClick={(e)=>{handleEdit(e, Object.assign(app,{zkConnect:app.curatorConfig.zkConnect}));}}>修改</Button>
              <Button size="small" type="danger"
                      onClick={(e)=>{handleDelete(e, app.clusterName);}}>删除</Button>
          </span>
          );
        }
      }
    ];
    const dataSource = apps.map(app=>transformObj(app));
    return (
      <div>
        <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 50 }}/>
      </div>
    );
  }
}

