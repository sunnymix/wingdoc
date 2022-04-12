import { FC, useState } from 'react';
import { Input } from 'antd';
import BlockApi from './BlockApi';

const { TextArea } = Input;

const BlockInfo: FC<{
  block: any
}> = ({
  block
}) => {

  const [text, setText] = useState(block.text);

  const saveBlockChange = (text: string) => {
    BlockApi.updateBlock(block.id, { text }, (newBlock: any) => {
    });
  };

  const handleChange = (e: any) => {
    const newText = e.target.value || "";
    saveBlockChange(newText);
    setText(newText);
  };
  
  return <>
  <TextArea 
    placeholder="Input" 
    autoSize 
    value={text}
    bordered={false}
    onChange={handleChange}
    />
  </>
};

export default BlockInfo;
