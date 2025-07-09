import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { verifyIdentificationNumberEvent } from '../../security/auth/constants/events.constants';

@Injectable()
export class IdentificationService {

    async verifyIdentificationNumber(IdentificationNumber: string): Promise<boolean> {
        // ! Pending to know the services to validate the identity of users (registraduría, addres, sisben, dian, etc.)
        console.log("****", IdentificationNumber, "****");

        return true;
    }

    @OnEvent(verifyIdentificationNumberEvent)
    async onPageVersionClone({
      identificationNumber,
    }: {
        identificationNumber: string;
    }): Promise<void> {
        const verify = await this.verifyIdentificationNumber(identificationNumber);

        if(!verify){
            throw new UnauthorizedException('The identity of the person could not be validated.');
        }
    }
}
