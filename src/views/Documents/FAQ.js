/**
 * Created by lybuestc on 16/9/1.
 */
import React from 'react';
const dataStyle = {
  fontSize: '14px',
  margin: '8px'
};

export default class QuickStart extends React.Component {
  render() {

    return (
      <div>
        <h2>1、我的机器如何停止?</h2>
        答:修改cron表达式到2020年即可暂停,需要启动时重新修改cron表达式即可。
      </div>
    )
  }
}
