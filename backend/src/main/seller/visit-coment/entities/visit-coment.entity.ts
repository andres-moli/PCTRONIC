import { ObjectType, Field, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { City } from 'src/general/city/entities/city.entity';
import { Department } from 'src/general/department/entities/departament.entity';
import { Country } from 'src/general/country/entities/country.entity';
import { User } from 'src/security/users/entities/user.entity';
import { Client } from '../../client/entities/client.entity';
import { VisitComentStatusEnum, VisitComentTypeEnum } from '../emun/visit-coment.emun';
import { Visit } from '../../visit/entities/visit.entity';
import moment from 'moment';
import { date } from 'joi';
import { FileInfo } from 'src/general/files/entities/file-info.entity';

@Entity({ name:'cyt_visitComent'})
@ObjectType()
export class VisitComent extends CrudEntity {

  @Column({type: "varchar", length: "8000"})
  @Field(() => String)
  description:string;
  
  
  @Column()
  @Field(() => VisitComentTypeEnum)
  type: VisitComentTypeEnum
  
  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  location?:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  latitude?: string
  
  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  longitude?: string
  
  @Column({type: 'timestamp', nullable: true})
  @Field(() => Date, {nullable: true})
  dateFull?: Date;

  @Column({ type: 'date', nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date; // Este es el campo para la fecha

  @Column({ type: 'time', nullable: true })
  @Field(() => String   , { nullable: true })
  time?: Date; 
  @Column({nullable: true})
  @Field(() => Boolean, {nullable: true})
  mocked?: boolean
  @Field(() => Date, { nullable: true })
  getFormattedTime(): string | null {
    // Si 'time' está disponible, formateamos con moment
    if (this.time) {
      return moment(this.time).format('HH:mm'); // Formatea a 'HH:mm' sin la zona horaria
    }
    return null;
  }
  @ManyToOne(()=> FileInfo, {nullable: true, lazy: true})
  @Field(() => FileInfo, { nullable: true })
  file?: FileInfo;

  @ManyToOne( () => Visit, (visit) => visit.visitItem ,{ lazy: true })  
  @Field(() => Visit) 
  visit: Visit;

  @ManyToOne( () => User, (user) => user.id ,{ lazy: true })  
  @Field(() => User) 
  user: User;
}
