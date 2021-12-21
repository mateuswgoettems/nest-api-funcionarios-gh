import { Module } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosController } from './funcionarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioRepository } from './funcionario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FuncionarioRepository])],
  controllers: [FuncionariosController],
  providers: [FuncionariosService]
})
export class FuncionariosModule { }
