import TableStyle from '@/components/common/TableStyle.css';
import { forwardRef, useState } from "react";
import { Space } from "antd";
import MockImage from "@/components/mock/MockImg";

interface MediaTableProps {
}

const MediaTable = forwardRef((props: MediaTableProps, ref) => {

  const [medias, setMedias] = useState([
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
  <Space>
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
      {medias.map((media: any, index: number) => (
        <tr key={media.id}>
          <td>{media.id}</td>
          <td>{media.name}</td>
          <td>
            <img src={media.url} height="50"></img>
          </td>
        </tr>
      ))}
        <tr>
          <td colSpan={4} style={{ border: 0 }}>
            Total: {medias.length}
          </td>
        </tr>
      </tbody>
    </table>
  </Space>
  </>;
});

export default MediaTable;
