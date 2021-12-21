import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { AreaModule } from './area/area.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'configs/typeorm.config';

@Module({
  imports: [FuncionariosModule, AreaModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
