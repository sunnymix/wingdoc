import { forwardRef, useState } from "react";
import "./ImagerStyle.css";

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
  <div>
    <div><img src={img} /></div>
    <div>Add image</div>
  </div>
  </>
  );
});
