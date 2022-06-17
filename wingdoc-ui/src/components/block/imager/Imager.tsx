import { forwardRef, useImperativeHandle, useState } from "react";
import "./ImagerStyle.css";
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import axios from "axios";

export interface ImagerProps {
  blockId: string,
  initialImg: string | undefined,
};

export default forwardRef((props: ImagerProps, ref) => {

  // --- imperative:

  useImperativeHandle(ref, () => ({
    pasteImg: (e: any, file: any) => {
      pasteImg(e, file);
    },
  }));

  // --- img:

  const [img, setImg] = useState<string>(props.initialImg || '');

  // --- upload:

  const toBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = err => reject(err);
    });
  };

  const createFileObj = async (file: any) => {
    const key = (Math.random() + 1).toString(36).substring(2) + (Math.random() + 1).toString(36).substring(2);
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
      uid: key,
      originFileObj: file,
      percent: 100,
      key,
      response: { hash: key, key: key },
      status: 'done',
      thumbUrl: await toBase64(file),
    }
  };

  // --- paste:

  const pasteImg = (e: any, file: any) => {
    createFileObj(file).then(fileObj => {
      
      const form = new FormData();
      form.append('img', file);

      axios.post(`http://localhost:8020/block/${props.blockId}/img`, form)
        .then(res => {
          if (res.data.success === true) {
            setImg(res.data.data);
            message.success(`${fileObj.name} file uploaded successfully`);
          }
          
          console.log(res);
        });

    });
  };

  // --- props:

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
