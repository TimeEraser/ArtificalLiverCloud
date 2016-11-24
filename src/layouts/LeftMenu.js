import React, {PropTypes} from 'react';
import _ from 'lodash';
import { Menu, Icon, Carousel} from 'antd';
import {CONSOLE_HOST as domain} from '../help/constants';
import {Link} from 'react-router';
const SubMenu = Menu.SubMenu;

export default class LeftMenu extends React.Component {

  renderSubMenu(menus) {
    let index = 1;
    return _.map(menus, (menu, i)=> {
      return (<SubMenu key={'sub' + i} title={<span className="blackHyperLink">
                         <Icon type={menu.type}/>
        {menu.to ?
          <Link to={menu.to}>{menu.title}</Link> :
          <a className="yellowHyperLink" href={`${domain}${menu.href}`}>
            {menu.title}
          </a>}
                       </span>}>
        {_.map(menu.children, (item)=> {
          return (<Menu.Item key={index++}>
            {item.to ? <Link to={item.to}>{item.content}</Link> :
              <a href={`${domain}${item.href}`}>{item.content}</a>}
          </Menu.Item>);
        })}
      </SubMenu>);
    });
  }

  // renderSubMenu(menus) {
  //   let index = 1;
  //   return _.map(menus, (menu, i)=> {
  //     return (<SubMenu key={'sub' + i}
  //                      title={<span className="blackHyperLink">
  //                        <Icon type={menu.type}/>
  //                        {menu.to ?
  //                          <Link to={menu.to}>{menu.title}</Link> :
  //                          <a className="yellowHyperLink" href={`${domain}${menu.href}`}>
  //                            {menu.title}
  //                          </a>}
  //                      </span>}>
  //     </SubMenu>);
  //   });
  // }


  render() {
    const {subIndex, itemIndex} = this.props.menuInfo;
    var falseValue = false;
    var trueValue = true;
    return (
      <div>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"><div>
            <Carousel autoplaySpeed={4000} infinite={trueValue} dots={falseValue} autoplay fade={trueValue} vertical={falseValue} >
              {/*<Carousel dots={false} autoplay>*/}
              <div className="index1"></div>
              <div className="index2"></div>
              <div className="index3"></div>
              <div className="index4"></div>
            </Carousel>
            </div>
          </div>
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

