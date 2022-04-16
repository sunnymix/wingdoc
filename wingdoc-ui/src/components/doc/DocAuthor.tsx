
import { FC, forwardRef, useState } from 'react';
import { Input, Menu, Dropdown, Button } from 'antd';
import DocApi from './DocApi';
import { MoreOutlined, DownOutlined, HolderOutlined, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';

interface DocAuthorProps {
  id: string,
  value: string,
  showBlock: boolean,
  onEnter?: Function,
};

const DocAuthor = forwardRef((props: DocAuthorProps, ref) => {

  const [author, setAuthor] = useState<string>(props.value);

  const [hover, setHover] = useState<boolean>(false);

  const changeAuthor = (e: any) => {
    const newAuthor = e.target.value || "";
    setAuthor(newAuthor);
    DocApi.updateDoc(props.id, { author: newAuthor }, (newDoc: any) => {
    });
  };

  const handleEnter = () => {
    setHover(false);
    props.onEnter?.call(null);
  };

  const menu = (
    <Menu>
      <Menu.Item key={`${props.id}-docs`}>docs</Menu.Item>
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
    <div
      style={{
        flexGrow: 1,
        borderRadius: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
      }}>
      <Input
        value={author}
        onChange={changeAuthor}
        onBlur={changeAuthor}
        bordered={false}
        size="middle"
        onPressEnter={handleEnter}
        style={{
        }}/>
    </div>
  </div>
  </>
});

export default DocAuthor;
