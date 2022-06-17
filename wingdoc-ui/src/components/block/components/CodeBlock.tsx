import { forwardRef, useState } from "react";
import { BlockProps } from "../block/Block";
import './CodeBlockStyle.css';
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

export default forwardRef((props: BlockProps, ref) => {

  const [text, setText] = useState<string>(props.data.text || '');

  return (
  <div className='codeblock'>
    <div className="codeblock_body" data-color-mode='light'>
      <CodeEditor
        className='codeblock_textarea'
        language='plaintext'
        value={text} />
    </div>
  </div>
  );
});
