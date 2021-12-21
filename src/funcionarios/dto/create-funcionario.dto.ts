import { Area } from "src/area/entities/area.entity";

export class CreateFuncionarioDto {
    name: string;

    last_name: string;

    salario: number;

    area: Area;
}