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

export interface MarkTabsProps {}

export default forwardRef((props: MarkTabsProps, ref) => {

  // --- location

  const location: any = useLocation();

  // --- marks

  const { marks, refreshMarks } = useModel("marks", (model: any) => ({
    marks: model.marks,
    refreshMarks: model.refreshMarks,
  }));

  useEffect(() => {
    refreshMarks(location?.pathname);
  }, [location?.pathname])

  // --- handle all change

  const handleMarkChange = () => {
    refreshMarks(location?.pathname);
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
