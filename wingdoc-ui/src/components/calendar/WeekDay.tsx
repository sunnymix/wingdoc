import { forwardRef } from "react";
import moment from "moment";
import { Space, Button } from "antd";
import { Link } from "umi";
import { FileOutlined } from "@ant-design/icons";
import { history } from "umi";
import DocApi from "@/components/doc/DocApi";

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

  export function momt(weekday: Weekday) {
    return moment().isoWeekday(weekday + 1);
  }

  export function monthDay(weekday: Weekday) {
    return momt(weekday).format("M.D");
  }

  export function shortDate(weekday: Weekday) {
    return momt(weekday).format("YYYYMMDD");
  }
}

export interface WeekDayProps {
  weekday: Weekday,
};

export default forwardRef((props: WeekDayProps, ref) => {

  // --- props

  const {weekday} = props;

  const momt = Weekday.momt(weekday);

  const shortDate = Weekday.shortDate(weekday);

  // --- redirect to doc

  const redirectToDoc = () => {
    DocApi.getDocByTitle(shortDate, (doc: any) => {
      if (doc) {
        history.push(`/doc/${doc.id}`);
      }
    });
  };

  // --- ui

  return <>
  <div style={{
    flexGrow: 1,
  }}>
    <div
      style={{
        borderStyle: "solid",
        borderColor: "#ddd",
        borderLeftWidth: 0,
        borderRightWidth: weekday != Weekday.SUN ? 1 : 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 5,
        textAlign: "center",
      }}>
        <Space direction="horizontal" size="small">
          <div>{Weekday.monthDay(weekday)}</div>
          <div>{Weekday.title(weekday)}</div>
        </Space>
      </div>
    <div
      style={{
        borderStyle: "solid",
        borderColor: "#ddd",
        borderLeftWidth: 0,
        borderRightWidth: weekday != Weekday.SUN ? 1 : 0,
        borderTopWidth: 1,
        borderBottomWidth: 0,
        padding: 5,
      }}>
        <div>
          <Button type="link" block size="small" onClick={redirectToDoc}>{shortDate}</Button>
        </div>
      </div>
  </div>
  </>
});
