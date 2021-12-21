import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaRepository } from './area.repository';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {

  constructor(
    @InjectRepository(AreaRepository)
    private areaRepository: AreaRepository
  ) { }

  create(createAreaDto: CreateAreaDto) {
    return this.areaRepository.save(createAreaDto);
  }

  async findAll() {
    const area = await this.areaRepository.find()

    if(area.length === 0) throw new NotFoundException('Não foram encontradas areas')

    return area;
  }

  async findOne(id: number) {
    const area = await this.areaRepository.findOne(id)

    if(!area) throw new NotFoundException('Não foi encontrado uma area com esse Id')
  
    return area;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
