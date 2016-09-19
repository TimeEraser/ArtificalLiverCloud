import React from 'react';
const dataStyle = {
  fontSize: '14px',
  margin: '8px'
};

export default class Documentation extends React.Component {
  render() {

    return (
      <div>
        <h2>接入方法:</h2>
        <div style={dataStyle}>接入方法请看<a
          href="http://10.13.131.148:4000/">Vacuum文档</a>
        </div>

        <div >
          <h2>开发人员:</h2>
          <div style={dataStyle}>@约旦, @城管, @青羽</div>
        </div>

      </div>
    )
  }
}
