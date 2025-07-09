import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { City } from 'src/general/city/entities/city.entity';
import { Department } from 'src/general/department/entities/departament.entity';
import { Country } from 'src/general/country/entities/country.entity';
import { User } from 'src/security/users/entities/user.entity';
import { Client } from '../../client/entities/client.entity';
import { StatusVisitEnum } from '../emun/visit.emun';
import { VisitType } from '../../visit-type/entities/visit-type.entity';
import { VisitComent } from '../../visit-coment/entities/visit-coment.entity';
import { VisitToolUnit } from '../../tools/tool-visit/entities/visit-tool-unit.entity';
// import { Proyect } from '../../proyect/entities/proyect.entity';

@Entity({ name:'cyt_visit'})
@ObjectType()
export class Visit extends CrudEntity {

  @Column()
  @Field(() => String)
  description:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  location?:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  latitude?: string
  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  longitude?: string

  @Column({nullable: true})
  @Field(() => Boolean, {nullable: true})
  mocked?: boolean

  @Column({type: 'timestamp'})
  @Index()
  @Field(() => Date)
  dateVisit: Date;

  @Column({default: StatusVisitEnum.programmed})
  @Field(() => StatusVisitEnum)
  status: StatusVisitEnum;

  // @Column({type: 'boolean'})
  // @Field(() => Boolean)
  // isProyect: boolean;

  // @ManyToOne( () => Client, (client) => client.id ,{ lazy: true})  
  // @Field(() => Client) 
  // client: Client;
  @OneToMany(() => VisitToolUnit, vtu => vtu.visit,{lazy: true})
  @Field(() => [VisitToolUnit], { nullable: true })
  toolUnitsUsed: VisitToolUnit[];
  
  @ManyToOne( () => VisitType, (type) => type.id ,{ lazy: true, nullable: true})  
  @Field(() => VisitType, {nullable: true}) 
  type?: VisitType;

  @OneToMany( () => VisitComent,(item) => item.visit,{ lazy: true })  
  @Field(() => [VisitComent])
  visitItem: VisitComent[];

  @ManyToOne( () => User, (user) => user.id ,{ lazy: true })  
  @Field(() => User) 
  @Index()
  user: User;

  // @ManyToOne( () => Proyect, (proyect) => proyect.id ,{ lazy: true, nullable: true})
  // @Field(() => Proyect, {nullable: true}) 
  // proyect?: Proyect;
}
