import React, {PropTypes} from 'react';
import {Button, Modal} from 'antd';
import {renderForm} from '../styles/common.jsx';

export default class FormModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    insertOrUpdate: PropTypes.func.isRequired,
    changeVisible: PropTypes.func.isRequired,
    changeValue: PropTypes.func.isRequired,
    changeModal: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  handleOk() {
    this.props.insertOrUpdate(this.props.form);
    this.handleShow(false);
  }

  handleCancel() {
    this.handleShow(false);
  }

  handleShow(visible) {
    this.props.changeModal({});
    this.props.changeVisible(visible);
  }

  render() {
    const {form, title, visible, items} = this.props;
    const titleLabel = `${!form.id ? '新增' : '修改'}${title}`;
    return (
      <div style={{marginBottom: '10px'}}>
        <Button type="primary" onClick={this.handleShow.bind(this, true)}>{`添加${title}`}</Button>
        <Modal title={titleLabel}
               visible={visible}
               onOk={this.handleOk.bind(this)}
               onCancel={this.handleCancel.bind(this)}>
          {renderForm.call(this, items)}
        </Modal>
      </div>
    );
  }
}
