import { Funcionario } from "src/funcionarios/entities/funcionario.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('area')
export class Area extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    @OneToMany(type => Funcionario, funcionario => funcionario.area)
    id: number;

    @Column()
    name: string;
}
