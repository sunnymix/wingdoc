import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Input, Spin } from 'antd';
import BlockApi from './../BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import { BlockProps } from '@/components/block/BlockInterfaces';
import OptionButton from '@/components/common/OptionButton';

const { TextArea } = Input;

const spinIcon = <LoadingOutlined spin />;

const TextBlock = forwardRef((props: BlockProps, ref) => {

  const [loading, setLoading] = useState<boolean>(false);

  const [text, setText] = useState(props.data.text);

  const [hover, setHover] = useState<boolean>(false);

  const [showLink, setShowLink] = useState<boolean>(false);

  const saveBlockChange = (text: string) => {
    BlockApi.updateBlock(props.data.id, { text }, (newBlock: any) => {
    });
  };

  const handleChange = (e: any) => {
    const newText = e.target.value || "";
    saveBlockChange(newText);
    setText(newText);
  };

  const handleMoveUp = () => {
    props.onMoveUp?.call(null, props.data);
  };

  const handleMoveDown = () => {
    props.onMoveDown?.call(null, props.data);
  };

  const handleEnter = (e: any) => {
    e.preventDefault();
    props.onEnter?.call(null, props.data);
  };

  const isFocusUp = (e: any) => {
    if (e.key == "ArrowUp" && e.target.selectionStart == 0) {
      props.onFocusUp?.call(null, props.data);
    }
  };

  const isFocusDown = (e: any) => {
    if (e.key == "ArrowDown" && e.target.selectionStart == e.target.value.length) {
      props.onFocusDown?.call(null, props.data);
    }
  };

  const isDelete = (e: any) => {
    if (e.key == "Backspace") {
      if (e.metaKey || e.target.value.length == 0) {
        props.onDelete?.call(null, props.data)  
      }
    }
  };

  const handlePress = (e: any) => {
    setHover(false);
    isFocusUp(e);
    isFocusDown(e);
    isDelete(e);
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (props.focus && inputRef.current) {
      inputRef.current.focus({
        cursor: "start",
      });
    }
  }, [props.focus]);

  const menu = (
    <Menu>
      <Menu.Item key={`${props.data.id}-edit`} onClick={() => setShowLink(!showLink)}><LinkOutlined /></Menu.Item>
      <Menu.Item key={`${props.data.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${props.data.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
      alignItems: "flex-start"
    }}>
    <div
      style={{
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        position: "relative",
        visibility: hover ? "visible" : "hidden",
        marginTop: 3,
      }}>
      <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
      <Dropdown overlay={menu} placement="bottomLeft"><OptionButton/></Dropdown>
    </div>
    <div
      style={{
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        flexGrow: 1,
      }}>
      <TextArea 
        ref={inputRef}
        placeholder="" 
        autoSize 
        value={text}
        size="middle"
        bordered={false}
        onChange={handleChange}
        onBlur={handleChange}
        onPressEnter={handleEnter}
        onKeyDown={handlePress}/>
      <TextArea 
        placeholder="link" 
        autoSize 
        size="middle"
        bordered={false}
        style={{
          display: showLink ? "block" : "none",
        }}/>
    </div>
  </div>
  </>
});

export default TextBlock;
