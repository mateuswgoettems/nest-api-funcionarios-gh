import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { FuncionarioRepository } from './funcionario.repository';

@Injectable()
export class FuncionariosService {

  constructor(
    @InjectRepository(FuncionarioRepository)
    private funcionarioRepository: FuncionarioRepository
  ) { }

  async createMany(json){
    return this.funcionarioRepository.insert(json)
  }

  create(createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioRepository.createFuncionario(createFuncionarioDto);
  }

  async findAll() {
    const funcionarios = await this.funcionarioRepository.find({
      relations: ['area']
    })

    if(funcionarios.length === 0) throw new NotFoundException('Não foi encontrado nenhum funcionario')

    return funcionarios;
  }

  async findOne(id: number) {
    const funcionario = await this.funcionarioRepository.findOne(id)

    if (!funcionario) throw new NotFoundException('Não foi possivel encontrar um funcionario no banco de dados')
  
    return funcionario;
  }

  async salarios(){
    const salarios = await this.funcionarioRepository.query(`SELECT NAME ||' '|| LAST_NAME AS NOME, SALARIO FROM FUNCIONARIOS WHERE SALARIO = (SELECT MAX(SALARIO) FROM FUNCIONARIOS)
    UNION ALL
    SELECT NAME ||' '|| LAST_NAME AS NOME, SALARIO FROM FUNCIONARIOS WHERE SALARIO = (SELECT MIN(SALARIO) FROM FUNCIONARIOS)
    UNION ALL
    SELECT 'MEDIA', AVG(SALARIO) AS SALARIO FROM FUNCIONARIOS`)

    return salarios;
    
  }

  async salariosArea(){
    const salarios = await this.funcionarioRepository.query(`SELECT funcionarios.NAME ||' '|| LAST_NAME AS NOME, SALARIO, area.name as area_name, 'MAXIMO' AS ORDENACAO FROM FUNCIONARIOS funcionarios
    INNER JOIN AREA area ON funcionarios."areaId" = area.id
    WHERE SALARIO IN ((SELECT MAX(SALARIO) FROM FUNCIONARIOS GROUP BY "areaId"))
    UNION ALL
    SELECT funcionarios.NAME ||' '|| LAST_NAME AS NOME, SALARIO, area.name as area_name, 'MINIMO' AS ORDENACAO FROM FUNCIONARIOS funcionarios 
    INNER JOIN AREA area ON funcionarios."areaId" = area.id
    WHERE SALARIO IN ((SELECT MIN(SALARIO) FROM FUNCIONARIOS GROUP BY "areaId"))
    UNION ALL
    SELECT 'MEDIA', AVG(SALARIO) AS SALARIO, AREA.NAME AS AREA_NAME, 'MEDIA' AS ORDENACAO FROM FUNCIONARIOS funcionarios
    INNER JOIN AREA area ON funcionarios."areaId" = area.id
    group by area.name
    order by area_name, ordenacao`)

    return salarios;
  }

  async funcionariosPorArea(){
    const funcionarios_por_area = await this.funcionarioRepository.query(`SELECT * FROM (SELECT area.name, COUNT("areaId") AS QUANTIDADE_FUNCIONARIOS from FUNCIONARIOS funcionarios
    INNER JOIN AREA area on funcionarios."areaId" = area.id
    group by area.name
    ORDER BY QUANTIDADE_FUNCIONARIOS DESC
    FETCH FIRST ROW ONLY
    ) AS QUANTIDADE_FUNCIONARIOS
    UNION ALL
    SELECT * FROM (SELECT area.name, COUNT("areaId") AS QUANTIDADE_FUNCIONARIOS from FUNCIONARIOS funcionarios
    INNER JOIN AREA area on funcionarios."areaId" = area.id
    group by area.name
    order by quantidade_funcionarios ASC
    FETCH FIRST ROW ONLY) AS QUANTIDADE_FUNCIONARIOS`);

    return funcionarios_por_area;
  }


  // update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
  //   return `This action updates a #${id} funcionario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} funcionario`;
  // }
}
