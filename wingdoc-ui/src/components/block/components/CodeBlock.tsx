import { forwardRef, useState } from "react";
import { BlockProps } from "../Block";
import './CodeBlockStyle.css';

export default forwardRef((props: BlockProps, ref) => {

  const [text, setText] = useState<string>(props.data.text || '');

  return (
  <div className='codeblock'>
    <div className="codeblock_body">
      <div
        className="codeblock_text">{text}</div>
    </div>
  </div>
  );
});
