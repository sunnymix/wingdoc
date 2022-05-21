import { Button, Badge } from 'antd';
import { Children, ReactNode } from 'react';
import OptionIcon from '../icon/OptionIcon';
import { ExpandOutlined, MenuOutlined, BorderOutlined, BorderlessTableOutlined, ItalicOutlined, RightSquareOutlined, RightCircleOutlined, RightOutlined, EllipsisOutlined, MoreOutlined, CaretDownFilled, CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

interface OptionButtonProps {
  color?: string
}

const OptionButton = (props: OptionButtonProps) => {
  const { color } = props;

  return <>
  <Button type="text" size="small" {...props}>
    <div style={{
      width: 14,
      height: 14,
      borderLeft: '2px solid rgba(24, 144, 255, 0.5)',
      // borderRadius: "50%",
      // backgroundColor: 'rgba(24, 144, 255, 1)' || "#666",
    }}></div>
  </Button>
  </>
}

export default OptionButton;
