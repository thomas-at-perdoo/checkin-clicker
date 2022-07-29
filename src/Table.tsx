import React from 'react';
import clsx from 'clsx';

type Props = {
    className?: string;
}

export const Table = ({ className }: Props) => (
  <div className={clsx('flex flex-col', className)}>
    <div className="flex">
      <img src="/table-top-left.png" alt="Table" />
      <img src="/table-top-center.png" alt="Table" />
      <img src="/table-top-right.png" alt="Table" />
    </div>
    <div className="flex">
      <img src="/table-left.png" alt="Table" />
      <img src="/table-center.png" alt="Table" />
      <img src="/table-right.png" alt="Table" />
    </div>
  </div>
);
