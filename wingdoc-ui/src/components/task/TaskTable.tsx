import { forwardRef, useState } from "react";
import TableStyle from '@/components/common/TableStyle.css';
import { Space, Input, Button } from "antd";

const TaskTable = forwardRef((props, ref) => {

  const [datas, setDatas] = useState([
    {
      id: "blockid1",
      text: "task1",
      status: "NEW",
      docTitle: "00M04W4D21",
    },
    {
      id: "blockid2",
      text: "task2",
      status: "WIP",
      docTitle: "00M04W4D21",
    },
    {
      id: "blockid3",
      text: "task3",
      status: "BREAK",
      docTitle: "00M04W4D21",
    },
  ]);

  return <>
  <Space direction="vertical" size="middle" style={{width: "100%", padding: 2,}}>
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
          <th>Task</th>
          <th>Status</th>
          <th>Doc</th>
        </tr>
      </thead>
      <tbody>
      {datas.map((data: any, index: number) => (
        <tr key={data.id}>
          <td>{data.text}</td>
          <td>{data.status}</td>
          <td>{data.docTitle}</td>
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
