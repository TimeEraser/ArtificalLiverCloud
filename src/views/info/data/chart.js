/**
 * Created by reky on 2016/11/9.
 */

import ReactEcharts from 'echarts-for-react';
import {Slider} from 'antd';
import {} from '../../../redux/modules/chart/chartData'
import {} from '../../../redux/modules/alarm/alarmCenter'

import React, {PropTypes} from 'react';
import {connect, Provider} from 'react-redux';


// const defaultOption = {
//   animation: false,
//   animationErasing: "elasticOut",
//   //animationDuration: 10,
//   title : {
//     show: true,
//     //text: this.props.title
//   },
//   legend : {
//     show: true,
//   },
//   grid : {
//     show: true,
//   },
//   xAxis : {
//     //inverse: "true",
//     data  : [],
//   },
//   yAxis : {
//     type: "value",
//   },
//   //series : this.props.series,
//   toolbox: {
//     left: 'center',
//     feature: {
//       dataZoom: {
//         yAxisIndex: 'none'
//       },
//       restore: {},
//       saveAsImage: {}
//     }
//   },
//   //visualMap: this.props.visualMap,
// }

const defaultOption = {
  animation: false,
  //animationErasing: "elasticOut",
  //animationDuration: 10,
  title : {
    show: true,
    top: 20,
    //text: this.props.title
  },
  legend : {
    show: true,
    data: [],
    top: 30,
    right: 10,
  },
  grid : {
    show: false,
  },
  xAxis : {
    //inverse: "true",
    data  : [],
  },
  yAxis : {
    type: "value",
    position: "right"
  },
  //series : this.props.series,
  toolbox: {
    // left: 'center',
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      saveAsImage: {}
    },
    left: "0%",
    top: 0,
  },
  // visualMap: [{
  //   seriesIndex: 1,
  //   type: "piecewise",
  //   show: false,
  //   pieces: [
  //     {gt: 67, color: "#ee0000"},
  //     {lt: 67, gt:62, color: "#66ccff"},
  //     {lt: 62, color: "#ee0000"},
  //   ],
  // },
  //   {
  //     seriesIndex: 0,
  //     type: "piecewise",
  //     show: false,
  //     pieces: [
  //       {gt: 37, color: "#ee0000"},
  //       {lt: 37, gt:32, color: "#66ccff"},
  //       {lt: 32, color: "#ee0000"},
  //     ],
  //   }
  //   ],
};

@connect((state)=> ({
  alarmData: state.alarmCenter.data.alarmData,
  guardian: state.chartData.guardian.guardian,
  pressure: state.chartData.pressure.pressure,
  pumpSpeed: state.chartData.pumpSpeed.pumpSpeed,
}))
export default class Chart extends React.Component{
  /*propTypes = {
    yAxisName: React.PropTypes.string.isRequired,

  };*/
  static propTypes= {
    name: React.PropTypes.array.isRequired,
    dataSource: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired,
    isPump: React.PropTypes.bool.isRequired,
  };
  getOption = function (){
    return (
      this.option
    )
  };

  optionGenerate = function(name, dataSource, title, isPump=false) {//单一纵轴，多组数据显示，例如 收缩压-舒张压
    var result = _.clone(defaultOption);
    var dataSourceTemp = dataSource;
    var i;
    var sym;
    var yTemp;
    var mark = '';
    var higher=0;
    var lower=0;
    const alarmDataSource = this.props.alarmData;
    result.visualMap = [];
    result.series = [];
    result.title = {
      text: title,
      left: 'center',
      // top: -20,
      subtext: '',
    };
    result.tooltip= {
      trigger: 'axis',
      // left: '10%',
    };
    result.legend.data = [];
    //result.xAxis = dataSource.xAxis;
    for (i = 0; i <= name.length - 1; i++) {
      result.legend.data=result.legend.data.concat([name[i]]);
      result.legend.right=10;
      result.legend.top=10;
      if (dataSourceTemp[name[i]] === undefined) {
        result.series[i] = {
          sampling: 'average',
          //animation: true,
          //animationDuration:2000,
          type: "line",
          name: "undefined"+i.toString(),
          //data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
      } else {
        //result.title.text = result.title.text + name[i] + '-';
        if (i==0){
          sym = 'emptyCircle'
        } else if (i==1) {
          sym = 'emptyTriangle'
        }
        if (((isPump==true) && (name[i].substr(name[i].length-1)) != 'T')){
          if (dataSourceTemp[name[i]][0]>=0){
            mark = 'max';
          } else {mark = 'min'}
          yTemp = result.yAxis;
          result.yAxis=[];
          result.yAxis[0] = yTemp;
          result.yAxis[1] = {
            // name: '实时速率',
            type: "value",
            position: "left",
            min: -100,
            max: 100,
            splitNumber: 1,
          };
          result.series[i] = {
            markPoint: {
              data: [
                {type: mark, name: name[i] + '速率'},
              ]
            },
            yAxisIndex: 1,
            symbolSize: 28,
            symbol: 'circle',
            type: "line",
            name: name[i],
            data: dataSourceTemp[name[i]],
            sampling: "average",
          };
        } else {
          if ((name[i].substr(name[i].length-1)) == 'T'){
            if (dataSourceTemp[name[i]][0]>=0) {
              higher = dataSourceTemp[name[i]][dataSourceTemp[name[i]].length-1]
            } else {
              lower = dataSourceTemp[name[i]][dataSourceTemp[name[i]].length-1]
            }
          }
          result.series[i] = {
            yAxisIndex : 0,
            symbolSize: 8,
            symbol: sym,
            smooth: false,
            type: "line",
            name: name[i],
            data: dataSourceTemp[name[i]],
            sampling: "average",
          };
        }
      }
      if (!(name[i].toString() in alarmDataSource)) {
        result.visualMap =result.visualMap.concat([{
          show: false,
          seriesIndex: i,
          type: "piecewise",
          pieces: [
            {gt: -9999999999, color: "#66ccff"},
          ],
        }]);
      } else {
        result.visualMap = result.visualMap.concat([{
          show: false,
          seriesIndex: i,
          type: "piecewise",
          pieces: [
            {gt: alarmDataSource[name[i]].ceiling, color: "#ee0000"},
            {lt: alarmDataSource[name[i]].ceiling, gt:alarmDataSource[name[i]].floor, color: "#66ccff"},
            {lt: alarmDataSource[name[i]].floor, color: "#ee0000"},
          ],
        }]);
      }
    }
    if ((higher>0 && lower <0)) {
      result.series[i] = {
        yAxisIndex : 0,
        // symbolSize: 8,
        // symbol: sym,
        // smooth: true,
        type: "line",
        // name: name[i],
        // data: dataSourceTemp[name[i]],
        // sampling: "average",
        markLine : {
          // lineStyle:{
          //   normal:{
          //
          //   }
          // },
          // symbolRotate:180,
          lineStyle:{normal:{width: 3,color: '#000000',type:'solid'}},

          symbolSize:18,
          data:[{yAxis: higher+lower}]
        }
      }
    }
    return result;
  };

  render() {
    //this.option = this.getInitialOption();
    return (
      <div>
        <ReactEcharts
          option={this.optionGenerate(this.props.name,this.props.dataSource,this.props.title,this.props.isPump)}
          height={150}
          width ={300}
        />
      </div>
    )
  }
}


