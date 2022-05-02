import { forwardRef, useState } from "react";
import Week from "./Week";

export interface WeekListProps {};

export default forwardRef((props: WeekListProps, ref) => {

  const [weeks, setWeeks] = useState<number[]>([-1, 0, 1]);

  return <>
  <div
    style={{
      overflow: "auto",
    }}>
    <div
      style={{
        borderBottom: "1px solid #ddd",
      }}>
        {weeks.map((week: number) => 
        <Week
          key={week}
          week={week}
          style={{
            marginBottom: 0,
          }}/>
        )}
    </div>
  </div>
  </>
});
