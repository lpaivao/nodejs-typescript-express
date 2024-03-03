// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Projeto } from "./projeto";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    	id: number;

    @Column()
    	nome: string;

    @Column()
    	cpf: string;

    @Column()
    	data_nasc: Date;

    @OneToMany(() => Projeto, projeto => projeto.usuario)
    	projetos: Projeto[];
}


export interface usuario {
    id: number,
    nome: string,
    cpf: string,
    data_nasc: Date
}