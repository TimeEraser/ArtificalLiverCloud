import {message} from 'antd';
const DEFAULT_TIME = 3;
function proxyMessage(type, content, duration, onClose) {
  const finalDuration = duration ? duration : DEFAULT_TIME;
  message.destroy();
  return message[type](content, finalDuration, onClose);
}
export default {
  success: (content, duration, onClose)=> {
    return proxyMessage('success', content, duration, onClose);
  },
  error: (content, duration, onClose)=> {
    return proxyMessage('error', content, duration, onClose);
  },
  info: (content, duration, onClose)=> {
    return proxyMessage('info', content, duration, onClose);
  },
  warn: (content, duration, onClose)=> {
    return proxyMessage('warn', content, duration, onClose);
  }
};
