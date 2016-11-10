/**
 * Created by reky on 2016/11/9.
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {Slider} from 'antd';



export default class Chart extends React.Component{
  /*propTypes = {
    yAxisName: React.PropTypes.string.isRequired,

  };*/

  getInitialOption = function (){
    return (
      this.defaultOption
    )
  };

  getOption = function (){
    return (
      this.option
    )
  };



  defaultOption1 = {
    tooltip : {
      trigger: 'item'
    },
    legend: {
      data: ['Growth', 'Budget 2011', 'Budget 2012'],
      itemGap: 5
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type : 'category',
        //data : obama_budget_2012.names
      }
    ],
    yAxis: [
      {
        type : 'value',
        name : 'Budget (million USD)',
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        show: true,
        start: 94,
        end: 100,
        handleSize: 8
      },
      {
        type: 'inside',
        start: 94,
        end: 100
      },
      {
        type: 'slider',
        show: true,
        yAxisIndex: 0,
        filterMode: 'empty',
        width: 12,
        height: '70%',
        handleSize: 8,
        showDataShadow: false,
        left: '93%'
      }
    ],
    series : [
      {
        name: 'Budget 2011',
        type: 'bar',
        //data: obama_budget_2012.budget2011List
      },
      {
        name: 'Budget 2012',
        type: 'bar',
        //data: obama_budget_2012.budget2012List
      }
    ]
  };

  /* 需要作为标签引出的
  标题 title.text string
  X轴数据 xAxis.data array
  分段颜色 visualMap
  y轴数据 series.data
  */
  /*需要添加的功能
  toolbox
  dataZoom
  */
  defaultOption = {
    dataZoom: [ {
      id: 'dataZoomX',
      type: 'slider',
      xAxisIndex: [0],
      filterMode: 'filter'
    },
      {
        id: 'dataZoomY',
        type: 'slider',
        yAxisIndex: [0],
        filterMode: 'empty'
      }],
    title : {
      show: true,
    },
    legend : {
      show: true,
    },
    grid : {
      show: true,
    },
    xAxis : {
      inverse: "true",
      data  : [{
        value: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18, 'y=x'],
      }],
    },
    yAxis : {
      type: "value",
    },
    series : {
      type : 'line',
      name : 'Pressure',
      data : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
    },
    toolbox: {
      left: 'center',
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    visualMap: {
      pieces: [{
        gt: 0,
        lte: 6,
        color: '#ff6100'
      },{
        gt: 5,
        lte: 12,
        color: '#66ccff'
      },{
        gt: 12,
        lte: 20,
        color: '#ff6100'
      }],
    }
  };



  render() {
    this.option = this.getInitialOption();
    return (
      <div>
        <ReactEcharts
          option={this.getOption()}
          height={150}
          width ={300}
        />
      </div>
    )
  }
}
