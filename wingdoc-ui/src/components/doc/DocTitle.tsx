import {forwardRef, useEffect, useState} from 'react';
import {Input, Menu, Dropdown} from 'antd';
import DocApi from './DocApi';
import OptionButton from '../common/OptionButton';

const {TextArea} = Input;

interface DocTitleProps {
  id: string,
  value: string,
  showBlock: boolean,
  focus?: boolean,
  onEnter?: Function,
  onShowBlock?: Function,
  onFocus?: Function,
  onFocusDown?: Function,
};

const DocTitle = forwardRef((props: DocTitleProps, ref) => {

  // --- props

  const {id, value, showBlock, onEnter, onShowBlock, onFocus, onFocusDown} = props;

  // --- title

  const [title, setTitle] = useState<string>(value);

  const changeTitle = (e: any) => {
    const newTitle = e.target.value || "";
    setTitle(newTitle);
    DocApi.updateDoc(id, { title: newTitle }, (newDoc: any) => {
    });
  };

  // --- hover

  const [hover, setHover] = useState<boolean>(false);

  // --- menu

  const menu = (
    <Menu>
      <Menu.Item key={`${id}--show-block`} onClick={() => onShowBlock?.call(null)}>Block : {showBlock ? "on" : "off"}</Menu.Item>
    </Menu>
  );

  // --- enter

  const handleEnter = (e: any) => {
    e.preventDefault();
    setHover(false);
    onEnter?.call(null);
  };

  // --- key down

  const handleKeyDown = (e: any) => {
    if (e.key == "ArrowDown") {
      onFocusDown?.call(null);
    }
  };

  // --- effect

  useEffect(() => {
    setTitle(value);
  }, [value]);

  // --- text focus

  const handleTextFocus = (e: any) => {
    onFocus?.call(null);
  };
  
  // --- ui

  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: 0,
    }}>
    <div
      style={{
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: showBlock ? "#ddd" : "transparent",
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
        borderColor: showBlock ? "#ddd" : "transparent",
      }}>
      <TextArea
        value={title}
        onChange={changeTitle}
        onBlur={changeTitle}
        bordered={false}
        onPressEnter={handleEnter}
        onKeyDown={handleKeyDown}
        size="middle"
        placeholder="Title"
        autoSize={true}
        onFocus={handleTextFocus}
        style={{ 
          fontSize: 28,
          fontWeight: 700,
          fontFamily: '"Helvetica Neue", Helvetica, Arial',
        }}/>
    </div>
  </div>
  </>
});

export default DocTitle;
