import React, {PropTypes} from 'react';
import _ from 'lodash';
import {Button as AntButton} from 'antd';
import {colors} from '../styles/common.jsx';
export default class Button extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
    children: PropTypes.any
  };
  render() {
    const {style, type, ...rest} = this.props;
    const marginStyle = style ? style.marginRight ?
      style : _.merge(style, {marginRight: '3px'}) : {marginRight: '3px'};

    const newStyle = _.merge(colors[type], marginStyle);
    return (
      <AntButton style={newStyle} {...rest}>{this.props.children}</AntButton>
    );
  }
}
