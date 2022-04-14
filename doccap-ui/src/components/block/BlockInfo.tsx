import { FC, forwardRef, useState } from 'react';
import { Menu, Dropdown, Button, Space, Input } from 'antd';
import BlockApi from './BlockApi';
import { ArrowUpOutlined, ArrowDownOutlined, HolderOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface BlockInfoProps {
  block: any,
  showBlock?: boolean,
  onEnter?: Function,
}

const BlockInfo = forwardRef((props: BlockInfoProps, ref) => {

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

  const menu = (
    <Menu>
      <Menu.Item key={`${props.block.id}-moveup`}><ArrowUpOutlined/></Menu.Item>
      <Menu.Item key={`${props.block.id}-movedown`}><ArrowDownOutlined/></Menu.Item>
    </Menu>
  );

  const handleEnter = (e: any) => {
    if (e.metaKey) {
      props.onEnter?.call(null, props.block);
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
        visibility: hover ? "visible" : "hidden",
      }}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined/></Button>
      </Dropdown>
    </div>
    <TextArea 
      placeholder="Input" 
      autoSize 
      value={text}
      size="middle"
      bordered={props.showBlock}
      onChange={handleChange}
      onBlur={handleChange}
      onPressEnter={handleEnter}
      />
  </div>
  </>
});

export default BlockInfo;
