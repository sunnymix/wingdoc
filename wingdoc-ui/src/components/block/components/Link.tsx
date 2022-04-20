import { forwardRef, useEffect, useState } from "react";
import { Button, Input, Space } from "antd";

const { TextArea } = Input;

interface LinkProps {
  open?: boolean,
  value?: string,
  onSave?: Function,
  onCancel?: Function,
};

const Link = forwardRef((props: LinkProps, ref) => {
  
  const { open, value, onSave, onCancel } = props;

  const [link, setLink] = useState(value);

  const handleSave = () => {
    onSave?.call(null, link);
  };

  const handleCancel = () => {
    onCancel?.call(null);
    setLink(value);
  };

  useEffect(() => {
    setLink(value);
  }, [value]);

  return <>
  <div
    style={{
      display: open ? "block" : "none",
    }}>
    <TextArea 
      placeholder="link" 
      autoSize 
      size="middle"
      bordered={false}
      value={link}
      onChange={(e: any) => setLink(e.target.value)}/>
    <Space direction="horizontal" style={{marginLeft: 10}}>
      <Button size="small" onClick={handleSave}>Save</Button>
      <Button size="small" onClick={handleCancel}>Cancel</Button>
    </Space>
  </div>
  </>
});

export default Link;
