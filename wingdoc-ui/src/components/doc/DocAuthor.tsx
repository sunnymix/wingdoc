
import { FC, useState } from 'react';
import { Input, Menu, Dropdown, Button } from 'antd';
import DocApi from './DocApi';
import { MoreOutlined, DownOutlined, HolderOutlined, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';

const DocAuthor: FC<{
  id: string,
  value: string,
  showBlock: boolean,
}> = ({
  id,
  value,
  showBlock,
}) => {

  const [author, setAuthor] = useState<string>(value);

  const [hover, setHover] = useState<boolean>(false);

  const changeAuthor = (e: any) => {
    const newAuthor = e.target.value || "";
    setAuthor(newAuthor);
    DocApi.updateDoc(id, { author: newAuthor }, (newDoc: any) => {
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key={`${id}-docs`}>docs</Menu.Item>
    </Menu>
  );
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
      alignItems: "center",
    }}>
    <div
      style={{
        visibility: hover ? "visible" : "hidden",
      }}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined /></Button>
      </Dropdown>
    </div>
    <Input
      value={author}
      onChange={changeAuthor}
      onBlur={changeAuthor}
      bordered={showBlock}
      size="middle"
      style={{
      }}/>
  </div>
  </>
};

export default DocAuthor;
