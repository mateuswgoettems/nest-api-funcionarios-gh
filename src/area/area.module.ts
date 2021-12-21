import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository])],
  controllers: [AreaController],
  providers: [AreaService]
})
export class AreaModule { }
