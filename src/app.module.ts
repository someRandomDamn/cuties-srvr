import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { ConnectionOptions } from 'typeorm';
import { DataGatheringModule } from './modules/data-gathering/data-gathering.module';
import { DataStoreModule } from './modules/data-store/data-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        useFactory: async () => {
          const configuration = await config();
          return configuration.ormConfig as ConnectionOptions;
        },
      }),
    DataStoreModule,
    DataGatheringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
