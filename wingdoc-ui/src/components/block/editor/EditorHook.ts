import { useCallback, useMemo, useRef, useState } from "react"
import BlockApi from "../api/BlockApi";

export interface EditorProps {
  data: any,
  initialText: string,
  onFocus?: Function,
  onBlur?: Function,
  onPasteImg?: Function,
  onTextChange?: Function,
};

export default (props: EditorProps) => {

  // --- text:

  const saveText = (text: string) => {
    BlockApi.updateBlock(props.data.id, { text });
    return true;
  };
  
  const [text, setText] = useState<string>(props.initialText);
  const updateText = (text: string) => {
    saveText(text);
    setText(text);
    props.onTextChange?.call(null, { id: props.data.id, text: text });
  };

  // --- focus:

  const [focused, setFocused] = useState<boolean>(false);

  // --- ref:

  const editorRef = useRef<any>(null);

  // --- input:

  const handleInput = useCallback((e) => {
    let text = '';

    e.target.childNodes.forEach((node: any, i: number) => {
      text += (node.innerText || node.nodeValue || '')
        .replace(/\n/g, '')
        .replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g, ' ');
      if (i != e.target.childNodes.length - 1) {
        text += '\n';
      }
    });

    if (text === '') {
      editorRef.current.innerHTML = '';
      updateText(text);
    } else {
      updateText(text);
    }

  }, []);

  // --- paste:

  const handlePasteImg = (e: any) => {
    const files = e.clipboardData.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && file.type.indexOf('image/') >= 0) {
        props.onPasteImg?.call(null, e, file);
        e.preventDefault();
        return true;
      }
    }
    return false;
  };

  const handlePasteText = (e: any) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData('text');
    document.execCommand('insertText', false, pasteText);
    // 备注：paste事件会触发input事件，所以无需额外处理paste的文本变化。
    return true;
  };

  const handlePaste = (e: any) => {
    handlePasteImg(e) || handlePasteText(e);
  };

  // --- clear:

  const clearEditor = useCallback(() => {
    setText('');
    editorRef.current.innerHTML = '';
  }, []);

  // --- focus:

  const handleFocus = (e: any) => {
    setFocused(true);
    props.onFocus?.call(null, e);
  };

  // --- blur:

  const handleBlur = (e: any) => {
    setFocused(false);
    props.onBlur?.call(null, e);
  };

  const focusEditor = (row?: string) => {
    if (!focused) {
      setFocused(true);

      // first / last
      row = row || 'first';

      var focusElement = editorRef.current;
      var childSize = (editorRef.current.childNodes && editorRef.current.childNodes.length) || 0;

      if (childSize > 0) {
        focusElement = editorRef.current.childNodes[0];
        if (row == 'last') {
          focusElement = editorRef.current.childNodes[childSize - 1];
        }
      }

      var range = document.createRange();
      range.setStart(focusElement, 0);
      range.setEnd(focusElement, 0);
      
      var selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range); 
    }
  };

  // --- text2HTML:

  const text2HTML = useCallback((text: string): string => {
    return text
      .split('\n')
      .map((line: string) => {
        const HTML = line
          .replace(/&/gi, '&amp;')
          .replace(/</gi, '&lt;')
          .replace(' ', '&nbsp;');
        return `<div>${HTML || '<br />'}</div>`;
      }).join('');
  }, []);

  // --- props:

  const editorProps = useMemo(() => ({
    contentEditable: true,
    onInput: handleInput,
    onPaste: handlePaste,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: editorRef,
    dangerouslySetInnerHTML: {
      __html: text2HTML(props.initialText)
    }
  }), [props.initialText, handleInput, handlePaste]);

  // --- export:

  return {
    editorProps,
    editorText: text,
    editorFocused: focused,
    editorRef,
    focusEditor,
    clearEditor,
  }
};
