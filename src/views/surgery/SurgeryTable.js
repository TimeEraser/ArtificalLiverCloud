import {connect} from 'react-redux';
import React, {PropTypes} from 'react';
import {Table,Icon,Tag,Popover,Button} from 'antd';
import { formatDate } from '../../help/dateUtils'
import {
  getSurgeries
} from '../../redux/modules/surgery/SurgeryData';
@connect((state)=>({
  surgeries:state.SurgeryData.surgery.surgeries,
  timeRange:state.SurgeryData.conditions.timeRange,
  doctor:state.SurgeryData.conditions.doctor,
  patient:state.SurgeryData.conditions.patient,
}),{getSurgeries ,formatDate})
export default class SurgeryTable extends React.Component {
  static propTypes = {
    surgeries: PropTypes.array.isRequired,
    timeRange: PropTypes.string.isRequired,
    doctor:PropTypes.string.isRequired,
    patient:PropTypes.string.isRequired,
    getSurgeries: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const {query} = this.props.location;
    var param={
      timeRange:this.props.timeRange,
      doctor:this.props.doctor,
      patient:this.props.patient,
    };
    this.handleSurgerySearch(param);
  }
  handleSurgerySearch(){
    var param={
      timeRange:this.props.timeRange,
      doctor:this.props.doctor,
      patient:this.props.patient,
    };
    this.props.getSurgeries(param);
  }
  render() {
    const SURGERY_INIT =1;
    const SURGERY_EXECUTING =2;
    const SURGERY_COMPLETE =3;
    const {surgeries,timeRange, doctor, patient} = this.props;
    const transformSurgery = (obj)=> {
      _.merge(obj, {
        key: obj.id
      });
      return obj;
    };
    const mainColumns = [{
      title: '手术号',
      dataIndex: 'surgeryNo',
      key: 'surgeryNo',
    },{
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: (a, b) => a.startTime - b.startTime,
      render(value,record){
        var state=value;
        if (record.state == SURGERY_INIT) {
          state = <Tag color="yellow">-    -</Tag>
        } else {
            state= formatDate(value);
        }
        return state;
      },
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: (a, b) => a.endTime - b.endTime,
      render(value,record){
        var state=value;
        if (record.state != SURGERY_COMPLETE) {
          state=<Tag color="yellow">-    -</Tag>
        } else {
          state= formatDate(value);
        }
        return state;
      }
    },{
      title: '执行状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        { text: '初始化', value: SURGERY_INIT },
        { text: '执行中', value: SURGERY_EXECUTING },
        { text: '已完成', value: SURGERY_COMPLETE },
      ],
      onFilter: (value, record) => record.state==value,
      render(value){
        var state;
        if (value == SURGERY_INIT) {
          state=<Tag color="yellow">初始化</Tag>
        } else if (value == SURGERY_EXECUTING){
          state=<Tag color="red">执行中</Tag>
        } else if (value == SURGERY_COMPLETE){
          state=<Tag color="green">已完成</Tag>
        }
        return state;
      },
    },
      {
        title: '病人',
        dataIndex: 'patient',
        key: 'patient',
      },
      {
        title: '医生',
        dataIndex: 'doctor',
        key: 'doctor',
      }
    ];
    return (
      <div>
        <Table columns={mainColumns} dataSource={surgeries.map(surgery=>transformSurgery(surgery))}/>
      </div>
    );
  }
}
