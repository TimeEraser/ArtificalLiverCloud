import {Select as AntSelect } from 'antd';
import React, {PropTypes} from 'react';
const maxShowLength = 10;
export default class MultiSelect extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    filterOption: PropTypes.func,
    value: PropTypes.any,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    notFoundContent: PropTypes.string,
    style: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderOptions: _.slice(this.props.options, 0, maxShowLength)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({renderOptions: _.slice(nextProps.options, 0, maxShowLength)});
  }

  filterRenderOptions(label) {
    const {filterOption, options} = this.props;
    return _(options).chain().filter((option)=> {
      const finalFunc = filterOption ? filterOption : _.constant(true);
      return finalFunc(option, label);
    }).slice(0, maxShowLength).value();
  }

  handleSearch(label) {
    this.setState({renderOptions: this.filterRenderOptions(label)});
  }

  handleChange(label) {
    this.props.onChange(label);
  }

  render() {
    const {notFoundContent, placeholder, style, value} = this.props;
    return (
      <div>
        <AntSelect multiple
                   value={value}
                   style={style ? style : { width: 400}}
                   placeholder={placeholder ? placeholder : '请选择'}
                   notFoundContent={notFoundContent ? notFoundContent : '无法找到'}
                   onChange={this.handleChange.bind(this)}
                   onSearch={this.handleSearch.bind(this)}>
          {_.map(this.state.renderOptions, (option)=> {
            return <Option key={option.value} value={option.value}>{option.label}</Option>;
          })}
        </AntSelect>
      </div>
    );
  }
}
