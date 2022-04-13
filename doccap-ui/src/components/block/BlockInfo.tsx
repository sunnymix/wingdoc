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
      <Menu.Item>item1</Menu.Item>
      <Menu.Item>item2</Menu.Item>
      <Menu.Item>item3</Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    style={{
      display: "flex"
    }}>
    <div>
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
