import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ValidatePassword: any;
};

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};

export type ApprovalTokenInput = {
  code: Scalars['String'];
  token: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: User;
};

export type BooleanFilter = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _neq?: InputMaybe<Scalars['Boolean']>;
};

export type City = {
  __typename?: 'City';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  celular: Scalars['String'];
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  descripcion?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  telefono?: Maybe<Scalars['String']>;
  type?: Maybe<TypeClientEnum>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  vertical?: Maybe<Scalars['String']>;
};

export type ClientContact = {
  __typename?: 'ClientContact';
  celular: Scalars['String'];
  client?: Maybe<Client>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['String'];
  telefono?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ClientContactModel = {
  __typename?: 'ClientContactModel';
  client: Client;
  contact: Array<ClientContact>;
};

export type CodeConfirmationInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']>;
  role: Scalars['ID'];
};

export type CreateClientContactInput = {
  celular: Scalars['String'];
  clientId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular: Scalars['String'];
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
  type: TypeClientEnum;
  userId?: InputMaybe<Scalars['String']>;
  vertical?: InputMaybe<Scalars['String']>;
};

export type CreateDocumentTypeInput = {
  document: Scalars['String'];
};

export type CreateDocumentoUsuarioInput = {
  estado?: EstadoDocumento;
  fileId: Scalars['String'];
  observaciones?: InputMaybe<Scalars['String']>;
  tipoDocumentoId: Scalars['String'];
  usuarioId: Scalars['String'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstField: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
};

export type CreateFletesInput = {
  backComision: Scalars['Float'];
  carrier: Scalars['String'];
  carrierCell: Scalars['String'];
  contactClient: Scalars['String'];
  description: Scalars['String'];
  numberDocument: Scalars['String'];
  numberGuia: Scalars['String'];
  oip: Scalars['Float'];
  valueFlete: Scalars['Float'];
};

export type CreateGroupInput = {
  name: Scalars['String'];
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type CreateMultikeyRegisterInput = {
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: MultikeyRegisterIdInput;
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']>;
  hasEmail?: InputMaybe<Scalars['Boolean']>;
  hasPush?: InputMaybe<Scalars['Boolean']>;
  hasSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']>;
  hasWss?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileId: Scalars['ID'];
  smsBody?: InputMaybe<Scalars['String']>;
  subtype: Scalars['String'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  metadata: Scalars['String'];
  name: Scalars['String'];
  notificationConfigId: Scalars['ID'];
};

export type CreateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  metadata: Scalars['String'];
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  notificationGroupName?: InputMaybe<Scalars['ID']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['ID']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreatePageLinkInput = {
  arguments?: InputMaybe<Array<Scalars['String']>>;
  routeType?: InputMaybe<RouterType>;
  target?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type CreateParametersInput = {
  codigo: Scalars['String'];
  descripcion: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']>;
  valueFileId?: InputMaybe<Scalars['ID']>;
  valueInt?: InputMaybe<Scalars['Float']>;
  valueString?: InputMaybe<Scalars['String']>;
};

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreateProfileInput = {
  city: Scalars['Int'];
  description: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  region: Scalars['Int'];
};

export type CreateRoleInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTipoDocumentoInput = {
  activo?: Scalars['Boolean'];
  descripcion?: InputMaybe<Scalars['String']>;
  nombre: Scalars['String'];
  obligatorio?: Scalars['Boolean'];
};

export type CreateToolInput = {
  name: Scalars['String'];
  reference: Scalars['String'];
};

export type CreateToolUnitInput = {
  name: Scalars['String'];
  referencia: Scalars['String'];
  status?: ToolUnitStatusEnum;
  toolId: Scalars['ID'];
};

export type CreateToolUnitPhotoInput = {
  fileId: Scalars['String'];
  visitToolUnitId: Scalars['ID'];
};

export type CreateUserInput = {
  address: Scalars['String'];
  cityId?: InputMaybe<Scalars['ID']>;
  countryId?: InputMaybe<Scalars['ID']>;
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  hasRural?: InputMaybe<Scalars['Boolean']>;
  identificationNumber: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
  phoneCountryCode?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  position?: InputMaybe<Scalars['String']>;
  secondSurname?: InputMaybe<Scalars['String']>;
  type: UserTypes;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type CreateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  dateFull?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  mocked?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<VisitComentStatusEnum>;
  time?: InputMaybe<Scalars['DateTime']>;
  type: VisitComentTypeEnum;
  visitId: Scalars['String'];
};

export type CreateVisitInput = {
  dateVisit: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  mocked?: InputMaybe<Scalars['Boolean']>;
  projectId?: InputMaybe<Scalars['String']>;
  status: StatusVisitEnum;
  tools?: InputMaybe<Array<CreateVisitToolUnitInput>>;
  typeId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateVisitProjectInput = {
  description: Scalars['String'];
  /** Formato: yyyy-MM-dd */
  endDate?: InputMaybe<Scalars['String']>;
  isCompleted?: Scalars['Boolean'];
  name: Scalars['String'];
  /** Formato: yyyy-MM-dd */
  startDate?: InputMaybe<Scalars['String']>;
  status?: VisitProjectStatusEnum;
};

export type CreateVisitToolUnitAllInput = {
  input: Array<CreateVisitToolUnitInput>;
};

export type CreateVisitToolUnitInput = {
  /** URLs de las fotos */
  photoUrls?: InputMaybe<Array<Scalars['String']>>;
  toolUnitId: Scalars['ID'];
  usageDate?: InputMaybe<Scalars['DateTime']>;
  visitId: Scalars['ID'];
};

export type CreateVisitTypeInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  status: VisitTypeStatusEnum;
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']>>;
  _eq?: InputMaybe<Scalars['DateTime']>;
  _gt?: InputMaybe<Scalars['DateTime']>;
  _gte?: InputMaybe<Scalars['DateTime']>;
  _in?: InputMaybe<Array<Scalars['DateTime']>>;
  _lt?: InputMaybe<Scalars['DateTime']>;
  _lte?: InputMaybe<Scalars['DateTime']>;
  _neq?: InputMaybe<Scalars['DateTime']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DocumentType = {
  __typename?: 'DocumentType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  document: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type DocumentoUsuario = {
  __typename?: 'DocumentoUsuario';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  estado: EstadoDocumento;
  file: FileInfo;
  id: Scalars['ID'];
  observaciones?: Maybe<Scalars['String']>;
  tipoDocumento: TipoDocumento;
  updatedAt: Scalars['DateTime'];
  usuario: User;
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']>;
  emailVerification?: InputMaybe<Scalars['Boolean']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstField: Scalars['String'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID'];
  items: Array<DummyItem>;
  notification?: Maybe<Notification>;
  phone: Scalars['String'];
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  dummy: Dummy;
  firstField: Scalars['String'];
  fourthField: Scalars['Int'];
  id: Scalars['ID'];
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EmailRecipient = {
  email: Scalars['String'];
  type: RecipientType;
};

export enum EstadoDocumento {
  Aceptado = 'ACEPTADO',
  Pendiente = 'PENDIENTE',
  Rechazado = 'RECHAZADO'
}

export type FacturaPorClienteDto = {
  tem_cedula?: InputMaybe<Scalars['String']>;
  tem_fecha_desde?: InputMaybe<Scalars['String']>;
  tem_fecha_hasta?: InputMaybe<Scalars['String']>;
  tem_nomcli?: InputMaybe<Scalars['String']>;
  tem_numdoc?: InputMaybe<Scalars['String']>;
  tem_vended?: InputMaybe<Scalars['String']>;
};

export type FileInfo = {
  __typename?: 'FileInfo';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileExtension: Scalars['String'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']>;
  fileName: Scalars['String'];
  fileUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFireBase?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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
  createdAt?: InputMaybe<Scalars['DateTime']>;
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

export type FindVisitProjectOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  endDate?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
  startDate?: InputMaybe<OrderTypes>;
};

export type FindVisitProjectWhere = {
  _and?: InputMaybe<Array<FindVisitProjectWhere>>;
  _or?: InputMaybe<Array<FindVisitProjectWhere>>;
  description?: InputMaybe<StringFilter>;
  endDate?: InputMaybe<DateFilter>;
  isCompleted?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
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
  backComision: Scalars['Float'];
  carrier: Scalars['String'];
  carrierCell: Scalars['String'];
  contactClient: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  numberDocument: Scalars['String'];
  numberGuia: Scalars['String'];
  oip: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  valueFlete: Scalars['Float'];
};

export type FletesWithDocument = {
  __typename?: 'FletesWithDocument';
  CLI_CIUDAD?: Maybe<Scalars['String']>;
  CL_DEPART?: Maybe<Scalars['String']>;
  TEM_CEDULA?: Maybe<Scalars['String']>;
  TEM_FECHA?: Maybe<Scalars['String']>;
  TEM_NOMCLI?: Maybe<Scalars['String']>;
  TEM_NUMDOC?: Maybe<Scalars['String']>;
  TEM_PORCENTAJE_UTILIDAD?: Maybe<Scalars['String']>;
  TEM_PREFIJ?: Maybe<Scalars['String']>;
  TEM_TIPMOV?: Maybe<Scalars['String']>;
  TEM_UTILIDAD?: Maybe<Scalars['String']>;
  TEM_VALCOS?: Maybe<Scalars['String']>;
  TEM_VENDED?: Maybe<Scalars['String']>;
  TEM_VENTA?: Maybe<Scalars['String']>;
  backComision?: Maybe<Scalars['Float']>;
  carrier?: Maybe<Scalars['String']>;
  carrierCell?: Maybe<Scalars['String']>;
  contactClient?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  numberDocument?: Maybe<Scalars['String']>;
  numberGuia?: Maybe<Scalars['String']>;
  oip?: Maybe<Scalars['Float']>;
  valueFlete?: Maybe<Scalars['Float']>;
};

export type FunctionalityModel = {
  __typename?: 'FunctionalityModel';
  children?: Maybe<Array<FunctionalityModel>>;
  description?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  name: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationConfig?: Maybe<NotificationConfig>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  senderId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  content: Scalars['String'];
  senderId: Scalars['String'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']>;
  itemsPerPage?: Maybe<Scalars['Int']>;
  totalItems?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type MultikeyRegister = {
  __typename?: 'MultikeyRegister';
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: MultikeyRegisterId;
};

export type MultikeyRegisterId = {
  __typename?: 'MultikeyRegisterId';
  id: Scalars['Int'];
  year: Scalars['Int'];
};

export type MultikeyRegisterIdInput = {
  id: Scalars['Int'];
  year: Scalars['Int'];
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
  createProjectVist: VisitProject;
  createRole: Role;
  createRoleFx: Array<RoleFx>;
  createTipoDocumento: TipoDocumento;
  createTool: Tool;
  createToolItem: ToolUnit;
  createToolPhoto: ToolUnitPhoto;
  createToolVisit: VisitToolUnit;
  createToolVisitAll: Scalars['String'];
  createUser: User;
  createVisit: Visit;
  createVisitComent: VisitComent;
  createVisitType: VisitType;
  enableAndDisableDoubleVerification: Scalars['String'];
  finishVisit: Visit;
  i18nTest: Scalars['String'];
  recoverPassword: Scalars['String'];
  remove: NotificationGroup;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeDocumentType: DocumentType;
  removeDocumentoUsuario: DocumentoUsuario;
  removeDummy: Dummy;
  removeFile: Scalars['String'];
  removeFletes: Fletes;
  removeGroup: Group;
  removeMultiKeyRegister: MultikeyRegister;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removePageLink: PageLink;
  removeParameter: Parameter;
  removePosition: Position;
  removeProfile: Profile;
  removeProjectVist: VisitProject;
  removeRole: Role;
  removeRoleFx: Array<Scalars['String']>;
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
  sendCodeDoubleVerification: Scalars['String'];
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
  updateProjectVist: VisitProject;
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


export type MutationCreateProjectVistArgs = {
  createInput: CreateVisitProjectInput;
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
  id: Scalars['ID'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDocumentoUsuarioArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveFletesArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProjectVistArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationRemoveTipoDocumentoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveToolArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveToolItemArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveToolPhotoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveToolVisitArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationRemoveVisitArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveVisitComentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveVisitTypeArgs = {
  id: Scalars['ID'];
};


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
};


export type MutationSendCodeDoubleVerificationArgs = {
  sendDoubleVerificationInput: SendDoubleVerificationInput;
};


export type MutationSendMessageArgs = {
  messageInput: MessageInput;
};


export type MutationSendResponseArgs = {
  messageId: Scalars['String'];
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


export type MutationUpdateProjectVistArgs = {
  updateInput: UpdateVisitProjectInput;
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
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  externalId?: Maybe<Scalars['ID']>;
  externalMessage?: Maybe<Scalars['String']>;
  hasPersistent: Scalars['Boolean'];
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['String']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailDuplicateCode?: Maybe<Scalars['ID']>;
  emailPrincipalCode?: Maybe<Scalars['ID']>;
  hasEmail: Scalars['Boolean'];
  hasPersistent: Scalars['Boolean'];
  hasPush: Scalars['Boolean'];
  hasSms: Scalars['Boolean'];
  hasTwoStepsEmail: Scalars['Boolean'];
  hasTwoStepsPush: Scalars['Boolean'];
  hasTwoStepsSms: Scalars['Boolean'];
  hasTwoStepsWss: Scalars['Boolean'];
  hasWss: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  persistentExpiration?: Maybe<Scalars['DateTime']>;
  persistentHtml?: Maybe<Scalars['String']>;
  profile: Profile;
  smsBody?: Maybe<Scalars['String']>;
  subtype: Scalars['String'];
  type: NotificationType;
  updatedAt: Scalars['DateTime'];
  wssCode?: Maybe<Scalars['ID']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  group: Group;
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime'];
};

export enum NotificationType {
  Token = 'Token'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']>>;
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']>>;
};

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageLink = {
  __typename?: 'PageLink';
  arguments?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  routeType?: Maybe<RouterType>;
  target?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type Pagination = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime'];
  valueDate?: Maybe<Scalars['DateTime']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']>;
  valueString?: Maybe<Scalars['String']>;
};

export enum PersonTypes {
  Legal = 'Legal',
  Natural = 'Natural'
}

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  externalId: Scalars['ID'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  region: Scalars['Int'];
  stateAws?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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
  codeRecoverPassword: Scalars['String'];
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
  generateWorkedHours: Array<VisitComent>;
  getHoursByVisit: Scalars['Float'];
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
  projectVist: VisitProject;
  projectVists: Array<VisitProject>;
  projectVistsCount: MetadataPagination;
  revalidate: AuthResponse;
  role: Role;
  roleFx: RoleFx;
  roles: Array<Role>;
  rolesCount: MetadataPagination;
  rolesFx: Array<RoleFx>;
  rolesFxCount: MetadataPagination;
  sendEmailRecovryPassword: Scalars['String'];
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
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryToolArgs = {
  id: Scalars['ID'];
};


export type QueryToolItemArgs = {
  id: Scalars['ID'];
};


export type QueryToolPhotoArgs = {
  id: Scalars['ID'];
};


export type QueryToolVisitArgs = {
  id: Scalars['ID'];
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
  departmentId?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryClientAndContactArgs = {
  id: Scalars['ID'];
};


export type QueryClientContactArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryDepartmentArgs = {
  countryId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDocumentTypeArgs = {
  id: Scalars['ID'];
};


export type QueryDocumentTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentTypesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentoUsuarioArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryFileArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryFindOneArgArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryFindOneFacturaClienteByCodeArgs = {
  code: Scalars['String'];
};


export type QueryGenerateWorkedHoursArgs = {
  input: GenerateWorkedHoursInput;
};


export type QueryGetHoursByVisitArgs = {
  id: Scalars['ID'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryPageLinksArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinksCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParameterArgs = {
  id: Scalars['ID'];
};


export type QueryParametersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParametersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionArgs = {
  id: Scalars['ID'];
};


export type QueryPositionsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProjectVistArgs = {
  id: Scalars['ID'];
};


export type QueryProjectVistsArgs = {
  orderBy?: InputMaybe<Array<FindVisitProjectOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitProjectWhere>;
};


export type QueryProjectVistsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitProjectOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitProjectWhere>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRoleFxArgs = {
  id: Scalars['ID'];
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
  email: Scalars['String'];
};


export type QueryTipoDocumentoArgs = {
  id: Scalars['ID'];
};


export type QueryTiposDocumentoArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryTiposDocumentoCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
};


export type QueryVisitComentArgs = {
  id: Scalars['ID'];
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
  id: Scalars['ID'];
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
  email: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime'];
  defaultForType?: Maybe<UserTypes>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  roleFx: Array<RoleFx>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type RoleFx = {
  __typename?: 'RoleFx';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  permission: Scalars['String'];
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTime'];
};

export enum RouterType {
  ExternalRoute = 'ExternalRoute',
  InternalRouteWithArguments = 'InternalRouteWithArguments',
  InternaltRoute = 'InternaltRoute'
}

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type SigninAdminInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  verificationTypes?: InputMaybe<VerificationTypes>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']>;
  identificationNumber?: InputMaybe<Scalars['String']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  personType?: InputMaybe<PersonTypes>;
  verificationDigit?: InputMaybe<Scalars['String']>;
};

export type SignupEmailInput = {
  confirmationPassword: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
};

export type SignupInput = {
  address: Scalars['String'];
  cityId: Scalars['ID'];
  confirmationEmail: Scalars['String'];
  confirmationPassword: Scalars['String'];
  countryId: Scalars['ID'];
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId: Scalars['ID'];
  email: Scalars['String'];
  hasRural: Scalars['Boolean'];
  identificationNumber: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
  phoneCountryCode: Scalars['String'];
  phoneNumber: Scalars['String'];
  secondSurname?: InputMaybe<Scalars['String']>;
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
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
  _contains?: InputMaybe<Scalars['String']>;
  _endswith?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _like?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _notcontains?: InputMaybe<Scalars['String']>;
  _notendswith?: InputMaybe<Scalars['String']>;
  _notlike?: InputMaybe<Scalars['String']>;
  _notstartswith?: InputMaybe<Scalars['String']>;
  _startswith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageReceived: Message;
};

export type TipoDocumento = {
  __typename?: 'TipoDocumento';
  activo: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  nombre: Scalars['String'];
  obligatorio: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type Tool = {
  __typename?: 'Tool';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  reference: Scalars['String'];
  units?: Maybe<Array<ToolUnit>>;
  updatedAt: Scalars['DateTime'];
};

export type ToolUnit = {
  __typename?: 'ToolUnit';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  referencia: Scalars['String'];
  status: ToolUnitStatusEnum;
  tool: Tool;
  updatedAt: Scalars['DateTime'];
  visits?: Maybe<Array<VisitToolUnit>>;
};

export type ToolUnitPhoto = {
  __typename?: 'ToolUnitPhoto';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  file: FileInfo;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
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
  celular?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  numberDocument?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeClientEnum>;
  userId?: InputMaybe<Scalars['String']>;
  vertical?: InputMaybe<Scalars['String']>;
};

export type UpdateDocumentTypeInput = {
  document?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateDocumentoUsuarioInput = {
  estado?: InputMaybe<EstadoDocumento>;
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  observaciones?: InputMaybe<Scalars['String']>;
  tipoDocumentoId?: InputMaybe<Scalars['String']>;
  usuarioId?: InputMaybe<Scalars['String']>;
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstField?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  phone?: InputMaybe<Scalars['String']>;
  secondField?: InputMaybe<Scalars['DateTime']>;
  thirdField?: InputMaybe<Scalars['Float']>;
};

export type UpdateFletesInput = {
  backComision?: InputMaybe<Scalars['Float']>;
  carrier?: InputMaybe<Scalars['String']>;
  carrierCell?: InputMaybe<Scalars['String']>;
  contactClient?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  numberDocument?: InputMaybe<Scalars['String']>;
  numberGuia?: InputMaybe<Scalars['String']>;
  oip?: InputMaybe<Scalars['Float']>;
  valueFlete?: InputMaybe<Scalars['Float']>;
};

export type UpdateGroupInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type UpdateMultikeyRegisterInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: MultikeyRegisterIdInput;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']>;
  hasEmail?: InputMaybe<Scalars['Boolean']>;
  hasPush?: InputMaybe<Scalars['Boolean']>;
  hasSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']>;
  hasWss?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['ID']>;
  smsBody?: InputMaybe<Scalars['String']>;
  subtype?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']>;
};

export type UpdateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type UpdateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['String']>;
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  notificationGroupName?: InputMaybe<Scalars['ID']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['ID']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']>;
  valueFileId?: InputMaybe<Scalars['ID']>;
  valueInt?: InputMaybe<Scalars['Float']>;
  valueString?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword'];
  passwordConfirm: Scalars['ValidatePassword'];
  token: Scalars['String'];
};

export type UpdatePositionInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['Int']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateStatusInput = {
  dateVisit: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  mocked?: InputMaybe<Scalars['Boolean']>;
  status: StatusVisitEnum;
};

export type UpdateTipoDocumentoInput = {
  activo?: InputMaybe<Scalars['Boolean']>;
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  nombre?: InputMaybe<Scalars['String']>;
  obligatorio?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateToolInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
};

export type UpdateToolUnitInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  referencia?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ToolUnitStatusEnum>;
  toolId?: InputMaybe<Scalars['ID']>;
};

export type UpdateToolUnitPhotoInput = {
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  visitToolUnitId?: InputMaybe<Scalars['ID']>;
};

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['ID']>;
  countryId?: InputMaybe<Scalars['ID']>;
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  hasRural?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identificationNumber?: InputMaybe<Scalars['String']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['ValidatePassword']>;
  phoneCountryCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  secondSurname?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<UserStatusTypes>;
  type?: InputMaybe<UserTypes>;
  typeWoker?: InputMaybe<TypeWorker>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword'];
  newPassword: Scalars['ValidatePassword'];
  newPasswordConfirm: Scalars['ValidatePassword'];
};

export type UpdateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  dateFull?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  mocked?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<VisitComentStatusEnum>;
  time?: InputMaybe<Scalars['DateTime']>;
  type?: InputMaybe<VisitComentTypeEnum>;
  visitId?: InputMaybe<Scalars['String']>;
};

export type UpdateVisitInput = {
  dateVisit?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  mocked?: InputMaybe<Scalars['Boolean']>;
  projectId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusVisitEnum>;
  tools?: InputMaybe<Array<CreateVisitToolUnitInput>>;
  typeId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateVisitProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  /** Formato: yyyy-MM-dd */
  endDate?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  /** Formato: yyyy-MM-dd */
  startDate?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<VisitProjectStatusEnum>;
};

export type UpdateVisitToolUnitInput = {
  id: Scalars['ID'];
  /** URLs de las fotos */
  photoUrls?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<ToolUnitStatusEnum>;
  toolUnitId?: InputMaybe<Scalars['ID']>;
  usageDate?: InputMaybe<Scalars['DateTime']>;
  visitId?: InputMaybe<Scalars['ID']>;
};

export type UpdateVisitTypeInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<VisitTypeStatusEnum>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<City>;
  confirmationCode?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  dateIssue?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  documentos?: Maybe<Array<DocumentoUsuario>>;
  email: Scalars['String'];
  emailVerification: Scalars['Boolean'];
  fullName: Scalars['String'];
  hasRural?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identificationNumber?: Maybe<Scalars['String']>;
  identificationType?: Maybe<UserDocumentTypes>;
  isActivityNow: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  legalRepresentativeIdentificationNumber?: Maybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: Maybe<UserDocumentTypes>;
  middleName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneCountryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneVerification: Scalars['Boolean'];
  position?: Maybe<Scalars['String']>;
  secondSurname?: Maybe<Scalars['String']>;
  status: UserStatusTypes;
  type: UserTypes;
  typeWoker?: Maybe<TypeWorker>;
  updatedAt: Scalars['DateTime'];
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
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  expirationCode: Scalars['String'];
  id: Scalars['ID'];
  origin: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  token: Scalars['String'];
};

export enum VerificationTypes {
  Email = 'Email',
  Phone = 'Phone'
}

export type Visit = {
  __typename?: 'Visit';
  createdAt: Scalars['DateTime'];
  dateVisit: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  mocked?: Maybe<Scalars['Boolean']>;
  project?: Maybe<VisitProject>;
  status: StatusVisitEnum;
  toolUnitsUsed?: Maybe<Array<VisitToolUnit>>;
  type?: Maybe<VisitType>;
  updatedAt: Scalars['DateTime'];
  user: User;
  visitItem: Array<VisitComent>;
};

export type VisitComent = {
  __typename?: 'VisitComent';
  createdAt: Scalars['DateTime'];
  date?: Maybe<Scalars['DateTime']>;
  dateFull?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  file?: Maybe<FileInfo>;
  getFormattedTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  mocked?: Maybe<Scalars['Boolean']>;
  time?: Maybe<Scalars['String']>;
  type: VisitComentTypeEnum;
  updatedAt: Scalars['DateTime'];
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

export type VisitProject = {
  __typename?: 'VisitProject';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  /** Formato: dd/MM/yyyy */
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
  /** Formato: dd/MM/yyyy */
  startDate?: Maybe<Scalars['String']>;
  status: VisitProjectStatusEnum;
  updatedAt: Scalars['DateTime'];
};

/** Estados posibles para un proyecto de visita */
export enum VisitProjectStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  OnHold = 'ON_HOLD',
  Planned = 'PLANNED'
}

export type VisitToolUnit = {
  __typename?: 'VisitToolUnit';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  entryDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  photos?: Maybe<Array<ToolUnitPhoto>>;
  status?: Maybe<ToolUnitStatusEnum>;
  toolUnit: ToolUnit;
  updatedAt: Scalars['DateTime'];
  usageDate: Scalars['DateTime'];
  user?: Maybe<User>;
  visit: Visit;
};

export type VisitType = {
  __typename?: 'VisitType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: VisitTypeStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export enum VisitTypeStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  phonePrefix?: InputMaybe<Scalars['String']>;
};

export type FindOneFacturaClienteByCode = {
  __typename?: 'findOneFacturaClienteByCode';
  flete?: Maybe<Fletes>;
  isFound: Scalars['Boolean'];
};

export type GenerateWorkedHoursInput = {
  fechaFinal: Scalars['String'];
  fechaInicio: Scalars['String'];
  typeId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type ValidateUserTokenQueryVariables = Exact<{
  validateTokenInput: ValidateTokenInput;
}>;


export type ValidateUserTokenQuery = { __typename?: 'Query', validateUserToken: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } };

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } } };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> };

export type CreateTipoDocumentoMutationVariables = Exact<{
  createInput: CreateTipoDocumentoInput;
}>;


export type CreateTipoDocumentoMutation = { __typename?: 'Mutation', createTipoDocumento: { __typename?: 'TipoDocumento', id: string } };

export type UpdateTipoDocumentoMutationVariables = Exact<{
  updateInput: UpdateTipoDocumentoInput;
}>;


export type UpdateTipoDocumentoMutation = { __typename?: 'Mutation', updateTipoDocumento: { __typename?: 'TipoDocumento', id: string } };

export type DocumentosUsuarioQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDocWhere>;
  orderBy?: InputMaybe<Array<FindDocOrderBy> | FindDocOrderBy>;
}>;


export type DocumentosUsuarioQuery = { __typename?: 'Query', documentosUsuario: Array<{ __typename?: 'DocumentoUsuario', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, estado: EstadoDocumento, observaciones?: string | null, usuario: { __typename?: 'User', email: string, identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, fullName: string, id: string }, tipoDocumento: { __typename?: 'TipoDocumento', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, descripcion?: string | null, obligatorio: boolean, activo: boolean }, file: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } }>, documentosUsuarioCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type TiposDocumentoQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type TiposDocumentoQuery = { __typename?: 'Query', tiposDocumento: Array<{ __typename?: 'TipoDocumento', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, descripcion?: string | null, obligatorio: boolean, activo: boolean }>, tiposDocumentoCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateDocumentoUsuarioMutationVariables = Exact<{
  createInput: CreateDocumentoUsuarioInput;
}>;


export type CreateDocumentoUsuarioMutation = { __typename?: 'Mutation', createDocumentoUsuario: { __typename?: 'DocumentoUsuario', id: string } };

export type UpdateDocumentoUsuarioMutationVariables = Exact<{
  updateInput: UpdateDocumentoUsuarioInput;
}>;


export type UpdateDocumentoUsuarioMutation = { __typename?: 'Mutation', updateDocumentoUsuario: { __typename?: 'DocumentoUsuario', id: string } };

export type RemoveDocumentoUsuarioMutationVariables = Exact<{
  removeDocumentoUsuarioId: Scalars['ID'];
}>;


export type RemoveDocumentoUsuarioMutation = { __typename?: 'Mutation', removeDocumentoUsuario: { __typename?: 'DocumentoUsuario', id: string } };

export type ProjectVistsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitProjectOrderBy> | FindVisitProjectOrderBy>;
  where?: InputMaybe<FindVisitProjectWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ProjectVistsQuery = { __typename?: 'Query', projectVists: Array<{ __typename?: 'VisitProject', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitProjectStatusEnum, endDate?: string | null, startDate?: string | null, isCompleted: boolean }>, projectVistsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateProjectVistMutationVariables = Exact<{
  createInput: CreateVisitProjectInput;
}>;


export type CreateProjectVistMutation = { __typename?: 'Mutation', createProjectVist: { __typename?: 'VisitProject', id: string } };

export type UpdateProjectVistMutationVariables = Exact<{
  updateInput: UpdateVisitProjectInput;
}>;


export type UpdateProjectVistMutation = { __typename?: 'Mutation', updateProjectVist: { __typename?: 'VisitProject', id: string } };

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


export type ToolsItemsQuery = { __typename?: 'Query', ToolsItems: Array<{ __typename: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, referencia: string, status: ToolUnitStatusEnum, tool: { __typename: 'Tool', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, reference: string }, visits?: Array<{ __typename?: 'VisitToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, usageDate: any, status?: ToolUnitStatusEnum | null, entryDate?: any | null, visit: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, mocked?: boolean | null, dateVisit: any, status: StatusVisitEnum, type?: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } | null, user: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string, id: string } }, toolUnit: { __typename?: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, referencia: string }, user?: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string, id: string } | null, photos?: Array<{ __typename?: 'ToolUnitPhoto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, file: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } }> | null }> | null }>, ToolsItemsCount: { __typename: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

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


export type ToolsVisitsQuery = { __typename?: 'Query', ToolsVisits: Array<{ __typename?: 'VisitToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, usageDate: any, toolUnit: { __typename?: 'ToolUnit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, status: ToolUnitStatusEnum, referencia: string, name: string } }>, ToolsVisitsCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type UsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindUsersOrderBy> | FindUsersOrderBy>;
  where?: InputMaybe<FindUsersWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, isActivityNow: boolean, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, typeWoker?: TypeWorker | null, fullName: string, city?: { __typename?: 'City', id: string, name: string } | null, department?: { __typename?: 'Department', id: string, name: string } | null, country?: { __typename?: 'Country', id: string, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, name: string }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string }> }>, usersCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateUserMutationVariables = Exact<{
  createInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type RemoveUserMutationVariables = Exact<{
  removeUserId: Scalars['ID'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, fullName: string, name?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  updateInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName: string, lastName?: string | null } };

export type CreateVisitTypeMutationVariables = Exact<{
  createInput: CreateVisitTypeInput;
}>;


export type CreateVisitTypeMutation = { __typename?: 'Mutation', createVisitType: { __typename?: 'VisitType', id: string } };

export type UpdateVisitTypeMutationVariables = Exact<{
  updateInput: UpdateVisitTypeInput;
}>;


export type UpdateVisitTypeMutation = { __typename?: 'Mutation', updateVisitType: { __typename?: 'VisitType', id: string } };

export type VisitTypesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy> | FindVisitTypeOrderBy>;
  where?: InputMaybe<FindVisitTypeWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitTypesQuery = { __typename?: 'Query', visitTypes: Array<{ __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }>, visitTypesCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

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
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, dateVisit: any, mocked?: boolean | null, status: StatusVisitEnum, project?: { __typename?: 'VisitProject', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitProjectStatusEnum, endDate?: string | null, startDate?: string | null, isCompleted: boolean } | null, visitItem: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, dateFull?: any | null, mocked?: boolean | null, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }>, user: { __typename?: 'User', id: string, identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, fullName: string, email: string }, type?: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } | null }>, visitsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type VisitFindOneArgQueryVariables = Exact<{
  where?: InputMaybe<FindVisitWhere>;
}>;


export type VisitFindOneArgQuery = { __typename?: 'Query', visitFindOneArg?: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, dateVisit: any, mocked?: boolean | null, status: StatusVisitEnum, visitItem: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, dateFull?: any | null, mocked?: boolean | null, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }>, user: { __typename?: 'User', id: string, identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, fullName: string, email: string } } | null };

export type FinishVisitMutationVariables = Exact<{
  updateStatusInput: UpdateStatusInput;
}>;


export type FinishVisitMutation = { __typename?: 'Mutation', finishVisit: { __typename?: 'Visit', id: string } };

export type CreateVisitComentMutationVariables = Exact<{
  createInput: CreateVisitComentInput;
}>;


export type CreateVisitComentMutation = { __typename?: 'Mutation', createVisitComent: { __typename?: 'VisitComent', id: string } };

export type VisitQueryVariables = Exact<{
  visitId: Scalars['ID'];
}>;


export type VisitQuery = { __typename?: 'Query', visit: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, dateVisit: any, status: StatusVisitEnum, mocked?: boolean | null, visitItem: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, mocked?: boolean | null, dateFull?: any | null, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string } | null }> } };

export type GenerateWorkedHoursQueryVariables = Exact<{
  input: GenerateWorkedHoursInput;
}>;


export type GenerateWorkedHoursQuery = { __typename?: 'Query', generateWorkedHours: Array<{ __typename?: 'VisitComent', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, type: VisitComentTypeEnum, location?: string | null, latitude?: string | null, longitude?: string | null, dateFull?: any | null, time?: string | null, mocked?: boolean | null, visit: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, latitude?: string | null, longitude?: string | null, mocked?: boolean | null, dateVisit: any, status: StatusVisitEnum, type?: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } | null }, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, isActivityNow: boolean } }> };

