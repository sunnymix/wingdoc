import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from '../block/BlockList';
import DocTitle from './DocTitle';
import DocAuthor from './DocAuthor';

const spinIcon = <LoadingOutlined spin />;

interface DocProps {
  id: string,
}

const Doc = forwardRef((props: DocProps, ref) => {

  // --- bind

  useImperativeHandle(ref, () => ({
  }));

  // --- props

  const { id } = props;

  const [loading, setLoading] = useState<boolean>(true);

  const [doc, setDoc] = useState<any>(null);

  const [showBlock, setShowBlock] = useState<any>(false);

  // --- title

  const [focusTitle, setFocusTitle] = useState<boolean>(false);

  const handleTitleFocus = () => {
    focusBlockPos(-1);
  };

  const handleTitleFocusDown = () => {
    setFocusAuthor(true);
  };

  // --- author

  const [focusAuthor, setFocusAuthor] = useState<boolean>(false);

  const handleAuthorFocus = () => {
    focusBlockPos(-1);
  };

  const handleAuthorFocusUp = () => {
    setFocusTitle(true);
    setFocusAuthor(false);
  };

  const handleAuthorFocusDown = () => {
    setFocusAuthor(false);
    focusBlockPos(0);
  };

  // --- search

  const searchDoc = () => {
    setLoading(true);
    DocApi.getDoc(id, (doc: any) => {
      setLoading(false);
      setDoc(doc);
    });
  };

  // --- loaded

  useEffect(() => {
    searchDoc();
  }, [id]);

  // --- block list

  const blockListRef: any = useRef();

  const handleAdd = () => {
    if (blockListRef && blockListRef.current) {
      blockListRef.current.add();
    }
  };

  // --- block focus

  const focusBlockPos = (pos: number) => {
    if (blockListRef.current) {
      blockListRef.current.focusPos(pos);
    }
  };

  // --- ui empty

  if (!doc) {
    return <>
    <Spin spinning={loading} indicator={spinIcon} style={{position: "absolute"}}/>
    </>
  }

  // --- ui

  return <>
  <div
    style={{
    }}>
    <Space direction="vertical" size="large" style={{width: "100%"}}>
      <div>
        <DocTitle
          id={doc.id}
          value={doc.title}
          showBlock={showBlock}
          focus={focusTitle}
          onFocus={handleTitleFocus}
          onEnter={handleAdd}
          onFocusDown={handleTitleFocusDown}
          onShowBlock={() => setShowBlock(!showBlock)}/>
        <DocAuthor
          id={doc.id}
          value={doc.author}
          showBlock={showBlock}
          focus={focusAuthor}
          onEnter={handleAdd}
          onFocus={handleAuthorFocus}
          onFocusUp={handleAuthorFocusUp}
          onFocusDown={handleAuthorFocusDown}
          onBlur={() => setFocusAuthor(false)}/>
      </div>
      <BlockList
        docId={doc.id}
        showBlock={showBlock}
        ref={blockListRef}/>
    </Space>
  </div>
  </>;
});

export default Doc;
