import { forwardRef, useEffect, useState } from "react";
import { Space } from "antd";
import Task, { Status } from "@/components/block/components/Task";
import DocApi from "@/components/doc/DocApi";
import TaskApi from "@/components/task/TaskApi";
import { Link } from "umi";

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
          TaskApi.queryTaskList({docId: doc.id}, (tasks: any[]) => {
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
        margin: 5,
        display: "flex",
        alignItems: "flex-start",
      }}>
      <Task id={task.id} show={true} defaultStatus={task.status}/>
      <div
        style={{
          marginLeft: 0,
        }}>
        <Link
          to={`/doc/${task.docId}?block=${task.id}`}
          style={{
            color: "#333",
            fontSize: "75%",
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
