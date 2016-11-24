import React, {PropTypes} from 'react';
import {Breadcrumb, Spin} from 'antd';
import {connect} from 'react-redux';
import LeftMenu from './LeftMenu';
import '../../node_modules/antd/dist/antd.css';
import '../styles/core.scss';
import {showMask} from '../redux/modules/delete/layout'
import {REDIRECT_HOST as login} from '../help/constants'
import Header from './Header'
@connect((state) => ({
  mask: state.layout.mask
}), {showMask})
export default class CoreLayout extends React.Component<void,void> {
  static propTypes = {
    children: PropTypes.element,
    mask: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      mask: false, menus: [
        {
          type: 'setting', title: '首页',
          to: '/monitor/index',
        },
        {
          type: 'setting', title: '手术信息',
          to: '/monitor/surgery/information',
          children:[{
            to: '/monitor/surgery/information',
            content: '手术查询',
          },{
            to: '/monitor/surgery/chart',
            content: '实时监控',
          }],
        },
        {
          type: 'setting', title: '报警设定',
          to: '/monitor/alarm',
        },
        {
          type: 'appstore', title: '使用帮助',
          to: '/help/1',
        },
      ]
    };
  }

  findMenuByPath(pathname) {
    let itemIndex = 1;
    var result = {
      title: '',
      content: '', subIndex: 0,
      itemIndex: itemIndex,
    };
    _.forEach(this.state.menus, (menu, subIndex)=> {
      _.forEach(menu, (item)=> {
        if (item.to === pathname) {
          result = {
            title: menu.title,
            content: item.content,
            subIndex: subIndex,
            itemIndex: itemIndex
          };
        }
        itemIndex++;
      });
    });
    return result;
  }

  render() {
    const {pathname} = this.props.location;
    const menuInfo = this.findMenuByPath(pathname);
    return (

      <div className="ant-layout-aside">
        <LeftMenu menuInfo={menuInfo} menus={this.state.menus}/>
        <div className="ant-layout-header"></div>
        <div className="ant-layout-main">
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div >
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            ©2016 ZJU. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
}

