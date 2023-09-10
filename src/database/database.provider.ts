import { Sequelize } from 'sequelize-typescript';
import { getEnv } from '../utils/config/get-env';
import { Logger } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const {
        database: {
          host,
          user: username,
          password,
          name: database,
          port,
          schema,
          logging,
        },
      } = getEnv();
      const sequelize = new Sequelize({
        dialect: 'mssql',
        schema,
        host,
        port,
        username,
        password,
        database,
        sync: {
          alter: true,
          force: false,
        },
        logging: logging ? Logger.log : undefined,
      });
      sequelize.addModels([UserEntity]);
      await sequelize.sync({
        alter: true,
        force: false,
      });
      return sequelize;
    },
  },
];
