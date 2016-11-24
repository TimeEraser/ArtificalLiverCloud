import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CoreLayout from '../layouts/CoreLayout';
import alarmsetting from '../views/info/alarm/alarmsetting';
import data from '../views/info/data/data';
import Surgery from '../views/surgery/Surgery';
import IndexPage from '../views/Index'
export default () => (
    // <Route path="/guider" component={Guider}/>
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={IndexPage}/>
      <Route path="/monitor/index" component={IndexPage}/>
      <Route path="/monitor/alarm" component={alarmsetting}/>
      <Route path="/monitor/:surgeryNo/detail" component={data}/>
      <Route path="/monitor/surgery/information" component={Surgery}/>
    </Route>
  // </Route>
);

