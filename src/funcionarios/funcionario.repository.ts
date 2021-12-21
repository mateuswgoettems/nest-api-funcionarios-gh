import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateFuncionarioDto } from "./dto/create-funcionario.dto";
import { Funcionario } from "./entities/funcionario.entity";

@EntityRepository(Funcionario)
export class FuncionarioRepository extends Repository<Funcionario>{
    async createFuncionario(
        createFuncionario: CreateFuncionarioDto
    ) {

        const { name, last_name, area, salario } = createFuncionario

        const funcionario = this.create();
        funcionario.name = name;
        funcionario.last_name = last_name;
        funcionario.area = area;
        funcionario.salario = salario;
        try {
            await funcionario.save();
            return funcionario;
        } catch (err) {
            console.log(err)
            throw new InternalServerErrorException('Não foi possivel salvar o funcionario no banco de dados')
        }
    }
}