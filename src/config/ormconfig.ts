import { retrieveOrmConfig } from './index';

// This config is used by manual typeorm commands:
// > typeorm --config /dist/config/ormconfig.js cmd
module.exports = retrieveOrmConfig();
