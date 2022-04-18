import { FC, useEffect, useRef, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin, Input, Checkbox, Switch, Menu, Dropdown, Button, Divider } from 'antd';
import { LoadingOutlined, HolderOutlined, CaretUpOutlined } from '@ant-design/icons';
import BlockList from '../block/BlockList';
import { ExperimentOutlined, MinusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import DocTitle from './DocTitle';
import DocAuthor from './DocAuthor';
import ToolIcon from '../icon/ToolIcon';
import MenuIcon from '../icon/MenuIcon';
import MoreIcon from '../icon/MoreIcon';

const spinIcon = <LoadingOutlined spin />;

const DocInfo: FC<{
  id: string
}> = ({
  id
}) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [doc, setDoc] = useState<any>(null);

  const [showBlock, setShowBlock] = useState<any>(false);

  const [showControl, setShowControl] = useState<any>(false);

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
  <div>
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

export default DocInfo;
