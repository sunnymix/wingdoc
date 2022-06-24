
// TODO：全局的日历状态

import { useState } from "react";

export default () => {

  // --- weeks before

  const [weeksBefore, setWeeksBefore] = useState<number>(1);

  // --- weeks after

  const [weeksAfter, setWeeksAfter] = useState<number>(1);

  // --- weekend show

  const [weekendShow, setWeekendShow] = useState<boolean>(true);

  // --- height multiple

  const [heightMultiple, setHeightMultipel] = useState<number>(1);

  return {
    weeksBefore,
    setWeeksBefore,
    weeksAfter,
    setWeeksAfter,
    weekendShow,
    setWeekendShow,
    heightMultiple,
    setHeightMultipel,
  };

};
