import * as migration_20250227_161027 from './20250227_161027';
import * as migration_20250227_162013 from './20250227_162013';

export const migrations = [
  {
    up: migration_20250227_161027.up,
    down: migration_20250227_161027.down,
    name: '20250227_161027',
  },
  {
    up: migration_20250227_162013.up,
    down: migration_20250227_162013.down,
    name: '20250227_162013'
  },
];
