import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { TypeWorker, UserTypes } from '../enums/user-type.enum';
import { UserDocumentTypes } from '../../../common/enum/document-type.enum';
import { UserStatusTypes } from '../enums/status-type.enum';
import { City } from '../../../general/city/entities/city.entity';
import { Department } from '../../../general/department/entities/departament.entity';
import { Country } from '../../../general/country/entities/country.entity';
import { CrudEntity } from '../../../patterns/crud-pattern/entities/crud-entity';
import { Role } from '../../roles/entities/role.entity';
import { DocumentoUsuario } from 'src/main/seller/doc/document/entities/documento-usuario.entity';

@Entity({ name: 'sec_user' })
@ObjectType()
export class User extends CrudEntity {

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  name:string;
  
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  middleName:string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  lastName:string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  secondSurname:string;

  @Column({unique:true})
  @Field(() => String)
  email:string;

  @Column()
  password:string
  
  @Column({ nullable: true })
  @Field(() => UserDocumentTypes, { nullable: true })
  identificationType: UserDocumentTypes;

  @Column({ nullable: true})
  @Field(() => String, { nullable: true })
  identificationNumber: string;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  dateIssue: Date;

  @Column({ nullable: true })
  @Field(() => UserDocumentTypes, { nullable: true })
  legalRepresentativeIdentificationType: UserDocumentTypes

  @Column({ nullable: true})
  @Field(() => String, { nullable: true })
  legalRepresentativeIdentificationNumber: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phoneCountryCode: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  hasRural: boolean;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  confirmationCode: string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  position?: string
  
  @Column({nullable: true})
  @Field(() => TypeWorker, {nullable: true})
  typeWoker?: TypeWorker

  @Column({ default: UserStatusTypes.Active })
  @Field(() => UserStatusTypes,)
  status: UserStatusTypes;

  @Column({ default: false })
  @Field(() => Boolean)
  phoneVerification: boolean

  @Column({ default: false })
  @Field(() => Boolean)
  emailVerification: boolean

  @Column()
  @Field(() => UserTypes)
  type:UserTypes;

  @ManyToMany(() => Role, (role) => role.id)
  @JoinTable({ name: 'sec_userrole' })
  roles: Role[];

  @ManyToOne( () => City, (city) => city.id ,{ lazy: true, nullable: true })  
  @Field(() => City, {nullable: true}) 
  city: City;

  @ManyToOne( () => Department, (department) => department.id ,{ lazy: true, nullable: true })  
  @Field(() => Department, {nullable: true}) 
  department: Department;

  @ManyToOne( () => Country, (country) => country.id ,{ lazy: true, nullable: true})  
  @Field(() => Country, {nullable: true}) 
  country: Country;

  @OneToMany(() => DocumentoUsuario, doc => doc.usuario, { lazy: true })
  @Field(() => [DocumentoUsuario], { nullable: true })
  documentos?: Promise<DocumentoUsuario[]>;
}
