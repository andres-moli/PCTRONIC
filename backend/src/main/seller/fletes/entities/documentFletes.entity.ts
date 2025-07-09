import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { VisitTypeStatusEnum } from '../emun/visit-type.enum';

@Entity({ name:'cyt_fletesDocument'})
@ObjectType()
export class FletesDocument extends CrudEntity {
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_CEDULA?: string; // Cedula
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_NOMCLI?: string; // Nombre del cliente
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_FECHA?: string; // Fecha
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_TIPMOV?: string; // Tipo de movimiento
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_PREFIJ?: string; // Prefijo
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_NUMDOC?: string; // Número de documento
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_VENDED?: string; // Vendedor
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_VENTA?: string; // Venta
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_VALCOS?: string; // Costo
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_UTILIDAD?: string; // Utilidad
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    TEM_PORCENTAJE_UTILIDAD?: string; // Porcentaje de utilidad
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    CL_DEPART?: string; // Departamento
  
    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    CLI_CIUDAD?: string; // Ciudad

}
