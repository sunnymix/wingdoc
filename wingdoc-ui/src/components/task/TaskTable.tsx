import { forwardRef, useEffect, useState } from "react";
import TableStyle from '@/components/common/TableStyle.css';
import { Space, Input, Button } from "antd";
import TaskApi from "./TaskApi";
import { history } from 'umi';
import TaskStatusSelect from "./TaskStatusSelect";
import { Status } from "../block/tasker/Tasker";
import { SearchOutlined } from "@ant-design/icons";
import Tasker from "../block/tasker/Tasker";

const TaskTable = forwardRef((props, ref) => {

  // --- tasks

  const [tasks, setTasks] = useState([]);

  // --- statusIn
  // TODO：传递到选择框

  const defaultStatusIn = [Status.NEW, Status.WIP, Status.UP];

  const [statusIn, setStatusIn] = useState<Status[]>(defaultStatusIn);

  const handleStatusSelectChange = (value: Status[]) => {
    setStatusIn(value);
  };

  // --- query

  const queryTasks = () => {
    TaskApi.fetchTaskList({ statusIn }, (newDatas: any) => {
      setTasks(newDatas || []);
    });
  };

  // --- effect

  useEffect(() => {
    queryTasks();
  }, [statusIn]);


  // -- search width

  const searchWidthDefault = 75;
  const searchWidthLarge = 200;
  const [searchWidth, setSearchWidth] = useState<any>(searchWidthDefault)

  const handleSearchFocus = () => setSearchWidth(searchWidthLarge);

  const handleSearchBlur = () => setSearchWidth(searchWidthDefault);

  // --- ui

  return <>
  <Space
    direction="vertical"
    size="middle"
    style={{
      width: "100%",
      padding: 0,
    }}>
    <Space direction="horizontal" size="middle">
      <TaskStatusSelect onChange={handleStatusSelectChange}/>
      <Input
        placeholder="Search"
        allowClear
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        style={{width: searchWidth, paddingLeft: 5, paddingRight: 5,}}/>
      <Button type="default"><SearchOutlined/></Button>
    </Space>
    <table
      className={TableStyle.simple}
      style={{width: "auto"}}
      >
      <tbody>
      {tasks.map((task: any, index: number) => (
        <tr key={task.id} onClick={() => history.push(`/doc/${task.docId}?block=${task.id}`)}>
          <td>
            <Space direction="horizontal" size="small">
              <Tasker blockId={task.id} initialStatus={task.status} />
              <div style={{fontFamily: '"Helvetica Neue", Helvetica, Arial',}}>{TaskApi.wrapTaskTitle(task.task)}</div>
            </Space>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </Space>
  </>;
});

export default TaskTable;
