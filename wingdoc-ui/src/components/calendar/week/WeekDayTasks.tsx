import { forwardRef, useState } from "react";
import { Space } from "antd";
import Task from "@/components/block/components/Task";

export interface WeekDayTasksProps {
  shortDate?: string,
};

interface TaskProps {
  id: string,
  text: string,
};

export default forwardRef((props: WeekDayTasksProps, ref) => {

  // --- tasks

  const [tasks, setTasks] = useState<any[]>([
    { id: "1", text: "task1", },
    { id: "2", text: "task2", },
  ]);

  // --- ui: task
  
  const TaskUi = (task: TaskProps) => (
    <div key={task.id}>
      <Space direction="horizontal" size="middle" style={{width: "100%"}}>
        <Task id={task.id}/>
        <div>{task.text}</div>
      </Space>
    </div>
  );

  // --- ui

  return <>
  <div>
    {tasks.map((task: any) => TaskUi(task))}
  </div>
  </>;
});
