import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from '../../help/raptorMessage';
import Select from '../Select.jsx';
export default class AppSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
  }

  componentDidMount() {
    get('/migration/app/findAll')().then((apps)=> {
      const options = _.map(apps, v=> {
        return {value: v, label: v};
      });
      this.setState({
        options: options
      });
    }, (err)=> {
      message.error(err);
    });
  }

  render() {
    const filterOption = (option, label)=> {
      return option.label.indexOf(label) !== -1;
    };
    return (
      <Select options={this.state.options}
              value={this.props.value}
              placeholder="请选择App"
              filterOption={filterOption}
              onSelect={this.props.onSelect}/>
    );
  }
}
