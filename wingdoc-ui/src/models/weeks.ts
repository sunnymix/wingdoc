
// TODO：全局的日历状态

import { useCallback, useState } from "react";

export default () => {

  // --- weeks before:

  const namespace = 'weeks.';

  const weeksBeforeKey = namespace + 'weeksBefore';
  const [weeksBefore, _setWeeksBefore] = useState<number>(+(localStorage.getItem(weeksBeforeKey) || 0));
  const setWeeksBefore = useCallback((num: number) => {
    _setWeeksBefore(num);
    localStorage.setItem(weeksBeforeKey, num.toString());
  }, []);

  // --- weeks after

  const weeksAfterKey = namespace + 'weeksAfter';
  const [weeksAfter, _setWeeksAfter] = useState<number>(+(localStorage.getItem(weeksAfterKey) || 0));
  const setWeeksAfter = useCallback((num: number) => {
    _setWeeksAfter(num);
    localStorage.setItem(weeksAfterKey, num.toString());
  }, []);

  // --- weekend show

  const weekendShowKey = namespace + 'weekendShow';
  const [weekendShow, _setWeekendShow] = useState<boolean>(localStorage.getItem(weekendShowKey) === 'true');
  const setWeekendShow = useCallback((bool: boolean) => {
    _setWeekendShow(bool);
    localStorage.setItem(weekendShowKey, bool ? 'true' : 'false');
  }, []);

  // --- height multiple

  const heightMultipleKey = namespace + 'heightMultiple';
  const [heightMultiple, _setHeightMultipel] = useState<number>(+(localStorage.getItem(heightMultipleKey) || 1));
  const setHeightMultipel = useCallback((num: number) => {
    _setHeightMultipel(num);
    localStorage.setItem(heightMultipleKey, num.toString());
  }, []);

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
