import { FC, useEffect, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin, Input, Checkbox, Switch, Menu, Dropdown, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from '../block/BlockList';
import { MoreOutlined, DownOutlined, HolderOutlined, EllipsisOutlined, MenuOutlined } from '@ant-design/icons';

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

  const [showBlock, setShowBlock] = useState<any>(false);

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

  const menu = (
    <Menu>
      <Menu.Item>item1</Menu.Item>
      <Menu.Item>item2</Menu.Item>
      <Menu.Item>item3</Menu.Item>
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <div>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined /></Button>
            </Dropdown>
          </div>
          <Input
            value={title}
            onChange={changeTitle}
            onBlur={changeTitle}
            bordered={showBlock}
            size="middle"
            style={{ fontSize: 28, fontWeight: 500 }}/>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}>
          <div>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button type="text" style={{paddingLeft: 3, paddingRight: 3,}}><HolderOutlined /></Button>
            </Dropdown>
          </div>
          <Input
            value={author}
            onChange={changeAuthor}
            onBlur={changeAuthor}
            bordered={showBlock}
            size="middle"/>
        </div>
      </Space>
      <BlockList docId={doc.id} showBlock={showBlock}/>
      <div>
        <Switch size="small" checked={showBlock} onChange={(checked) => { setShowBlock(checked) }}/>
      </div>
    </Space>
  </div>
  </>;
};

export default DocInfo;
