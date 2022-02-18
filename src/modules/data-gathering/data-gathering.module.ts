import { Module } from '@nestjs/common';
import { DataStoreModule } from '../data-store/data-store.module';
import { DataGatheringService } from './data-gathering.service';

@Module({
  imports: [
    DataStoreModule,
  ],
  providers: [DataGatheringService],
  controllers: [],
  exports: [DataGatheringService],
})
export class DataGatheringModule {}