export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
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
  dateIssue
  legalRepresentativeIdentificationType
  legalRepresentativeIdentificationNumber
  phoneCountryCode
  phoneNumber
  address
  hasRural
  confirmationCode
  position
  status
  phoneVerification
  emailVerification
  type
  city {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  department {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  country {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  userRoles {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    defaultForType
    users {
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
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    roleFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
    }
  }
  userRolesFx {
    id
    createdAt
    updatedAt
    deletedAt
    permission
    role {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
    }
  }
  fullName
}
    `;
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
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    department {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    country {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    userRoles {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
      users {
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
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      roleFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
      }
    }
    userRolesFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
      role {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
      }
    }
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
export function useValidateUserTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
      }
export function useValidateUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export type ValidateUserTokenQueryHookResult = ReturnType<typeof useValidateUserTokenQuery>;
export type ValidateUserTokenLazyQueryHookResult = ReturnType<typeof useValidateUserTokenLazyQuery>;
export type ValidateUserTokenQueryResult = Apollo.QueryResult<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>;
export const SigninDocument = gql`
    mutation Signin($signinInput: SigninInput!) {
  signin(signinInput: $signinInput) {
    token
    user {
      ...userFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
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
export const CreateTipoDocumentoDocument = gql`
    mutation CreateTipoDocumento($createInput: CreateTipoDocumentoInput!) {
  createTipoDocumento(createInput: $createInput) {
    id
  }
}
    `;
export type CreateTipoDocumentoMutationFn = Apollo.MutationFunction<CreateTipoDocumentoMutation, CreateTipoDocumentoMutationVariables>;

/**
 * __useCreateTipoDocumentoMutation__
 *
 * To run a mutation, you first call `useCreateTipoDocumentoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTipoDocumentoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTipoDocumentoMutation, { data, loading, error }] = useCreateTipoDocumentoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateTipoDocumentoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTipoDocumentoMutation, CreateTipoDocumentoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTipoDocumentoMutation, CreateTipoDocumentoMutationVariables>(CreateTipoDocumentoDocument, options);
      }
export type CreateTipoDocumentoMutationHookResult = ReturnType<typeof useCreateTipoDocumentoMutation>;
export type CreateTipoDocumentoMutationResult = Apollo.MutationResult<CreateTipoDocumentoMutation>;
export type CreateTipoDocumentoMutationOptions = Apollo.BaseMutationOptions<CreateTipoDocumentoMutation, CreateTipoDocumentoMutationVariables>;
export const UpdateTipoDocumentoDocument = gql`
    mutation UpdateTipoDocumento($updateInput: UpdateTipoDocumentoInput!) {
  updateTipoDocumento(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateTipoDocumentoMutationFn = Apollo.MutationFunction<UpdateTipoDocumentoMutation, UpdateTipoDocumentoMutationVariables>;

/**
 * __useUpdateTipoDocumentoMutation__
 *
 * To run a mutation, you first call `useUpdateTipoDocumentoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTipoDocumentoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTipoDocumentoMutation, { data, loading, error }] = useUpdateTipoDocumentoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateTipoDocumentoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTipoDocumentoMutation, UpdateTipoDocumentoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTipoDocumentoMutation, UpdateTipoDocumentoMutationVariables>(UpdateTipoDocumentoDocument, options);
      }
export type UpdateTipoDocumentoMutationHookResult = ReturnType<typeof useUpdateTipoDocumentoMutation>;
export type UpdateTipoDocumentoMutationResult = Apollo.MutationResult<UpdateTipoDocumentoMutation>;
export type UpdateTipoDocumentoMutationOptions = Apollo.BaseMutationOptions<UpdateTipoDocumentoMutation, UpdateTipoDocumentoMutationVariables>;
export const DocumentosUsuarioDocument = gql`
    query DocumentosUsuario($pagination: Pagination, $where: FindDocWhere, $orderBy: [FindDocOrderBy!]) {
  documentosUsuario(pagination: $pagination, where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    usuario {
      email
      identificationNumber
      identificationType
      fullName
      id
    }
    tipoDocumento {
      id
      createdAt
      updatedAt
      deletedAt
      nombre
      descripcion
      obligatorio
      activo
    }
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
    estado
    observaciones
  }
  documentosUsuarioCount(
    pagination: $pagination
    where: $where
    orderBy: $orderBy
  ) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useDocumentosUsuarioQuery__
 *
 * To run a query within a React component, call `useDocumentosUsuarioQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentosUsuarioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentosUsuarioQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useDocumentosUsuarioQuery(baseOptions?: Apollo.QueryHookOptions<DocumentosUsuarioQuery, DocumentosUsuarioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentosUsuarioQuery, DocumentosUsuarioQueryVariables>(DocumentosUsuarioDocument, options);
      }
export function useDocumentosUsuarioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentosUsuarioQuery, DocumentosUsuarioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentosUsuarioQuery, DocumentosUsuarioQueryVariables>(DocumentosUsuarioDocument, options);
        }
export type DocumentosUsuarioQueryHookResult = ReturnType<typeof useDocumentosUsuarioQuery>;
export type DocumentosUsuarioLazyQueryHookResult = ReturnType<typeof useDocumentosUsuarioLazyQuery>;
export type DocumentosUsuarioQueryResult = Apollo.QueryResult<DocumentosUsuarioQuery, DocumentosUsuarioQueryVariables>;
export const TiposDocumentoDocument = gql`
    query TiposDocumento($pagination: Pagination) {
  tiposDocumento(pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    nombre
    descripcion
    obligatorio
    activo
  }
  tiposDocumentoCount(pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useTiposDocumentoQuery__
 *
 * To run a query within a React component, call `useTiposDocumentoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTiposDocumentoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTiposDocumentoQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTiposDocumentoQuery(baseOptions?: Apollo.QueryHookOptions<TiposDocumentoQuery, TiposDocumentoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TiposDocumentoQuery, TiposDocumentoQueryVariables>(TiposDocumentoDocument, options);
      }
export function useTiposDocumentoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TiposDocumentoQuery, TiposDocumentoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TiposDocumentoQuery, TiposDocumentoQueryVariables>(TiposDocumentoDocument, options);
        }
export type TiposDocumentoQueryHookResult = ReturnType<typeof useTiposDocumentoQuery>;
export type TiposDocumentoLazyQueryHookResult = ReturnType<typeof useTiposDocumentoLazyQuery>;
export type TiposDocumentoQueryResult = Apollo.QueryResult<TiposDocumentoQuery, TiposDocumentoQueryVariables>;
export const CreateDocumentoUsuarioDocument = gql`
    mutation CreateDocumentoUsuario($createInput: CreateDocumentoUsuarioInput!) {
  createDocumentoUsuario(createInput: $createInput) {
    id
  }
}
    `;
export type CreateDocumentoUsuarioMutationFn = Apollo.MutationFunction<CreateDocumentoUsuarioMutation, CreateDocumentoUsuarioMutationVariables>;

/**
 * __useCreateDocumentoUsuarioMutation__
 *
 * To run a mutation, you first call `useCreateDocumentoUsuarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentoUsuarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentoUsuarioMutation, { data, loading, error }] = useCreateDocumentoUsuarioMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateDocumentoUsuarioMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentoUsuarioMutation, CreateDocumentoUsuarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentoUsuarioMutation, CreateDocumentoUsuarioMutationVariables>(CreateDocumentoUsuarioDocument, options);
      }
export type CreateDocumentoUsuarioMutationHookResult = ReturnType<typeof useCreateDocumentoUsuarioMutation>;
export type CreateDocumentoUsuarioMutationResult = Apollo.MutationResult<CreateDocumentoUsuarioMutation>;
export type CreateDocumentoUsuarioMutationOptions = Apollo.BaseMutationOptions<CreateDocumentoUsuarioMutation, CreateDocumentoUsuarioMutationVariables>;
export const UpdateDocumentoUsuarioDocument = gql`
    mutation UpdateDocumentoUsuario($updateInput: UpdateDocumentoUsuarioInput!) {
  updateDocumentoUsuario(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateDocumentoUsuarioMutationFn = Apollo.MutationFunction<UpdateDocumentoUsuarioMutation, UpdateDocumentoUsuarioMutationVariables>;

/**
 * __useUpdateDocumentoUsuarioMutation__
 *
 * To run a mutation, you first call `useUpdateDocumentoUsuarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDocumentoUsuarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDocumentoUsuarioMutation, { data, loading, error }] = useUpdateDocumentoUsuarioMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateDocumentoUsuarioMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDocumentoUsuarioMutation, UpdateDocumentoUsuarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDocumentoUsuarioMutation, UpdateDocumentoUsuarioMutationVariables>(UpdateDocumentoUsuarioDocument, options);
      }
export type UpdateDocumentoUsuarioMutationHookResult = ReturnType<typeof useUpdateDocumentoUsuarioMutation>;
export type UpdateDocumentoUsuarioMutationResult = Apollo.MutationResult<UpdateDocumentoUsuarioMutation>;
export type UpdateDocumentoUsuarioMutationOptions = Apollo.BaseMutationOptions<UpdateDocumentoUsuarioMutation, UpdateDocumentoUsuarioMutationVariables>;
export const RemoveDocumentoUsuarioDocument = gql`
    mutation RemoveDocumentoUsuario($removeDocumentoUsuarioId: ID!) {
  removeDocumentoUsuario(id: $removeDocumentoUsuarioId) {
    id
  }
}
    `;
export type RemoveDocumentoUsuarioMutationFn = Apollo.MutationFunction<RemoveDocumentoUsuarioMutation, RemoveDocumentoUsuarioMutationVariables>;

/**
 * __useRemoveDocumentoUsuarioMutation__
 *
 * To run a mutation, you first call `useRemoveDocumentoUsuarioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDocumentoUsuarioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDocumentoUsuarioMutation, { data, loading, error }] = useRemoveDocumentoUsuarioMutation({
 *   variables: {
 *      removeDocumentoUsuarioId: // value for 'removeDocumentoUsuarioId'
 *   },
 * });
 */
export function useRemoveDocumentoUsuarioMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDocumentoUsuarioMutation, RemoveDocumentoUsuarioMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveDocumentoUsuarioMutation, RemoveDocumentoUsuarioMutationVariables>(RemoveDocumentoUsuarioDocument, options);
      }
export type RemoveDocumentoUsuarioMutationHookResult = ReturnType<typeof useRemoveDocumentoUsuarioMutation>;
export type RemoveDocumentoUsuarioMutationResult = Apollo.MutationResult<RemoveDocumentoUsuarioMutation>;
export type RemoveDocumentoUsuarioMutationOptions = Apollo.BaseMutationOptions<RemoveDocumentoUsuarioMutation, RemoveDocumentoUsuarioMutationVariables>;
export const ProjectVistsDocument = gql`
    query ProjectVists($orderBy: [FindVisitProjectOrderBy!], $where: FindVisitProjectWhere, $pagination: Pagination) {
  projectVists(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
    endDate
    startDate
    isCompleted
  }
  projectVistsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useProjectVistsQuery__
 *
 * To run a query within a React component, call `useProjectVistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectVistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectVistsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useProjectVistsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectVistsQuery, ProjectVistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectVistsQuery, ProjectVistsQueryVariables>(ProjectVistsDocument, options);
      }
export function useProjectVistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectVistsQuery, ProjectVistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectVistsQuery, ProjectVistsQueryVariables>(ProjectVistsDocument, options);
        }
export type ProjectVistsQueryHookResult = ReturnType<typeof useProjectVistsQuery>;
export type ProjectVistsLazyQueryHookResult = ReturnType<typeof useProjectVistsLazyQuery>;
export type ProjectVistsQueryResult = Apollo.QueryResult<ProjectVistsQuery, ProjectVistsQueryVariables>;
export const CreateProjectVistDocument = gql`
    mutation CreateProjectVist($createInput: CreateVisitProjectInput!) {
  createProjectVist(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProjectVistMutationFn = Apollo.MutationFunction<CreateProjectVistMutation, CreateProjectVistMutationVariables>;

/**
 * __useCreateProjectVistMutation__
 *
 * To run a mutation, you first call `useCreateProjectVistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectVistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectVistMutation, { data, loading, error }] = useCreateProjectVistMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProjectVistMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectVistMutation, CreateProjectVistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectVistMutation, CreateProjectVistMutationVariables>(CreateProjectVistDocument, options);
      }
