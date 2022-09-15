import "./MarkStyle.css";
import { useEffect, forwardRef } from "react";
import { useLocation, useModel } from "umi";
import MarkTab from "./MarkTab";
import "@/components/common/CommonStyle.css";
import { Scrollbars } from "react-custom-scrollbars";

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
  };

  // --- scrollbar:

  const renderThumb = (origProps: any) => {
    const { style, ...props } = origProps;
    return <div style={{...style, backgroundColor: '#ccc', height: 2, marginTop: 6}} {...props}> </div>;
  };

  // --- ui

  return (
    <>
      <Scrollbars autoHeight renderThumbHorizontal={renderThumb}>
        <div className="mark_tabs">
          {marks.map((mark: Mark) => 
            <MarkTab key={mark.id} mark={mark} onChange={handleMarkChange} />
          )}
        </div>
      </Scrollbars>
    </>
  )
});
