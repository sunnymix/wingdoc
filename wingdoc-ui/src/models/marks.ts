import { Mark } from "@/components/mark/MarkTabs";
import { useState, useCallback } from "react";
import MarkApi from "@/components/mark/MarkApi";
import { useLocation } from "umi";

export default () => {

  // --- marks
  const [marks, setMarks] = useState<Mark[]>([]);

  const getDocId = (path: any) => {
    var docId = "";
    if (path && path.length > 0) {
      const basePath = "/doc/";
      const docIndex = path.indexOf(basePath);
      if (docIndex >= 0) {
        docId = path.substring(docIndex + basePath.length);
      }
    }
    return docId;
  };

  // --- refresh
  const refreshMarks = useCallback((path: any) => {
    MarkApi.queryMarks({}, (marks: any) => {
      const newMarks: Mark[] = [];
      if (marks && marks.length > 0) {
        marks.forEach((mark: Mark) => {
          mark.focus = mark.docId == getDocId(path);
          newMarks.push(mark);
        });
      }
      setMarks(newMarks);
    });
  }, []);

  return { marks, refreshMarks };
};
