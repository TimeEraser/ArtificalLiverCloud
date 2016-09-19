/**
 * Created by kenzhou on 5/6/16.
 */
import React, {PropTypes} from 'react';
import {Form, Input, Row, Col, Button, Select} from 'antd';
import {centerLabel} from '../../layouts/layout'

export default class JobForm extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired,
    job: PropTypes.object.isRequired,
    getJobByClusterAndJobName: PropTypes.func.isRequired,
    changeValue: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const {query} = this.props.location;
    this.props.changeReadOnly(true);
    this.props.getJobByClusterAndJobName(query);
  }

  render() {
    const colStyle = {
      marginBottom: '5px',
      marginTop: '5px'
    };

    const FormItem = Form.Item;
    const Option = Select.Option;
    return (
      <Form >
        <Row align="middle" style={colStyle}>
          <Col span="8" style={colStyle}>
            <FormItem
              label="配置中心："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled value={this.props.job.clusterName}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="Job名："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled value={this.props.job.jobName}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="拥有者："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.owner}
                     onChange={(e)=> {this.props.changeValue('job.owner', e.target.value);}}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="job参数："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.jobParameter}
                     onChange={(e)=> {this.props.changeValue('job.jobParameter', e.target.value);}}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="job执行类："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.jobClass}
                     onChange={(e)=> {this.props.changeValue('job.jobClass', e.target.value);}}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="job分片策略类："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.jobShardingStrategyClass}
                     onChange={(e)=> {this.props.changeValue('job.jobShardingStrategyClass', e.target.value);}}/>
            </FormItem>
          </Col>

          <Col span="8" style={colStyle}>
            <FormItem
              label="cron表达式："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.crond}
                     onChange={(e)=> {this.props.changeValue('job.crond', e.target.value);}}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="fetchDataAmount："
              labelCol={{span: 12}}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={_.get(this.props,'job.fetchDataAmount')}
                     onChange={(e)=> {this.props.changeValue('job.fetchDataAmount', e.target.value);}}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="分片总数："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.shardingTotalCount}
                     onChange={(e)=> {this.props.changeValue('job.shardingTotalCount', e.target.value);}}/>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="分片参数："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.shardingItemParameters}
                     onChange={(e)=> {this.props.changeValue('job.shardingItemParameters', e.target.value);}}/>
            </FormItem>
          </Col>

          <Col span="8" style={colStyle}>
            <FormItem
              label="job描述："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Input disabled={this.props.readOnly} value={this.props.job.jobDescription}
                     onChange={(e)=> {this.props.changeValue('job.jobDescription', e.target.value);}}/>
            </FormItem>
          </Col>

          <Col span="8" style={colStyle}>
            <FormItem
              label="失效迁移："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Select value={this.props.job.failover?'true':'false'} disabled={this.props.readOnly}
                      onChange={(e)=> {this.props.changeValue('job.failover', e=='true'?true:false);}}>
                <Option value='true'>true</Option>
                <Option value='false'>false</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="并发执行："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Select value={this.props.job.concurrent?'true':'false'} disabled={this.props.readOnly}
                      onChange={(e)=> {this.props.changeValue('job.concurrent', e=='true'?true:false);}}>
                <Option value='true'>true</Option>
                <Option value='false'>false</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="是否启用job："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Select value={this.props.job.disable?'true':'false'} disabled={this.props.readOnly}
                      onChange={(e)=> {this.props.changeValue('job.disable', e=='true'?true:false);}}>
                <Option value='true'>true</Option>
                <Option value='false'>false</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8" style={colStyle}>
            <FormItem
              label="是否补偿执行："
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}>
              <Select value={this.props.job.misfire?'true':'false'} disabled={this.props.readOnly}
                      onChange={(e)=> {this.props.changeValue('job.misfire', e=='true'?true:false);}}>
                <Option value='true'>true</Option>
                <Option value='false'>false</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
