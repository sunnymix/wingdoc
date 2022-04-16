import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Button, Space, Input, Spin } from 'antd';
import BlockApi from './BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, HolderOutlined, LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import MenuIcon from '../icon/MenuIcon';

const { TextArea } = Input;

const spinIcon = <LoadingOutlined spin />;

interface BlockInfoProps {
  block: any,
  showBlock?: boolean,
  focus?: boolean,
  onEnter?: Function,
  onDelete?: Function,
  onMoveUp?: Function,
  onMoveDown?: Function,
}

const BlockInfo = forwardRef((props: BlockInfoProps, ref) => {

  const [loading, setLoading] = useState<boolean>(false);

  const [text, setText] = useState(props.block.text);

  const [hover, setHover] = useState<boolean>(false);

  const saveBlockChange = (text: string) => {
    BlockApi.updateBlock(props.block.id, { text }, (newBlock: any) => {
    });
  };

  const handleChange = (e: any) => {
    const newText = e.target.value || "";
    saveBlockChange(newText);
    setText(newText);
  };

  const handleMoveUp = () => {
    props.onMoveUp?.call(null, props.block);
  };

  const handleMoveDown = () => {
    props.onMoveDown?.call(null, props.block);
  };

  const handleEnter = (e: any) => {
    e.preventDefault();
    props.onEnter?.call(null, props.block);
  };

  const handlePress = (e: any) => {
    setHover(false);
    if (e.key == "Backspace" && e.metaKey) {
      setLoading(true);
      props.onDelete?.call(null, props.block); 
    }
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
      <Menu.Item key={`${props.block.id}-edit`}><LinkOutlined /></Menu.Item>
      <Menu.Item key={`${props.block.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${props.block.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
    }}>
    <div
      style={{
        position: "relative",
        visibility: hover ? "visible" : "hidden",
      }}>
      <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined/></Button>
      </Dropdown>
    </div>
    <div
      style={{
        borderRadius: 1,
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
        onKeyDown={handlePress}
        />
    </div>
  </div>
  </>
});

export default BlockInfo;
