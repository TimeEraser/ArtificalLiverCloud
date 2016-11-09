import React, {PropTypes} from 'react';
import _ from 'lodash';
import { Menu, Icon} from 'antd';
import {CONSOLE_HOST as domain} from '../help/constants';
import {Link} from 'react-router';
const SubMenu = Menu.SubMenu;

export default class LeftMenu extends React.Component {

  renderSubMenu(menus) {
    let index = 1;
    return _.map(menus, (menu, i)=> {
      return (<SubMenu key={'sub' + i} title={<span><Icon type={menu.type}/>{menu.title}</span>}>
        {_.map(menu.children, (item)=> {
          return (<Menu.Item key={index++}>
            {item.to ? <Link to={item.to}>{item.content}</Link> :
              <a href={`${domain}${item.href}`}>{item.content}</a>}
          </Menu.Item>);
        })}
      </SubMenu>);
    });
  }

  render() {
    const {subIndex, itemIndex} = this.props.menuInfo;

    return (
      <div>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>
          <Menu mode="horizontal" theme= "light"
                defaultSelectedKeys={[`${itemIndex}`]} defaultOpenKeys={[`sub${subIndex}`]}>
            {this.renderSubMenu(this.props.menus)}
          </Menu>
        </aside>
      </div>
    );
  }
}
LeftMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  menuInfo: PropTypes.object.isRequired
};

