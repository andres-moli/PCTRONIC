import { StatusVisitEnum } from "../graphql/generated/graphql";

export function translateStatusVisit(status: StatusVisitEnum): string {
    const translations: { [key in StatusVisitEnum]: string } = {
        [StatusVisitEnum.Programmed]: 'programado',
        [StatusVisitEnum.Confirmed]: 'confirmado',
        [StatusVisitEnum.Reprogrammed]: 'reprogramado',
        [StatusVisitEnum.Canceled]: 'cancelado',
        [StatusVisitEnum.Realized]: 'realizado',
        [StatusVisitEnum.Initiated]: 'iniciado',
    };

    return translations[status] || status; // Si no encuentra la traducción, devuelve el valor original
}