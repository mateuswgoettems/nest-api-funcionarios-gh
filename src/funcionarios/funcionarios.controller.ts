import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionariosService: FuncionariosService) {}

  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionariosService.createMany(createFuncionarioDto);
  }

  @Get()
  findAll() {
    return this.funcionariosService.findAll();
  }

  @Get('/salarios')
  salarios(){
    return this.funcionariosService.salarios()
  }

  @Get('/salarios/areas')
  salariosArea(){
    return this.funcionariosService.salariosArea()
  }

  @Get('/areas')
  funcionariosPorArea(){
    return this.funcionariosService.funcionariosPorArea()
  }
}
