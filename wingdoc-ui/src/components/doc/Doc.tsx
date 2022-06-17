import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import DocApi from './DocApi';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from '../block/blocklist/BlockList';
import DocTitle from './DocTitle';
import DocAuthor from './DocAuthor';
import MarkApi from '../mark/MarkApi';
import { useModel, useLocation } from 'umi';

const spinIcon = <LoadingOutlined spin />;

interface DocProps {
  id: string,
}

export default forwardRef((props: DocProps, ref) => {

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
    focusBlockPos(0);
  };

  const handleTitleChange = (newDoc: any) => {
    refreshMarks(location?.pathname);
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

  // --- load

  const location: any = useLocation();

  const { refreshMarks } = useModel("marks", (model: any) => ({
    refreshMarks: model.refreshMarks,
  }));

  const loadDoc = () => {
    setLoading(true);
    DocApi.getDoc(id, (doc: any) => {
      setLoading(false);
      setDoc(doc);
      MarkApi.addMark(doc.id, () => {
        refreshMarks(location?.pathname);
      });
    });
  };

  useEffect(() => {
    loadDoc();
  }, [id]);

  // --- block list

  const blockListRef: any = useRef();

  const handleAdd = () => {
    setFocusTitle(false);
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

  // --- blocklist empty focus

  const handleBlockListEmptyFocus = () => {
    setFocusTitle(true);
  };

  // --- blocklist focus change

  const handleBlockListFocusChange = (focusPos: number) => {
    // console.log('Doc: BlockList: onFocusChange: focusPos: ', focusPos);
    if (focusPos >= 0) {
      setFocusTitle(false); 
    } else {
      setFocusTitle(true);
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
    <div>
      <div>
        <DocTitle id={doc.id}
          value={doc.title}
          showBlock={showBlock}
          focus={focusTitle}
          onFocus={handleTitleFocus}
          onEnter={handleAdd}
          onFocusDown={handleTitleFocusDown}
          onShowBlock={() => setShowBlock(!showBlock)}
          onChange={handleTitleChange}/>
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
        onEmptyFocus={handleBlockListEmptyFocus}
        onFocusChange={handleBlockListFocusChange}
        ref={blockListRef} />
    </div>
  </div>
  </>;
});
