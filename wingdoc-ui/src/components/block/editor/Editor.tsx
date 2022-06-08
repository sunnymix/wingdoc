import { forwardRef, useState } from "react";
import { BlockProps } from "../Block";
import './EditorStyle.css';

export default forwardRef((props: BlockProps, ref) => {

  const [text, setText] = useState<string>(props.data.text || '');

  return (
  <div className='editor'>
    <div className='editor_indicator'></div>
    <div className='editor_side'>
      <button className='editor_sidebar'>
        <span className="editor_sidebar_icon"></span>
      </button>
    </div>
    <div className='editor_body'>
      <div
        className='editor_content'
        contentEditable='plaintext-only'
        suppressContentEditableWarning={true}>{text}</div>
    </div>
  </div>
  );
});
