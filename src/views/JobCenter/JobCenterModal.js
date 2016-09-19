import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Row, Input, Checkbox, Form} from 'antd';
import * as jobActions from '../../redux/modules/jobCenter/jobCenter';
import ConfigCenterSelect from './ConfigCenterSelect';

const createForm = Form.create;
const FormItem = Form.Item;
/**
 *
 * Created by kenzhou on 4/25/16.
 */
let RenderForm = React.createClass({
  render() {
    const {getFieldProps,isFieldValidating,getFieldError} = this.props.form;

    const nameProps = getFieldProps('description', {
      rules: [
        { required: false, max: 10, message: '描述最多10个字' },
      ],
      initialValue:this.props.modal.jobDescription,
      onChange:(e)=> {this.props.changeValue('jobDescription', e.target.value)}
    });

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };

    return (
      <div>
        <Form horizontal form={this.props.form}>
            <Row>*配置中心</Row>
            <Row><ConfigCenterSelect readOnly={this.props.readOnly} value={this.props.modal.clusterName}
                        onSelect={(e)=> {this.props.changeValue('clusterName',e)}}/>
            </Row>
            <Row>*Job名</Row>
            <Row><Input readOnly={this.props.readOnly} value={this.props.modal.jobName}
                        onChange={(e)=> {this.props.changeValue('jobName', e.target.value);}}/>
            </Row>
            <Row>拥有者</Row>
            <Row><Input value={this.props.modal.owner} placeholder="花名拼音"
                        onChange={(e)=> {this.props.changeValue('owner', e.target.value);}}/>
            </Row>

            <Row>全局任务参数</Row>
            <Row><Input value={this.props.modal.jobParameter}
                        onChange={(e)=> {this.props.changeValue('jobParameter', e.target.value);}}/>
            </Row>

            <Row>*执行类全类名</Row>
            <Row><Input value={this.props.modal.jobClass} placeholder="com.mogujie....."
                        onChange={(e)=> {this.props.changeValue('jobClass', e.target.value);}}/>
            </Row>

            <Row>分片策略类</Row>
            <Row><Input value={this.props.modal.jobShardingStrategyClass} placeholder="默认策略则不填"
                        onChange={(e)=> {this.props.changeValue('jobShardingStrategyClass', e.target.value);}}/>
            </Row>

            <Row>*crond表达式</Row>
            <Row><Input value={this.props.modal.crond} placeholder="可去http://cron.qqe2.com生成"
                        onChange={(e)=> {this.props.changeValue('crond', e.target.value);}}/>
            </Row>
            <Row>*获取数据总数</Row>
            <Row><Input value={this.props.modal.fetchDataAmount} placeholder="必须为整数"
                        onChange={(e)=> {this.props.changeValue('fetchDataAmount', e.target.value);}}/>
            </Row>
            <Row>*分片总数</Row>
            <Row><Input value={this.props.modal.shardingTotalCount} placeholder="必须为整数"
                        onChange={(e)=> {this.props.changeValue('shardingTotalCount', e.target.value);}}/>
            </Row>
            <Row>*分片参数</Row>
            <Row><Input value={this.props.modal.shardingItemParameters} placeholder="0=xxx,1=yyy..."
                        onChange={(e)=> {this.props.changeValue('shardingItemParameters', e.target.value);}}/>
            </Row>
            <Row>job备注(20字以内)</Row>
            <Row><Input value={this.props.modal.jobDescription} placeholder="job备注,最多20个字"
                        onChange={(e)=> {this.props.changeValue('jobDescription', e.target.value);}}/>
            </Row>
            <Row>
              <Checkbox checked={this.props.modal.failover}
                        onChange={(e)=> {this.props.changeValue('failover', e.target.checked);}}/>
              是否需要失效分片自动迁移
            </Row>
            <Row>
              <Checkbox checked={this.props.modal.concurrent}
                        onChange={(e)=> {this.props.changeValue('concurrent', e.target.checked);}}/>
              是否并发执行
            </Row>
            <Row>
              <Checkbox checked={this.props.modal.disable}
                        onChange={(e)=> {this.props.changeValue('disable', e.target.checked);}}/>
              是否启用job
            </Row>
            <Row>
              <Checkbox checked={this.props.modal.misfire}
                        onChange={(e)=> {this.props.changeValue('misfire', e.target.checked);}}/>
              是否补偿执行
            </Row>

        </Form>
      </div>
    );
  },
});

RenderForm = createForm()(RenderForm);


//新增job
@connect((state) => ({
  modal: state.jobCenter.modal.modal,
  visible: state.jobCenter.modal.visible,
  readOnly: state.jobCenter.modal.readOnly
}), {...jobActions})
export default class JobCenterModal extends React.Component {
  static propTypes = {
    changeVisible: PropTypes.func.isRequired,
    changeValue: PropTypes.func.isRequired,
    insertOrUpdate: PropTypes.func.isRequired,
    changeModal: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired,
    modal: PropTypes.object.isRequired
  };

  handleSubmit(value, visible, readOnly) {
    this.props.changeVisible(visible);
    this.props.changeReadOnly(readOnly);
    if (this.props.readOnly) {
      this.props.insertOrUpdate(value, 'update');
    } else {
      this.props.insertOrUpdate(value, 'insert');
    }
  }

  handleClick(visible) {
    this.props.changeVisible(visible);
    this.props.changeModal({});
  }

  handleCancel(visible, readOnly) {
    this.props.changeVisible(visible);
    this.props.changeReadOnly(readOnly);
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick.bind(this, true)}
                style={{marginBottom: 20}}>添加</Button>
        <Modal title="新增Job"
               visible={this.props.visible}
               onOk={() =>this.handleSubmit(this.props.modal, false, false)}
               onCancel={()=>this.handleCancel(false, false)}>
          <RenderForm {...this.props}/>
        </Modal>
      </div>);
  }
}
