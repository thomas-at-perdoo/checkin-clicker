import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Workstation } from './Workstation';
import { FeatureButton } from './FeatureButton';
import { useFeatures } from './useFeatures';

export const App = () => {
  const [score, setScore] = useState(0);
  const { features, enableFeature, effects } = useFeatures();
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setSecondsPassed((x) => x + 1), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [secondsPassed]);

  return (
    <div className="p-8 bg-repeat min-h-screen" style={{ backgroundImage: 'url(/floor.png)' }}>
      <header className="flex items-start justify-between">
        <div className="bg-white p-4 text-4xl underline font-bold">
          Check-in Simulator
        </div>
        <div className="bg-white p-2 font-bold">
          <div className="flex items-center space-x-6">
            <div className="text-4xl">{score}</div>
            <div className="text-2xl">
              Check-ins
            </div>
          </div>
          <div className="flex items-center space-x-6">

            {(effects.averageDelay === 7) ? (
              <>
                <div className="text-xl">
                  1
                </div>
                <div className="text-xl">
                  check-ins / user / week
                </div>
              </>

            ) : (
              <>
                <div className="text-xl">
                  {_.round(365 / effects.averageDelay, 2)}
                </div>
                <div className="text-xl">
                  check-ins / user / year
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-xl">
              {secondsPassed}
            </div>
            <div className="text-xl">
              days passed
            </div>
          </div>
        </div>
      </header>

      <main className="flex py-12">
        <div className="space-y-12 w-3/4">

          <img src="/plant1.png" alt="Plant" />

          <div className="flex flex-wrap gap-x-8 gap-y-24">
            {(_.range(18).map((i) => (
              <Workstation key={i} effects={effects} onClick={() => setScore((x) => x + 1)} />
            )))}
          </div>

        </div>

        <aside className="w-1/4 space-y-4">
          {features.map((feature) => (
            <FeatureButton
              key={feature.tag}
              disabled={score < feature.cost}
              feature={feature}
              onClick={() => enableFeature(feature.tag)}
            />
          ))}
        </aside>
      </main>
    </div>
  );
};
