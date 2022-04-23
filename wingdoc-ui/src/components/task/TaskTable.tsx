import { forwardRef, useEffect, useState } from "react";
import TableStyle from '@/components/common/TableStyle.css';
import { Space, Input, Button } from "antd";
import TaskApi from "./TaskApi";
import { Link } from 'umi';

const TaskTable = forwardRef((props, ref) => {

  const [datas, setDatas] = useState([]);

  const refreshDatas = () => {
    TaskApi.getTaskList({}, (newDatas: any) => {
      setDatas(newDatas || []);
    });
  };

  useEffect(() => {
    refreshDatas();
  }, []);

  return <>
  <Space
    direction="vertical"
    size="middle"
    style={{
      width: "100%",
      padding: 0,
    }}>
    <Space direction="horizontal" size="small">
      <Input placeholder="Search"/>
      <Button type="default">Search</Button>
    </Space>
    <table
      className={TableStyle.simple}
      style={{width: "auto"}}
      >
      <thead>
        <tr>
          <th>Doc</th>
          <th>Task</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {datas.map((data: any, index: number) => (
        <tr key={data.id}>
          <td><Link to={`/doc/${data.docId}`} style={{color: "#444"}}>{data.docTitle}</Link></td>
          <td><Link to={`/doc/${data.docId}`} style={{color: "#444"}}>{data.task}</Link></td>
          <td>{data.status}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <Space direction="horizontal" size="small">
      <div className={TableStyle.simple_tail}>Total: {datas.length}</div>
    </Space>
  </Space>
  </>;
});

export default TaskTable;
