import React from 'react';

type Props = {
    className?: string;
}

export const Computer = ({ className }: Props) => (
  <div className={className}>
    <img src="/computer-back.png" alt="Computer" />
  </div>
);
