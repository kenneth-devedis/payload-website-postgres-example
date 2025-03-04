import * as migration_20250228_150425 from './20250228_150425';

export const migrations = [
  {
    up: migration_20250228_150425.up,
    down: migration_20250228_150425.down,
    name: '20250228_150425'
  },
];
