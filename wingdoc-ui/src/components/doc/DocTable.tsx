import { FC, useEffect, useState } from 'react';
import { Space, Input, Button } from 'antd';
import DocApi from './DocApi';
import TableStyle from '../common/TableStyle.css';
import { history } from 'umi';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

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
      if (newDoc) {
        history.push(`/doc/${newDoc.id}`);
      }
    });
  };

  // -- search width

  const searchWidthDefault = 75;
  const searchWidthLarge = 200;
  const [searchWidth, setSearchWidth] = useState<any>(searchWidthDefault)

  const handleSearchFocus = () => setSearchWidth(searchWidthLarge);

  const handleSearchBlur = () => setSearchWidth(searchWidthDefault);

  // --- ui
  
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
      <Input
        placeholder="Search"
        allowClear
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
        style={{width: searchWidth, paddingLeft: 5, paddingRight: 5,}}/>
      <Button type="default"><SearchOutlined/></Button>
      <Button type="default" onClick={handleAdd}><PlusOutlined/></Button>
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
          <td style={{fontFamily: '"Helvetica Neue", Helvetica, Arial',}}>{data.title}</td>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;0</td>
        </tr>
      ))}
      </tbody>
    </table>
  </Space>
  </>
  );
};

export default DocTable;
