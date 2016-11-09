import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CoreLayout from '../layouts/CoreLayout';
import alarmsetting from '../views/info/alarm/alarmsetting';
import data from '../views/info/data/data';

export default () => (
  <Route path="/" component={CoreLayout}>
    <Route path="/info/alarm/alarmsetting" component={alarmsetting}/>
    <Route path="/info/data/data" component={data}/>
  </Route>
);

