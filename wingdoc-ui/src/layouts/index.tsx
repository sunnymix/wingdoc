import Nav from '@/components/common/Nav';
import { useEffect } from 'react';

export default (props: any) => (<>
  <div style={{
    padding: 15,
  }}>
    <Nav/>
    <div>{props.children}</div>
  </div>
  </>);
