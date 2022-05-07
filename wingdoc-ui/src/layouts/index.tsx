import Nav from '@/components/common/Nav';
import { useEffect } from 'react';

export default (props: any) => (<>
  <div style={{
  }}>
    <Nav/>
    <div
      style={{
        padding: "75px 15px 15px",
      }}>{props.children}</div>
  </div>
  </>);