export type CreateProjectVistMutationHookResult = ReturnType<typeof useCreateProjectVistMutation>;
export type CreateProjectVistMutationResult = Apollo.MutationResult<CreateProjectVistMutation>;
export type CreateProjectVistMutationOptions = Apollo.BaseMutationOptions<CreateProjectVistMutation, CreateProjectVistMutationVariables>;
export const UpdateProjectVistDocument = gql`
    mutation UpdateProjectVist($updateInput: UpdateVisitProjectInput!) {
  updateProjectVist(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProjectVistMutationFn = Apollo.MutationFunction<UpdateProjectVistMutation, UpdateProjectVistMutationVariables>;

/**
 * __useUpdateProjectVistMutation__
 *
 * To run a mutation, you first call `useUpdateProjectVistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectVistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectVistMutation, { data, loading, error }] = useUpdateProjectVistMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProjectVistMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectVistMutation, UpdateProjectVistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectVistMutation, UpdateProjectVistMutationVariables>(UpdateProjectVistDocument, options);
      }
export type UpdateProjectVistMutationHookResult = ReturnType<typeof useUpdateProjectVistMutation>;
export type UpdateProjectVistMutationResult = Apollo.MutationResult<UpdateProjectVistMutation>;
export type UpdateProjectVistMutationOptions = Apollo.BaseMutationOptions<UpdateProjectVistMutation, UpdateProjectVistMutationVariables>;
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
export type ToolsQueryHookResult = ReturnType<typeof useToolsQuery>;
export type ToolsLazyQueryHookResult = ReturnType<typeof useToolsLazyQuery>;
export type ToolsQueryResult = Apollo.QueryResult<ToolsQuery, ToolsQueryVariables>;
export const ToolsItemsDocument = gql`
    query ToolsItems($orderBy: [FindToolUnitOrderBy!], $where: FindToolUnitWhere, $pagination: Pagination) {
  ToolsItems(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    referencia
    tool {
      id
      createdAt
      updatedAt
      deletedAt
      name
      reference
      __typename
    }
    status
    __typename
    visits {
      id
      createdAt
      updatedAt
      deletedAt
      visit {
        id
        createdAt
        updatedAt
        deletedAt
        description
        location
        latitude
        longitude
        mocked
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
        user {
          email
          identificationType
          identificationNumber
          fullName
          id
        }
      }
      toolUnit {
        id
        createdAt
        updatedAt
        deletedAt
        name
        referencia
      }
      usageDate
      status
      entryDate
      user {
        email
        identificationType
        identificationNumber
        fullName
        id
      }
      photos {
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
  }
  ToolsItemsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
    __typename
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
export type ToolsItemsQueryHookResult = ReturnType<typeof useToolsItemsQuery>;
export type ToolsItemsLazyQueryHookResult = ReturnType<typeof useToolsItemsLazyQuery>;
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
export type ToolsPhotosQueryHookResult = ReturnType<typeof useToolsPhotosQuery>;
export type ToolsPhotosLazyQueryHookResult = ReturnType<typeof useToolsPhotosLazyQuery>;
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
      referencia
      name
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
export type ToolsVisitsQueryHookResult = ReturnType<typeof useToolsVisitsQuery>;
export type ToolsVisitsLazyQueryHookResult = ReturnType<typeof useToolsVisitsLazyQuery>;
export type ToolsVisitsQueryResult = Apollo.QueryResult<ToolsVisitsQuery, ToolsVisitsQueryVariables>;
export const UsersDocument = gql`
    query Users($orderBy: [FindUsersOrderBy!], $where: FindUsersWhere, $pagination: Pagination) {
  users(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    isActivityNow
    identificationType
    identificationNumber
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    typeWoker
    city {
      id
      name
    }
    department {
      id
      name
    }
    country {
      id
      name
    }
    userRoles {
      id
      name
    }
    userRolesFx {
      id
    }
    fullName
  }
  usersCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createInput: CreateUserInput!) {
  createUser(createInput: $createInput) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($removeUserId: ID!) {
  removeUser(id: $removeUserId) {
    id
    fullName
    name
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      removeUserId: // value for 'removeUserId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateInput: UpdateUserInput!) {
  updateUser(updateInput: $updateInput) {
    id
    fullName
    lastName
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateVisitTypeDocument = gql`
    mutation CreateVisitType($createInput: CreateVisitTypeInput!) {
  createVisitType(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitTypeMutationFn = Apollo.MutationFunction<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>;

/**
 * __useCreateVisitTypeMutation__
 *
 * To run a mutation, you first call `useCreateVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitTypeMutation, { data, loading, error }] = useCreateVisitTypeMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>(CreateVisitTypeDocument, options);
      }
export type CreateVisitTypeMutationHookResult = ReturnType<typeof useCreateVisitTypeMutation>;
export type CreateVisitTypeMutationResult = Apollo.MutationResult<CreateVisitTypeMutation>;
export type CreateVisitTypeMutationOptions = Apollo.BaseMutationOptions<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>;
export const UpdateVisitTypeDocument = gql`
    mutation UpdateVisitType($updateInput: UpdateVisitTypeInput!) {
  updateVisitType(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateVisitTypeMutationFn = Apollo.MutationFunction<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>;

/**
 * __useUpdateVisitTypeMutation__
 *
 * To run a mutation, you first call `useUpdateVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitTypeMutation, { data, loading, error }] = useUpdateVisitTypeMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>(UpdateVisitTypeDocument, options);
      }
