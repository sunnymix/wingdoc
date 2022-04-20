import {forwardRef, useState} from 'react';
import {Input, Menu, Dropdown} from 'antd';
import DocApi from './DocApi';
import OptionButton from '../common/OptionButton';

const {TextArea} = Input;

interface DocTitleProps {
  id: string,
  value: string,
  showBlock: boolean,
  onEnter?: Function,
  onShowBlock?: Function,
};

const DocTitle = forwardRef((props: DocTitleProps, ref) => {

  const {id, value, showBlock, onEnter, onShowBlock} = props;

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
      <Menu.Item key={`${id}--show-block`} onClick={() => onShowBlock?.call(null)}>Block : {showBlock ? "on" : "off"}</Menu.Item>
    </Menu>
  );

  const handleEnter = (e: any) => {
    e.preventDefault();
    setHover(false);
    onEnter?.call(null);
  };
  
  return <>
  <div
    onMouseMove={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      display: "flex",
      alignItems: "center"
    }}>
    <div
      style={{
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: showBlock ? "#ddd" : "transparent",
        visibility: hover ? "visible" : "hidden",
      }}>
      <Dropdown overlay={menu} placement="bottomLeft"><OptionButton/></Dropdown>
    </div>
    <div
      style={{
        flexGrow: 1,
        borderRadius: 0,
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
        size="middle"
        placeholder="Title"
        autoSize={true}
        style={{ 
          fontSize: 28,
          fontWeight: 700,
        }}/>
    </div>
  </div>
  </>
});

export default DocTitle;
