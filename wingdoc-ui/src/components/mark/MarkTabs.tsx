import Style from "./MarkTabsStyle.css";
import { Link, history } from "umi";
import { RightOutlined, CloseCircleOutlined, MinusCircleOutlined, MinusSquareOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect, forwardRef } from "react";
import DocApi from "@/components/doc/DocApi";
import MarkApi from "./MarkApi";
import { Badge } from "antd";
import { useLocation } from "umi";

interface Mark {
  id: number,
  docId: string,
  docTitle: string,
}

export interface MarkTabsProps {}

export default forwardRef((props: MarkTabsProps, ref) => {

  // --- marks

  const [marks, setMarks] = useState<Mark[]>([]);

  const refreshMarks = () => {
    const newMarks: Mark[] = [];
    MarkApi.fetchMarks({}, (marks: any) => {
      if (marks && marks.length > 0) {
        marks.forEach((mark: Mark) => newMarks.push(mark));
      }
      setMarks(newMarks);
    });
  };

  const refreshMarksInSeconds = (seconds: number) => {
    setTimeout(refreshMarks, seconds * 500);
  };

  // --- location

  const location: any = useLocation();
  useEffect(() => {
    refreshMarksInSeconds(1);
  }, [location.pathname]);

  // --- delete mark

  const redirectToNextMark = (docId: string) => {
    var deleteIndex = -1;
    marks.forEach((mark: Mark, index: number) => {
      if (mark.docId == docId) {
        deleteIndex = index;
      }
    });
    var redirectToMark = null;
    if (deleteIndex < 0) {
      if (marks.length > 0) {
        redirectToMark = marks[0];
      }
    } else if (deleteIndex == 0) {
      if (marks.length > 1) {
        redirectToMark = marks[1];
      }
    } else if (deleteIndex > 0) {
      redirectToMark = marks[deleteIndex - 1];
    }
    // TODO：删除当前打开的文档时，才处理 redirectToMark
  };

  const handleDeleteMark = (docId: string) => {
    MarkApi.deleteMark(docId, () => {
      refreshMarks();
      redirectToNextMark(docId);
    });
  };

  const displayTitle = (mark: Mark) => {
    if (mark.docTitle && mark.docTitle.length > 0) {
      return mark.docTitle;
    }
    return "untitled";
  };

  // --- ui

  return (
    <div className={Style.mark_tabs}>
      {marks.map((mark: Mark) => 
        <div className={Style.marks_tabs_item} key={mark.id}>
          <div className={Style.marks_tabs_item_divider}></div>
          <Link className={Style.marks_tabs_item_link} to={`/doc/${mark.docId}`}>{displayTitle(mark)}</Link>
          <button className={Style.marks_tabs_item_delete} onClick={() => handleDeleteMark(mark.docId)}>×</button>
        </div>
      )}
    </div>
  )
});
