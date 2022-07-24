import { forwardRef, useEffect, useState } from 'react';
import { BlockType } from '../block/Block';
import './TocStyle.css';
import { Link } from "umi";

export interface TocProps {
  docId: string,
  blocks: any[],
};

export default forwardRef((props: TocProps, ref) => {

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const newItems = props.blocks.map((block: any, index: number) => {
      if (BlockType.tocFilter(block.type)) {
        return { 
          id: block.id,
          type: block.type,
          text: block.text,
        };
      }
    }).filter(item => typeof(item) != 'undefined');

    setItems(newItems);
  }, [props.blocks]);

  return (
    <div className='toc'>
      {items.map((item: any, index: number) =>
        <a className='toc_item' key={item.id} href={`/wingdoc-ui/doc/${props.docId}?block=${item.id}`}>
          {item.text}
        </a>
      )}
    </div>
  );
});
