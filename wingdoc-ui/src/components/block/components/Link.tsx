import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button, Input, Space } from "antd";

const { TextArea } = Input;

interface LinkProps {
  value?: string,
  onSave?: Function,
  onCancel?: Function,
};

const Link = forwardRef((props: LinkProps, ref) => {
  
  const { value, onSave, onCancel } = props;

  const [link, setLink] = useState(value);

  const [show, setShow] = useState<boolean>(false);

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

  const open = (show: boolean) => {
    setShow(show);
    setFocusing(show);
  };

  // ### linkRef ###

  useImperativeHandle(ref, () => ({
    open: open,
  }));

  // ### focus ###

  const [focusing, setFocusing] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (focusing && inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      });
    }
  }, [focusing]);

  // ### key press ###
  
  const handlePressEnter = (e: any) => {
    e.preventDefault();
    onSave?.call(null, link);
  };

  const handlePress = (e: any) => {
    if (e.key == "Escape") {
      open(false);
      onCancel?.call(null);
    }
  };

  // ### blur ###

  const handleBlur = () => {
    setShow(false);
    setFocusing(false);
  };

  return <>
  <div
    style={{
      display: show ? "block" : "none",
    }}>
    <TextArea
      ref={inputRef}
      placeholder="link" 
      autoSize 
      size="middle"
      bordered={false}
      value={link}
      onChange={(e: any) => setLink(e.target.value)}
      onPressEnter={handlePressEnter}
      onBlur={handleBlur}
      onKeyDown={handlePress}/>
    <Space direction="horizontal" style={{marginLeft: 10}}>
      <Button size="small" onClick={handleSave}>Save</Button>
      <Button size="small" onClick={handleCancel}>Cancel</Button>
    </Space>
  </div>
  </>
});

export default Link;
