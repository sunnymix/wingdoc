import {forwardRef, useEffect, useRef, useState} from 'react';
import {Input, Menu, Dropdown} from 'antd';
import DocApi from '../api/DocApi';
import "@/components/common/CommonStyle.css";
import './DocTitleStyle.css';
import { Focusing } from '@/components/common/status/Status';

const {TextArea} = Input;

interface DocTitleProps {
  id: string,
  value: string,
  focusing: Focusing,
  onEnter?: Function,
  onFocus?: Function,
  onFocusDown?: Function,
  onChange?: Function,
};

export default forwardRef((props: DocTitleProps, ref) => {

  // --- text ref:

  const textRef = useRef<any>(null);

  const focusText = () => {
    textRef.current.focus({ cursor: "start" });
  };

  // --- title

  const [title, setTitle] = useState<string>(props.value);

  useEffect(() => {
    setTitle(props.value);
  }, [props.value]);

  const changeTitle = (e: any) => {
    const newTitle = e.target.value || "";
    if (newTitle != title) {
      setTitle(newTitle);
      DocApi.updateDoc(props.id, { title: newTitle }, (newDoc: any) => {
        props.onChange?.call(null, newDoc);
      });
    }
  };

  // --- hover:

  const [hovered, setHovered] = useState<boolean>(false);

  // --- enter:

  const handleEnter = (e: any) => {
    e.preventDefault();
    setHovered(false);
    props.onEnter?.call(null);
  };

  // --- key down

  const handleKeyDown = (e: any) => {
    if (e.key == "ArrowDown") {
      props.onFocusDown?.call(null);
    }
  };

  // --- focus:

  const [focused, setFocused] = useState<boolean>(props.focusing.val === true);

  useEffect(() => {
    if (props.focusing.val === true) {
      if (!focused) {
        focusText();
      }
    }
  }, [props.focusing]);

  // --- text focus

  const handleTextFocus = (e: any) => {
    setFocused(true);
    props.onFocus?.call(null);
  };

  // --- text blur:

  const handleTextBlur = (e: any) => {
    setFocused(false);
    changeTitle(e);
  };
  
  // --- ui

  return <>
  <div className={`doc_title ${hovered && 'hovered'} ${focused && 'focused'}`} onMouseMove={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div className='doc_title_content'>
      <TextArea
        className='doc_title_textarea'
        maxLength={100}
        ref={textRef}
        value={title}
        onChange={changeTitle}
        onBlur={handleTextBlur}
        bordered={false}
        onPressEnter={handleEnter}
        onKeyDown={handleKeyDown}
        size='small'
        placeholder='title'
        autoSize={true}
        onFocus={handleTextFocus} />
    </div>
  </div>
  </>
});
