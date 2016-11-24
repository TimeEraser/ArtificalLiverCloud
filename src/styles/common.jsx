import React from 'react';
import _ from 'lodash';
import {history} from '../main';
import {Form, Row, Col, Input, InputNumber, DatePicker, Checkbox, Progress} from 'antd';
const ProgressLine = Progress.Line;
const FormItem = Form.Item;
import {formatDate} from 'help/dateUtils';
import {centerLabel, formItemLayout} from './layout';
import Button from '../components/Button.jsx';
import RaptorSelect from '../components/RaptorSelect.jsx';
import InputSlider from '../components/InputSlider.jsx';
export const colors = {
  success: {
    color: '#3c763d',
    backgroundColor: ' #dff0d8',
    borderColor: '#d6e9c6'
  },
  danger: {
    background: ' #f2dede',
    color: '#a94442',
    borderColor: '#ebccd1'
  },
  info: {
    color: '#31708f',
    backgroundColor: '#d9edf7',
    borderColor: '#bce8f1'
  },
  warning: {
    color: '#8a6d3b',
    backgroundColor: '#fcf8e3',
    borderColor: '#faebcc'
  }
};

export const formDiv = {
  topText: {
    fontFamily: 'monospace',
    fontSize: '13pt',
    fontWeight: 'bold',
    fontStyle: 'normal',
    margin: '3px 0',
    color: '#3D80BA'
  },
  topRow: {
    margin: '10px'
  },
  row: {
    margin: '10px'
  }
};

/**
 * 渲染div版本 form的头条
 * @param title string
 * @param children 子元素
 */
export function renderTopRow(title, children) {
  return (
    <Row style={formDiv.topRow}>
      <Col style={formDiv.topText} span="6">{title}</Col>
      <Col>
        {children}
      </Col>
    </Row>
  );
}

/**
 * 渲染div版本form的Input类型.
 */
function renderInput(item) {
  const {form, changeValue} = this.props;
  const {input} = item;
  switch (input.type) {
    case 'InputNumber':
      return (<InputNumber value={_.get(form, input.path)}
                           onChange={(value)=>_.isNumber(value) && changeValue(input.path, value)}/>);
    case 'DatePicker':
      return (<DatePicker showTime format="yyyy-MM-dd HH:mm:ss"
                          value={_.get(form, input.path)}
                          onChange={(time)=>{changeValue(input.path, formatDate(time));}}
                          placeholder={input.placeholder}
                          style={{ width: 160 }}/>);
    case 'Checkbox':
      return (<Checkbox checked={_.get(form, input.path)}
                        onChange={(e)=>{changeValue(input.path, e.target.checked);}}/>);
    default:
      return (<Input value={_.get(form, input.path)}
                     onChange={(e)=> {changeValue(input.path, e.target.value);}}
                     placeholder={input.placeholder}/>);

  }
}
/**
 * 渲染div版本form 的一列
 */
export function renderInputCol(item, key) {
  const {input, label} = item;
  const itemSpan = item.span ? item.span : '8';
  const labelSpan = label.span ? label.span : '8';
  const inputSpan = input.span ? input.span : '16';
  return (
    <Col key={key} style={centerLabel} span={`${itemSpan}`}>
      <Col span={`${labelSpan}`}>{label.text}</Col>
      <Col span={`${inputSpan}`}>
        {renderInput.call(this, item)}
      </Col>
    </Col>
  );
}
/**
 * 渲染DIV版本的 form的一行
 */
export function renderRow(items, key) {
  return (
    <Row key={key} style={formDiv.row}>
      {_.map(items, (item, index)=> {
        return renderInputCol.call(this, item, index);
      })}
    </Row>
  );
}
/**
 * 渲染DIV form表单
 */
export function renderDivForm(elements) {
  return _.map(elements, (element, index)=> {
    return renderRow.call(this, element, index);
  });
}

/**
 * DIV表单页面的底部button
 */
