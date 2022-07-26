import { forwardRef, useEffect, useState } from "react";
import { Mark, MarkChangeEvent } from "./MarkTabs";
import { Dropdown, Menu } from "antd";
import "./MarkStyle.css";
import { Link, useModel } from "umi";
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
  onRefresh?: Function,
};

export default forwardRef((props: MarkTabProps, ref) => {

  // --- props

  const { mark, onDelete, onPin, onUnpin, onChange } = props;

  // --- model:

  const { refreshMark } = useModel("marks", (model: any) => ({
    refreshMark: model.refreshMark,
  }));

  // --- close

  const handleClose = () => {
    MarkApi.deleteMark(mark.docId, () => {
      onDelete?.call(null, mark);
      onChange?.call(null, mark);
    });
  };

  const format = "YYYYMMDD";

  // --- display title:

  const [displayTitle, setDisplayTitle] = useState<string>('');
  const [isToday, setIsToday] = useState<boolean>(false);

  const updateDisplayTitle = (_title: string) => {
    var newTitle = (_title || '').trim();
    var isToday = false;

    if (newTitle.length > 0) {
      if (newTitle.length >= format.length && !isNaN(+newTitle)) {
        const titleAsMoment = moment(newTitle);
        const day = titleAsMoment.format('M.D');
        const weekday = +(titleAsMoment.format("E")) - 1;
        const weekdayTitle = Weekday.title(weekday);
        newTitle = `${day} ${weekdayTitle}`;

        isToday = moment().format("YYYYMMDD") == _title;
      }
    } else {
      newTitle = 'untitled';
    }

    setDisplayTitle(newTitle);
    setIsToday(isToday);
  };

  useEffect(() => {
    updateDisplayTitle(mark.docTitle);
  }, [mark.docTitle]);

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
    const event: MarkChangeEvent = { mark: props.mark, ts: +(new Date()) };
    props.onRefresh?.call(null, event);
    refreshMark(event);
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
    <div className={`marks_tabs_item ${mark.focus && 'focus'} ${mark.pin && 'pin'} ${isToday && 'today'}`} key={mark.id}>
      <Link className="marks_tabs_item_link" to={`/doc/${mark.docId}`}>
        <div className="marks_tabs_item_title">{displayTitle}</div>
        <DocTaskStatus className="marks_tabs_item_task_status" docId={mark.docId} />
      </Link>
      <Dropdown overlay={moreMenu} placement="bottomLeft" trigger={['click']}>
        <button className="marks_tabs_item_more"><MoreOutlined /></button>
      </Dropdown>
    </div>
  )
});
