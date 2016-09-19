import React, {PropTypes} from 'react';
import {get} from 'help/fetchHelp';
import message from 'help/raptorMessage';
import Select from '../Select.jsx';
export default class RoleSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
  }

  componentDidMount() {
    get('/role/findAll')().then((roles)=> {
      const options = _.map(roles, v=> {
        return {value: v.id, label: v.name};
      });
      this.setState({
        options: options
      });
    }, (err)=> {
      message.error(err);
    });
  }

  render() {
    return (
      <div>
        <Select options={this.state.options}
                      value={this.props.value}
                      placeholder="请选择角色"
                      onSelect={this.props.onSelect}/>
      </div>
    );
  }
}

