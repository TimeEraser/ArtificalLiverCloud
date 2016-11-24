import React, {PropTypes} from 'react';
import message from 'help/raptorMessage';
import Select from './Select.jsx';
export default class RaptorSelect extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
    promise: PropTypes.func.isRequired,
    transform: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {options: []};
    const {promise, transform} = this.props;
    promise().then((data)=> {
      const options = _.map(data, (v)=>transform(v));
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
                onSelect={this.props.onSelect}/>
      </div>
    );
  }
}

