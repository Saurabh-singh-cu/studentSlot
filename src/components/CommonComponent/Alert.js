import React from 'react';
import { Button, message } from 'antd';
const Alert = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loggedin',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loggedin!',
        duration: 3,
      });
    }, 1000);
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openMessage}>
        Open the message box
      </Button>
    </>
  );
};
export default Alert;