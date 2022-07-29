import _ from 'lodash';
import { useState } from 'react';

export type FeatureTag =
  'Nudge' |
  'SuccessPage' |
  'Reactions' |
  'Streaks' |
  'Achievements' |
  'LeaderBoard' |
  'Coaching' |
  'AiGenerateCheckins'

export type FeatureEffects = {
  reducedDelay?: number;
  autoCheckinEnabled?: boolean;
}

export type Effects = {
  reducedDelay: number;
  autoCheckinEnabled: boolean;
  maxReducedDelay: number;
  averageDelay: number;
}

export type Feature = {
  tag: FeatureTag;
  cost: number;
  enabled: boolean;
  name: string;
  description: string;
  effects: FeatureEffects;
}

export type UseFeaturesPayload = {
  features: Feature[];
  enableFeature: (tag: FeatureTag) => void;
  effects: Effects;
};

export const useFeatures = (): UseFeaturesPayload => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      tag: 'Nudge',
      name: 'Nudge buttons',
      description: 'Reduces delay between check-ins by 1 days',
      cost: 4,
      enabled: false,
      effects: {
        reducedDelay: 1,
        autoCheckinEnabled: true,
      },
    },
    {
      tag: 'Reactions',
      name: 'Reactions',
      description: 'Reduces delay between check-ins by 2 days',
      cost: 8,
      enabled: false,
      effects: {
        reducedDelay: 2,
      },
    },
    {
      tag: 'Streaks',
      name: 'Streaks',
      description: 'Reduces delay between check-ins by 4 days',
      cost: 15,
      enabled: false,
      effects: {
        reducedDelay: 4,
      },
    },
    {
      tag: 'Achievements',
      name: 'Achievements',
      description: 'Reduces delay between check-ins by 8 days',
      cost: 16,
      enabled: false,
      effects: {
        reducedDelay: 8,
      },
    },
    {
      tag: 'LeaderBoard',
      name: 'Leaderboard',
      description: 'Reduces delay between check-ins by 16 days',
      cost: 23,
      enabled: false,
      effects: {
        reducedDelay: 16,
      },
    },
    {
      tag: 'Coaching',
      name: 'Coaching session',
      description: 'Reduces delay between check-ins by 32 days',
      cost: 42,
      enabled: false,
      effects: {
        reducedDelay: 32,
      },
    },
    {
      tag: 'AiGenerateCheckins',
      name: 'AI generated check-in',
      description: 'A machine auto generates check-ins for users',
      cost: 82,
      enabled: false,
      effects: {
        autoCheckinEnabled: true,
      },
    },
  ]);

  const enableFeature = (tag: FeatureTag) => setFeatures((list) => {
    const newList = list.map((f) => (f.tag === tag ? { ...f, enabled: true } : f));
    return newList;
  });

  // eslint-disable-next-line max-len
  const enabledFeatures = features.filter((x) => x.enabled);
  const reducedDelay = _.sum(enabledFeatures.map((x) => x.effects.reducedDelay ?? 0));
  const autoCheckinEnabled = enabledFeatures.some((x) => x.effects.autoCheckinEnabled);
  const maxReducedDelay = _.sum(features.map((x) => x.effects.reducedDelay ?? 0));
  const targetDelay = 7;
  const averageDelay = targetDelay + maxReducedDelay - reducedDelay;
  const effects = {
    reducedDelay,
    autoCheckinEnabled,
    maxReducedDelay,
    averageDelay,
  };

  return {
    features,
    enableFeature,
    effects,
  };
};
