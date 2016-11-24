import React, {PropTypes} from 'react';
import SurgeryForm from './SurgeryForm';
import SurgeryTable from './SurgeryTable';
import {connect} from 'react-redux';
import {
  getSurgeries,
  getPersons,
  changeConditionsDoctor,
  changeConditionsPatient,
  changeConditionsTimeRange,
} from '../../redux/modules/surgery/SurgeryData';
@connect((state)=>({
  surgeries:state.SurgeryData.surgery.surgeries,
  timeRange:state.SurgeryData.conditions.timeRange,
  doctor:state.SurgeryData.conditions.doctor,
  patient:state.SurgeryData.conditions.patient,
  doctors:state.SurgeryData.persons.doctors,
  patients:state.SurgeryData.persons.patients,
}), {getSurgeries,getPersons,changeConditionsDoctor,changeConditionsPatient,changeConditionsTimeRange})
export default class Surgery extends React.Component {
  static propTypes = {
    surgeries:PropTypes.array.isRequired,
    doctors:PropTypes.array.isRequired,
    patients:PropTypes.array.isRequired,
    timeRange: PropTypes.string.isRequired,
    doctor:PropTypes.string.isRequired,
    patient:PropTypes.string.isRequired,
    getSurgeries: PropTypes.func.isRequired,
    getPersons: PropTypes.func.isRequired,
    changeConditionsDoctor: PropTypes.func.isRequired,
    changeConditionsPatient: PropTypes.func.isRequired,
    changeConditionsTimeRange: PropTypes.func.isRequired,
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
