import { Mark, MarkChangeEvent } from "@/components/mark/MarkTabs";
import { useState, useCallback, useEffect } from "react";
import MarkApi from "@/components/mark/MarkApi";

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

export default () => {

  // --- current path
  var currentPath = '';

  // --- marks
  const [marks, setMarks] = useState<Mark[]>([]);

  // --- refresh
  const refreshMarks = useCallback((path: any) => {
    currentPath = path;
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

  useEffect(() => {
    refreshMarks('');
  }, []);

  // --- refresh mark:

  const refreshMark = useCallback((markChange: MarkChangeEvent) => {
    console.log('markChange', markChange);
    setMarkChange(markChange);
  }, []);

  // --- mark change event:
  
  const [markChange, setMarkChange] = useState<MarkChangeEvent|null>(null);

  return {
    marks,
    refreshMarks,
    refreshMark,
  };
};
