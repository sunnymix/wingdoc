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

  const menu = (
    <Menu>
      <Menu.Item key={`${id}-block`}>
        <Button size="small" type="link" onClick={() => setShowBlock(!showBlock)}>{showBlock ? <>Block : On</> : <>Block : Off</>}</Button>
      </Menu.Item>
    </Menu>
  );

  if (!doc) {
    return <>
    <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
    </>
  }

  return <>
  <div style={{ padding: 2 }}>
    <Space direction="vertical" size="large" style={{width: "100%"}}>
      <Space direction="vertical" size="small" style={{width: "100%"}}>
        <DocTitle id={doc.id} value={doc.title} showBlock={showBlock} onEnter={handleAdd}/>
        <DocAuthor id={doc.id} value={doc.author} showBlock={showBlock}/>
      </Space>
      <BlockList docId={doc.id} showBlock={showBlock} ref={blockListRef}/>
      <div style={{paddingLeft:24}}>
        <Dropdown overlay={menu} placement="bottomLeft">
          <Button type="text"><MenuIcon /></Button>
        </Dropdown>
      </div>
    </Space>
  </div>
  </>;
};

export default DocInfo;
