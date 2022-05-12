import { forwardRef, useEffect, useState } from "react";
import moment from "moment";
import { Weekday } from "./WeekDay";
import "./WeekDayLabelStyle.css";

export interface WeekDayLabel {
  text: string,
  className?: string,
};

export default forwardRef((props: WeekDayLabel, ref) => {

  // --- props

  const {text, className} = props;

  // --- name

  const [name, setName] = useState<string | null>(null);

  // --- isToday

  const [isToday, setIsToday] = useState<boolean>(false);

  // --- format

  // TODO：可浮动的年

  const format = "YYYYMMDD";

  // --- display

  const dispaly = (text: string) => {
    const cleanText = (text || "").trim();
    if (!isNaN(+cleanText)) {
      const weekday = +(moment(cleanText, format).format("E")) - 1;
      console.log(weekday);
      const name = Weekday.title(weekday);
      setName(name);
      const isToday = moment().format("YYYYMMDD") == cleanText;
      setIsToday(isToday);
    }
  };

  useEffect(() => {
    dispaly(text);
  }, [text]);

  // --- ui

  return <>
  {name && <div className={`weekday_label ${isToday? "today" : ""} ${className || ""}`}>{name}</div>}
  </>;
});
