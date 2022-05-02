import { forwardRef, useEffect, useState } from "react";
import { Space } from "antd";
import Task, { Status } from "@/components/block/components/Task";
import DocApi from "@/components/doc/DocApi";
import TaskApi from "@/components/task/TaskApi";

export interface WeekDayTasksProps {
  shortDate: string,
};

interface TaskProps {
  id: string,
  task: string,
  status: Status,
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
            console.log(tasks);
            setTasks(tasks);
          });
        }
      });
    }
  }, [shortDate]);

  // --- ui: task
  
  const TaskUi = (task: TaskProps) => (
    <div 
      key={task.id}
      style={{
        margin: 2,
        display: "flex",
        alignItems: "flex-start",
      }}>
      <Task id={task.id} show={true} defaultStatus={task.status}/>
      <div
        style={{
          marginLeft: 2,
          padding: 2,
        }}>{task.task}</div>
    </div>
  );

  // --- ui

  return <>
  <div>
    {tasks.map((task: any) => TaskUi(task))}
  </div>
  </>;
});
