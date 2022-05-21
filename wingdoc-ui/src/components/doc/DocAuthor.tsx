import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { Input, Menu, Dropdown, Button } from 'antd';
import DocApi from './DocApi';
import OptionButton from '../common/OptionButton';

const {TextArea} = Input;

export interface DocAuthorProps {
  id: string,
  value: string,
  showBlock: boolean,
  focus?: boolean,
  onEnter?: Function,
  onBlur?: Function,
  onFocusUp?: Function,
  onFocusDown?: Function,
  onFocus?: Function,
  onChange?: Function,
};

export default forwardRef((props: DocAuthorProps, ref) => {

  // --- props

  const {id, value, showBlock, focus, onEnter, onBlur, onFocusUp, onFocusDown, onFocus, onChange} = props;

  // --- focus

  useEffect(() => {
    if (textRef.current) {
      if (focus) {
        textRef.current.focus({
          cursor: "start",
        });
      }
    }
  }, [focus]);

  const handleTextFocused = (e: any) => {
    onFocus?.call(null);
  };

  // --- author

  const [author, setAuthor] = useState<string>(props.value);

  const changeAuthor = (e: any) => {
    const newAuthor = (e.target.value || "").trim();
    setAuthor(newAuthor);
    DocApi.updateDoc(props.id, { author: newAuthor }, (newDoc: any) => {
      onChange?.call(null, newDoc);
    });
  };

  useEffect(() => {
    setAuthor(value);
  }, [value]);

  // --- hover

  const [hover, setHover] = useState<boolean>(false);

  // --- enter

  const handleEnter = (e: any) => {
    e.preventDefault();
    setHover(false);
    props.onEnter?.call(null);
  };

  // --- key up

  const handleKeyUp = (e: any) => {
    if (e.key == "ArrowUp") {
      onFocusUp?.call(null);
    }
  };

  // --- key down

  const handleKeyDown = (e: any) => {
    if (e.key == "ArrowDown") {
      onFocusDown?.call(null);
    }
  };

  // --- blur

  const handleBlur = (e: any) => {
    changeAuthor(e);
    onBlur?.call(null);
  };

  // --- text ref

  const textRef = useRef<any>(null);

  // --- menu

  const menu = (
    <Menu>
      <Menu.Item key={`${props.id}-docs`}>docs</Menu.Item>
    </Menu>
  );

  // --- ui
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      position: "relative",
      display: "none",
      alignItems: "center",
    }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: -1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: showBlock ? "#f2f2f2": "transparent",
      }}></div>
    <div
      style={{
        visibility: hover ? "visible" : "hidden",
        marginTop: 3,
        marginLeft: 3,
      }}>
      <Dropdown overlay={menu} placement="bottomLeft">
        <OptionButton />
      </Dropdown>
    </div>
    <div
      style={{
        flexGrow: 1,
      }}>
      <TextArea
        ref={textRef}
        value={author}
        onChange={changeAuthor}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        bordered={false}
        size="middle"
        autoSize={true}
        onPressEnter={handleEnter}
        placeholder="author"
        onFocus={handleTextFocused}
        style={{fontFamily: '"Helvetica Neue", Helvetica, Arial', color: "#888",}}/>
    </div>
  </div>
  </>
});
