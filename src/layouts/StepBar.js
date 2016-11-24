/**
 * Created by reky on 2016/11/7.
 */
import { Steps, Button } from 'antd';
const Step = Steps.Step;
const array = [...Array(5)];
const stepString = ["使用帮助","设定报警阈值步骤1","设定报警阈值步骤2","设定报警阈值步骤3","指标监视"];
const steps = array.map((item, i) => ({
  title: `${stepString[i]}`,
}));

export default class StepBar extends React.component{
  getInitialState() {
    return {
      current: 0,
    };
  }
  next() {
    let current = this.state.current + 1;
    if (current === steps.length) {
      current = steps.length;
    }
    this.setState({ current });
  }
  pre() {
    let current = this.state.current - 1;
    if (current === 0) {
      current = 0;
    }
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <div style={{ marginBottom: 24 }}>Curent Step {current + 1}</div>
        <Steps current={current}>
          {steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
        </Steps>
        <div style={{ marginTop: 24 }}>
          <Button onClick={this.next}>Next Step</Button>
          <Button onClick={this.pre}>Pre Step</Button>
        </div>
      </div>
    );
  }
}
