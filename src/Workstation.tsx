import confetti from 'canvas-confetti';
import clsx from 'clsx';
import _ from 'lodash';
import React, {
  useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { Computer } from './Computer';
import { Table } from './Table';
import { Effects } from './useFeatures';
import useWindowDimensions from './useWindowsDimentions';

type Props = {
  effects: Effects;
  onClick?: () => void;
}

const getDelay = (effects: Effects) => {
  const variance = effects.averageDelay * 0.90;
  const min = effects.averageDelay - variance;
  const max = effects.averageDelay + variance;
  return _.random(min, max);
};

export const Workstation = ({ onClick, effects }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const windowSize = useWindowDimensions();
  const [clickable, setClickable] = useState<boolean>(false);

  const shootConfetti = () => {
    if (_.isNil(ref.current)) return;
    const pos = ref.current?.getBoundingClientRect();
    const percentagePos = {
      x: (pos.x + (pos.width / 2)) / windowSize.width,
      y: pos.y / windowSize.height,
    };
    confetti({
      particleCount: 100,
      spread: 70,
      origin: percentagePos,
    });
  };

  const checkIn = () => {
    onClick?.();
    shootConfetti();
    setClickable(false);
  };

  useLayoutEffect(() => {
    if (clickable) {
      if (effects.autoCheckinEnabled) {
        checkIn();
      }
      return () => {};
    }

    const delayInSeconds = getDelay(effects);
    const timer = setTimeout(() => {
      setClickable(true);
    }, delayInSeconds * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [clickable]);
  const employeeLeft = useMemo(() => _.sample(['left-10', 'left-12', 'left-14']), []);
  const computerLeft = useMemo(() => _.sample(['left-8', 'left-10', 'left-12', 'left-14', 'left-16']), []);
  const handleClick = () => {
    if (!clickable) return;
    checkIn();
  };
  return (
    <div ref={ref} onClick={handleClick} className={clsx({ 'cursor-pointer': clickable })}>
      <div className="relative h-32 w-36">
        {clickable && (<img className={clsx('absolute z-40 -top-14', employeeLeft)} src="/arrow.gif" alt="Arrow" />)}
        <img className={clsx('absolute', employeeLeft)} src="/chair.png" alt="Chair" />
        {effects.autoCheckinEnabled ? (<img className={clsx('absolute -top-6 -m-[2px]', employeeLeft)} src="/cyborg.png" alt="Employee" />) : (<img className={clsx('absolute -top-1', employeeLeft)} src="/employee.png" alt="Employee" />)}
        <Computer className={clsx('absolute top-14 left-8 z-30', computerLeft)} />
        <Table className="absolute top-14 z-20" />
      </div>
    </div>
  );
};
