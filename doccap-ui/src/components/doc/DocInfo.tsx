import { FC, useEffect, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin, Input } from 'antd';
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

  const [title, setTitle] = useState<string>("");

  const [author, setAuthor] = useState<string>("");

  const searchDoc = () => {
    setLoading(true);
    DocApi.getDoc(id, (doc: any) => {
      setLoading(false);
      setDoc(doc);
      setTitle(doc.title);
      setAuthor(doc.author);
    });
  };

  useEffect(() => {
    searchDoc();
  }, []);

  const changeTitle = (e: any) => {
    const newTitle = e.target.value || "";
    setTitle(newTitle);
    DocApi.updateDoc(id, { title: newTitle }, (newDoc: any) => {
      console.log(newDoc);
    });
  };

  const changeAuthor = (e: any) => {
    const newAuthor = e.target.value || "";
    setAuthor(newAuthor);
    DocApi.updateDoc(id, { author: newAuthor }, (newDoc: any) => {
    });
  };

  if (!doc) {
    return <>
    <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
    </>
  }

  return <>
  <div style={{ padding: 2 }}>
    <Input value={title} onChange={changeTitle} bordered={false} style={{ fontSize: 28, fontWeight: 500 }}/>
    <Space direction="vertical" size="middle" style={{width: "100%"}}>
      <Input value={author} onChange={changeAuthor} bordered={false}/>
      <BlockList docId={doc.id}/>
    </Space>
  </div>
  </>;
};

export default DocInfo;
