import { FC, useEffect, useRef, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin, Input, Checkbox, Switch, Menu, Dropdown, Button, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from '../block/BlockList';
import { MoreOutlined, DownOutlined, HolderOutlined, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';
import DocTitle from './DocTitle';
import DocAuthor from './DocAuthor';

const spinIcon = <LoadingOutlined spin />;

const DocInfo: FC<{
  id: string
}> = ({
  id
}) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [doc, setDoc] = useState<any>(null);

  const [showBlock, setShowBlock] = useState<any>(false);

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
  <div style={{ padding: 2 }}>
    <Space direction="vertical" size="large" style={{width: "100%"}}>
      <Space direction="vertical" size="small" style={{width: "100%"}}>
        <DocTitle id={doc.id} value={doc.title} showBlock={showBlock}/>
        <DocAuthor id={doc.id} value={doc.author} showBlock={showBlock}/>
      </Space>
      <BlockList docId={doc.id} showBlock={showBlock} ref={blockListRef}/>
      <Space direction="horizontal" size="small">
        <Button type="link" onClick={handleAdd}>Add Block</Button>
        <Divider type="vertical" />
        <Checkbox checked={showBlock} onChange={(e) => { setShowBlock(e.target.checked) }}>Show Block</Checkbox>
      </Space>
    </Space>
  </div>
  </>;
};

export default DocInfo;
