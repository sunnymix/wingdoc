import { FC, useEffect, useState } from 'react';
import BlockApi from './BlockApi';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import BlockInfo from './BlockInfo';

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const BlockList: FC<{
  docId: string
}> = ({
  docId
}) => {

  const [loading, setLoading] = useState<boolean>(true);

  const [blocks, setBlocks] = useState<any[]>([]);

  const searchBlocks = () => {
    setLoading(true);
    BlockApi.getBlockListOfDoc(docId, (blocks: any) => {
      setLoading(false);
      setBlocks(blocks);
    });
  };

  useEffect(() => {
    searchBlocks();
  }, []);
  
  return <>
  <Spin spinning={loading} indicator={spinIcon}/>
  <div style={{ padding: 2 }}>
    <Space direction="vertical" size="middle" style={{width: "100%"}}>
      {blocks.map((block: any) => <BlockInfo key={block.id} block={block} />)}
    </Space>
  </div>
  </>
};

export default BlockList;
