import { forwardRef } from "react";
import { Mark } from "./MarkTabs";
import { Dropdown, Menu } from "antd";
import "./MarkStyle.css";
import { Link } from "umi";
import moment from "moment";
import MarkApi from "./MarkApi";
import { MoreOutlined, PushpinFilled } from "@ant-design/icons";
import DocTaskStatus from "../doc/DocTaskStatus";
import WeekDayLabel from "../calendar/week/WeekDayLabel";
import { Weekday } from "../calendar/week/WeekDay";

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

  // --- close

  const handleClose = () => {
    MarkApi.deleteMark(mark.docId, () => {
      onDelete?.call(null, mark);
      onChange?.call(null, mark);
    });
  };

  const format = "YYYYMMDD";

  const displayTitle = (mark: Mark) => {
    const title = (mark.docTitle || '').trim();
    if (title.length > 0) {
      if (title.length >= format.length && !isNaN(+title)) {
        const titleAsMoment = moment(title);
        const day = titleAsMoment.format('M.D');
        const weekday = +(titleAsMoment.format("E")) - 1;
        const weekdayTitle = Weekday.title(weekday);
        return `${day} ${weekdayTitle}`;
      }
      return title;
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

  // --- refresh

  const handleRefresh = () => {
    // TODO
  };

  // --- clone

  const handleClone = () => {
    // TODO
  };

  // --- ui more

  const moreMenu = (
    <Menu>
      <Menu.Item key="pin" onClick={handlePin}>Pin</Menu.Item>
      {mark.pin > 0 && <Menu.Item key="unpin" onClick={handleUnpin}>Unpin</Menu.Item>}
      <Menu.Item key="clone" onClick={handleClone}>Clone</Menu.Item>
      <Menu.Item key="close" onClick={handleClose}>Close</Menu.Item>
      <Menu.Item key="refresh" onClick={handleRefresh}>Refresh</Menu.Item>
    </Menu>
  );

  // --- ui

  return (
    <div className={`marks_tabs_item ${mark.focus ? "focus" : ""} ${mark.pin ? "pin" : ""}`} key={mark.id}>
      <Link className="marks_tabs_item_link" to={`/doc/${mark.docId}`}>
        <div className="marks_tabs_item_title">{displayTitle(mark)}</div>
        <DocTaskStatus className="marks_tabs_item_task_status" docId={mark.docId} />
      </Link>
      <Dropdown overlay={moreMenu} placement="bottomLeft" trigger={['click']}>
        <button className="marks_tabs_item_more"><MoreOutlined /></button>
      </Dropdown>
    </div>
  )
});
