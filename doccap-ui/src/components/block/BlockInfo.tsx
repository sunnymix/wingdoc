import { FC, useState } from 'react';

const BlockInfo: FC<{
  block: any
}> = ({
  block
}) => {
  
  return <>
  <div>{block.source}</div>
  </>
};

export default BlockInfo;
