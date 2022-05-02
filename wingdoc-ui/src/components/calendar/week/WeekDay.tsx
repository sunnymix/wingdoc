import { forwardRef, useEffect, useState } from "react";
import moment from "moment";
import { Space, Button, Popconfirm, Tag, Badge } from "antd";
import { Link } from "umi";
import { FileOutlined } from "@ant-design/icons";
import { history } from "umi";
import DocApi from "@/components/doc/DocApi";
import WeekDayTasks from "./WeekDayTasks";

export enum Weekday {
  MON = 0,
  TUES,
  WED,
  THUS,
  FRI,
  SAT,
  SUN,
};

export namespace Weekday {
  export function all() {
    return [
      Weekday.MON,
      Weekday.TUES,
      Weekday.WED,
      Weekday.THUS,
      Weekday.FRI,
      Weekday.SAT,
      Weekday.SUN,
    ];
  }

  export function title(weekday: Weekday) {
    return [
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六",
      "周日",
    ][weekday]
  }

  export function momt(week: number, weekday: Weekday) {
    return moment().isoWeekday(weekday + 1 + (week * 7));
  }

  export function monthDay(week: number, weekday: Weekday) {
    return momt(week, weekday).format("M.D");
  }

  export function shortDate(week: number, weekday: Weekday) {
    return momt(week, weekday).format("YYYYMMDD");
  }

  export function isToday(week: number, weekday: Weekday) {
    return moment().format("YYYYMMDD") == shortDate(week, weekday);
  }

  export function isWeekend(weekday: Weekday) {
    return weekday == Weekday.SAT || weekday == Weekday.SUN;
  }
}

export interface WeekDayProps {
  week: number,
  weekday: Weekday,
};

export default forwardRef((props: WeekDayProps, ref) => {

  // --- props

  const {week, weekday} = props;

  // --- moment

  const momt = Weekday.momt(week, weekday);

  const shortDate = Weekday.shortDate(week, weekday);

  const isToday = Weekday.isToday(week, weekday);

  // --- docId

  const [docId, setDocId] = useState<any>(null);

  useEffect(() => {
    DocApi.getDocByTitle(shortDate, (doc: any) => {
      if (doc) {
        setDocId(doc.id);
      }
    });
  }, [shortDate]);

  // --- redirect to doc

  const redirectToDoc = () => {
    if (docId) {
      history.push(`/doc/${docId}`);
    }
  };

  // --- create doc of shortDate

  const createDocOfShortDate = () => {
    DocApi.addDoc({title: shortDate, author: ""}, (doc: any) => {
      if (doc) {
        setDocId(doc.id);
      }
    });
  };

  // --- ui: title link

  const titleLink = (
    <div
      onClick={redirectToDoc}
      style={{
        padding: 2,
        cursor: "pointer",
        backgroundColor: Weekday.isWeekend(weekday) ? "#f3f3f3" : "#fcfcfc",
      }}>
      <Space direction="horizontal" size="small">
        <div style={{fontSize: "120%",}}>{Weekday.monthDay(week, weekday)}</div>
        <div style={{fontSize: "120%",}}>{Weekday.title(weekday)}</div>
        <div>{isToday && <Badge color="blue" />}</div>
      </Space>
    </div>
  );

  // --- ui: title link of new doc confirm

  const titleLinkAndNewDocConfirm = (
    <Popconfirm
      title={`Create: ${shortDate} ?`}
      onConfirm={createDocOfShortDate}>{titleLink}</Popconfirm>
  );

  return <>
  <div style={{
    borderStyle: "solid",
    borderColor: "#ddd",
    borderLeftWidth: 0,
    borderRightWidth: weekday != Weekday.SUN ? 1 : 0,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    flexGrow: 1,
    flexShrink: 0,
    width: "14%",
  }}>
    <div
      style={{
        borderBottom: "1px solid #ddd",
        padding: 0,
        textAlign: "center",
      }}>
        {docId && titleLink}
        {!docId && titleLinkAndNewDocConfirm}
      </div>
    <div
      style={{
        padding: 0,
      }}>
        <div>
          <WeekDayTasks shortDate={shortDate}/>
        </div>
      </div>
  </div>
  </>
});