export function renderButtonGroup(buttonGroup) {
  const colStyle = {
    span: '1',
    style: {
      marginLeft: '50px'
    }
  };
  return (
    <Row style={{margin: '10px', float: 'right'}}>
      {_.map(buttonGroup.buttons, (button, index)=> {
        return (
          <Col {...colStyle} key={index}>
            <Button size={buttonGroup.size} type={button.type}
                    onClick={button.onClick}>{button.label}</Button>
          </Col>);
      })}
    </Row>
  );
}
/**
 * 自动生成右下角的4个按钮
 */
export function generateButtonGroup(confType, returnPath) {
  const {form, insertOrUpdate, receiveObj, insertUserConf, readUserConf} = this.props;
  const buttonGroup = {
    size: 'large',
    buttons: [
      {label: '提交', type: 'primary', onClick: ()=>insertOrUpdate(form)},
      {label: '暂存', type: '"info"', onClick: ()=>insertUserConf(confType, form)},
      {label: '读取', type: 'info', onClick: ()=>readUserConf(confType, receiveObj)},
      {label: '返回', type: 'dashed', onClick: ()=>history.push(returnPath)}
    ]
  };
  return renderButtonGroup(buttonGroup);
}

/**
 * 渲染modal form的Input类型
 */
function renderFormInput(item) {
  const {form, changeValue} = this.props;
  switch (item.type) {
    case 'RaptorSelect':
      return (<RaptorSelect
          value={_.get(form, item.path)}
          onSelect={(value)=>changeValue(item.path, value)}
          promise={item.promise}
          transform={(v)=>({value: v.id, label: v.desc})}/>
      );
    case 'Checkbox':
      return (<Checkbox checked={_.get(form, item.path)}
                        onChange={(e)=>{changeValue(item.path, e.target.checked);}}/>);
    default :
      return (
        <Input placeholder={`请输入desc`}
               value={_.get(form, item.path)}
               onChange={(e)=>changeValue(item.path, e.target.value)}/>
      );
  }
}
/**
 * 渲染modal form的表单元素
 */
function renderFormItem(item, key) {
  const label = !!item.label ? item.label : item.path;
  return (
    <FormItem key={key} label={label}
      {...formItemLayout}>
      {renderFormInput.call(this, item)}
    </FormItem>
  );
}
/**
 * 渲染modal 的水平form表单
 */
export function renderForm(items) {
  return (
    <Form horizontal>
      { _.map(items, (item, index)=> {
        return renderFormItem.call(this, item, index);
      })}
    </Form>);
}

function renderInfoObj(obj) {
  return (<div>
    {_.map(obj, (v, k)=> {
      return <Row key={k}>{k}={v}</Row>;
    })}
  </div>);
}
function renderInfoInput(info, item) {
  const input = item.input;
  const value = _.get(info, input.path);
  switch (input.type) {
    case 'ProgressLine':
      const status = value > 80 ? 'exception' : 'normal';
      return <ProgressLine percent={value} status={status}/>;
    case 'InputSlider':
      return (<InputSlider min={input.min} max={input.max}
                           value={value}
                           onChange={input.handleChangeRange}/>);
    case 'DateFormat':
      return <span>{formatDate(value)}</span>;
    default :
      if (_.isObject(value)) {
        return <span>{renderInfoObj(value)}</span>;
      }
      return <span>{value}</span>;
  }
}
function dealStringInfoItem(item) {
  if (_.isString(item)) {
    return {label: {text: item}, input: {path: item}};
  }
  return item;
}

function renderInfoCol(info, preItem, key) {
  const item = dealStringInfoItem(preItem);
  const itemSpan = item.span ? item.span : '10';
  const labelSpan = item.span ? item.span : '9';
  const inputSpan = item.span ? item.span : '15';
  return (<Col key={key} span={`${itemSpan}`}>
    <Col span={`${labelSpan}`}>{item.label.text}:</Col>
    <Col span={`${inputSpan}`}>
      {renderInfoInput(info, item)}
    </Col>
  </Col>);
}

function renderInfoRow(info, element, key) {
  return (<Row key={key} style={{'fontSize': '15px'}}>
    {_.map(element, (item, index)=> {
      return renderInfoCol(info, item, index);
    })}
  </Row>);
}

export function renderInfoForm(info, elements) {
  return _.map(elements, (element, index)=> {
    return renderInfoRow(info, element, index);
  });
}
