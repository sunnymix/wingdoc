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
      width: 6,
      height: 6,
      borderRadius: "50%",
      backgroundColor: color || "rgba(24, 144, 255, 1)",
    }}></div>
  </Button>
  </>
}

export default OptionButton;
