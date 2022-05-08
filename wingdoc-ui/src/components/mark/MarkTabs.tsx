import Style from "./MarkTabsStyle.css";
import { Link } from "umi";
import { MinusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import DocApi from "@/components/doc/DocApi";
import MarkApi from "./MarkApi";

interface Mark {
  id: number,
  docId: string,
  docTitle: string,
}

export interface MarkTabsProps {}

export default (props: MarkTabsProps) => {

  // --- marks

  const [marks, setMarks] = useState<Mark[]>([]);

  useEffect(() => {
    setInterval(() => {
      const newMarks: Mark[] = [];
      MarkApi.fetchMarks({}, (marks: any) => {
        if (marks && marks.length > 0) {
          marks.forEach((mark: Mark) => newMarks.push(mark));
        }
        setMarks(newMarks);
      });
    }, 500);
  }, []);

  // --- ui

  return (
    <div className={Style.mark_tabs}>
      {marks.map((mark: Mark) => 
        <div className={Style.marks_tabs_item} key={mark.id}>
          <div className={Style.marks_tabs_item_divider}></div>
          <Link className={Style.marks_tabs_item_link} to={`/doc/${mark.docId}`}>{mark.docTitle}</Link>
          <button className={Style.marks_tabs_item_delete}>
            <MinusOutlined />
          </button>
        </div>
      )}
    </div>
  )
}
