import { forwardRef, useEffect, useState } from "react";
import moment from "moment";
import { Space, Popconfirm, Badge } from "antd";
import { history } from "umi";
import DocApi from "@/components/doc/api/DocApi";
import WeekDayTasks from "./WeekDayTasks";
import TaskApi from "@/components/task/TaskApi";
import "./WeekStyle.css";

export enum Weekday {
  MON = 0,
  TUES,
  WED,
  THUS,
  FRI,
  SAT,
  SUN,
};

const allweek = [
  Weekday.MON,
  Weekday.TUES,
  Weekday.WED,
  Weekday.THUS,
  Weekday.FRI,
  Weekday.SAT,
  Weekday.SUN,];

const workday = [
    Weekday.MON,
    Weekday.TUES,
    Weekday.WED,
    Weekday.THUS,
    Weekday.FRI,];

export namespace Weekday {
  export function all(weekendShow: boolean) {
    if (weekendShow) {
      return allweek;
    }
    return workday;
  }

  export function titleSimple(weekday: Weekday) {
    return [
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "日",
    ][weekday]
  }

  export function title(weekday: Weekday) {
    return '周' + titleSimple(weekday);
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

  export function isLastDay(weekday: Weekday) {
    return weekday == Weekday.SUN;
  }
}

export interface WeekDayProps {
  week: number,
  weekday: Weekday,
  heightMultiple?: number,
};

export default forwardRef((props: WeekDayProps, ref) => {

  // --- props

  const {week, weekday, heightMultiple} = props;

  // --- moment

  const momt = Weekday.momt(week, weekday);

  const shortDate = Weekday.shortDate(week, weekday);

  const isToday = Weekday.isToday(week, weekday);

  const isLastDay = Weekday.isLastDay(weekday);

  const isWeekend = Weekday.isWeekend(props.weekday);

  // --- docId

  const [docId, setDocId] = useState<any>(null);

  useEffect(() => {
    DocApi.getDocByTitle(shortDate, (doc: any) => {
      if (doc) {
        setDocId(doc.id);
      }
    });
  }, [shortDate]);

  // --- task stats

  const [unfinished, setUnfinished] = useState<number>(0);

  useEffect(() => {
    if (docId && docId.length > 0) {
      TaskApi.fetchTaskStats({docId}, (stats: any) => {
        if (stats) {
          setUnfinished(stats.unfinished || 0);
        }
      });
    }
  }, [docId]);

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
        history.push(`/doc/${doc.id}`);
      }
    });
  };

  // --- ui: title link

  const titleLink = (
    <div
      onClick={redirectToDoc}
      style={{
        padding: 0,
        cursor: "pointer",
        fontWeight: 500,
        color: isToday ? "#1890ff" : "#333",
      }}>
      <Space direction="horizontal" size="small">
        <div>{Weekday.monthDay(week, weekday)}</div>
        <div>{Weekday.title(weekday)}</div>
        {unfinished > 0 && <Badge color="red"/>}
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
  <div className={`weekday ${isWeekend && 'weekend'}`}>
    <div className="weekday_border"></div>
    <div className="weekday_content">
      <div className="weekday_content_header">
        {docId && titleLink}
        {!docId && titleLinkAndNewDocConfirm}
      </div>
      <div className="weekday_content_body scrollbar_small" style={{ height: (heightMultiple || 1) * 150 }}>
        <WeekDayTasks shortDate={shortDate}/>
      </div>
    </div>
  </div>
  </>
});
