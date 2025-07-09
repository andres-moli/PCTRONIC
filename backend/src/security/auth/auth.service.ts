import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; 
import { UsersService } from '../users/services/users.service';
import { User } from '../users/entities/user.entity';
import { UserTypes } from '../users/enums/user-type.enum';
import { SignInInput as SigninInput, SignupEmailInput, SignUpInput as SignupInput } from './dto';
import { AuthResponse } from './types/auth-response.type';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { cityEvent, countryEvent, departmentEvent, sendVerificationCodeToJwtEvent, signupEmailEvent, verifyIdentificationNumberEvent } from './constants/events.constants';
import { UserDocumentTypes } from '../../common/enum/document-type.enum';
import { UserStatusTypes } from '../users/enums/status-type.enum';
import { ValidateTokenInput } from './dto/validate-token.input';
import { VerificationTypes } from './enum/verification-type';
import { ApprovalTokenInput } from './dto/approval-token.input';
import { checkCodeEvent, registerCodeEvent } from '../users/constants/events.constants';
import { SendDoubleVerificationInput } from './dto/send-double-verification.input';
import { SigninAdminInput } from './dto/singin-admin.input';
import { UserKeyOrigin } from '../users/enums/user-key-origin.enum';
import { IContext } from '../../patterns/crud-pattern/interfaces/context.interface';
import { TypeNotification } from '../../general/notifications/notification/enums/type-notificartion.enum';
import { calculateDigitVerification, generateRandomCode } from '../../common/functions';
import { MailService } from 'src/general/email/service/email.service';
import moment from 'moment';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
        private readonly mailService: MailService
    ){}

    async sendEmailRecovryPassword(email: string){
        try {
            const user = await this.userService.findOneByEmail({user: undefined},email,true);
            const token = this.getJwtTokenWithAuth(user);
            let contextE = {
                url: process.env.EMAIL_FRONTEND + "resetPassword/" + token,
                name: user.name + " " + user.lastName || "",
                date: moment().format("YYYY MM DD HH:mm")
            }
            await this.mailService.sendMail(email,"RECUPERAR CONTRASEÑA", "password",contextE)
            return "Correo enviado con exito"
        }catch(err) {
            new Error(err.message)
        }

    }
    async restPassword(user: User,password: string){
        return this.userService.resetPassword({user},password)
    }

    private getJwtTokenWithOutAuth( user:User ) : string {
        return this.jwtService.sign({ id: user.id, hasAuthorized: false });
    }

    private getJwtTokenWithAuth( user:User ) : string {
        return this.jwtService.sign({ id: user.id, hasAuthorized: true });
    }

    private async checkToken(token: string): Promise<User> {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            ignoreExpiration: false
        });
    
        const { id } = payload;

        const user = await this.userService.findOneById({user:undefined}, id, true)

        return user
      } catch (e) {
        throw new BadRequestException("Invalid token");
      }
    }

    private async sendVerificationCode(type: VerificationTypes, context: IContext, user: User, code: string){
        if(user.password) delete user.password;

        const origin = UserKeyOrigin.TwoSteps
        
        await this.eventEmitter.emitAsync(registerCodeEvent, {context, code, user, origin});

        if (type === VerificationTypes.Phone) {
            this.eventEmitter.emitAsync(sendVerificationCodeToJwtEvent, {context, user, code, type: TypeNotification.Sms});
        } else if (type === VerificationTypes.Email) {
            this.eventEmitter.emitAsync(sendVerificationCodeToJwtEvent, {context, user, code, type: TypeNotification.Email});
        }
    }

    async signUpWithDocument(context:IContext, signupInput: SignupInput) : Promise<AuthResponse>
    {
        const {
            name,
            email, 
            confirmationEmail, 
            password, 
            confirmationPassword, 
            identificationNumber, 
            identificationType, 
            legalRepresentativeIdentificationNumber, 
            dateIssue
        } = signupInput

        if(email !== confirmationEmail){
            throw new BadRequestException('confirmationEmail must be equal to email');
        }

        if(password !== confirmationPassword){
            throw new BadRequestException('confirmationPassword must be equal to password');
        }

        const validateDocument = await this.userService.findOneByIdentificationNumber(context, identificationNumber, identificationType ,false);

        if(validateDocument){
            throw new BadRequestException(`User with identification number: ${identificationNumber} already exists in the database`);
        }

        if(identificationType === UserDocumentTypes.Nit && !legalRepresentativeIdentificationNumber){
            throw new BadRequestException('Legal entities must have a legal representative');
        }

        if(identificationType !== UserDocumentTypes.Nit && !dateIssue){
            throw new BadRequestException('Natural persons must have the date of issuance of the document.');
        }
        
        if(identificationType === UserDocumentTypes.Nit){
            if(!name){
                throw new BadRequestException('Legal entities must have a name');
            }

            delete signupInput.middleName;
            delete signupInput.lastName;
            delete signupInput.secondSurname;
        }

        const confirmationCode = generateRandomCode(9);

        const findCountry = await this.eventEmitter.emitAsync(countryEvent, {context, countryId: signupInput.countryId});

        const country = findCountry[0];

        if(!country) throw new NotFoundException(`Country with id ${signupInput.countryId} does not exist`);

        const findDepartment = await this.eventEmitter.emitAsync(departmentEvent, {context, departmentId: signupInput.departmentId ,countryId: signupInput.countryId});

        const department = findDepartment[0];

        if(!department) throw new NotFoundException(`Department with id ${signupInput.departmentId} does not exist`);

        const findCity = await this.eventEmitter.emitAsync(cityEvent, {context, cityId: signupInput.cityId, departmentId: signupInput.departmentId});

        const city = findCity[0];

        if(!city) throw new NotFoundException(`City with id ${signupInput.cityId} does not exist`);

        const signupInputWithRandomCode = {
            ...signupInput,
            confirmationCode,
            country,
            department,
            city, 
        };

        // ! Verify Identity (It's missings the services)
        await this.eventEmitter.emitAsync(verifyIdentificationNumberEvent, { identificationNumber });

        const user = await this.userService.create(context,{ ...signupInputWithRandomCode, type:UserTypes.User }); //Signup only can be used to register "normal" users with document
        
        this.eventEmitter.emitAsync(signupEmailEvent, {context, user, confirmationCode});

        const token = this.getJwtTokenWithAuth(user);
        
        return { token, user };
    }

    async signUpWithEmail(context:IContext, signupInput: SignupEmailInput) : Promise<AuthResponse>
    {
        const { password, confirmationPassword } = signupInput

        if(password !== confirmationPassword){
            throw new BadRequestException('confirmationPassword must be equal to password')
        }

        const confirmationCode = generateRandomCode(9);

        const signupInputWithRandomCode = {
            ...signupInput,
            confirmationCode,
            type: UserTypes.User
        };
        
        const user = await this.userService.partialCreation(context, signupInputWithRandomCode); //Signup only can be used to register "normal" users with email

        this.eventEmitter.emitAsync(signupEmailEvent, {context, user, confirmationCode});

        const token = this.getJwtTokenWithAuth(user);
        
        return { token, user };
    }

    async signin(context:IContext, signinInput: SigninInput) : Promise<AuthResponse> {
        const { email, password, identificationNumber, legalRepresentativeIdentificationNumber, identificationType ,verificationDigit  } = signinInput

        const user = await this.userService.findOneByIdentificationNumberOrEmail(context, identificationNumber, email, true);

        if(user.identificationType === UserDocumentTypes.Nit){
            if(!verificationDigit || !identificationNumber) throw new UnauthorizedException('Credentials invalid');

            // Here the identificationNumber corresponds to the company number
            const validateVerificationDigit = calculateDigitVerification(identificationNumber).toString();

            if(verificationDigit !== validateVerificationDigit) throw new UnauthorizedException("The verification digit is not correct");

            const { legalRepresentativeIdentificationNumber: legalRepresentativeIdentificationNumberDb, legalRepresentativeIdentificationType: identificationTypeDb } = user;

            if((legalRepresentativeIdentificationNumber !== legalRepresentativeIdentificationNumberDb) || (identificationType !== identificationTypeDb)) throw new UnauthorizedException('Credentials invalid');

            if(email) throw new UnauthorizedException('You cant login with email');
        }

        if(user.status === UserStatusTypes.Inactive || !bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Credentials invalid');

        const token = this.getJwtTokenWithAuth(user);

        return { token, user };
    }

    async signInUserAdmin(user: User, signInAdminInput: SigninAdminInput): Promise<AuthResponse> {      
        const { phoneVerification, emailVerification } = user;

        const { verificationTypes } = signInAdminInput;

        const context = { user: undefined };

        let token: string;

        if(!phoneVerification && !emailVerification) {
            token = this.getJwtTokenWithAuth(user);
        } else {
            if( phoneVerification && emailVerification && !verificationTypes) throw new BadRequestException ("You must provide a method of verification");
    
            const code = generateRandomCode(6);
    
            if (verificationTypes) {
                if( verificationTypes === VerificationTypes.Phone && !user.phoneNumber ) throw new BadRequestException ("You must select another verification method");
    
                await this.sendVerificationCode(verificationTypes, context, user, code);
            } else {
                // This validation is performed because there are users who register by e-mail and do not provide a phone.
                if (user.phoneVerification && !user.phoneNumber) throw new BadRequestException ("You must select another verification method");
    
                if (user.phoneVerification && user.phoneNumber) await this.sendVerificationCode(VerificationTypes.Phone, context, user, code);
    
                if (user.emailVerification) await this.sendVerificationCode(VerificationTypes.Email, context, user, code);
            }

            token = this.getJwtTokenWithOutAuth(user);
        }

        return { token, user };
    }

    async validateUser(context:IContext, id: string) : Promise<User>{
        const user = await this.userService.findOne(context,id,true);

        if(user.status === UserStatusTypes.Inactive )
            throw new UnauthorizedException(`user is inactive`);

        delete user.password;

        return user;
    }

    async validateFunctionality(context: IContext, key: string, userId: string): Promise<boolean> {
        return this.userService.hasFunctionality(context, key, userId);
    }

    async validateUserToken(validateTokenInput: ValidateTokenInput): Promise<User> {
        const { token } = validateTokenInput;

        const user = await this.checkToken(token);

        delete user.password;

        return user;
    }

    async approvalJwt(approvalTokenInput: ApprovalTokenInput): Promise<AuthResponse> {
        const { code, token } = approvalTokenInput;

        const user = await this.checkToken(token);

        const checkJwtCode= await this.eventEmitter.emitAsync(checkCodeEvent, { context: {user: undefined}, code, user, origin: UserKeyOrigin.TwoSteps});

        const checkJwtCodeEv = checkJwtCode[0]        

        if(!checkJwtCodeEv) throw new UnauthorizedException('Invalid code');

        const newToken = this.getJwtTokenWithAuth(user);        
        
        return { token: newToken, user }
    }
    
    revalidateToken( user: User ) : AuthResponse
    {
        const token = this.getJwtTokenWithAuth(user);
        return { token, user };
    }

    async sendCodeDoubleVerification( sendDoubleVerificationInput: SendDoubleVerificationInput): Promise<string> {        
        const { token, email, phoneNumber } = sendDoubleVerificationInput;

        if((!email && !phoneNumber) || (email && phoneNumber)) throw new BadRequestException('You must provide at least one method of sending the code.');

        const user = await this.checkToken(token);

        const currentUser = {
            ...user,
            email: email ? email : user.email,
            phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber
        }

        const context = {user: undefined};

        const type = email ? VerificationTypes.Email : VerificationTypes.Phone;

        const code = generateRandomCode(6);

        this.sendVerificationCode(type, context, currentUser, code)

        return "Code sent successfully";
    }
}
