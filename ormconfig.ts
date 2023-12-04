import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

const dataSource: DataSourceOptions = {
  // eslint-disable-next-line prettier/prettier
  type: "postgres",
  host: process.env.POSTGRESQL_HOST,
  port: parseInt(process.env.POSTGRESQL_PORT) || 5432,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DB,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  logging: true,
};

export default dataSource;
