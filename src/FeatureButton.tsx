import clsx from 'clsx';
import React from 'react';
import { Button } from './Button';
import { Feature } from './useFeatures';

type Props = {
  disabled: boolean;
  feature: Feature;
  onClick: () => void;
}

export const FeatureButton = ({
  disabled,
  feature,
  onClick,
}: Props) => (
  <Button disabled={disabled || feature.enabled} onClick={onClick} active={feature.enabled}>
    <div className={clsx('flex flex-col')}>
      <div className={clsx('text-2xl font-bold', { 'text-black': !feature.enabled, 'text-blue-50': feature.enabled })}>
        {feature.name}
        {' '}
        <span className="">
          (
          {feature.cost}
          )
        </span>
      </div>
      <div className={clsx('text-xl', { 'text-gray-500': !feature.enabled, 'text-blue-200': feature.enabled })}>{feature.description}</div>
    </div>
  </Button>
);
