import * as migration_20250224_151910 from './20250224_151910';

export const migrations = [
  {
    up: migration_20250224_151910.up,
    down: migration_20250224_151910.down,
    name: '20250224_151910'
  },
];
