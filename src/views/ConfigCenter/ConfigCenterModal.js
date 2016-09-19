import React, {PropTypes} from 'react';
import {Button, Modal, Row, Input, Form} from 'antd';
import {connect} from 'react-redux';
import * as appActions from '../../redux/modules/configCenter';

const createForm = Form.create;
const FormItem = Form.Item;

let Demo = React.createClass({
  render() {
    const {getFieldProps,isFieldValidating,getFieldError} = this.props.form;

    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    };

    return (
      <div>
        <Form horizontal form={this.props.form}>
          <Row>配置中心名</Row>
          <Row><Input value={this.props.modal.clusterName}
                      onChange={(e)=> {this.props.changeValue('clusterName', e.target.value);}}/>
          </Row>
          <Row>zookeeper地址</Row>
          <Row><Input value={this.props.modal.zkConnect}
                      onChange={(e)=> {this.props.changeValue('zkConnect', e.target.value);}}
                      placeholder={'zookeeper主机地址:端口,用,拼接'}/></Row>
          <Row>
            <Input value={this.props.modal.zkDescription} placeholder={'描述配置中心详情,最多20字'}
                   onChange={(e)=> {this.props.changeValue('zkDescription', e.target.value);}}/>
          </Row>
        </Form>
      </div>
    );
  },
});

Demo = createForm()(Demo);

//配置中心列表添加
@connect((state) => ({
  modal: state.configCenter.modal.modal,
  visible: state.configCenter.modal.visible,
  readOnly: state.configCenter.modal.readOnly
}), {...appActions})
export default class ConfigCenterModal extends React.Component {
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

  handleCancel(visible, readOnly) {
    this.props.changeVisible(visible);
    this.props.changeReadOnly(readOnly);
  }

  handleClick(visible) {
    this.props.changeVisible(visible);
    this.props.changeModal({});
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick.bind(this, true)}
                style={{marginBottom: 20}}>添加</Button>
        <Modal title="新增配置中心"
               visible={this.props.visible}
               onOk={() =>this.handleSubmit(this.props.modal, false, false)}
               onCancel={()=>this.handleCancel(false, false)}>
          <Demo {...this.props}/>
        </Modal>
      </div>
    );
  }
}

