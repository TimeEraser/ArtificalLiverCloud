import React, {PropTypes} from 'react';
export default class ReactInterval extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    timeout: PropTypes.number.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.callback();
  }

  componentWillUnmount() {
    this.stop();
  }

  callback() {
    if (this.props.enabled) {
      this.props.callback();
    }
    this.start();
  }

  start() {
    this.stop();
    this.timer = setTimeout(this.callback.bind(this), this.props.timeout * 1000);
  }

  stop() {
    clearTimeout(this.timer);
  }
  render() {
    return <div></div>;
  }
}
