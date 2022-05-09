import Style from "./MarkTabsStyle.css";
import { Link, history } from "umi";
import { MoreOutlined, RightOutlined, CloseCircleOutlined, MinusCircleOutlined, MinusSquareOutlined, CloseOutlined } from "@ant-design/icons";
import { useState, useEffect, forwardRef } from "react";
import DocApi from "@/components/doc/DocApi";
import MarkApi from "./MarkApi";
import { Badge, Dropdown, Menu } from "antd";
import { useLocation } from "umi";
import MarkTab from "./MarkTab";

export interface Mark {
  id: number,
  docId: string,
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
    MarkApi.fetchMarks({}, (marks: any) => {
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

  // --- ui more

  const moreMenu = (
    <Menu>
      <Menu.Item key="remove-tab">Remove tab</Menu.Item>
    </Menu>
  );

  // --- ui

  return (
    <div className={Style.mark_tabs}>
      {marks.map((mark: Mark) =>  <MarkTab key={mark.id} mark={mark}/>)}
    </div>
  )
});
