import "./MarkStyle.css";
import { useState, useEffect, forwardRef } from "react";
import MarkApi from "./MarkApi";
import { useLocation } from "umi";
import MarkTab from "./MarkTab";
import "@/components/common/CommonStyle.css";

export interface Mark {
  id: number,
  docId: string,
  pin: number,
  docTitle: string,
  focus?: boolean,
}

export interface MarkTabsProps {}

export default forwardRef((props: MarkTabsProps, ref) => {

  // --- marks

  const [marks, setMarks] = useState<Mark[]>([]);

  const focusMark = (marks: Mark[], path: string) => {
    var docId = "";
    const basePath = "/doc/";
    const docIndex = path.indexOf(basePath);
    if (docIndex >= 0) {
      docId = path.substring(docIndex + basePath.length);
    }
    const newMarks = marks.map((mark: Mark) => {
      mark.focus = mark.docId == docId;
      return mark;
    });
    setMarks(newMarks);
  };

  const refreshMarks = () => {
    const newMarks: Mark[] = [];
    MarkApi.queryMarks({}, (marks: any) => {
      if (marks && marks.length > 0) {
        marks.forEach((mark: Mark) => newMarks.push(mark));
      }
      focusMark(newMarks, location.pathname);
    });
  };

  const refreshMarksInSeconds = (millis: number) => {
    setTimeout(refreshMarks, millis);
  };

  // --- location

  const location: any = useLocation();

  useEffect(() => {
    focusMark(marks, location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    refreshMarks();
  }, []);

  // --- handle all change

  const handleMarkChange = () => {
    refreshMarks();
  }

  // --- ui

  return (
    <div className="mark_tabs scrollbar_small">
      {marks.map((mark: Mark) => 
        <MarkTab key={mark.id} mark={mark} onChange={handleMarkChange} />
      )}
    </div>
  )
});
