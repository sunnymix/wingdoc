import { Button } from 'antd';
import { Children, ReactNode } from 'react';
import OptionIcon from '../icon/OptionIcon';

const OptionButton = (props: any) => {
  const { } = props;

  return <>
  <Button type="text" size="small" style={{paddingLeft: 4, paddingRight: 4,}} {...props}><OptionIcon/></Button>
  </>
}

export default OptionButton;
