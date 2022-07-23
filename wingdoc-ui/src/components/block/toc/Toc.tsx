import { forwardRef } from 'react';
import './TocStyle.css';

export interface TocProps {};

export default forwardRef((props: TocProps, ref) => {

  return (
    <div>
      <div>TOC:</div>
    </div>
  );
});
