import { FC, useState } from 'react';
import { Menu, Dropdown, Button, Space, Input } from 'antd';
import BlockApi from './BlockApi';
import { MoreOutlined, DownOutlined, HolderOutlined, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';


const { TextArea } = Input;

const BlockInfo: FC<{
  block: any,
  showBlock?: boolean
}> = ({
  block,
  showBlock
}) => {

  const [text, setText] = useState(block.text);

  const [hover, setHover] = useState<boolean>(false);

  const saveBlockChange = (text: string) => {
    BlockApi.updateBlock(block.id, { text }, (newBlock: any) => {
    });
  };

  const handleChange = (e: any) => {
    const newText = e.target.value || "";
    saveBlockChange(newText);
    setText(newText);
  };

  const menu = (
    <Menu>
      <Menu.Item key={`${block.id}-moveup`}>up</Menu.Item>
      <Menu.Item key={`${block.id}-movedown`}>down</Menu.Item>
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
        visibility: hover ? "visible" : "hidden",
      }}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined /></Button>
      </Dropdown>
    </div>
    <TextArea 
      placeholder="Input" 
      autoSize 
      value={text}
      size="middle"
      bordered={showBlock}
      onChange={handleChange}
      onBlur={handleChange}
      />
  </div>
  </>
};

export default BlockInfo;
