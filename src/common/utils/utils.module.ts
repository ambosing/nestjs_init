import { Module } from '@nestjs/common';
import { TimeUtils } from './time.utils';

@Module({
  providers: [TimeUtils],
  exports: [TimeUtils],
})
export class UtilsModule {}
