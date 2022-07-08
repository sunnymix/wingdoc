import { FC, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import DocApi from '../api/DocApi';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockList from "@/components/block/blocklist/BlockList";
import DocTitle from '../title/DocTitle';
import DocAuthor from '../DocAuthor';
import MarkApi from "@/components/mark/MarkApi";
import { useModel, useLocation } from 'umi';
import { BlockPosState } from "@/components/block/block/Block";
import { Focusing } from '@/components/common/status/Status';
import "./DocStyle.css";

const spinIcon = <LoadingOutlined spin />;

interface DocProps {
  id: string,
}

export default forwardRef((props: DocProps, ref) => {

  // --- props

  const { id } = props;

  const [loading, setLoading] = useState<boolean>(true);

  const [doc, setDoc] = useState<any>(null);

  // --- title

  const [titleFocusing, setTitleFocusing] = useState<Focusing>(Focusing.of(false));

  const updateTitleFocusing = (val: boolean) => {
    setTitleFocusing(Focusing.of(val));
  };

  const handleTitleFocus = () => {
    focusBlockPos(-1);
  };

  const handleTitleFocusDown = () => {
    focusBlockPos(0);
  };

  const { refreshMarks } = useModel("marks", (model: any) => ({
    refreshMarks: model.refreshMarks,
  }));

  const handleTitleChange = useCallback((newDoc: any) => {
    refreshMarks('/doc/' + props.id);
  }, []);

  // --- location:

  const loadDoc = () => {
    setLoading(true);
    DocApi.getDoc(id, (doc: any) => {
      setLoading(false);
      setDoc(doc);
    });
  };

  useEffect(() => {
    loadDoc();
  }, [id]);

  // --- block list

  const blockListRef: any = useRef();

  const handleAdd = () => {
    updateTitleFocusing(false);
    blockListRef.current.add();
  };

  // --- block focus

  const focusBlockPos = (pos: number) => {
    blockListRef.current.focusPos(pos);
  };

  // --- blocklist empty focus

  const handleBlockListEmptyFocus = () => {
    updateTitleFocusing(true);
  };

  // --- blocklist focus change

  const handleBlockListFocusChange = (pos: BlockPosState) => {
    updateTitleFocusing(pos.pos < 0);
  };

  // --- tail click:

  const handleTailClick = (e: any) => {
    const blockListSize = blockListRef.current.getSize();
    if (blockListSize > 0) {
      focusBlockPos(blockListSize - 1);
    } else {
      updateTitleFocusing(true);
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
          focusing={titleFocusing}
          onFocus={handleTitleFocus}
          onEnter={handleAdd}
          onFocusDown={handleTitleFocusDown}
          onChange={handleTitleChange} />
      </div>
      <BlockList
        docId={doc.id}
        onEmptyFocus={handleBlockListEmptyFocus}
        onFocusChange={handleBlockListFocusChange}
        ref={blockListRef} />
      <div className='doc_tail' onClick={handleTailClick}></div>
    </div>
  </div>
  </>;
});
