import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from './BlockApi';
import { Space, Button, Divider } from 'antd';
import BlockInfo from './BlockInfo';

interface BlockListProps {
  docId: string,
  showBlock?: boolean,
}

const BlockList = forwardRef((props: BlockListProps, ref) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [blocks, setBlocks] = useState<any[]>([]);

  const searchBlocks = () => {
    setLoading(true);
    BlockApi.getBlockListOfDoc(props.docId, (blocks: any) => {
      setLoading(false);
      setBlocks(blocks);
    });
  };

  useEffect(() => {
    searchBlocks();
  }, []);

  const handleAdd = () => {
    BlockApi.addBlockToDoc(props.docId, { text: "" }, (newBlock: any) => {
      const newBlocks: any[] = [];
      blocks.forEach((block: any) => {
        newBlocks.push(block);
      });
      newBlocks.push(newBlock);
      setBlocks(newBlocks);
    });
  };

  useImperativeHandle(ref, () => ({
    add: handleAdd,
  }));
  
  return <>
  <div style={{ padding: 2 }}>
    <Space direction="vertical" size="small" style={{width: "100%"}}>
      {blocks.map((block: any) => <BlockInfo key={block.id} block={block} showBlock={props.showBlock} />)}
    </Space>
  </div>
  </>
});

export default BlockList;
