import { RecipientType } from "./email.enum";

export interface ICertimailsDictionary {
    [key: string]: any;
}


export interface IEmailRequest {
    ApiKey:        string;
    FromEmail:     string;
    FromEmailName: string;
    BodyType:      string;
    Subject:       string;
    Plantilla:     IEmailTemplate;
    Recipients:    IEmailRecipient[];
    CorDosPasos:   boolean;
    LotGUID:       string;
    LotName:       string;
}
export class IEmailRecipient {
    Email:          string;
    Type:           RecipientType;
    AditionalInfo?: IEmailAditionalInfo;
}
class IEmailAditionalInfo {
    Name?:     string;
    LastName?: string;
    Id?:       string;
    Phone?:    string;
}
class IEmailTemplate {
    CorTplCod:    string;
    CorTplCod02:  string;
    CorTplMdata?: string;
}


export interface IEmailResponse {
    Status:     number;
    CorGUID:    string;
    CorEtapa:   string;
    HasError:   boolean;
    ErrMessage: string;
    CorId:      string;
}