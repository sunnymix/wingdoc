import { FC } from 'react';
import DocTable from './DocTable';
import Doc from './Doc';

const DocRoutes: FC<{
  id?: string
}> = ({
  id
}) => {
  
  if (id) {
    return <Doc id={id}/>
  } else {
    return <DocTable/>
  }
};

export default DocRoutes;
