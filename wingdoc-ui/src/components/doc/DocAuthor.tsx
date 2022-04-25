import { FC, forwardRef, useEffect, useState } from 'react';
import { Input, Menu, Dropdown, Button } from 'antd';
import DocApi from './DocApi';
import OptionButton from '../common/OptionButton';

const {TextArea} = Input;

export interface DocAuthorProps {
  id: string,
  value: string,
  showBlock: boolean,
  onEnter?: Function,
};

export default forwardRef((props: DocAuthorProps, ref) => {

  // --- props

  const { id, value, showBlock, onEnter } = props;

  // --- author

  const [author, setAuthor] = useState<string>(props.value);

  const changeAuthor = (e: any) => {
    const newAuthor = (e.target.value || "").trim();
    setAuthor(newAuthor);
    DocApi.updateDoc(props.id, { author: newAuthor }, (newDoc: any) => {
    });
  };

  // --- hover

  const [hover, setHover] = useState<boolean>(false);

  // --- enter

  const handleEnter = (e: any) => {
    e.preventDefault();
    setHover(false);
    props.onEnter?.call(null);
  };

  // --- menu

  const menu = (
    <Menu>
      <Menu.Item key={`${props.id}-docs`}>docs</Menu.Item>
    </Menu>
  );

  // --- effect

  useEffect(() => {
    setAuthor(value);
  }, [value]);

  // --- ui
  
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
        marginRight: 0,
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
