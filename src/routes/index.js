import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CoreLayout from '../layouts/CoreLayout';
import ConfigCenter from '../views/ConfigCenter/ConfigCenter';
import Documentation from '../views/Documents/Documentation';
import QuickStart from '../views/Documents/QuickStart';
import JobCenter from '../views/JobCenter/JobCenter';
import JobDetail from '../views/JobDetail/JobDetail';
import JobExecute from '../views/JobExecute/JobExecute';

export default () => (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={Documentation}/>
    <Route path="/documentation/introduction" component={Documentation}/>
    <Route path="/documentation/quickstart" component={QuickStart}/>
    <Route path="/cluster" component={ConfigCenter}/>
    <Route path="/job" component={JobCenter}/>
    <Route path="/job/detail" component={JobDetail}/>
    <Route path="/job/execute" component={JobExecute}/>
  </Route>
);

