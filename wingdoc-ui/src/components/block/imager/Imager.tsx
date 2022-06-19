import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./ImagerStyle.css";
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import axios from "axios";

export interface ImagerProps {
  blockId: string,
  initialImg: string | undefined,
  pasteData?: ImagerPasteData | null,
};

export interface ImagerPasteData {
  file: any,
  ts: number,
};
export namespace ImagerPasteData {
  export function of(file: any): ImagerPasteData {
    return { file, ts: +(new Date()) }
  }
};

export default forwardRef((props: ImagerProps, ref) => {

  // --- log:

  const log = (msg: string, ...args: any[]) => {
    console.log(`imager: ${msg}`, ...args);
  };

  // --- imperative:

  useImperativeHandle(ref, () => ({
    pasteImg: (file: any) => {
      pasteImg(file);
    },
  }));

  // --- img:

  const [img, setImg] = useState<string>(props.initialImg || '');

  const getImgEmpty = (): boolean => img.length == 0;

  const [imgEmpty, setImgEmpty] = useState<boolean>(getImgEmpty());

  useEffect(() => setImgEmpty(getImgEmpty()), [img]);

  // --- paste data:

  useEffect(() => {
    if (props.pasteData && props.pasteData.file) {
      // log('pasteData, file:', props.pasteData.file);
      pasteImg(props.pasteData.file);
    }
  }, [props.pasteData]);

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

  const pasteImg = (file: any) => {
    createFileObj(file).then(fileObj => {
      
      const form = new FormData();
      form.append('img', file);

      axios.post(`http://localhost:8020/block/${props.blockId}/img`, form)
        .then(res => {
          if (res.data.success === true) {
            setImg(res.data.data);
            message.success(`${fileObj.name} file uploaded successfully`);
          }
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
  <div className={`imager ${imgEmpty && 'empty'}`}>
    <div className='imager_content'>
      <span className='imager_content_placeholder'>Add image</span>
      <img className='imager_img' src={img} />
    </div>
    <Upload className='imager_uploader' {...uploadProps}>
      <Button type='default' size='small'>{`${imgEmpty ? 'Add' : 'Update'}`} image</Button>
    </Upload>
  </div>
  </>
  );
});
