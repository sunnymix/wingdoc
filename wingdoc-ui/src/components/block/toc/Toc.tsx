import { forwardRef, useCallback, useEffect, useState } from 'react';
import { BlockType } from '../block/Block';
import './TocStyle.css';
import { Link } from "umi";
import { history } from "umi";

export interface TocProps {
  docId: string,
  blocks: any[],
};

export default forwardRef((props: TocProps, ref) => {

  // --- items:

  const [items, setItems] = useState<any[]>([]);

  const prettyText = useCallback((block: any) => {
    let text = block.text || '';
    if (block.type == BlockType.TASK) {
      const lineBreakIndex = text.indexOf('\n');
      if (lineBreakIndex > 0) {
        text = text.substring(0, lineBreakIndex);
      }
    } else {
      text = text.substr(0, 20);
    }
    return text;
  }, []);

  useEffect(() => {
    const newItems = props.blocks.map((block: any, index: number) => {
      if (BlockType.tocFilter(block.type)) {
        return { 
          id: block.id,
          type: block.type,
          text:  prettyText(block),
          link: `/doc/${props.docId}?block=${block.id}`,
        };
      }
    }).filter(item => typeof(item) != 'undefined');
    setItems(newItems);
  }, [props.blocks]);

  // --- click:
  
  const handleClick = (e: any, item: any) => {
    e.preventDefault();
    history.push(item.link);
  };

  // --- ui:

  return (
    <div className='toc'>
      <div className='toc_title'>目录</div>
      {items.map((item: any, index: number) =>
        <a className={`toc_item ${item.type.toLocaleLowerCase()}`} key={item.id} href={item.link} onClick={(e: any) => handleClick(e, item)}>
          <span className={`toc_item_body`}>{item.text}</span>
        </a>
      )}
    </div>
  );
});
