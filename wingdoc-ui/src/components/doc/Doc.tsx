import { FC } from 'react';
import DocTable from './DocTable';
import DocInfo from './DocInfo';

const Doc: FC<{
  id?: string
}> = ({
  id
}) => {
  
  if (id) {
    return <DocInfo id={id}/>
  } else {
    return <DocTable/>
  }
};

export default Doc;
