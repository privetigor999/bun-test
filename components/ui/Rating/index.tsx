import { Rate } from 'antd'
import { CSSProperties } from 'styled-components';

interface IRatingProps {
  rate: number;
  onChange: (userUpdateRate: number) => void;
  style: CSSProperties;
  props?: any;
}

export const Rating = ({rate = 0, onChange, style, ...props}: IRatingProps) => {
  return (
    <Rate
      onChange={onChange}
      style={style}
      allowHalf
      count={10}
      value={rate}
      {...props}
    />
  );
};
