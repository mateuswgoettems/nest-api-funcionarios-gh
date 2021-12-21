import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateAreaDto } from "./dto/create-area.dto";
import { Area } from "./entities/area.entity";

@EntityRepository(Area)
export class AreaRepository extends Repository<Area>{
    async createArea(createArea: CreateAreaDto) {
        const { name } = createArea;

        const area = this.create();
        area.name = name;

        try{
            await area.save();
            return area;
        }catch(err){
            throw new InternalServerErrorException('Não foi possivel salvar a area no banco de dados')
        }
    }
}