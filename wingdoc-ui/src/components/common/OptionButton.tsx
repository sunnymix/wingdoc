import { Button } from 'antd';
import { Children, ReactNode } from 'react';
import OptionIcon from '../icon/OptionIcon';
import { MoreOutlined, CaretDownFilled, CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

const OptionButton = (props: any) => {
  const { } = props;

  return <>
  <Button type="text" size="small" {...props}><CaretRightOutlined /></Button>
  </>
}

export default OptionButton;
