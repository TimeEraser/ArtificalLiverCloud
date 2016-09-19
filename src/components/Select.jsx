import {Select as AntSelect } from 'antd';
import React, {PropTypes} from 'react';
const maxShowLength = 10;
export default class Select extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    filterOption: PropTypes.func,
    value: PropTypes.any,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    notFoundContent: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderOptions: _.slice(this.props.options, 0, maxShowLength)
    };
  }

  componentWillReceiveProps(nextProps) {
    let {value} = nextProps;
    const option = this.props.options.find((op)=> {
      return op.value === value;
    });
    value = option ? option.label : value;
    this.setState({value: value, renderOptions: this.filterRenderOptions(value)});
  }

  filterRenderOptions(label) {
    const {filterOption, options} = this.props;
    return _(options).chain().filter((option)=> {
      return filterOption ? filterOption(option, label) : true;
    }).slice(0, maxShowLength).value();
  }

  handleSelect(value, option) {
    this.setState({value: option.props.children});
    this.props.onSelect(value, option.props.children);
  }

  handleChange(label) {
    this.setState({value: label, renderOptions: this.filterRenderOptions(label)});
    if (label === '') {
      this.props.onSelect('', '');
    }
  }

  render() {
    const {notFoundContent, searchPlaceholder, placeholder, style, size} = this.props;
    return (
      <div>
        <AntSelect combobox showSearch
                   value={this.state.value}
                   size={size}
                   style={style ? style : { width: 150}}
                   placeholder={placeholder ? placeholder : '请选择'}
                   optionFilterProp="children"
                   notFoundContent={notFoundContent ? notFoundContent : '无法找到'}
                   searchPlaceholder={searchPlaceholder ? searchPlaceholder : '输入关键词'}
                   onSelect={this.handleSelect.bind(this)}
                   onChange={this.handleChange.bind(this)}>
          {_.map(this.state.renderOptions, (option)=> {
            return <Option key={option.value} value={option.value}>{option.label}</Option>;
          })}
        </AntSelect>
      </div>
    );
  }
}
