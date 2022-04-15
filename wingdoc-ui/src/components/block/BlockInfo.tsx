import { FC, forwardRef, useState } from 'react';
import { Menu, Dropdown, Button, Space, Input, Spin } from 'antd';
import BlockApi from './BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, HolderOutlined, LoadingOutlined } from '@ant-design/icons';
import MenuIcon from '../icon/MenuIcon';

const { TextArea } = Input;

const spinIcon = <LoadingOutlined spin />;

interface BlockInfoProps {
  block: any,
  showBlock?: boolean,
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

  const menu = (
    <Menu>
      <Menu.Item key={`${props.block.id}-move-up`} onClick={handleMoveUp}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${props.block.id}-move-down`} onClick={handleMoveDown}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );

  const handleEnter = (e: any) => {
    e.preventDefault();
    props.onEnter?.call(null, props.block);
  };

  const handlePress = (e: any) => {
    if (e.key == "Backspace" && e.metaKey) {
      setLoading(true);
      props.onDelete?.call(null, props.block); 
    }
  };
  
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
        placeholder="Input" 
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
