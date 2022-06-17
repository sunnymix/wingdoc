import { forwardRef, useState } from "react";
import "./ImagerStyle.css";
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

export interface ImagerProps {
  blockId: string,
  initialImg: string | undefined,
};

export default forwardRef((props: ImagerProps, ref) => {

  // --- img:

  const [img, setImg] = useState<string>(props.initialImg || '');

  // --- upload:

  const uploadProps: UploadProps = {
    action: `http://localhost:8020/block/${props.blockId}/img`,
    name: 'img',
    maxCount: 1,
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        setImg(info.file.response.data);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // --- ui:

  return (
  <>
  <div className='imager'>
    <div className='imager_content'>
      <img className='imager_img' src={img} />
    </div>
    <Upload {...uploadProps}>
      <Button type='link' size='small'>Set image</Button>
    </Upload>
    <div>
    </div>
  </div>
  </>
  );
});
