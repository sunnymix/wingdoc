import { useCallback, useMemo, useRef, useState } from "react"

export interface EditorProps {
  initialText: string,
  onEnter?: Function,
};

export const useEditor = (props: EditorProps) => {
  
  const [text, setText] = useState<string>(props.initialText);

  const [focused, setFocused] = useState<boolean>(false);

  const editorRef = useRef<any>(null);

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

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text'));
  }, []);

  const handleFocus = useCallback((e) => setFocused(true), []);
  const handleBlur = useCallback((e) => setFocused(false), []);

  const handleKeyDown = useCallback((e) => {
    if (e.key == 'Enter') {
      if (e.metaKey) {
        e.preventDefault();
        props.onEnter?.call(null, 'end');
      } else if (e.shiftKey) {
        e.preventDefault();
        props.onEnter?.call(null, 'start');
      }
    }
  }, []);

  const clearEditor = useCallback(() => {
    setText('');
    editorRef.current.innerHTML = '';
  }, []);

  const focusEditor = useCallback(() => {
    var range = document.createRange();
    range.setStart(editorRef.current, 0);
    range.setEnd(editorRef.current, 0);
    
    var selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

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

  const editorProps = useMemo(() => ({
    contentEditable: true,
    onInput: handleInput,
    onPaste: handlePaste,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    ref: editorRef,
    dangerouslySetInnerHTML: {
      __html: text2HTML(props.initialText)
    }
  }), [props.initialText, handleInput, handlePaste]);

  return {
    editorProps,
    editorText: text,
    editorFocused: focused,
    editorRef,
    focusEditor,
    clearEditor,
  }
};
