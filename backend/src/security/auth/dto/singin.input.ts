import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { PersonTypes } from "../../../common/enum/person-type.enum";
import { UserDocumentTypes } from "../../../common/enum/document-type.enum";

@InputType()
export class SigninInput
{
    @Field(() => PersonTypes, { nullable:true})
    @IsOptional()
    personType?: PersonTypes;

    @Field(() => UserDocumentTypes, { nullable:true})
    @IsOptional()
    identificationType?:UserDocumentTypes;

    @Field(() => String, { nullable:true})
    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    identificationNumber?: string;

    @Field(() => String, { nullable:true})
    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    legalRepresentativeIdentificationNumber?: string;

    @Field(() => String, { nullable:true})
    @Transform(({ value }) => value.trim())
    @IsOptional()
    @IsString()
    verificationDigit?: string;

    @Field(() => String, { nullable:true})
    @Transform(({ value }) => value.trim())
    @IsEmail()
    @IsOptional()
    email?: string;

    @Field(() => String)
    @Transform(({ value }) => value.trim())
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password:string;
}