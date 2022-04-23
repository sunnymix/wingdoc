import TableStyle from '@/components/common/TableStyle.css';
import { forwardRef, useState } from "react";
import { Space, Input, Button } from "antd";
import MockImage from "@/components/mock/MockImg";

interface MediaTableProps {
}

const MediaTable = forwardRef((props: MediaTableProps, ref) => {

  const [datas, setDatas] = useState([
    {
      id: "sampleid1",
      name: "sample name1",
      url: MockImage.img50,
    },
    {
      id: "sampleid2",
      name: "sample name2",
      url: MockImage.img50,
    },
    {
      id: "sampleid3",
      name: "sample name3",
      url: MockImage.img50,
    },
  ]);

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
          <th>ID</th>
          <th>Name</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
      {datas.map((data: any, index: number) => (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>
            <img src={data.url} height="50"></img>
          </td>
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

export default MediaTable;