export type UpdateVisitTypeMutationHookResult = ReturnType<typeof useUpdateVisitTypeMutation>;
export type UpdateVisitTypeMutationResult = Apollo.MutationResult<UpdateVisitTypeMutation>;
export type UpdateVisitTypeMutationOptions = Apollo.BaseMutationOptions<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>;
export const VisitTypesDocument = gql`
    query VisitTypes($orderBy: [FindVisitTypeOrderBy!], $where: FindVisitTypeWhere, $pagination: Pagination) {
  visitTypes(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
  visitTypesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
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
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
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
export type VisitTypesQueryHookResult = ReturnType<typeof useVisitTypesQuery>;
export type VisitTypesLazyQueryHookResult = ReturnType<typeof useVisitTypesLazyQuery>;
export type VisitTypesQueryResult = Apollo.QueryResult<VisitTypesQuery, VisitTypesQueryVariables>;
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
    query Visits($where: FindVisitWhere, $orderBy: [FindVisitOrderBy!], $pagination: Pagination) {
  visits(where: $where, orderBy: $orderBy, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    latitude
    longitude
    dateVisit
    mocked
    status
    project {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
      endDate
      startDate
      isCompleted
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
      mocked
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
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
  }
  visitsCount(where: $where, orderBy: $orderBy, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
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
 *      pagination: // value for 'pagination'
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
export type VisitsQueryHookResult = ReturnType<typeof useVisitsQuery>;
export type VisitsLazyQueryHookResult = ReturnType<typeof useVisitsLazyQuery>;
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
    mocked
    status
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
      mocked
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
export type VisitFindOneArgQueryHookResult = ReturnType<typeof useVisitFindOneArgQuery>;
export type VisitFindOneArgLazyQueryHookResult = ReturnType<typeof useVisitFindOneArgLazyQuery>;
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
    mocked
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
      mocked
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
export function useVisitQuery(baseOptions: Apollo.QueryHookOptions<VisitQuery, VisitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
      }
export function useVisitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
        }
export type VisitQueryHookResult = ReturnType<typeof useVisitQuery>;
export type VisitLazyQueryHookResult = ReturnType<typeof useVisitLazyQuery>;
export type VisitQueryResult = Apollo.QueryResult<VisitQuery, VisitQueryVariables>;
export const GenerateWorkedHoursDocument = gql`
    query GenerateWorkedHours($input: generateWorkedHoursInput!) {
  generateWorkedHours(input: $input) {
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
    time
    mocked
    visit {
      id
      createdAt
      updatedAt
      deletedAt
      description
      location
      latitude
      longitude
      mocked
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
    }
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
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      fullName
      isActivityNow
    }
  }
}
    `;

/**
 * __useGenerateWorkedHoursQuery__
 *
 * To run a query within a React component, call `useGenerateWorkedHoursQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateWorkedHoursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateWorkedHoursQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateWorkedHoursQuery(baseOptions: Apollo.QueryHookOptions<GenerateWorkedHoursQuery, GenerateWorkedHoursQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateWorkedHoursQuery, GenerateWorkedHoursQueryVariables>(GenerateWorkedHoursDocument, options);
      }
export function useGenerateWorkedHoursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateWorkedHoursQuery, GenerateWorkedHoursQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateWorkedHoursQuery, GenerateWorkedHoursQueryVariables>(GenerateWorkedHoursDocument, options);
        }
export type GenerateWorkedHoursQueryHookResult = ReturnType<typeof useGenerateWorkedHoursQuery>;
export type GenerateWorkedHoursLazyQueryHookResult = ReturnType<typeof useGenerateWorkedHoursLazyQuery>;
export type GenerateWorkedHoursQueryResult = Apollo.QueryResult<GenerateWorkedHoursQuery, GenerateWorkedHoursQueryVariables>;