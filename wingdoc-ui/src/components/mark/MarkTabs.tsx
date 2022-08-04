import "./MarkStyle.css";
import { useEffect, forwardRef } from "react";
import { useLocation, useModel } from "umi";
import MarkTab from "./MarkTab";
import "@/components/common/CommonStyle.css";

export interface Mark {
  id: number,
  docId: string,
  pin: number,
  docTitle: string,
  focus?: boolean,
}

export interface MarkChangeEvent {
  mark: Mark,
  ts: number,
}

export interface MarkTabsProps {}

export default forwardRef((props: MarkTabsProps, ref) => {

  // --- marks

  const { marks, refreshMarks } = useModel("marks", (model: any) => ({
    marks: model.marks,
    refreshMarks: model.refreshMarks,
  }));

  // --- handle all change

  const handleMarkChange = () => {
    refreshMarks(location?.pathname);
  }

  // --- ui

  return (
    <div className="mark_tabs scrollbar_small">
      {marks.filter((mark: Mark) => mark.pin > 0).map((mark: Mark) => 
        <MarkTab key={mark.id} mark={mark} onChange={handleMarkChange} />
      )}
      {marks.filter((mark: Mark) => mark.pin <= 0).map((mark: Mark) => 
        <MarkTab key={mark.id} mark={mark} onChange={handleMarkChange} />
      )}
    </div>
  )
});
