import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {getClusters} from '../../redux/modules/configCenter'
import ConfigCenterModal from './ConfigCenterModal';
import ConfigCenterTable from './ConfigCenterTable';


@connect(()=>({}), {getClusters})
export default class ConfigCenter extends React.Component {
  static propTypes = {
    getClusters: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getClusters();
  }

  render() {
    return (
      <div>
        <ConfigCenterModal/>
        <ConfigCenterTable/>
      </div>
    );
  }
}



