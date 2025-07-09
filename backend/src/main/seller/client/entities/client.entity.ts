import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { City } from 'src/general/city/entities/city.entity';
import { Department } from 'src/general/department/entities/departament.entity';
import { Country } from 'src/general/country/entities/country.entity';
import { User } from 'src/security/users/entities/user.entity';
import { TypeClientEnum } from '../emun/client.enum';

@Entity({ name:'cyt_client'})
@ObjectType()
export class Client extends CrudEntity {

  @Column()
  @Field(() => String)
  name:string;

  @Column()
  @Field(() => String)
  numberDocument:string;

  @Column()
  @Field(() => String)
  email:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  telefono?:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  address?:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  descripcion?:string;

  @Column({nullable: true})
  @Field(() => TypeClientEnum, {nullable: true})
  type?: TypeClientEnum;
  
  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  vertical?: string

  @Column()
  @Field(() => String)
  celular:string;

  @ManyToOne( () => City, (city) => city.id ,{ lazy: true, nullable: true })  
  @Field(() => City, {nullable: true}) 
  city?: City;

  @ManyToOne( () => Department, (department) => department.id ,{ lazy: true, nullable: true })  
  @Field(() => Department, {nullable: true}) 
  department?: Department;

  @ManyToOne( () => Country, (country) => country.id ,{ lazy: true, nullable: true})  
  @Field(() => Country, {nullable: true}) 
  country?: Country;

  @ManyToOne( () => User, (user) => user.id ,{ lazy: true, nullable: true})  
  @Field(() => User, {nullable: true}) 
  user?: User;
}
