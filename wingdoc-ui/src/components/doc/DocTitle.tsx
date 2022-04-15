import { FC, useState } from 'react';
import { Input, Menu, Dropdown, Button } from 'antd';
import DocApi from './DocApi';
import { DownOutlined, HolderOutlined, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';

const DocTitle: FC<{
  id: string,
  value: string,
  showBlock: boolean,
  onEnter?: Function,
}> = ({
  id,
  value,
  showBlock,
  onEnter,
}) => {

  const [title, setTitle] = useState<string>(value);

  const [hover, setHover] = useState<boolean>(false);

  const changeTitle = (e: any) => {
    const newTitle = e.target.value || "";
    setTitle(newTitle);
    DocApi.updateDoc(id, { title: newTitle }, (newDoc: any) => {
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key={`${id}-tags`}>tags</Menu.Item>
    </Menu>
  );

  const handleEnter = () => {
    if (onEnter) {
      onEnter();
    }
  };
  
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
        borderColor: showBlock ? "#ddd" : "transparent",
      }}>
      <Input
        value={title}
        onChange={changeTitle}
        onBlur={changeTitle}
        bordered={false}
        onPressEnter={handleEnter}
        size="middle"
        style={{ fontSize: 28, fontWeight: 500 }}/>
    </div>
  </div>
  </>
};

export default DocTitle;
