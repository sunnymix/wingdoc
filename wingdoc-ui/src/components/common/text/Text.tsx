import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import './TextStyle.css';
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

export interface TextProps {
  value?: string,
};

export interface TextareaProps {
  clientHeight: number,
  clientLeft: number,
  clientTop: number,
  clientWidth: number,
  rows: number,
  scrollHeight: number,
  scrollLeft: number,
  scrollTop: number,
  scrollWidth: number,
  value: string,
  style: any,
};

export default forwardRef((props: TextProps, ref) => {

  // --- props

  const {value} = props;

  // --- text

  const [text, setText] = useState<string>(value || '');

  // --- textareaRef

  const textareaRef = useRef<any>(null);

  const getTextarea = useCallback(() => {
    return textareaRef.current || null;
  }, []);

  // --- resize

  const handleWindowOnresize = useCallback((e) => {
    fixUi();
  }, []);

  // --- load

  const getTextareaProps = useCallback(() => {
    const textarea = getTextarea();
    const textareaProps: TextareaProps = {
      clientHeight: textarea.clientHeight,
      clientLeft: textarea.clientLeft,
      clientTop: textarea.clientTop,
      clientWidth: textarea.clientWidth,
      rows: textarea.rows,
      scrollHeight: textarea.scrollHeight,
      scrollLeft: textarea.scrollLeft,
      scrollTop: textarea.scrollTop,
      scrollWidth: textarea.scrollWidth,
      value: textarea.value,
      style: textarea.style,
    };
    return textareaProps;
  }, []);

  // --- init

  useEffect(() => {
    window.onresize = handleWindowOnresize;
    if (textareaRef && textareaRef.current) {
      console.log('load', textareaRef);
      fixUi();
    }
  }, [textareaRef]);

  // --- autoHeight

  const fixUi = useCallback(() => {
    const textarea = getTextarea();
    if (!textarea) {
      return;
    }

    textarea.style.width = 'auto';
    const textareaProps2 = getTextareaProps();
    if (textareaProps2.clientWidth != textareaProps2.scrollWidth) {
      textarea.style.width = (+textareaProps2.scrollWidth + 20) + 'px';
    }
    
    textarea.style.height = 'auto';
    const textareaProps1 = getTextareaProps();
    if (textareaProps1.clientHeight != textareaProps1.scrollHeight) {
      textarea.style.height = (textareaProps1.scrollHeight - 20) + 'px';
    }

  }, []);

  // --- onChange

  const handleChange = useCallback((e) => {
    setText(e.target.value);
    fixUi();
  }, []);

  // --- ui

  return (
  <div className='_text'>
    <div className='_text_indicator'></div>
    <div className='_text_content' data-color-mode='light'>
      <CodeEditor
        className='_text_textarea'
        language='plaintext'
        value={text} />
    </div>
  </div>
  );
});
