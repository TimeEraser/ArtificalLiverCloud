import React, {PropTypes} from 'react';
import {Breadcrumb, Spin} from 'antd';
import {connect} from 'react-redux';
import LeftMenu from './LeftMenu';
import '../../node_modules/antd/lib/index.css';
import '../styles/core.scss';
import {showMask} from '../redux/modules/delete/layout'
import {REDIRECT_HOST as login} from '../help/constants'
import Header from './Header'
@connect((state) => ({
  mask: state.layout.mask
}), {showMask})
export default class CoreLayout extends React.Component<void, void> {
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
          type: 'setting', title: '数据设定与显示',
          children: [
            {to: '/info/alarm/alarmsetting', content: '设定报警阈值'},
            {to: '/info/data/data', content: '实时参数显示'}
          ]
        },
        {
          type: 'setting', title: '使用帮助',
          children: [
            {to: '/help/1', content: '1'},
            {to: '/help/2', content: '2'}
          ]
        },
      ]
    };
  }

  findMenuByPath(pathname) {
    let itemIndex = 1;
    let result = {title: '', content: '', subIndex: 0, itemIndex: itemIndex};
    _.forEach(this.state.menus, (menu, subIndex)=> {
      _.forEach(menu.children, (item)=> {
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
        <div className="ant-layout-main">
          <div className="ant-layout-header"><Header/></div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item><a href="">{menuInfo.title}</a></Breadcrumb.Item>
              <Breadcrumb.Item>{menuInfo.content}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div >
                <Spin spining={this.props.mask}>{this.props.children}</Spin>
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            copyright
          </div>
        </div>
      </div>
    );
  }
}

