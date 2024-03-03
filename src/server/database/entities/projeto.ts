/* eslint-disable no-mixed-spaces-and-tabs */
// projeto.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Usuario } from "./usuario";

@Entity()
export class Projeto {
    @PrimaryGeneratedColumn()
    	id: number;

    @Column()
    	id_usuario: number;

    @ManyToOne(() => Usuario, usuario => usuario.projetos)
    @JoinColumn({ name: "id_usuario" })
    	usuario: Usuario;
}