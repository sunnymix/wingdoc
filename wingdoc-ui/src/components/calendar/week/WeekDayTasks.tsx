import { forwardRef, useEffect, useState } from "react";
import DocApi from "@/components/doc/DocApi";
import TaskApi from "@/components/task/TaskApi";
import { Link } from "umi";
import Tasker from "@/components/block/tasker/Tasker";
import { Status } from "@/components/block/tasker/Tasker";

export interface WeekDayTasksProps {
  shortDate: string,
};

interface TaskProps {
  id: string,
  task: string,
  status: Status,
  docId: String,
};

export default forwardRef((props: WeekDayTasksProps, ref) => {

  // --- props

  const {shortDate} = props;

  // --- tasks

  const [tasks, setTasks] = useState<any[]>([]);

  // --- fetch tasks

  useEffect(() => {
    if (shortDate) {
      DocApi.getDocByTitle(shortDate, (doc: any) => {
        if (doc) {
          TaskApi.fetchTaskList({docId: doc.id}, (tasks: any[]) => {
            setTasks(tasks);
          });
        }
      });
    }
  }, [shortDate]);

  // --- task ui
  
  const TaskUi = (task: TaskProps) => (
    <div 
      key={task.id}
      style={{
        display: "flex",
        alignItems: "flex-start",
      }}>
      <Tasker blockId={task.id} initialStatus={task.status} />
      <div>
        <Link
          to={`/doc/${task.docId}?block=${task.id}`}
          style={{
            color: "#333",
            fontSize: "80%",
            fontFamily: '"Helvetica Neue", Helvetica, Arial',
            whiteSpace: "nowrap",
          }}>{task.task}</Link>
      </div>
    </div>
  );

  // --- tasks ui

  return <>
  <div>
    {tasks.map((task: any) => TaskUi(task))}
  </div>
  </>;
});
