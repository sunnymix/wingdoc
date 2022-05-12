import { forwardRef, useEffect, useState } from "react";
import { Badge } from "antd";
import TaskApi from "@/components/task/TaskApi";

interface DocTaskStatusProps {
  docId: string,
  className?: any,
};

export default forwardRef((props: DocTaskStatusProps, ref) => {

  // --- props

  const {docId, className} = props;

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

  // --- ui

  return (
    <div className={className}>
      {unfinished > 0 && <Badge color="red" />}
    </div>
  );
});
