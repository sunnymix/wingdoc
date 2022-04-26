import TableStyle from '@/components/common/TableStyle.css';
import { forwardRef, useState } from "react";
import { Space, Input, Button } from "antd";
import MockImage from "@/components/mock/MockImg";
import { SearchOutlined } from "@ant-design/icons";

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
