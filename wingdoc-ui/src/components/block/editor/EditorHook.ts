import { useCallback, useMemo, useRef, useState } from "react"

export interface EditorProps {
  initialText: string,
  onEnter?: Function,
  onLink?: Function,
};

export default (props: EditorProps) => {

  // --- text:
  
  const [text, setText] = useState<string>(props.initialText);

  // --- focus:

  const [focused, setFocused] = useState<boolean>(false);

  // --- ref:

  const editorRef = useRef<any>(null);

  // --- input:

  const handleInput = useCallback((e) => {
    let text = '';

    e.target.childNodes.forEach((node: any, i: number) => {
      text += (node.innerText || node.nodeValue || '').replace(/\n/g, '');
      if (i != e.target.childNodes.length - 1) {
        text += '\n';
      }
    });

    if (text === '') {
      editorRef.current.innerHTML = '';
    } else {
      setText(text);
    }

  }, []);

  // --- paste:

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text'));
  }, []);

  // --- key:

  const handleKeyDown = useCallback((e) => {
    const key = e.key.toLocaleLowerCase();
    const isCmd = e.metaKey;
    const isShift = e.shiftKey;

    if (key == 'enter') {
      if (isCmd) {
        e.preventDefault();
        props.onEnter?.call(null, 'end');
      } else if (isShift) {
        e.preventDefault();
        props.onEnter?.call(null, 'start');
      }
    } else if (key == 'k') {
      if (isCmd) {
        props.onLink?.call(null);
      }
    }
  }, []);

  // --- clear:

  const clearEditor = useCallback(() => {
    setText('');
    editorRef.current.innerHTML = '';
  }, []);

  // --- focus:

  const handleFocus = useCallback((e) => setFocused(true), []);
  const handleBlur = useCallback((e) => setFocused(false), []);

  const focusEditor = useCallback(() => {
    var range = document.createRange();
    range.setStart(editorRef.current, 0);
    range.setEnd(editorRef.current, 0);
    
    var selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

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
    // onKeyDown: handleKeyDown,
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
