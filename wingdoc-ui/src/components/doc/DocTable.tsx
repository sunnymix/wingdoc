import { FC, useEffect, useState } from 'react';
import { Space, Input, Button } from 'antd';
import DocApi from './DocApi';
import TableStyle from '../common/TableStyle.css';
import { history, Link } from 'umi';

const DocTable: FC<{}> = ({}) => {
  const [datas, setDatas] = useState([]);
  
  const searchDocs = () => {
    DocApi.getDocList({}, (newDocs: any) => {
      setDatas(newDocs);
    });
  };

  useEffect(() => {
    searchDocs();
  }, []);

  const handleAdd = () => {
    DocApi.addDoc({ title: "", author: "" }, (newDoc: any) => {
      searchDocs();
    });
  };
  
  return (
  <>
  <Space 
    direction="vertical"
    size="middle"
    style={{
      width: "100%",
      padding: 0,
    }}>
    <Space direction="horizontal" size="middle">
      <Input placeholder="Search"/>
      <Button type="default">Search</Button>
      <Button type="default" onClick={handleAdd}>Add</Button>
    </Space>
    <table 
      className={TableStyle.simple}
      style={{width: "auto"}}
      >
      <tbody>
      {datas.map((data: any, index: number) => (
        <tr
          key={data.id}
          onClick={() => history.push(`/doc/${data.id}`)}>
          <td>{data.title}</td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;0</td>
        </tr>
      ))}
      </tbody>
    </table>
    <Space direction="horizontal" size="small">
      <div className={TableStyle.simple_tail}>Total: {datas.length}</div>
    </Space>
  </Space>
  </>
  );
};

export default DocTable;
