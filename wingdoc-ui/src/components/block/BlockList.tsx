import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BlockApi from './BlockApi';
import { Space, Button, Divider } from 'antd';
import BlockInfo from './BlockInfo';

interface BlockListProps {
  docId: string,
  showBlock?: boolean,
}

const BlockList = forwardRef((props: BlockListProps, ref) => {

  useImperativeHandle(ref, () => ({
    add: handleAdd,
  }));

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

  const handleAdd = (pos?: number) => {
    BlockApi.addBlockToDoc(props.docId, { text: "", pos: pos || 0 }, (newBlock: any) => {
      searchBlocks();
    });
  };

  const handleBlockEnter = (block: any) => {
    handleAdd(block.pos + 1);
  };

  const deleteBlock = (id: string) => {
    BlockApi.deleteBlock(id, (ok: any) => {
      searchBlocks();
    });
  };

  const handleBlockDelete = (block: any) => {
    deleteBlock(block.id);
  };
  
  return <>
  <div style={{ padding: 2 }}>
    <Space direction="vertical" size="small" style={{width: "100%"}}>
      {blocks.map((block: any) => 
        <BlockInfo
          key={block.id}
          block={block}
          showBlock={props.showBlock}
          onEnter={handleBlockEnter}
          onDelete={handleBlockDelete}/>)
      }
    </Space>
  </div>
  </>
});

export default BlockList;
