/**
 * Created by lybuestc on 16/8/1.
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'antd';
import {getUserInfo} from '../redux/modules/userInfo';

const colStyle = {
  textAlign: 'center',
  fontSize: '16px',
  paddingTop: '20px'
};

@connect((state) => ({
  userInfo: state.userInfo
}), {getUserInfo})
export default class Header extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
  };

  componentDidMount() {
  }

  render() {
    const {userImg, userName} = this.props.userInfo;
    return (
      <div>
          <Row>
            <Col span="6" style={colStyle}>人工肝状态监测中心</Col>
            <Col span="2" offset="16" style={colStyle}><img src={userImg} height="30px"/>{userName}</Col>
          </Row>
        </div>
    );
  }
}


