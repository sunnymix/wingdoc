import { FC, useEffect, useState } from 'react';
import { Space, Button } from 'antd';
import DocApi from './DocApi';
import TableStyle from '../common/TableStyle.css';
import { history, Link } from 'umi';

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
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {docs.map((doc: any, index: number) => (
        <tr key={doc.id}>
          <td>{doc.title}</td>
          <td>{doc.author}</td>
          <td>
            <Link to={`/doc/${doc.id}`}>See</Link>
          </td>
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
