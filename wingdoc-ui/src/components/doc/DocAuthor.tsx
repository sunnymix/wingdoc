import { FC, forwardRef, useState } from 'react';
import { Input, Menu, Dropdown, Button } from 'antd';
import DocApi from './DocApi';
import OptionButton from '../common/OptionButton';

const {TextArea} = Input;

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
    const newAuthor = (e.target.value || "").trim();
    setAuthor(newAuthor);
    DocApi.updateDoc(props.id, { author: newAuthor }, (newDoc: any) => {
    });
  };

  const handleEnter = (e: any) => {
    e.preventDefault();
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
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
        visibility: hover ? "visible" : "hidden",
        marginRight: 1,
      }}>
      <Dropdown overlay={menu} placement="bottomLeft"><OptionButton/></Dropdown>
    </div>
    <div
      style={{
        flexGrow: 1,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: props.showBlock ? "#ddd" : "transparent",
      }}>
      <TextArea
        value={author}
        onChange={changeAuthor}
        onBlur={changeAuthor}
        bordered={false}
        size="middle"
        autoSize={true}
        onPressEnter={handleEnter}
        placeholder="Author"
        style={{
        }}/>
    </div>
  </div>
  </>
});

export default DocAuthor;
