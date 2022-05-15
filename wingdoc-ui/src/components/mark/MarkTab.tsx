import { forwardRef } from "react";
import { Mark } from "./MarkTabs";
import { Dropdown, Menu } from "antd";
import "./MarkStyle.css";
import { Link } from "umi";
import MarkApi from "./MarkApi";
import { MoreOutlined, PushpinFilled } from "@ant-design/icons";
import DocTaskStatus from "../doc/DocTaskStatus";
import WeekDayLabel from "../calendar/week/WeekDayLabel";

export interface MarkTabProps {
  mark: Mark,
  onDelete?: Function,
  onPin?: Function,
  onUnpin?: Function,
  onChange?: Function,
};

export default forwardRef((props: MarkTabProps, ref) => {

  // --- props

  const { mark, onDelete, onPin, onUnpin, onChange } = props;

  // --- delete

  const handleDelete = () => {
    MarkApi.deleteMark(mark.docId, () => {
      onDelete?.call(null, mark);
      onChange?.call(null, mark);
    });
  };

  const displayTitle = (mark: Mark) => {
    if (mark.docTitle && mark.docTitle.length > 0) {
      return mark.docTitle;
    }
    return "untitled";
  };

  // --- pin

  const handlePin = () => {
    MarkApi.pinMark(mark.docId, () => {
      onPin?.call(null, mark);
      onChange?.call(null, mark);
    });
  };

  const handleUnpin = () => {
    MarkApi.unpinMark(mark.docId, () => {
      onUnpin?.call(null, mark);
      onChange?.call(null, mark);
    });
  }

  // --- ui more

  const moreMenu = (
    <Menu>
      {mark.pin <= 0 && <Menu.Item key="pin" onClick={handlePin}>Pin</Menu.Item>}
      {mark.pin > 0 && <Menu.Item key="unpin" onClick={handleUnpin}>Unpin</Menu.Item>}
      <Menu.Item key="delete" onClick={handleDelete}>Delete</Menu.Item>
    </Menu>
  );

  // --- ui

  return (
    <div className={`marks_tabs_item ${mark.focus ? "focus" : ""}`} key={mark.id}>
      <div className="marks_tabs_item_focus"></div>
      <Link className="marks_tabs_item_link" to={`/doc/${mark.docId}`}>
        {mark.pin > 0 && <PushpinFilled />}
        <div className="marks_tabs_item_title">{displayTitle(mark)}</div>
        <WeekDayLabel className="marks_tabs_item_weekday" text={mark.docTitle} />
        <DocTaskStatus className="marks_tabs_item_task_status" docId={mark.docId} />
      </Link>
      <Dropdown overlay={moreMenu} placement="bottomLeft" trigger={['click']}>
        <div className="nav_new_button">
          <button className="marks_tabs_item_more"><MoreOutlined /></button>
        </div>
      </Dropdown>
    </div>
  )
});
