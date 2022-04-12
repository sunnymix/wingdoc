import { FC, useEffect, useState } from 'react';
import { Space } from 'antd';
import DocApi from './DocApi';
import TableStyle from '../common/TableStyle.css';

const DocTable: FC<{}> = ({}) => {
  const [docs, setDocs] = useState([]);
  
  const searchDocs = () => {
    DocApi.getDocList({}, (newDocs: any) => {
      setDocs(newDocs);
    });
  };

  useEffect(() => {
    searchDocs();
  }, []);
  
  
  return (
  <>
  <Space direction="vertical" size="middle" style={{width: "100%"}}>
    <table 
      className={TableStyle.simple}
      style={{width: "auto"}}
      >
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
      {docs.map((doc: any, index: number) => (
        <tr key={doc.id}>
          <td>{doc.id}</td>
          <td>{doc.title}</td>
          <td>{doc.author}</td>
        </tr>
      ))}
        <tr>
          <td colSpan={4} style={{ border: 0 }}>Total: {docs.length}</td>
        </tr>
      </tbody>
    </table>
  </Space>
  </>
  );
};

export default DocTable;
