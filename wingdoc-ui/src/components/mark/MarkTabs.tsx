import Style from "./MarkTabsStyle.css";
import { Link } from "umi";
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
    DocApi.fetchTodayDoc((doc: any) => {
      const newMarks: Mark[] = [];
      if (doc) {
        newMarks.push({
          id: 0,
          docId: doc.id,
          docTitle: "Today"
        });
      }
      MarkApi.fetchMarks({}, (marks: any) => {
        if (marks && marks.length > 0) {
          marks.forEach((mark: Mark) => newMarks.push(mark));
        }
        setMarks(newMarks);
      });
    });
  }, []);

  // --- ui

  return (
    <div className={Style.mark_tabs}>
      {marks.map((mark: Mark) => 
        <Link
          key={mark.id}
          className={Style.marks_tabs_item}
          to={`/doc/${mark.docId}`}>{mark.docTitle}</Link>)}
    </div>
  )
}
