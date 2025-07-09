import { InputType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { TypeWorker, UserTypes } from '../../enums/user-type.enum';
import { UserDocumentTypes } from '../../../../common/enum/document-type.enum';
import { Transform } from "class-transformer";
import { CustomPasswordScalar } from '../../scalars/password.scalar';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name:string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  middleName?: string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  lastName:string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  secondSurname?: string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => CustomPasswordScalar)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => UserDocumentTypes)
  @IsNotEmpty()
  identificationType:UserDocumentTypes;

  @Field(() => String)
  @IsNotEmpty()
  @IsNumber()
  identificationNumber: string;

  @Field(() => Date, { nullable:true})
  @IsOptional()
  @IsDate()
  dateIssue?: Date;

  @Field(() => UserDocumentTypes, { nullable:true})
  @IsOptional()
  legalRepresentativeIdentificationType?: UserDocumentTypes;

  @Field(() => String, { nullable:true})
  @IsOptional()
  @IsString()
  legalRepresentativeIdentificationNumber?: string;

  @Field(()=> TypeWorker, {nullable: true})
  @IsOptional()
  typeWoker?: TypeWorker

  @Field(() => String, { nullable:true})
  @IsOptional()
  @IsString()
  phoneCountryCode?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @Field(() => ID, { nullable:true})
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsUUID()
  countryId: string;

  @Field(() => ID, { nullable:true})
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsUUID()
  departmentId: string;

  @Field(() => ID, { nullable:true})
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsUUID()
  cityId: string;

  @Field(() => String)
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field(() => Boolean, { nullable:true})
  @IsNotEmpty()
  @IsOptional()
  hasRural: boolean;

  @Field(() => UserTypes)
  type:UserTypes;
  @Field(() => String, { nullable:true})
  @IsOptional()
  @IsString()
  position?: string
}
