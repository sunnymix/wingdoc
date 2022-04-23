import { FC, useEffect, useRef, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from '../block/BlockList';
import DocTitle from './DocTitle';
import DocAuthor from './DocAuthor';

const spinIcon = <LoadingOutlined spin />;

const Doc: FC<{
  id: string
}> = ({
  id
}) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [doc, setDoc] = useState<any>(null);

  const [showBlock, setShowBlock] = useState<any>(false);

  // --- search ---

  const searchDoc = () => {
    setLoading(true);
    DocApi.getDoc(id, (doc: any) => {
      setLoading(false);
      setDoc(doc);
    });
  };

  // --- loaded ---

  useEffect(() => {
    searchDoc();
  }, []);

  // --- block list ---

  const blockListRef: any = useRef();

  const handleAdd = () => {
    if (blockListRef && blockListRef.current) {
      blockListRef.current.add();
    }
  };

  if (!doc) {
    return <>
    <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
    </>
  }

  return <>
  <div
    style={{
    }}>
    <Space direction="vertical" size="large" style={{width: "100%"}}>
      <div>
        <DocTitle id={doc.id} value={doc.title} showBlock={showBlock} onEnter={handleAdd} onShowBlock={() => setShowBlock(!showBlock)}/>
        <DocAuthor id={doc.id} value={doc.author} showBlock={showBlock} onEnter={handleAdd}/>
      </div>
      <BlockList docId={doc.id} showBlock={showBlock} ref={blockListRef}/>
    </Space>
  </div>
  </>;
};

export default Doc;
