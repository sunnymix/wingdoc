import { FC, useEffect, useState } from 'react';
import DocApi from './DocApi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const DocInfo: FC<{
  id: string
}> = ({
  id
}) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [doc, setDoc] = useState<any>(null);

  const searchDoc = () => {
    setLoading(true);
    DocApi.getDoc(id, (doc: any) => {
      setLoading(false);
      setDoc(doc);
    });
  };

  useEffect(() => {
    searchDoc();
  }, []);

  if (!doc) {
    return <>
    <Spin spinning={loading} indicator={spinIcon}/>
    Doc not found.
    </>
  }

  return <>
    <Spin spinning={loading} indicator={spinIcon}/>
    <h1>{doc.title}</h1>
    <div>{doc.author}</div>
  </>;
};

export default DocInfo;
