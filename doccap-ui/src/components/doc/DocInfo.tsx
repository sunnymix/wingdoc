import { FC, useEffect, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from '../block/BlockList';

const spinIcon = <LoadingOutlined spin />;

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
    <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
    Doc not found.
    </>
  }

  return <>
  <h1>{doc.title}</h1>
  <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}></Spin>
  <Space direction="vertical" size="middle" style={{width: "100%"}}>
    <div>{doc.author}</div>
    <BlockList docId={doc.id}/>
  </Space>
  </>;
};

export default DocInfo;
