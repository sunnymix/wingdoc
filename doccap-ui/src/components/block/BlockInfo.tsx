import { FC, useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const BlockInfo: FC<{
  block: any
}> = ({
  block
}) => {

  const [text, setText] = useState(block.source);

  const handleChange = (e: any) => {
    const newText = e.target.value;
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
