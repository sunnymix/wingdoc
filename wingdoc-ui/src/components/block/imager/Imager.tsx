import { forwardRef, useState } from "react";
import "./ImagerStyle.css";
import { Button } from "antd";

export interface ImagerProps {
  blockId: string,
  initialImg: string | undefined,
};

export default forwardRef((props: ImagerProps, ref) => {

  // --- img:

  const [img, setImg] = useState<string>(props.initialImg || '');

  // --- ui:

  return (
  <>
  <div className='imager'>
    <div className='imager_content'>
      <img className='imager_img' src={img} />
    </div>
    <div><Button type='link' size='small'>Add image</Button></div>
  </div>
  </>
  );
});
