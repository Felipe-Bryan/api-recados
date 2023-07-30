import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  schema: 'taskvault',
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
});

export default config;
