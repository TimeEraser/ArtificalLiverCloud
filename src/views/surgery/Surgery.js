import React, {PropTypes} from 'react';
import SurgeryForm from './SurgeryForm';
import SurgeryTable from './SurgeryTable';
import {connect} from 'react-redux';
import {
  getSurgeries,
  changeSurgeriesTimeRange,
} from '../../redux/modules/surgery/surgery';
@connect((state)=>({
  surgeries:state.surgery.surgeries,
  timeRange:state.surgery.timeRange,
}), {getSurgeries,changeSurgeriesTimeRange})
export default class Surgery extends React.Component {
  static propTypes = {
    surgeries: PropTypes.object.isRequired,
    timeRange: PropTypes.string.isRequired,
    getSurgeries: PropTypes.func.isRequired,
    changeSurgeriesTimeRange: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div>
        <SurgeryForm {...this.props}/>
        <SurgeryTable {...this.props}/>
      </div>
    );
  }
}
