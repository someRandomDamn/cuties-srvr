import { ConnectionOptions } from 'typeorm';
import { NamingStrategy } from './tableNamingStrategy/NamingStrategy';

let config;

// TODO: retrieve form configLan
export const retrieveOrmConfig = async (): Promise<ConnectionOptions> => ({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  namingStrategy: new NamingStrategy(),
  synchronize: false,
  migrationsRun: true,
  subscribers: [__dirname + '/../**/*.subscriber.{js,ts}'],
});

const initialize = async () => {
  const ormConfig = await retrieveOrmConfig();
  const defaultOptions = {
    port: +process.env.PORT || 3000,
  };

  console.log(ormConfig);

  config = Object.assign(defaultOptions, { ormConfig });
  return config;
};

export default async () => config || initialize();
