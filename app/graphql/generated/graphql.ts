import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  ValidatePassword: { input: any; output: any; }
};

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type ApprovalTokenInput = {
  code: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type City = {
  __typename?: 'City';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']['output']>;
  celular: Scalars['String']['output'];
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  descripcion?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  numberDocument: Scalars['String']['output'];
  telefono?: Maybe<Scalars['String']['output']>;
  type?: Maybe<TypeClientEnum>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  vertical?: Maybe<Scalars['String']['output']>;
};

export type ClientContact = {
  __typename?: 'ClientContact';
  celular: Scalars['String']['output'];
  client?: Maybe<Client>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  telefono?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ClientContactModel = {
  __typename?: 'ClientContactModel';
  client: Client;
  contact: Array<ClientContact>;
};

export type CodeConfirmationInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']['input']>;
  role: Scalars['ID']['input'];
};

export type CreateClientContactInput = {
  celular: Scalars['String']['input'];
  clientId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  position: Scalars['String']['input'];
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  celular: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  numberDocument: Scalars['String']['input'];
  telefono?: InputMaybe<Scalars['String']['input']>;
  type: TypeClientEnum;
  userId?: InputMaybe<Scalars['String']['input']>;
  vertical?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDocumentTypeInput = {
  document: Scalars['String']['input'];
};

export type CreateDocumentoUsuarioInput = {
  estado?: EstadoDocumento;
  fileId: Scalars['String']['input'];
  observaciones?: InputMaybe<Scalars['String']['input']>;
  tipoDocumentoId: Scalars['String']['input'];
  usuarioId: Scalars['String']['input'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField: Scalars['DateTime']['input'];
  thirdField: Scalars['Float']['input'];
};

export type CreateFletesInput = {
  backComision: Scalars['Float']['input'];
  carrier: Scalars['String']['input'];
  carrierCell: Scalars['String']['input'];
  contactClient: Scalars['String']['input'];
  description: Scalars['String']['input'];
  numberDocument: Scalars['String']['input'];
  numberGuia: Scalars['String']['input'];
  oip: Scalars['Float']['input'];
  valueFlete: Scalars['Float']['input'];
};

export type CreateGroupInput = {
  name: Scalars['String']['input'];
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateMultikeyRegisterInput = {
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id: MultikeyRegisterIdInput;
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype: Scalars['String']['input'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  metadata: Scalars['String']['input'];
  name: Scalars['String']['input'];
  notificationConfigId: Scalars['ID']['input'];
};

export type CreateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  metadata: Scalars['String']['input'];
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  notificationGroupName?: InputMaybe<Scalars['ID']['input']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String']['input'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['ID']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreatePageLinkInput = {
  arguments?: InputMaybe<Array<Scalars['String']['input']>>;
  routeType?: InputMaybe<RouterType>;
  target?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateParametersInput = {
  codigo: Scalars['String']['input'];
  descripcion: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProfileInput = {
  city: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  document: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  region: Scalars['Int']['input'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTipoDocumentoInput = {
  activo?: Scalars['Boolean']['input'];
  descripcion?: InputMaybe<Scalars['String']['input']>;
  nombre: Scalars['String']['input'];
  obligatorio?: Scalars['Boolean']['input'];
};

export type CreateToolInput = {
  name: Scalars['String']['input'];
  reference: Scalars['String']['input'];
};

export type CreateToolUnitInput = {
  name: Scalars['String']['input'];
  status?: ToolUnitStatusEnum;
  toolId: Scalars['ID']['input'];
};

export type CreateToolUnitPhotoInput = {
  fileId: Scalars['String']['input'];
  visitToolUnitId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  address: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  hasRural?: InputMaybe<Scalars['Boolean']['input']>;
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneCountryCode?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
  secondSurname?: InputMaybe<Scalars['String']['input']>;
  type: UserTypes;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type CreateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  dateFull?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  mocked?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<VisitComentStatusEnum>;
  time?: InputMaybe<Scalars['DateTime']['input']>;
  type: VisitComentTypeEnum;
  visitId: Scalars['String']['input'];
};

export type CreateVisitInput = {
  dateVisit: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  mocked?: InputMaybe<Scalars['Boolean']['input']>;
  status: StatusVisitEnum;
  tools?: InputMaybe<Array<CreateVisitToolUnitInput>>;
  typeId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateVisitToolUnitAllInput = {
  input: Array<CreateVisitToolUnitInput>;
};

export type CreateVisitToolUnitInput = {
  /** URLs de las fotos */
  photoUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  toolUnitId: Scalars['ID']['input'];
  usageDate?: InputMaybe<Scalars['DateTime']['input']>;
  visitId: Scalars['ID']['input'];
};

export type CreateVisitTypeInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: VisitTypeStatusEnum;
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _eq?: InputMaybe<Scalars['DateTime']['input']>;
  _gt?: InputMaybe<Scalars['DateTime']['input']>;
  _gte?: InputMaybe<Scalars['DateTime']['input']>;
  _in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  _lt?: InputMaybe<Scalars['DateTime']['input']>;
  _lte?: InputMaybe<Scalars['DateTime']['input']>;
  _neq?: InputMaybe<Scalars['DateTime']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int']['output'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DocumentType = {
  __typename?: 'DocumentType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  document: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DocumentoUsuario = {
  __typename?: 'DocumentoUsuario';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  estado: EstadoDocumento;
  file: FileInfo;
  id: Scalars['ID']['output'];
  observaciones?: Maybe<Scalars['String']['output']>;
  tipoDocumento: TipoDocumento;
  updatedAt: Scalars['DateTime']['output'];
  usuario: User;
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  emailVerification?: InputMaybe<Scalars['Boolean']['input']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstField: Scalars['String']['output'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID']['output'];
  items: Array<DummyItem>;
  notification?: Maybe<Notification>;
  phone: Scalars['String']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  dummy: Dummy;
  firstField: Scalars['String']['output'];
  fourthField: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  secondField: Scalars['DateTime']['output'];
  thirdField: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmailRecipient = {
  email: Scalars['String']['input'];
  type: RecipientType;
};

export enum EstadoDocumento {
  Aceptado = 'ACEPTADO',
  Pendiente = 'PENDIENTE',
  Rechazado = 'RECHAZADO'
}

export type FacturaPorClienteDto = {
  tem_cedula?: InputMaybe<Scalars['String']['input']>;
  tem_fecha_desde?: InputMaybe<Scalars['String']['input']>;
  tem_fecha_hasta?: InputMaybe<Scalars['String']['input']>;
  tem_nomcli?: InputMaybe<Scalars['String']['input']>;
  tem_numdoc?: InputMaybe<Scalars['String']['input']>;
  tem_vended?: InputMaybe<Scalars['String']['input']>;
};

export type FileInfo = {
  __typename?: 'FileInfo';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fileExtension: Scalars['String']['output'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export enum FileModes {
  Buffer = 'buffer',
  Mongo = 'mongo',
  Url = 'url'
}

export type FindClientContactOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientContactWhere = {
  _and?: InputMaybe<Array<FindClientContactWhere>>;
  _or?: InputMaybe<Array<FindClientContactWhere>>;
  client?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
};

export type FindClientOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientWhere = {
  _and?: InputMaybe<Array<FindClientWhere>>;
  _or?: InputMaybe<Array<FindClientWhere>>;
  city?: InputMaybe<StringFilter>;
  department?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindDocOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindDocWhere = {
  _and?: InputMaybe<Array<FindDocWhere>>;
  _or?: InputMaybe<Array<FindDocWhere>>;
  tipoDocumento?: InputMaybe<StringFilter>;
  usuario?: InputMaybe<StringFilter>;
};

export type FindDummyFamilyWhere = {
  _and?: InputMaybe<Array<FindDummyFamilyWhere>>;
  _or?: InputMaybe<Array<FindDummyFamilyWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyGroupWhere = {
  _and?: InputMaybe<Array<FindDummyGroupWhere>>;
  _or?: InputMaybe<Array<FindDummyGroupWhere>>;
  family?: InputMaybe<FindDummyFamilyWhere>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyOrderBy = {
  firstField?: InputMaybe<OrderTypes>;
  secondField?: InputMaybe<OrderTypes>;
  thirdField?: InputMaybe<OrderTypes>;
};

export type FindDummyTypeWhere = {
  _and?: InputMaybe<Array<FindDummyTypeWhere>>;
  _or?: InputMaybe<Array<FindDummyTypeWhere>>;
  name?: InputMaybe<StringFilter>;
};

export type FindDummyWhere = {
  _and?: InputMaybe<Array<FindDummyWhere>>;
  _or?: InputMaybe<Array<FindDummyWhere>>;
  firstField?: InputMaybe<StringFilter>;
  group?: InputMaybe<FindDummyGroupWhere>;
  secondField?: InputMaybe<DateFilter>;
  thirdField?: InputMaybe<NumberFilter>;
  type?: InputMaybe<FindDummyTypeWhere>;
};

export type FindFletesOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindFletesWhere = {
  _and?: InputMaybe<Array<FindFletesWhere>>;
  _or?: InputMaybe<Array<FindFletesWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindToolOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindToolUnitOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindToolUnitWhere = {
  _and?: InputMaybe<Array<FindToolUnitWhere>>;
  _or?: InputMaybe<Array<FindToolUnitWhere>>;
  serialNumber?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindToolWhere = {
  _and?: InputMaybe<Array<FindToolWhere>>;
  _or?: InputMaybe<Array<FindToolWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type FindUsersOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  email?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindUsersWhere = {
  _and?: InputMaybe<Array<FindUsersWhere>>;
  _or?: InputMaybe<Array<FindUsersWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<Array<UserTypes>>;
};

export type FindVisitComentOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  date?: InputMaybe<OrderTypes>;
};

export type FindVisitComentWhere = {
  _and?: InputMaybe<Array<FindVisitComentWhere>>;
  _or?: InputMaybe<Array<FindVisitComentWhere>>;
  date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
  visit?: InputMaybe<StringFilter>;
};

export type FindVisitOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  dateVisit?: InputMaybe<OrderTypes>;
};

export type FindVisitToolUnitOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindVisitToolUnitPhotoOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindVisitToolUnitPhotoWhere = {
  _and?: InputMaybe<Array<FindVisitToolUnitPhotoWhere>>;
  _or?: InputMaybe<Array<FindVisitToolUnitPhotoWhere>>;
  url?: InputMaybe<StringFilter>;
  visitToolUnit?: InputMaybe<StringFilter>;
};

export type FindVisitToolUnitWhere = {
  _and?: InputMaybe<Array<FindVisitToolUnitWhere>>;
  _or?: InputMaybe<Array<FindVisitToolUnitWhere>>;
  comment?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
};

export type FindVisitTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindVisitTypeWhere = {
  _and?: InputMaybe<Array<FindVisitTypeWhere>>;
  _or?: InputMaybe<Array<FindVisitTypeWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindVisitWhere = {
  _and?: InputMaybe<Array<FindVisitWhere>>;
  _or?: InputMaybe<Array<FindVisitWhere>>;
  client?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  dateVisit?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type Fletes = {
  __typename?: 'Fletes';
  backComision: Scalars['Float']['output'];
  carrier: Scalars['String']['output'];
  carrierCell: Scalars['String']['output'];
  contactClient: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  numberDocument: Scalars['String']['output'];
  numberGuia: Scalars['String']['output'];
  oip: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  valueFlete: Scalars['Float']['output'];
};

export type FletesWithDocument = {
  __typename?: 'FletesWithDocument';
  CLI_CIUDAD?: Maybe<Scalars['String']['output']>;
  CL_DEPART?: Maybe<Scalars['String']['output']>;
  TEM_CEDULA?: Maybe<Scalars['String']['output']>;
  TEM_FECHA?: Maybe<Scalars['String']['output']>;
  TEM_NOMCLI?: Maybe<Scalars['String']['output']>;
  TEM_NUMDOC?: Maybe<Scalars['String']['output']>;
  TEM_PORCENTAJE_UTILIDAD?: Maybe<Scalars['String']['output']>;
  TEM_PREFIJ?: Maybe<Scalars['String']['output']>;
  TEM_TIPMOV?: Maybe<Scalars['String']['output']>;
  TEM_UTILIDAD?: Maybe<Scalars['String']['output']>;
  TEM_VALCOS?: Maybe<Scalars['String']['output']>;
  TEM_VENDED?: Maybe<Scalars['String']['output']>;
  TEM_VENTA?: Maybe<Scalars['String']['output']>;
  backComision?: Maybe<Scalars['Float']['output']>;
  carrier?: Maybe<Scalars['String']['output']>;
  carrierCell?: Maybe<Scalars['String']['output']>;
  contactClient?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  numberDocument?: Maybe<Scalars['String']['output']>;
  numberGuia?: Maybe<Scalars['String']['output']>;
  oip?: Maybe<Scalars['Float']['output']>;
  valueFlete?: Maybe<Scalars['Float']['output']>;
};

export type FunctionalityModel = {
  __typename?: 'FunctionalityModel';
  children?: Maybe<Array<FunctionalityModel>>;
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tags?: Maybe<Array<FunctionalityTag>>;
};

export enum FunctionalityTag {
  Controller = 'CONTROLLER',
  Custom = 'CUSTOM',
  Method = 'METHOD',
  Module = 'MODULE',
  Parent = 'PARENT',
  Resolver = 'RESOLVER',
  Standard = 'STANDARD'
}

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notificationConfig?: Maybe<NotificationConfig>;
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  senderId?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type MessageInput = {
  content: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']['output']>;
  itemsPerPage?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type MultikeyRegister = {
  __typename?: 'MultikeyRegister';
  date: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: MultikeyRegisterId;
};

export type MultikeyRegisterId = {
  __typename?: 'MultikeyRegisterId';
  id: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type MultikeyRegisterIdInput = {
  id: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserRole: User;
  codeConfirmation: User;
  create: RoleFx;
  createClient: Client;
  createClientContact: ClientContact;
  createDefaultRoles: Array<Role>;
  createDocumentType: DocumentType;
  createDocumentoUsuario: DocumentoUsuario;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createFletes: Fletes;
  createGroup: Group;
  createMultiKeyRegister: MultikeyRegister;
  createNotification: Notification;
  createNotificationConfig: NotificationConfig;
  createNotificationGroup: NotificationGroup;
  createPageLinkInput: PageLink;
  createParameter: Parameter;
  createPositionInput: Position;
  createProfile: Profile;
  createRole: Role;
  createRoleFx: Array<RoleFx>;
  createTipoDocumento: TipoDocumento;
  createTool: Tool;
  createToolItem: ToolUnit;
  createToolPhoto: ToolUnitPhoto;
  createToolVisit: VisitToolUnit;
  createToolVisitAll: Scalars['String']['output'];
  createUser: User;
  createVisit: Visit;
  createVisitComent: VisitComent;
  createVisitType: VisitType;
  enableAndDisableDoubleVerification: Scalars['String']['output'];
  finishVisit: Visit;
  i18nTest: Scalars['String']['output'];
  recoverPassword: Scalars['String']['output'];
  remove: NotificationGroup;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeDocumentType: DocumentType;
  removeDocumentoUsuario: DocumentoUsuario;
  removeDummy: Dummy;
  removeFile: Scalars['String']['output'];
  removeFletes: Fletes;
  removeGroup: Group;
  removeMultiKeyRegister: MultikeyRegister;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removePageLink: PageLink;
  removeParameter: Parameter;
  removePosition: Position;
  removeProfile: Profile;
  removeRole: Role;
  removeRoleFx: Array<Scalars['String']['output']>;
  removeTipoDocumento: TipoDocumento;
  removeTool: Tool;
  removeToolItem: ToolUnit;
  removeToolPhoto: ToolUnitPhoto;
  removeToolVisit: VisitToolUnit;
  removeUser: User;
  removeUserRole: User;
  removeVisit: Visit;
  removeVisitComent: VisitComent;
  removeVisitType: VisitType;
  replaceAllRolesFx: Array<RoleFx>;
  resetPassword: User;
  resetSuperAdmin: User;
  sendCodeDoubleVerification: Scalars['String']['output'];
  sendMessage: Message;
  sendResponse: Message;
  signInAdmin: AuthResponse;
  signUpWithDocument: AuthResponse;
  signUpWithEmail: AuthResponse;
  signin: AuthResponse;
  update: NotificationGroup;
  updateClient: Client;
  updateClientContact: ClientContact;
  updateDocumentType: DocumentType;
  updateDocumentoUsuario: DocumentoUsuario;
  updateDummy: Dummy;
  updateFletes: Fletes;
  updateGroup: Group;
  updateMultiKeyRegister: MultikeyRegister;
  updateNotification: Notification;
  updateNotificationConfig: NotificationConfig;
  updatePageLinkInput: PageLink;
  updateParameter: Parameter;
  updatePassword: User;
  updatePositionInput: Position;
  updateProfile: Profile;
  updateRole: Role;
  updateTipoDocumento: TipoDocumento;
  updateTool: Tool;
  updateToolItem: ToolUnit;
  updateToolPhoto: ToolUnitPhoto;
  updateToolVisit: VisitToolUnit;
  updateUser: User;
  updateUserInformation: User;
  updateUserPassword: User;
  updateVisit: Visit;
  updateVisitComent: VisitComent;
  updateVisitType: VisitType;
};


export type MutationAddUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCreateArgs = {
  createInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateClientArgs = {
  createInput: CreateClientInput;
};


export type MutationCreateClientContactArgs = {
  createInput: CreateClientContactInput;
};


export type MutationCreateDocumentTypeArgs = {
  createInput: CreateDocumentTypeInput;
};


export type MutationCreateDocumentoUsuarioArgs = {
  createInput: CreateDocumentoUsuarioInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateFletesArgs = {
  createInput: CreateFletesInput;
};


export type MutationCreateGroupArgs = {
  createInput: CreateGroupInput;
};


export type MutationCreateMultiKeyRegisterArgs = {
  createInput: CreateMultikeyRegisterInput;
};


export type MutationCreateNotificationArgs = {
  createInput: CreateNotificationInput;
};


export type MutationCreateNotificationConfigArgs = {
  createInput: CreateNotificationConfigInput;
};


export type MutationCreateNotificationGroupArgs = {
  createInput: CreateNotificationGroupInput;
};


export type MutationCreatePageLinkInputArgs = {
  createInput: CreatePageLinkInput;
};


export type MutationCreateParameterArgs = {
  createInput: CreateParametersInput;
};


export type MutationCreatePositionInputArgs = {
  createInput: CreatePositionInput;
};


export type MutationCreateProfileArgs = {
  createInput: CreateProfileInput;
};


export type MutationCreateRoleArgs = {
  createInput: CreateRoleInput;
};


export type MutationCreateRoleFxArgs = {
  createRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateTipoDocumentoArgs = {
  createInput: CreateTipoDocumentoInput;
};


export type MutationCreateToolArgs = {
  createInput: CreateToolInput;
};


export type MutationCreateToolItemArgs = {
  createInput: CreateToolUnitInput;
};


export type MutationCreateToolPhotoArgs = {
  createInput: CreateToolUnitPhotoInput;
};


export type MutationCreateToolVisitArgs = {
  createInput: CreateVisitToolUnitInput;
};


export type MutationCreateToolVisitAllArgs = {
  createVisitToolUnitAllInput: CreateVisitToolUnitAllInput;
};


export type MutationCreateUserArgs = {
  createInput: CreateUserInput;
};


export type MutationCreateVisitArgs = {
  createInput: CreateVisitInput;
};


export type MutationCreateVisitComentArgs = {
  createInput: CreateVisitComentInput;
};


export type MutationCreateVisitTypeArgs = {
  createInput: CreateVisitTypeInput;
};


export type MutationEnableAndDisableDoubleVerificationArgs = {
  doubleVerificationInput: DoubleVerificationInput;
};


export type MutationFinishVisitArgs = {
  UpdateStatusInput: UpdateStatusInput;
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDocumentoUsuarioArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFletesArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationRemoveTipoDocumentoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveToolArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveToolItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveToolPhotoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveToolVisitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationRemoveVisitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveVisitComentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveVisitTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
};


export type MutationSendCodeDoubleVerificationArgs = {
  sendDoubleVerificationInput: SendDoubleVerificationInput;
};


export type MutationSendMessageArgs = {
  messageInput: MessageInput;
};


export type MutationSendResponseArgs = {
  messageId: Scalars['String']['input'];
  messageInput: MessageInput;
};


export type MutationSignInAdminArgs = {
  signInAdminInput: SigninAdminInput;
};


export type MutationSignUpWithDocumentArgs = {
  signupInput: SignupInput;
};


export type MutationSignUpWithEmailArgs = {
  signupInput: SignupEmailInput;
};


export type MutationSigninArgs = {
  signinInput: SigninInput;
};


export type MutationUpdateArgs = {
  updateInput: UpdateNotificationGroupInput;
};


export type MutationUpdateClientArgs = {
  updateInput: UpdateClientInput;
};


export type MutationUpdateClientContactArgs = {
  updateInput: UpdateClientContactInput;
};


export type MutationUpdateDocumentTypeArgs = {
  updateInput: UpdateDocumentTypeInput;
};


export type MutationUpdateDocumentoUsuarioArgs = {
  updateInput: UpdateDocumentoUsuarioInput;
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateFletesArgs = {
  updateInput: UpdateFletesInput;
};


export type MutationUpdateGroupArgs = {
  updateInput: UpdateGroupInput;
};


export type MutationUpdateMultiKeyRegisterArgs = {
  updateInput: UpdateMultikeyRegisterInput;
};


export type MutationUpdateNotificationArgs = {
  updateInput: UpdateNotificationInput;
};


export type MutationUpdateNotificationConfigArgs = {
  updateInput: UpdateNotificationConfigInput;
};


export type MutationUpdatePageLinkInputArgs = {
  updateInput: CreatePageLinkInput;
};


export type MutationUpdateParameterArgs = {
  updateInput: UpdateParametersInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdatePositionInputArgs = {
  updateInput: UpdatePositionInput;
};


export type MutationUpdateProfileArgs = {
  updateInput: UpdateProfileInput;
};


export type MutationUpdateRoleArgs = {
  updateInput: UpdateRoleInput;
};


export type MutationUpdateTipoDocumentoArgs = {
  updateInput: UpdateTipoDocumentoInput;
};


export type MutationUpdateToolArgs = {
  updateInput: UpdateToolInput;
};


export type MutationUpdateToolItemArgs = {
  updateInput: UpdateToolUnitInput;
};


export type MutationUpdateToolPhotoArgs = {
  updateInput: UpdateToolUnitPhotoInput;
};


export type MutationUpdateToolVisitArgs = {
  updateInput: UpdateVisitToolUnitInput;
};


export type MutationUpdateUserArgs = {
  updateInput: UpdateUserInput;
};


export type MutationUpdateUserInformationArgs = {
  updateUserInformationInput: UpdateUserInformationInput;
};


export type MutationUpdateUserPasswordArgs = {
  updateUserPasswordInput: UpdateUserPasswordInput;
};


export type MutationUpdateVisitArgs = {
  updateInput: UpdateVisitInput;
};


export type MutationUpdateVisitComentArgs = {
  updateInput: UpdateVisitComentInput;
};


export type MutationUpdateVisitTypeArgs = {
  updateInput: UpdateVisitTypeInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  externalId?: Maybe<Scalars['ID']['output']>;
  externalMessage?: Maybe<Scalars['String']['output']>;
  hasPersistent: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['String']['output']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailDuplicateCode?: Maybe<Scalars['ID']['output']>;
  emailPrincipalCode?: Maybe<Scalars['ID']['output']>;
  hasEmail: Scalars['Boolean']['output'];
  hasPersistent: Scalars['Boolean']['output'];
  hasPush: Scalars['Boolean']['output'];
  hasSms: Scalars['Boolean']['output'];
  hasTwoStepsEmail: Scalars['Boolean']['output'];
  hasTwoStepsPush: Scalars['Boolean']['output'];
  hasTwoStepsSms: Scalars['Boolean']['output'];
  hasTwoStepsWss: Scalars['Boolean']['output'];
  hasWss: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  persistentExpiration?: Maybe<Scalars['DateTime']['output']>;
  persistentHtml?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  smsBody?: Maybe<Scalars['String']['output']>;
  subtype: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  wssCode?: Maybe<Scalars['ID']['output']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  group: Group;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime']['output'];
};

export enum NotificationType {
  Token = 'Token'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']['input']>>;
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageLink = {
  __typename?: 'PageLink';
  arguments?: Maybe<Array<Scalars['String']['output']>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  routeType?: Maybe<RouterType>;
  target?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Pagination = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime']['output'];
  valueDate?: Maybe<Scalars['DateTime']['output']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']['output']>;
  valueString?: Maybe<Scalars['String']['output']>;
};

export enum PersonTypes {
  Legal = 'Legal',
  Natural = 'Natural'
}

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  document: Scalars['String']['output'];
  email: Scalars['String']['output'];
  externalId: Scalars['ID']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  region: Scalars['Int']['output'];
  stateAws?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  Count: MetadataPagination;
  Fletes: Fletes;
  Fletess: Array<Fletes>;
  FletessCount: MetadataPagination;
  NotificationGroup: NotificationGroup;
  NotificationGroups: Array<NotificationGroup>;
  NotificationGroupsCount: MetadataPagination;
  Tool: Tool;
  ToolItem: ToolUnit;
  ToolPhoto: ToolUnitPhoto;
  ToolVisit: VisitToolUnit;
  Tools: Array<Tool>;
  ToolsCount: MetadataPagination;
  ToolsItems: Array<ToolUnit>;
  ToolsItemsCount: MetadataPagination;
  ToolsPhotos: Array<ToolUnitPhoto>;
  ToolsPhotosCount: MetadataPagination;
  ToolsVisits: Array<VisitToolUnit>;
  ToolsVisitsCount: MetadataPagination;
  approvalJwt: AuthResponse;
  cities: Array<City>;
  city: City;
  client: Client;
  clientAndContact: ClientContactModel;
  clientContact: ClientContact;
  clientContacts: Array<ClientContact>;
  clientContactsCount: MetadataPagination;
  clients: Array<Client>;
  clientsCount: MetadataPagination;
  codeRecoverPassword: Scalars['String']['output'];
  countries: Array<Country>;
  country: Country;
  department: Department;
  departments: Array<Department>;
  documentType: DocumentType;
  documentTypes: Array<DocumentType>;
  documentTypesCount: MetadataPagination;
  documentoUsuario: DocumentoUsuario;
  documentosUsuario: Array<DocumentoUsuario>;
  documentosUsuarioCount: MetadataPagination;
  dummies: Array<Dummy>;
  dummiesCount: MetadataPagination;
  dummy: Dummy;
  file: FileInfo;
  findAll: Array<UserKey>;
  findAllFacturaCliente: Array<FletesWithDocument>;
  findAllVisitDashboard: VisitDashboardModel;
  findOne: UserKey;
  findOneArg?: Maybe<Position>;
  findOneFacturaClienteByCode: FindOneFacturaClienteByCode;
  functionalities: FunctionalityModel;
  getHoursByVisit: Scalars['Float']['output'];
  getMessages: Array<Message>;
  group: Group;
  groups: Array<Group>;
  groupsCount: MetadataPagination;
  multiKeyRegister: MultikeyRegister;
  multiKeyRegisters: Array<MultikeyRegister>;
  multiKeyRegistersCount: MetadataPagination;
  notification: Notification;
  notificationConfig: NotificationConfig;
  notificationConfigs: Array<NotificationConfig>;
  notificationConfigsCount: MetadataPagination;
  notifications: Array<Notification>;
  notificationsCount: MetadataPagination;
  pageLink: PageLink;
  pageLinks: Array<PageLink>;
  pageLinksCount: MetadataPagination;
  parameter: Parameter;
  parameters: Array<Parameter>;
  parametersCount: MetadataPagination;
  position: Position;
  positions: Array<Position>;
  positionsCount: MetadataPagination;
  profile: Profile;
  profiles: Array<Profile>;
  profilesCount: MetadataPagination;
  revalidate: AuthResponse;
  role: Role;
  roleFx: RoleFx;
  roles: Array<Role>;
  rolesCount: MetadataPagination;
  rolesFx: Array<RoleFx>;
  rolesFxCount: MetadataPagination;
  sendEmailRecovryPassword: Scalars['String']['output'];
  tipoDocumento: TipoDocumento;
  tiposDocumento: Array<TipoDocumento>;
  tiposDocumentoCount: MetadataPagination;
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
  visit: Visit;
  visitComent: VisitComent;
  visitComents: Array<VisitComent>;
  visitComentsCount: MetadataPagination;
  visitFindOneArg?: Maybe<Visit>;
  visitType: VisitType;
  visitTypes: Array<VisitType>;
  visitTypesCount: MetadataPagination;
  visits: Array<Visit>;
  visitsCount: MetadataPagination;
};


export type QueryCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFletesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFletessArgs = {
  orderBy?: InputMaybe<Array<FindFletesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFletesWhere>;
};


export type QueryFletessCountArgs = {
  orderBy?: InputMaybe<Array<FindFletesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFletesWhere>;
};


export type QueryNotificationGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryToolArgs = {
  id: Scalars['ID']['input'];
};


export type QueryToolItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryToolPhotoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryToolVisitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryToolsArgs = {
  orderBy?: InputMaybe<Array<FindToolOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindToolWhere>;
};


export type QueryToolsCountArgs = {
  orderBy?: InputMaybe<Array<FindToolOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindToolWhere>;
};


export type QueryToolsItemsArgs = {
  orderBy?: InputMaybe<Array<FindToolUnitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindToolUnitWhere>;
};


export type QueryToolsItemsCountArgs = {
  orderBy?: InputMaybe<Array<FindToolUnitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindToolUnitWhere>;
};


export type QueryToolsPhotosArgs = {
  orderBy?: InputMaybe<Array<FindVisitToolUnitPhotoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitToolUnitPhotoWhere>;
};


export type QueryToolsPhotosCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitToolUnitPhotoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitToolUnitPhotoWhere>;
};


export type QueryToolsVisitsArgs = {
  orderBy?: InputMaybe<Array<FindVisitToolUnitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitToolUnitWhere>;
};


export type QueryToolsVisitsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitToolUnitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitToolUnitWhere>;
};


export type QueryApprovalJwtArgs = {
  approvalTokenInput: ApprovalTokenInput;
};


export type QueryCitiesArgs = {
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientAndContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientContactArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientContactsArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientContactsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientsArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryClientsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryCodeRecoverPasswordArgs = {
  codeRecoverPasswordInput: CodeRecoverPasswordInput;
};


export type QueryCountriesArgs = {
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDepartmentArgs = {
  countryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDocumentTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDocumentTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentTypesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentoUsuarioArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDocumentosUsuarioArgs = {
  orderBy?: InputMaybe<Array<FindDocOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDocWhere>;
};


export type QueryDocumentosUsuarioCountArgs = {
  orderBy?: InputMaybe<Array<FindDocOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDocWhere>;
};


export type QueryDummiesArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummiesCountArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindAllArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFindAllFacturaClienteArgs = {
  input: FacturaPorClienteDto;
};


export type QueryFindOneArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneArgArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryFindOneFacturaClienteByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryGetHoursByVisitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type QueryMultiKeyRegistersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegistersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationConfigsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationConfigsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPageLinksArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinksCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParameterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParametersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParametersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPositionsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleFxArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRolesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySendEmailRecovryPasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryTipoDocumentoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTiposDocumentoArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryTiposDocumentoCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryUsersCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryValidateUserTokenArgs = {
  validateTokenInput: ValidateTokenInput;
};


export type QueryVisitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVisitComentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVisitComentsArgs = {
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitComentWhere>;
};


export type QueryVisitComentsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitComentWhere>;
};


export type QueryVisitFindOneArgArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};


export type QueryVisitTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVisitTypesArgs = {
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitTypeWhere>;
};


export type QueryVisitTypesCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitTypeWhere>;
};


export type QueryVisitsArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};


export type QueryVisitsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};

export enum RecipientType {
  Bcc = 'Bcc',
  Cc = 'Cc',
  Destinatary = 'Destinatary'
}

export type RecoverPasswordInput = {
  email: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  defaultForType?: Maybe<UserTypes>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  roleFx: Array<RoleFx>;
  updatedAt: Scalars['DateTime']['output'];
  users?: Maybe<Array<User>>;
};

export type RoleFx = {
  __typename?: 'RoleFx';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  permission: Scalars['String']['output'];
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum RouterType {
  ExternalRoute = 'ExternalRoute',
  InternalRouteWithArguments = 'InternalRouteWithArguments',
  InternaltRoute = 'InternaltRoute'
}

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type SigninAdminInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  verificationTypes?: InputMaybe<VerificationTypes>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  personType?: InputMaybe<PersonTypes>;
  verificationDigit?: InputMaybe<Scalars['String']['input']>;
};

export type SignupEmailInput = {
  confirmationPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
};

export type SignupInput = {
  address: Scalars['String']['input'];
  cityId: Scalars['ID']['input'];
  confirmationEmail: Scalars['String']['input'];
  confirmationPassword: Scalars['String']['input'];
  countryId: Scalars['ID']['input'];
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  hasRural: Scalars['Boolean']['input'];
  identificationNumber: Scalars['String']['input'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String']['input'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['ValidatePassword']['input'];
  phoneCountryCode: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  secondSurname?: InputMaybe<Scalars['String']['input']>;
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export enum StateNotification {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error'
}

export enum StateNotificationGroup {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error',
  PartialComplete = 'PartialComplete',
  Process = 'Process'
}

export enum StatePersistent {
  NoPersistent = 'NoPersistent',
  Open = 'Open',
  Receive = 'Receive',
  Send = 'Send'
}

export enum StatusVisitEnum {
  Canceled = 'canceled',
  Confirmed = 'confirmed',
  Initiated = 'initiated',
  Programmed = 'programmed',
  Realized = 'realized',
  Reprogrammed = 'reprogrammed'
}

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _endswith?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  _like?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _notcontains?: InputMaybe<Scalars['String']['input']>;
  _notendswith?: InputMaybe<Scalars['String']['input']>;
  _notlike?: InputMaybe<Scalars['String']['input']>;
  _notstartswith?: InputMaybe<Scalars['String']['input']>;
  _startswith?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageReceived: Message;
};

export type TipoDocumento = {
  __typename?: 'TipoDocumento';
  activo: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  descripcion?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nombre: Scalars['String']['output'];
  obligatorio: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Tool = {
  __typename?: 'Tool';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  reference: Scalars['String']['output'];
  units?: Maybe<Array<ToolUnit>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ToolUnit = {
  __typename?: 'ToolUnit';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: ToolUnitStatusEnum;
  tool: Tool;
  updatedAt: Scalars['DateTime']['output'];
  visits?: Maybe<Array<VisitToolUnit>>;
};

export type ToolUnitPhoto = {
  __typename?: 'ToolUnitPhoto';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  file: FileInfo;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visitToolUnit: VisitToolUnit;
};

/** Estado actual de la unidad de herramienta. */
export enum ToolUnitStatusEnum {
  /** Disponible */
  Available = 'AVAILABLE',
  /** Dañada */
  Damaged = 'DAMAGED',
  /** En uso */
  InUse = 'IN_USE',
  /** Perdida */
  Lost = 'LOST',
  /** En mantenimiento */
  Maintenance = 'MAINTENANCE'
}

export enum TypeClientEnum {
  ClienteFinal = 'CLIENTE_FINAL',
  Distribuidor = 'DISTRIBUIDOR',
  Instalador = 'INSTALADOR',
  Integrador = 'INTEGRADOR'
}

export enum TypeNotification {
  Email = 'Email',
  Push = 'Push',
  Sms = 'Sms',
  Wss = 'Wss'
}

export enum TypeNotificationGroup {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export enum TypeParameterEnum {
  Date = 'date',
  File = 'file',
  Number = 'number',
  String = 'string'
}

export enum TypeWorker {
  Externo = 'externo',
  Interno = 'interno'
}

export type UpdateClientContactInput = {
  celular?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  celular?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  departmentId?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  numberDocument?: InputMaybe<Scalars['String']['input']>;
  telefono?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeClientEnum>;
  userId?: InputMaybe<Scalars['String']['input']>;
  vertical?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDocumentTypeInput = {
  document?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type UpdateDocumentoUsuarioInput = {
  estado?: InputMaybe<EstadoDocumento>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  observaciones?: InputMaybe<Scalars['String']['input']>;
  tipoDocumentoId?: InputMaybe<Scalars['String']['input']>;
  usuarioId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstField?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  secondField?: InputMaybe<Scalars['DateTime']['input']>;
  thirdField?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateFletesInput = {
  backComision?: InputMaybe<Scalars['Float']['input']>;
  carrier?: InputMaybe<Scalars['String']['input']>;
  carrierCell?: InputMaybe<Scalars['String']['input']>;
  contactClient?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  numberDocument?: InputMaybe<Scalars['String']['input']>;
  numberGuia?: InputMaybe<Scalars['String']['input']>;
  oip?: InputMaybe<Scalars['Float']['input']>;
  valueFlete?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateGroupInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateMultikeyRegisterInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: MultikeyRegisterIdInput;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']['input']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']['input']>;
  hasEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']['input']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']['input']>;
  hasWss?: InputMaybe<Scalars['Boolean']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['ID']['input']>;
  smsBody?: InputMaybe<Scalars['String']['input']>;
  subtype?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notificationConfigId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  id: Scalars['ID']['input'];
  metadata?: InputMaybe<Scalars['String']['input']>;
  notificationGroupId?: InputMaybe<Scalars['ID']['input']>;
  notificationGroupName?: InputMaybe<Scalars['ID']['input']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']['input']>;
  valueFileId?: InputMaybe<Scalars['ID']['input']>;
  valueInt?: InputMaybe<Scalars['Float']['input']>;
  valueString?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword']['input'];
  passwordConfirm: Scalars['ValidatePassword']['input'];
  token: Scalars['String']['input'];
};

export type UpdatePositionInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStatusInput = {
  dateVisit: Scalars['DateTime']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  mocked?: InputMaybe<Scalars['Boolean']['input']>;
  status: StatusVisitEnum;
};

export type UpdateTipoDocumentoInput = {
  activo?: InputMaybe<Scalars['Boolean']['input']>;
  descripcion?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  nombre?: InputMaybe<Scalars['String']['input']>;
  obligatorio?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateToolInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateToolUnitInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ToolUnitStatusEnum>;
  toolId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateToolUnitPhotoInput = {
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  visitToolUnitId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  dateIssue?: InputMaybe<Scalars['DateTime']['input']>;
  departmentId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hasRural?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['ValidatePassword']['input']>;
  phoneCountryCode?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  secondSurname?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatusTypes>;
  type?: InputMaybe<UserTypes>;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword']['input'];
  newPassword: Scalars['ValidatePassword']['input'];
  newPasswordConfirm: Scalars['ValidatePassword']['input'];
};

export type UpdateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
  dateFull?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  mocked?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<VisitComentStatusEnum>;
  time?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<VisitComentTypeEnum>;
  visitId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVisitInput = {
  dateVisit?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  latitude?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['String']['input']>;
  mocked?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<StatusVisitEnum>;
  tools?: InputMaybe<Array<CreateVisitToolUnitInput>>;
  typeId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVisitToolUnitInput = {
  id: Scalars['ID']['input'];
  /** URLs de las fotos */
  photoUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  toolUnitId?: InputMaybe<Scalars['ID']['input']>;
  usageDate?: InputMaybe<Scalars['DateTime']['input']>;
  visitId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateVisitTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VisitTypeStatusEnum>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  confirmationCode?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime']['output'];
  dateIssue?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  department?: Maybe<Department>;
  documentos?: Maybe<Array<DocumentoUsuario>>;
  email: Scalars['String']['output'];
  emailVerification: Scalars['Boolean']['output'];
  fullName: Scalars['String']['output'];
  hasRural?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  identificationNumber?: Maybe<Scalars['String']['output']>;
  identificationType?: Maybe<UserDocumentTypes>;
  isActivityNow: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  legalRepresentativeIdentificationNumber?: Maybe<Scalars['String']['output']>;
  legalRepresentativeIdentificationType?: Maybe<UserDocumentTypes>;
  middleName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phoneCountryCode?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  phoneVerification: Scalars['Boolean']['output'];
  position?: Maybe<Scalars['String']['output']>;
  secondSurname?: Maybe<Scalars['String']['output']>;
  status: UserStatusTypes;
  type: UserTypes;
  typeWoker?: Maybe<TypeWorker>;
  updatedAt: Scalars['DateTime']['output'];
  userRoles: Array<Role>;
  userRolesFx: Array<RoleFx>;
};

export enum UserDocumentTypes {
  CitizenshipCard = 'CitizenshipCard',
  DiplomaticCard = 'DiplomaticCard',
  ForeignerIdentityCard = 'ForeignerIdentityCard',
  IdentityCard = 'IdentityCard',
  Nit = 'Nit',
  Passport = 'Passport',
  SafeConduct = 'SafeConduct',
  SpecialPermissionToStay = 'SpecialPermissionToStay',
  TemporaryProtectionPermit = 'TemporaryProtectionPermit'
}

export type UserKey = {
  __typename?: 'UserKey';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expirationCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  origin: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export enum UserStatusTypes {
  Active = 'Active',
  Inactive = 'Inactive',
  PartlyActive = 'PartlyActive'
}

export enum UserTypes {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type ValidateTokenInput = {
  token: Scalars['String']['input'];
};

export enum VerificationTypes {
  Email = 'Email',
  Phone = 'Phone'
}

export type Visit = {
  __typename?: 'Visit';
  createdAt: Scalars['DateTime']['output'];
  dateVisit: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  mocked?: Maybe<Scalars['Boolean']['output']>;
  status: StatusVisitEnum;
  toolUnitsUsed?: Maybe<Array<VisitToolUnit>>;
  type?: Maybe<VisitType>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  visitItem: Array<VisitComent>;
};

export type VisitComent = {
  __typename?: 'VisitComent';
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  dateFull?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  file?: Maybe<FileInfo>;
  getFormattedTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  mocked?: Maybe<Scalars['Boolean']['output']>;
  time?: Maybe<Scalars['String']['output']>;
  type: VisitComentTypeEnum;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  visit: Visit;
};

export enum VisitComentStatusEnum {
  Canceled = 'CANCELED',
  Pendinig = 'PENDINIG',
  Realized = 'REALIZED'
}

export enum VisitComentTypeEnum {
  Fin = 'FIN',
  Inicio = 'INICIO',
  Intermedio = 'INTERMEDIO'
}

export type VisitDashboardModel = {
  __typename?: 'VisitDashboardModel';
  earrings: Array<Visit>;
  realized: Array<Visit>;
};

export type VisitToolUnit = {
  __typename?: 'VisitToolUnit';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  photos?: Maybe<Array<ToolUnitPhoto>>;
  toolUnit: ToolUnit;
  updatedAt: Scalars['DateTime']['output'];
  usageDate: Scalars['DateTime']['output'];
  visit: Visit;
};

export type VisitType = {
  __typename?: 'VisitType';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: VisitTypeStatusEnum;
  updatedAt: Scalars['DateTime']['output'];
};

export enum VisitTypeStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  phonePrefix?: InputMaybe<Scalars['String']['input']>;
};

export type FindOneFacturaClienteByCode = {
  __typename?: 'findOneFacturaClienteByCode';
  flete?: Maybe<Fletes>;
  isFound: Scalars['Boolean']['output'];
};

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, phoneNumber?: string | null, address?: string | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } } };

export type UpdateClientMutationVariables = Exact<{
  updateInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string } };

export type ValidateUserTokenQueryVariables = Exact<{
  validateTokenInput: ValidateTokenInput;
}>;


export type ValidateUserTokenQuery = { __typename?: 'Query', validateUserToken: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, phoneNumber?: string | null, address?: string | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } };

export type CreateToolMutationVariables = Exact<{
  createInput: CreateToolInput;
}>;


export type CreateToolMutation = { __typename?: 'Mutation', createTool: { __typename?: 'Tool', id: string } };

export type CreateToolVisitMutationVariables = Exact<{
  createInput: CreateVisitToolUnitInput;
}>;


export type CreateToolVisitMutation = { __typename?: 'Mutation', createToolVisit: { __typename?: 'VisitToolUnit', id: string } };

export type CreateToolItemMutationVariables = Exact<{
  createInput: CreateToolUnitInput;
}>;


export type CreateToolItemMutation = { __typename?: 'Mutation', createToolItem: { __typename?: 'ToolUnit', id: string } };

export type CreateToolPhotoMutationVariables = Exact<{
  createInput: CreateToolUnitPhotoInput;
}>;


export type CreateToolPhotoMutation = { __typename?: 'Mutation', createToolPhoto: { __typename?: 'ToolUnitPhoto', id: string } };

export type UpdateToolMutationVariables = Exact<{
  updateInput: UpdateToolInput;
}>;


export type UpdateToolMutation = { __typename?: 'Mutation', updateTool: { __typename?: 'Tool', id: string } };

export type UpdateToolItemMutationVariables = Exact<{
  updateInput: UpdateToolUnitInput;
}>;


export type UpdateToolItemMutation = { __typename?: 'Mutation', updateToolItem: { __typename?: 'ToolUnit', id: string } };

export type UpdateToolPhotoMutationVariables = Exact<{
  updateInput: UpdateToolUnitPhotoInput;
}>;


export type UpdateToolPhotoMutation = { __typename?: 'Mutation', updateToolPhoto: { __typename?: 'ToolUnitPhoto', id: string } };

export type UpdateToolVisitMutationVariables = Exact<{
  updateInput: UpdateVisitToolUnitInput;
}>;


export type UpdateToolVisitMutation = { __typename?: 'Mutation', updateToolVisit: { __typename?: 'VisitToolUnit', id: string } };

export type ToolsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindToolOrderBy> | FindToolOrderBy>;
  where?: InputMaybe<FindToolWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ToolsQuery = { __typename?: 'Query', Tools: Array<{ __typename?: 'Tool', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, reference: string, units?: Array<{ __typename?: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, status: ToolUnitStatusEnum }> | null }>, ToolsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type ToolsItemsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindToolUnitOrderBy> | FindToolUnitOrderBy>;
  where?: InputMaybe<FindToolUnitWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ToolsItemsQuery = { __typename?: 'Query', ToolsItems: Array<{ __typename?: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, status: ToolUnitStatusEnum, tool: { __typename?: 'Tool', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, reference: string } }>, ToolsItemsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type ToolsPhotosQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitToolUnitPhotoOrderBy> | FindVisitToolUnitPhotoOrderBy>;
  where?: InputMaybe<FindVisitToolUnitPhotoWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ToolsPhotosQuery = { __typename?: 'Query', ToolsPhotos: Array<{ __typename?: 'ToolUnitPhoto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, file: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } }> };

export type ToolsVisitsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitToolUnitOrderBy> | FindVisitToolUnitOrderBy>;
  where?: InputMaybe<FindVisitToolUnitWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ToolsVisitsQuery = { __typename?: 'Query', ToolsVisits: Array<{ __typename?: 'VisitToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, usageDate: any, toolUnit: { __typename?: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: ToolUnitStatusEnum } }>, ToolsVisitsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type ToolsListQueryVariables = Exact<{
  where?: InputMaybe<FindToolWhere>;
}>;


export type ToolsListQuery = { __typename?: 'Query', Tools: Array<{ __typename?: 'Tool', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, reference: string, units?: Array<{ __typename?: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, status: ToolUnitStatusEnum }> | null }> };

export type CreateToolVisitAllMutationVariables = Exact<{
  createVisitToolUnitAllInput: CreateVisitToolUnitAllInput;
}>;


export type CreateToolVisitAllMutation = { __typename?: 'Mutation', createToolVisitAll: string };

export type RemoveFileMutationVariables = Exact<{
  removeFileId: Scalars['ID']['input'];
}>;


export type RemoveFileMutation = { __typename?: 'Mutation', removeFile: string };

export type CreateVisitMutationVariables = Exact<{
  createInput: CreateVisitInput;
}>;


export type CreateVisitMutation = { __typename?: 'Mutation', createVisit: { __typename?: 'Visit', id: string } };

export type UpdateVisitMutationVariables = Exact<{
  updateInput: UpdateVisitInput;
}>;


export type UpdateVisitMutation = { __typename?: 'Mutation', updateVisit: { __typename?: 'Visit', id: string } };

export type VisitsQueryVariables = Exact<{
  where?: InputMaybe<FindVisitWhere>;
  orderBy?: InputMaybe<Array<FindVisitOrderBy> | FindVisitOrderBy>;
}>;


export type VisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, dateVisit: any, status: StatusVisitEnum, type?: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } | null, visitItem: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, dateFull?: any | null }>, user: { __typename?: 'User', id: string, identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, fullName: string, email: string } }> };

export type VisitFindOneArgQueryVariables = Exact<{
  where?: InputMaybe<FindVisitWhere>;
}>;


export type VisitFindOneArgQuery = { __typename?: 'Query', visitFindOneArg?: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, dateVisit: any, status: StatusVisitEnum, type?: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } | null, visitItem: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, dateFull?: any | null, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }>, user: { __typename?: 'User', id: string, identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, fullName: string, email: string } } | null };

export type FinishVisitMutationVariables = Exact<{
  updateStatusInput: UpdateStatusInput;
}>;


export type FinishVisitMutation = { __typename?: 'Mutation', finishVisit: { __typename?: 'Visit', id: string } };

export type CreateVisitComentMutationVariables = Exact<{
  createInput: CreateVisitComentInput;
}>;


export type CreateVisitComentMutation = { __typename?: 'Mutation', createVisitComent: { __typename?: 'VisitComent', id: string } };

export type VisitQueryVariables = Exact<{
  visitId: Scalars['ID']['input'];
}>;


export type VisitQuery = { __typename?: 'Query', visit: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, dateVisit: any, status: StatusVisitEnum, type?: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } | null, visitItem: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, dateFull?: any | null, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> } };

export type VisitTypesQueryVariables = Exact<{
  where?: InputMaybe<FindVisitTypeWhere>;
}>;


export type VisitTypesQuery = { __typename?: 'Query', visitTypes: Array<{ __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }> };


export const SigninDocument = gql`
    mutation Signin($signinInput: SigninInput!) {
  signin(signinInput: $signinInput) {
    token
    user {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      phoneNumber
      address
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinInput: // value for 'signinInput'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($updateInput: UpdateClientInput!) {
  updateClient(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const ValidateUserTokenDocument = gql`
    query ValidateUserToken($validateTokenInput: ValidateTokenInput!) {
  validateUserToken(validateTokenInput: $validateTokenInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    identificationType
    identificationNumber
    phoneNumber
    address
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    fullName
  }
}
    `;

/**
 * __useValidateUserTokenQuery__
 *
 * To run a query within a React component, call `useValidateUserTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateUserTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateUserTokenQuery({
 *   variables: {
 *      validateTokenInput: // value for 'validateTokenInput'
 *   },
 * });
 */
export function useValidateUserTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables> & ({ variables: ValidateUserTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
      }
export function useValidateUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export function useValidateUserTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export type ValidateUserTokenQueryHookResult = ReturnType<typeof useValidateUserTokenQuery>;
export type ValidateUserTokenLazyQueryHookResult = ReturnType<typeof useValidateUserTokenLazyQuery>;
export type ValidateUserTokenSuspenseQueryHookResult = ReturnType<typeof useValidateUserTokenSuspenseQuery>;
export type ValidateUserTokenQueryResult = Apollo.QueryResult<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>;
export const CreateToolDocument = gql`
    mutation CreateTool($createInput: CreateToolInput!) {
  createTool(createInput: $createInput) {
    id
  }
}
    `;
export type CreateToolMutationFn = Apollo.MutationFunction<CreateToolMutation, CreateToolMutationVariables>;

/**
 * __useCreateToolMutation__
 *
 * To run a mutation, you first call `useCreateToolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateToolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createToolMutation, { data, loading, error }] = useCreateToolMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateToolMutation(baseOptions?: Apollo.MutationHookOptions<CreateToolMutation, CreateToolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateToolMutation, CreateToolMutationVariables>(CreateToolDocument, options);
      }
export type CreateToolMutationHookResult = ReturnType<typeof useCreateToolMutation>;
export type CreateToolMutationResult = Apollo.MutationResult<CreateToolMutation>;
export type CreateToolMutationOptions = Apollo.BaseMutationOptions<CreateToolMutation, CreateToolMutationVariables>;
export const CreateToolVisitDocument = gql`
    mutation CreateToolVisit($createInput: CreateVisitToolUnitInput!) {
  createToolVisit(createInput: $createInput) {
    id
  }
}
    `;
export type CreateToolVisitMutationFn = Apollo.MutationFunction<CreateToolVisitMutation, CreateToolVisitMutationVariables>;

/**
 * __useCreateToolVisitMutation__
 *
 * To run a mutation, you first call `useCreateToolVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateToolVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createToolVisitMutation, { data, loading, error }] = useCreateToolVisitMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateToolVisitMutation(baseOptions?: Apollo.MutationHookOptions<CreateToolVisitMutation, CreateToolVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateToolVisitMutation, CreateToolVisitMutationVariables>(CreateToolVisitDocument, options);
      }
export type CreateToolVisitMutationHookResult = ReturnType<typeof useCreateToolVisitMutation>;
export type CreateToolVisitMutationResult = Apollo.MutationResult<CreateToolVisitMutation>;
export type CreateToolVisitMutationOptions = Apollo.BaseMutationOptions<CreateToolVisitMutation, CreateToolVisitMutationVariables>;
export const CreateToolItemDocument = gql`
    mutation CreateToolItem($createInput: CreateToolUnitInput!) {
  createToolItem(createInput: $createInput) {
    id
  }
}
    `;
export type CreateToolItemMutationFn = Apollo.MutationFunction<CreateToolItemMutation, CreateToolItemMutationVariables>;

/**
 * __useCreateToolItemMutation__
 *
 * To run a mutation, you first call `useCreateToolItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateToolItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createToolItemMutation, { data, loading, error }] = useCreateToolItemMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateToolItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateToolItemMutation, CreateToolItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateToolItemMutation, CreateToolItemMutationVariables>(CreateToolItemDocument, options);
      }
export type CreateToolItemMutationHookResult = ReturnType<typeof useCreateToolItemMutation>;
export type CreateToolItemMutationResult = Apollo.MutationResult<CreateToolItemMutation>;
export type CreateToolItemMutationOptions = Apollo.BaseMutationOptions<CreateToolItemMutation, CreateToolItemMutationVariables>;
export const CreateToolPhotoDocument = gql`
    mutation CreateToolPhoto($createInput: CreateToolUnitPhotoInput!) {
  createToolPhoto(createInput: $createInput) {
    id
  }
}
    `;
export type CreateToolPhotoMutationFn = Apollo.MutationFunction<CreateToolPhotoMutation, CreateToolPhotoMutationVariables>;

/**
 * __useCreateToolPhotoMutation__
 *
 * To run a mutation, you first call `useCreateToolPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateToolPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createToolPhotoMutation, { data, loading, error }] = useCreateToolPhotoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateToolPhotoMutation(baseOptions?: Apollo.MutationHookOptions<CreateToolPhotoMutation, CreateToolPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateToolPhotoMutation, CreateToolPhotoMutationVariables>(CreateToolPhotoDocument, options);
      }
export type CreateToolPhotoMutationHookResult = ReturnType<typeof useCreateToolPhotoMutation>;
export type CreateToolPhotoMutationResult = Apollo.MutationResult<CreateToolPhotoMutation>;
export type CreateToolPhotoMutationOptions = Apollo.BaseMutationOptions<CreateToolPhotoMutation, CreateToolPhotoMutationVariables>;
export const UpdateToolDocument = gql`
    mutation UpdateTool($updateInput: UpdateToolInput!) {
  updateTool(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateToolMutationFn = Apollo.MutationFunction<UpdateToolMutation, UpdateToolMutationVariables>;

/**
 * __useUpdateToolMutation__
 *
 * To run a mutation, you first call `useUpdateToolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToolMutation, { data, loading, error }] = useUpdateToolMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateToolMutation(baseOptions?: Apollo.MutationHookOptions<UpdateToolMutation, UpdateToolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateToolMutation, UpdateToolMutationVariables>(UpdateToolDocument, options);
      }
export type UpdateToolMutationHookResult = ReturnType<typeof useUpdateToolMutation>;
export type UpdateToolMutationResult = Apollo.MutationResult<UpdateToolMutation>;
export type UpdateToolMutationOptions = Apollo.BaseMutationOptions<UpdateToolMutation, UpdateToolMutationVariables>;
export const UpdateToolItemDocument = gql`
    mutation UpdateToolItem($updateInput: UpdateToolUnitInput!) {
  updateToolItem(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateToolItemMutationFn = Apollo.MutationFunction<UpdateToolItemMutation, UpdateToolItemMutationVariables>;

/**
 * __useUpdateToolItemMutation__
 *
 * To run a mutation, you first call `useUpdateToolItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToolItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToolItemMutation, { data, loading, error }] = useUpdateToolItemMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateToolItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateToolItemMutation, UpdateToolItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateToolItemMutation, UpdateToolItemMutationVariables>(UpdateToolItemDocument, options);
      }
export type UpdateToolItemMutationHookResult = ReturnType<typeof useUpdateToolItemMutation>;
export type UpdateToolItemMutationResult = Apollo.MutationResult<UpdateToolItemMutation>;
export type UpdateToolItemMutationOptions = Apollo.BaseMutationOptions<UpdateToolItemMutation, UpdateToolItemMutationVariables>;
export const UpdateToolPhotoDocument = gql`
    mutation UpdateToolPhoto($updateInput: UpdateToolUnitPhotoInput!) {
  updateToolPhoto(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateToolPhotoMutationFn = Apollo.MutationFunction<UpdateToolPhotoMutation, UpdateToolPhotoMutationVariables>;

/**
 * __useUpdateToolPhotoMutation__
 *
 * To run a mutation, you first call `useUpdateToolPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToolPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToolPhotoMutation, { data, loading, error }] = useUpdateToolPhotoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateToolPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateToolPhotoMutation, UpdateToolPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateToolPhotoMutation, UpdateToolPhotoMutationVariables>(UpdateToolPhotoDocument, options);
      }
export type UpdateToolPhotoMutationHookResult = ReturnType<typeof useUpdateToolPhotoMutation>;
export type UpdateToolPhotoMutationResult = Apollo.MutationResult<UpdateToolPhotoMutation>;
export type UpdateToolPhotoMutationOptions = Apollo.BaseMutationOptions<UpdateToolPhotoMutation, UpdateToolPhotoMutationVariables>;
export const UpdateToolVisitDocument = gql`
    mutation UpdateToolVisit($updateInput: UpdateVisitToolUnitInput!) {
  updateToolVisit(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateToolVisitMutationFn = Apollo.MutationFunction<UpdateToolVisitMutation, UpdateToolVisitMutationVariables>;

/**
 * __useUpdateToolVisitMutation__
 *
 * To run a mutation, you first call `useUpdateToolVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToolVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToolVisitMutation, { data, loading, error }] = useUpdateToolVisitMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateToolVisitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateToolVisitMutation, UpdateToolVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateToolVisitMutation, UpdateToolVisitMutationVariables>(UpdateToolVisitDocument, options);
      }
export type UpdateToolVisitMutationHookResult = ReturnType<typeof useUpdateToolVisitMutation>;
export type UpdateToolVisitMutationResult = Apollo.MutationResult<UpdateToolVisitMutation>;
export type UpdateToolVisitMutationOptions = Apollo.BaseMutationOptions<UpdateToolVisitMutation, UpdateToolVisitMutationVariables>;
export const ToolsDocument = gql`
    query Tools($orderBy: [FindToolOrderBy!], $where: FindToolWhere, $pagination: Pagination) {
  Tools(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    reference
    units {
      id
      createdAt
      updatedAt
      deletedAt
      name
      status
    }
  }
  ToolsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useToolsQuery__
 *
 * To run a query within a React component, call `useToolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useToolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToolsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useToolsQuery(baseOptions?: Apollo.QueryHookOptions<ToolsQuery, ToolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToolsQuery, ToolsQueryVariables>(ToolsDocument, options);
      }
export function useToolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToolsQuery, ToolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToolsQuery, ToolsQueryVariables>(ToolsDocument, options);
        }
export function useToolsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ToolsQuery, ToolsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ToolsQuery, ToolsQueryVariables>(ToolsDocument, options);
        }
export type ToolsQueryHookResult = ReturnType<typeof useToolsQuery>;
export type ToolsLazyQueryHookResult = ReturnType<typeof useToolsLazyQuery>;
export type ToolsSuspenseQueryHookResult = ReturnType<typeof useToolsSuspenseQuery>;
export type ToolsQueryResult = Apollo.QueryResult<ToolsQuery, ToolsQueryVariables>;
export const ToolsItemsDocument = gql`
    query ToolsItems($orderBy: [FindToolUnitOrderBy!], $where: FindToolUnitWhere, $pagination: Pagination) {
  ToolsItems(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    tool {
      id
      createdAt
      updatedAt
      deletedAt
      name
      reference
    }
    status
  }
  ToolsItemsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useToolsItemsQuery__
 *
 * To run a query within a React component, call `useToolsItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useToolsItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToolsItemsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useToolsItemsQuery(baseOptions?: Apollo.QueryHookOptions<ToolsItemsQuery, ToolsItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToolsItemsQuery, ToolsItemsQueryVariables>(ToolsItemsDocument, options);
      }
export function useToolsItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToolsItemsQuery, ToolsItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToolsItemsQuery, ToolsItemsQueryVariables>(ToolsItemsDocument, options);
        }
export function useToolsItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ToolsItemsQuery, ToolsItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ToolsItemsQuery, ToolsItemsQueryVariables>(ToolsItemsDocument, options);
        }
export type ToolsItemsQueryHookResult = ReturnType<typeof useToolsItemsQuery>;
export type ToolsItemsLazyQueryHookResult = ReturnType<typeof useToolsItemsLazyQuery>;
export type ToolsItemsSuspenseQueryHookResult = ReturnType<typeof useToolsItemsSuspenseQuery>;
export type ToolsItemsQueryResult = Apollo.QueryResult<ToolsItemsQuery, ToolsItemsQueryVariables>;
export const ToolsPhotosDocument = gql`
    query ToolsPhotos($orderBy: [FindVisitToolUnitPhotoOrderBy!], $where: FindVisitToolUnitPhotoWhere, $pagination: Pagination) {
  ToolsPhotos(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    file {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      fileUrl
      url
    }
  }
}
    `;

/**
 * __useToolsPhotosQuery__
 *
 * To run a query within a React component, call `useToolsPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useToolsPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToolsPhotosQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useToolsPhotosQuery(baseOptions?: Apollo.QueryHookOptions<ToolsPhotosQuery, ToolsPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToolsPhotosQuery, ToolsPhotosQueryVariables>(ToolsPhotosDocument, options);
      }
export function useToolsPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToolsPhotosQuery, ToolsPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToolsPhotosQuery, ToolsPhotosQueryVariables>(ToolsPhotosDocument, options);
        }
export function useToolsPhotosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ToolsPhotosQuery, ToolsPhotosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ToolsPhotosQuery, ToolsPhotosQueryVariables>(ToolsPhotosDocument, options);
        }
export type ToolsPhotosQueryHookResult = ReturnType<typeof useToolsPhotosQuery>;
export type ToolsPhotosLazyQueryHookResult = ReturnType<typeof useToolsPhotosLazyQuery>;
export type ToolsPhotosSuspenseQueryHookResult = ReturnType<typeof useToolsPhotosSuspenseQuery>;
export type ToolsPhotosQueryResult = Apollo.QueryResult<ToolsPhotosQuery, ToolsPhotosQueryVariables>;
export const ToolsVisitsDocument = gql`
    query ToolsVisits($orderBy: [FindVisitToolUnitOrderBy!], $where: FindVisitToolUnitWhere, $pagination: Pagination) {
  ToolsVisits(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    usageDate
    toolUnit {
      id
      createdAt
      updatedAt
      deletedAt
      status
    }
  }
  ToolsVisitsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useToolsVisitsQuery__
 *
 * To run a query within a React component, call `useToolsVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useToolsVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToolsVisitsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useToolsVisitsQuery(baseOptions?: Apollo.QueryHookOptions<ToolsVisitsQuery, ToolsVisitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToolsVisitsQuery, ToolsVisitsQueryVariables>(ToolsVisitsDocument, options);
      }
export function useToolsVisitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToolsVisitsQuery, ToolsVisitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToolsVisitsQuery, ToolsVisitsQueryVariables>(ToolsVisitsDocument, options);
        }
export function useToolsVisitsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ToolsVisitsQuery, ToolsVisitsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ToolsVisitsQuery, ToolsVisitsQueryVariables>(ToolsVisitsDocument, options);
        }
export type ToolsVisitsQueryHookResult = ReturnType<typeof useToolsVisitsQuery>;
export type ToolsVisitsLazyQueryHookResult = ReturnType<typeof useToolsVisitsLazyQuery>;
export type ToolsVisitsSuspenseQueryHookResult = ReturnType<typeof useToolsVisitsSuspenseQuery>;
export type ToolsVisitsQueryResult = Apollo.QueryResult<ToolsVisitsQuery, ToolsVisitsQueryVariables>;
export const ToolsListDocument = gql`
    query ToolsList($where: FindToolWhere) {
  Tools(where: $where) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    reference
    units {
      id
      createdAt
      updatedAt
      deletedAt
      name
      status
    }
  }
}
    `;

/**
 * __useToolsListQuery__
 *
 * To run a query within a React component, call `useToolsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useToolsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToolsListQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useToolsListQuery(baseOptions?: Apollo.QueryHookOptions<ToolsListQuery, ToolsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToolsListQuery, ToolsListQueryVariables>(ToolsListDocument, options);
      }
export function useToolsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToolsListQuery, ToolsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToolsListQuery, ToolsListQueryVariables>(ToolsListDocument, options);
        }
export function useToolsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ToolsListQuery, ToolsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ToolsListQuery, ToolsListQueryVariables>(ToolsListDocument, options);
        }
export type ToolsListQueryHookResult = ReturnType<typeof useToolsListQuery>;
export type ToolsListLazyQueryHookResult = ReturnType<typeof useToolsListLazyQuery>;
export type ToolsListSuspenseQueryHookResult = ReturnType<typeof useToolsListSuspenseQuery>;
export type ToolsListQueryResult = Apollo.QueryResult<ToolsListQuery, ToolsListQueryVariables>;
export const CreateToolVisitAllDocument = gql`
    mutation CreateToolVisitAll($createVisitToolUnitAllInput: CreateVisitToolUnitAllInput!) {
  createToolVisitAll(createVisitToolUnitAllInput: $createVisitToolUnitAllInput)
}
    `;
export type CreateToolVisitAllMutationFn = Apollo.MutationFunction<CreateToolVisitAllMutation, CreateToolVisitAllMutationVariables>;

/**
 * __useCreateToolVisitAllMutation__
 *
 * To run a mutation, you first call `useCreateToolVisitAllMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateToolVisitAllMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createToolVisitAllMutation, { data, loading, error }] = useCreateToolVisitAllMutation({
 *   variables: {
 *      createVisitToolUnitAllInput: // value for 'createVisitToolUnitAllInput'
 *   },
 * });
 */
export function useCreateToolVisitAllMutation(baseOptions?: Apollo.MutationHookOptions<CreateToolVisitAllMutation, CreateToolVisitAllMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateToolVisitAllMutation, CreateToolVisitAllMutationVariables>(CreateToolVisitAllDocument, options);
      }
export type CreateToolVisitAllMutationHookResult = ReturnType<typeof useCreateToolVisitAllMutation>;
export type CreateToolVisitAllMutationResult = Apollo.MutationResult<CreateToolVisitAllMutation>;
export type CreateToolVisitAllMutationOptions = Apollo.BaseMutationOptions<CreateToolVisitAllMutation, CreateToolVisitAllMutationVariables>;
export const RemoveFileDocument = gql`
    mutation RemoveFile($removeFileId: ID!) {
  removeFile(id: $removeFileId)
}
    `;
export type RemoveFileMutationFn = Apollo.MutationFunction<RemoveFileMutation, RemoveFileMutationVariables>;

/**
 * __useRemoveFileMutation__
 *
 * To run a mutation, you first call `useRemoveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFileMutation, { data, loading, error }] = useRemoveFileMutation({
 *   variables: {
 *      removeFileId: // value for 'removeFileId'
 *   },
 * });
 */
export function useRemoveFileMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFileMutation, RemoveFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFileMutation, RemoveFileMutationVariables>(RemoveFileDocument, options);
      }
export type RemoveFileMutationHookResult = ReturnType<typeof useRemoveFileMutation>;
export type RemoveFileMutationResult = Apollo.MutationResult<RemoveFileMutation>;
export type RemoveFileMutationOptions = Apollo.BaseMutationOptions<RemoveFileMutation, RemoveFileMutationVariables>;
export const CreateVisitDocument = gql`
    mutation CreateVisit($createInput: CreateVisitInput!) {
  createVisit(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitMutationFn = Apollo.MutationFunction<CreateVisitMutation, CreateVisitMutationVariables>;

/**
 * __useCreateVisitMutation__
 *
 * To run a mutation, you first call `useCreateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitMutation, { data, loading, error }] = useCreateVisitMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitMutation, CreateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitMutation, CreateVisitMutationVariables>(CreateVisitDocument, options);
      }
export type CreateVisitMutationHookResult = ReturnType<typeof useCreateVisitMutation>;
export type CreateVisitMutationResult = Apollo.MutationResult<CreateVisitMutation>;
export type CreateVisitMutationOptions = Apollo.BaseMutationOptions<CreateVisitMutation, CreateVisitMutationVariables>;
export const UpdateVisitDocument = gql`
    mutation UpdateVisit($updateInput: UpdateVisitInput!) {
  updateVisit(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateVisitMutationFn = Apollo.MutationFunction<UpdateVisitMutation, UpdateVisitMutationVariables>;

/**
 * __useUpdateVisitMutation__
 *
 * To run a mutation, you first call `useUpdateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitMutation, { data, loading, error }] = useUpdateVisitMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVisitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisitMutation, UpdateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisitMutation, UpdateVisitMutationVariables>(UpdateVisitDocument, options);
      }
export type UpdateVisitMutationHookResult = ReturnType<typeof useUpdateVisitMutation>;
export type UpdateVisitMutationResult = Apollo.MutationResult<UpdateVisitMutation>;
export type UpdateVisitMutationOptions = Apollo.BaseMutationOptions<UpdateVisitMutation, UpdateVisitMutationVariables>;
export const VisitsDocument = gql`
    query Visits($where: FindVisitWhere, $orderBy: [FindVisitOrderBy!]) {
  visits(where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    latitude
    longitude
    dateVisit
    status
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    visitItem {
      id
      createdAt
      updatedAt
      deletedAt
      description
      type
      location
      latitude
      longitude
      dateFull
    }
    user {
      id
      identificationNumber
      identificationType
      fullName
      email
    }
  }
}
    `;

/**
 * __useVisitsQuery__
 *
 * To run a query within a React component, call `useVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useVisitsQuery(baseOptions?: Apollo.QueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
      }
export function useVisitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
        }
export function useVisitsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
        }
export type VisitsQueryHookResult = ReturnType<typeof useVisitsQuery>;
export type VisitsLazyQueryHookResult = ReturnType<typeof useVisitsLazyQuery>;
export type VisitsSuspenseQueryHookResult = ReturnType<typeof useVisitsSuspenseQuery>;
export type VisitsQueryResult = Apollo.QueryResult<VisitsQuery, VisitsQueryVariables>;
export const VisitFindOneArgDocument = gql`
    query VisitFindOneArg($where: FindVisitWhere) {
  visitFindOneArg(where: $where) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    latitude
    longitude
    dateVisit
    status
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    visitItem {
      id
      createdAt
      updatedAt
      deletedAt
      description
      type
      location
      latitude
      longitude
      dateFull
      file {
        id
        createdAt
        updatedAt
        deletedAt
        fileName
        fileExtension
        fileMode
        fileMongoId
        fileUrl
        url
      }
    }
    user {
      id
      identificationNumber
      identificationType
      fullName
      email
    }
  }
}
    `;

/**
 * __useVisitFindOneArgQuery__
 *
 * To run a query within a React component, call `useVisitFindOneArgQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitFindOneArgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitFindOneArgQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVisitFindOneArgQuery(baseOptions?: Apollo.QueryHookOptions<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>(VisitFindOneArgDocument, options);
      }
export function useVisitFindOneArgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>(VisitFindOneArgDocument, options);
        }
export function useVisitFindOneArgSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>(VisitFindOneArgDocument, options);
        }
export type VisitFindOneArgQueryHookResult = ReturnType<typeof useVisitFindOneArgQuery>;
export type VisitFindOneArgLazyQueryHookResult = ReturnType<typeof useVisitFindOneArgLazyQuery>;
export type VisitFindOneArgSuspenseQueryHookResult = ReturnType<typeof useVisitFindOneArgSuspenseQuery>;
export type VisitFindOneArgQueryResult = Apollo.QueryResult<VisitFindOneArgQuery, VisitFindOneArgQueryVariables>;
export const FinishVisitDocument = gql`
    mutation FinishVisit($updateStatusInput: UpdateStatusInput!) {
  finishVisit(UpdateStatusInput: $updateStatusInput) {
    id
  }
}
    `;
export type FinishVisitMutationFn = Apollo.MutationFunction<FinishVisitMutation, FinishVisitMutationVariables>;

/**
 * __useFinishVisitMutation__
 *
 * To run a mutation, you first call `useFinishVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishVisitMutation, { data, loading, error }] = useFinishVisitMutation({
 *   variables: {
 *      updateStatusInput: // value for 'updateStatusInput'
 *   },
 * });
 */
export function useFinishVisitMutation(baseOptions?: Apollo.MutationHookOptions<FinishVisitMutation, FinishVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishVisitMutation, FinishVisitMutationVariables>(FinishVisitDocument, options);
      }
export type FinishVisitMutationHookResult = ReturnType<typeof useFinishVisitMutation>;
export type FinishVisitMutationResult = Apollo.MutationResult<FinishVisitMutation>;
export type FinishVisitMutationOptions = Apollo.BaseMutationOptions<FinishVisitMutation, FinishVisitMutationVariables>;
export const CreateVisitComentDocument = gql`
    mutation CreateVisitComent($createInput: CreateVisitComentInput!) {
  createVisitComent(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitComentMutationFn = Apollo.MutationFunction<CreateVisitComentMutation, CreateVisitComentMutationVariables>;

/**
 * __useCreateVisitComentMutation__
 *
 * To run a mutation, you first call `useCreateVisitComentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitComentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitComentMutation, { data, loading, error }] = useCreateVisitComentMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitComentMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitComentMutation, CreateVisitComentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitComentMutation, CreateVisitComentMutationVariables>(CreateVisitComentDocument, options);
      }
export type CreateVisitComentMutationHookResult = ReturnType<typeof useCreateVisitComentMutation>;
export type CreateVisitComentMutationResult = Apollo.MutationResult<CreateVisitComentMutation>;
export type CreateVisitComentMutationOptions = Apollo.BaseMutationOptions<CreateVisitComentMutation, CreateVisitComentMutationVariables>;
export const VisitDocument = gql`
    query Visit($visitId: ID!) {
  visit(id: $visitId) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    latitude
    longitude
    dateVisit
    status
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    visitItem {
      id
      createdAt
      updatedAt
      deletedAt
      description
      type
      location
      latitude
      longitude
      dateFull
      file {
        id
        createdAt
        updatedAt
        deletedAt
        fileName
        fileExtension
        fileMode
        fileMongoId
        fileUrl
        url
      }
    }
  }
}
    `;

/**
 * __useVisitQuery__
 *
 * To run a query within a React component, call `useVisitQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitQuery({
 *   variables: {
 *      visitId: // value for 'visitId'
 *   },
 * });
 */
export function useVisitQuery(baseOptions: Apollo.QueryHookOptions<VisitQuery, VisitQueryVariables> & ({ variables: VisitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
      }
export function useVisitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
        }
export function useVisitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
        }
export type VisitQueryHookResult = ReturnType<typeof useVisitQuery>;
export type VisitLazyQueryHookResult = ReturnType<typeof useVisitLazyQuery>;
export type VisitSuspenseQueryHookResult = ReturnType<typeof useVisitSuspenseQuery>;
export type VisitQueryResult = Apollo.QueryResult<VisitQuery, VisitQueryVariables>;
export const VisitTypesDocument = gql`
    query VisitTypes($where: FindVisitTypeWhere) {
  visitTypes(where: $where) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
}
    `;

/**
 * __useVisitTypesQuery__
 *
 * To run a query within a React component, call `useVisitTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitTypesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVisitTypesQuery(baseOptions?: Apollo.QueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
      }
export function useVisitTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
        }
export function useVisitTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
        }
export type VisitTypesQueryHookResult = ReturnType<typeof useVisitTypesQuery>;
export type VisitTypesLazyQueryHookResult = ReturnType<typeof useVisitTypesLazyQuery>;
export type VisitTypesSuspenseQueryHookResult = ReturnType<typeof useVisitTypesSuspenseQuery>;
export type VisitTypesQueryResult = Apollo.QueryResult<VisitTypesQuery, VisitTypesQueryVariables>;