import { Area } from 'src/area/entities/area.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('funcionarios')
export class Funcionario extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    salario: number;   

    @ManyToOne(type => Area, area => area.id)
    area: Area;
}
