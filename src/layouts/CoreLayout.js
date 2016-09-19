import React, {PropTypes} from 'react';
import {Breadcrumb, Spin} from 'antd';
import {connect} from 'react-redux';
import LeftMenu from './LeftMenu';
import '../../node_modules/antd/lib/index.css';
import '../styles/core.scss';
import {showMask} from '../redux/modules/delete/layout';
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
          type: 'home', title: '用户指南',
          children: [
            {to: '/documentation/introduction', content: '产品文档'},
          ]
        },
        {
          type: 'solution', title: '配置中心',
          children: [
            {to: '/cluster', content: 'cluster列表'},
          ]
        },
        {
          type: 'paper-clip', title: 'job中心',
          children: [
            {to: '/job', content: 'job列表'},
          ]
        }
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
            © 2016 Copyright. 平台技术中间件团队(@约旦, @青羽, @城管)
          </div>
        </div>
      </div>
    );
  }
}

