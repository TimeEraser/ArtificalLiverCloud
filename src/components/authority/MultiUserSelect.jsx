import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from 'help/raptorMessage';
import MultiSelect from '../MultiSelect.jsx';
export default class UserSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
  }

  componentDidMount() {
    get('/authority/getUsers')().then((users)=> {
      const options = _.map(users, v=> {
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
      <MultiSelect options={this.state.options}
              value={this.props.value}
              placeholder="请选择User"
              filterOption={filterOption}
              onChange={this.props.onChange}/>
    );
  }
}
