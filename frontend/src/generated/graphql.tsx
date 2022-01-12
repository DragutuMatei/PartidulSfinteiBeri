import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPoints: Scalars['Boolean'];
  addSedinta: Sedinte;
  addTask: Tasks;
  addUser: Scalars['Boolean'];
  changePassword: UserResponse;
  createProiect: Proiecte;
  deleteProiect: Scalars['Boolean'];
  deleteSedinta: Scalars['Boolean'];
  finish: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  getUserByEmail: UserR;
  getUserById: UserR;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationAddPointsArgs = {
  points: Scalars['Float'];
  taskId: Scalars['Float'];
};


export type MutationAddSedintaArgs = {
  values: SedintaInput;
};


export type MutationAddTaskArgs = {
  values: TaskInput;
};


export type MutationAddUserArgs = {
  idUserAdd: Scalars['Float'];
  proiectId: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateProiectArgs = {
  values: ProiecteInput;
};


export type MutationDeleteProiectArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSedintaArgs = {
  sedintaId: Scalars['Float'];
};


export type MutationFinishArgs = {
  taskId: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetUserByEmailArgs = {
  email: Scalars['String'];
};


export type MutationGetUserByIdArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};

export type Proiecte = {
  __typename?: 'Proiecte';
  id: Scalars['Float'];
  numeleProiectului: Scalars['String'];
  sefId: Scalars['Float'];
  userId: Scalars['String'];
};

export type ProiecteInput = {
  numeleProiectului: Scalars['String'];
  sefId: Scalars['Float'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  checkIfExists: Scalars['Boolean'];
  getAProiectById: Proiecte;
  getAllProiecte: Array<Proiecte>;
  getLoggedUser?: Maybe<User>;
  getSedinte: Array<Sedinte>;
  getSomeUsers: Array<User>;
  getTaskByProiect: Array<Tasks>;
  getTasks: Array<Tasks>;
  getUserByIdQ: UserR;
};


export type QueryCheckIfExistsArgs = {
  email: Scalars['String'];
};


export type QueryGetAProiectByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetSedinteArgs = {
  proiectId: Scalars['Float'];
};


export type QueryGetSomeUsersArgs = {
  ids: Scalars['String'];
};


export type QueryGetTaskByProiectArgs = {
  proiectId: Scalars['Float'];
};


export type QueryGetUserByIdQArgs = {
  id: Scalars['Float'];
};

export type SedintaInput = {
  data: Scalars['String'];
  topic: Scalars['String'];
  userId: Scalars['Float'];
};

export type Sedinte = {
  __typename?: 'Sedinte';
  data: Scalars['String'];
  id: Scalars['Float'];
  proiectId: Scalars['Float'];
  topic: Scalars['String'];
};

export type TaskInput = {
  deadline: Scalars['String'];
  finish?: Maybe<Scalars['Boolean']>;
  points?: Maybe<Scalars['Float']>;
  proiectId: Scalars['Float'];
  sefId: Scalars['Float'];
  task: Scalars['String'];
  userId: Scalars['Float'];
};

export type Tasks = {
  __typename?: 'Tasks';
  deadline: Scalars['String'];
  finish?: Maybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  points?: Maybe<Scalars['Float']>;
  proiectId: Scalars['Float'];
  sefId: Scalars['Float'];
  task: Scalars['String'];
  userId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserR = {
  __typename?: 'UserR';
  email: Scalars['String'];
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined };

export type AddPointsMutationVariables = Exact<{
  taskId: Scalars['Float'];
  points: Scalars['Float'];
}>;


export type AddPointsMutation = { __typename?: 'Mutation', addPoints: boolean };

export type AddSedintaMutationVariables = Exact<{
  values: SedintaInput;
}>;


export type AddSedintaMutation = { __typename?: 'Mutation', addSedinta: { __typename?: 'Sedinte', id: number, topic: string, data: string } };

export type AddTaskMutationVariables = Exact<{
  values: TaskInput;
}>;


export type AddTaskMutation = { __typename?: 'Mutation', addTask: { __typename?: 'Tasks', id: number, task: string, userId: number, sefId: number, proiectId: number, deadline: string } };

export type AddUserMutationVariables = Exact<{
  idUserAdd: Scalars['Float'];
  proiectId: Scalars['Float'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: boolean };

export type CreacteProiectMutationVariables = Exact<{
  values: ProiecteInput;
}>;


export type CreacteProiectMutation = { __typename?: 'Mutation', createProiect: { __typename?: 'Proiecte', id: number, userId: string, numeleProiectului: string, sefId: number } };

export type DeleteProiectMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteProiectMutation = { __typename?: 'Mutation', deleteProiect: boolean };

export type ReturnUserEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ReturnUserEmailMutation = { __typename?: 'Mutation', getUserByEmail: { __typename?: 'UserR', id: number, username: string, email: string } };

export type ReturnUserByIdMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type ReturnUserByIdMutation = { __typename?: 'Mutation', getUserById: { __typename?: 'UserR', id: number, username: string, email: string } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  optiuni: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined } };

export type GetAProiectByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetAProiectByIdQuery = { __typename?: 'Query', getAProiectById: { __typename?: 'Proiecte', id: number, userId: string, numeleProiectului: string, sefId: number } };

export type GetAllProiecteQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProiecteQuery = { __typename?: 'Query', getAllProiecte: Array<{ __typename?: 'Proiecte', id: number, userId: string, numeleProiectului: string, sefId: number }> };

export type GetSedinteQueryVariables = Exact<{
  proiectId: Scalars['Float'];
}>;


export type GetSedinteQuery = { __typename?: 'Query', getSedinte: Array<{ __typename?: 'Sedinte', id: number, topic: string, data: string, proiectId: number }> };

export type GetSomeUsersQueryVariables = Exact<{
  ids: Scalars['String'];
}>;


export type GetSomeUsersQuery = { __typename?: 'Query', getSomeUsers: Array<{ __typename?: 'User', id: number, username: string, email: string }> };

export type GetTaskByProiectQueryVariables = Exact<{
  proiectId: Scalars['Float'];
}>;


export type GetTaskByProiectQuery = { __typename?: 'Query', getTaskByProiect: Array<{ __typename?: 'Tasks', id: number, task: string, userId: number, sefId: number, proiectId: number, points?: number | null | undefined, finish?: boolean | null | undefined, deadline: string }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserByIdQ: { __typename?: 'UserR', id: number, username: string, email: string } };

export type GetLoggedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedUserQuery = { __typename?: 'Query', getLoggedUser?: { __typename?: 'User', id: number, username: string, email: string } | null | undefined };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddPointsDocument = gql`
    mutation AddPoints($taskId: Float!, $points: Float!) {
  addPoints(taskId: $taskId, points: $points)
}
    `;

export function useAddPointsMutation() {
  return Urql.useMutation<AddPointsMutation, AddPointsMutationVariables>(AddPointsDocument);
};
export const AddSedintaDocument = gql`
    mutation AddSedinta($values: SedintaInput!) {
  addSedinta(values: $values) {
    id
    topic
    data
  }
}
    `;

export function useAddSedintaMutation() {
  return Urql.useMutation<AddSedintaMutation, AddSedintaMutationVariables>(AddSedintaDocument);
};
export const AddTaskDocument = gql`
    mutation AddTask($values: TaskInput!) {
  addTask(values: $values) {
    id
    task
    userId
    sefId
    proiectId
    deadline
  }
}
    `;

export function useAddTaskMutation() {
  return Urql.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument);
};
export const AddUserDocument = gql`
    mutation AddUser($idUserAdd: Float!, $proiectId: Float!) {
  addUser(idUserAdd: $idUserAdd, proiectId: $proiectId)
}
    `;

export function useAddUserMutation() {
  return Urql.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument);
};
export const CreacteProiectDocument = gql`
    mutation CreacteProiect($values: ProiecteInput!) {
  createProiect(values: $values) {
    id
    userId
    numeleProiectului
    sefId
  }
}
    `;

export function useCreacteProiectMutation() {
  return Urql.useMutation<CreacteProiectMutation, CreacteProiectMutationVariables>(CreacteProiectDocument);
};
export const DeleteProiectDocument = gql`
    mutation DeleteProiect($id: Float!) {
  deleteProiect(id: $id)
}
    `;

export function useDeleteProiectMutation() {
  return Urql.useMutation<DeleteProiectMutation, DeleteProiectMutationVariables>(DeleteProiectDocument);
};
export const ReturnUserEmailDocument = gql`
    mutation ReturnUserEmail($email: String!) {
  getUserByEmail(email: $email) {
    id
    username
    email
  }
}
    `;

export function useReturnUserEmailMutation() {
  return Urql.useMutation<ReturnUserEmailMutation, ReturnUserEmailMutationVariables>(ReturnUserEmailDocument);
};
export const ReturnUserByIdDocument = gql`
    mutation ReturnUserById($id: Float!) {
  getUserById(id: $id) {
    id
    username
    email
  }
}
    `;

export function useReturnUserByIdMutation() {
  return Urql.useMutation<ReturnUserByIdMutation, ReturnUserByIdMutationVariables>(ReturnUserByIdDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($optiuni: UserInput!) {
  register(options: $optiuni) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetAProiectByIdDocument = gql`
    query GetAProiectById($id: Float!) {
  getAProiectById(id: $id) {
    id
    userId
    numeleProiectului
    sefId
  }
}
    `;

export function useGetAProiectByIdQuery(options: Omit<Urql.UseQueryArgs<GetAProiectByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAProiectByIdQuery>({ query: GetAProiectByIdDocument, ...options });
};
export const GetAllProiecteDocument = gql`
    query GetAllProiecte {
  getAllProiecte {
    id
    userId
    numeleProiectului
    sefId
  }
}
    `;

export function useGetAllProiecteQuery(options: Omit<Urql.UseQueryArgs<GetAllProiecteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllProiecteQuery>({ query: GetAllProiecteDocument, ...options });
};
export const GetSedinteDocument = gql`
    query GetSedinte($proiectId: Float!) {
  getSedinte(proiectId: $proiectId) {
    id
    topic
    data
    proiectId
  }
}
    `;

export function useGetSedinteQuery(options: Omit<Urql.UseQueryArgs<GetSedinteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSedinteQuery>({ query: GetSedinteDocument, ...options });
};
export const GetSomeUsersDocument = gql`
    query GetSomeUsers($ids: String!) {
  getSomeUsers(ids: $ids) {
    id
    username
    email
  }
}
    `;

export function useGetSomeUsersQuery(options: Omit<Urql.UseQueryArgs<GetSomeUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSomeUsersQuery>({ query: GetSomeUsersDocument, ...options });
};
export const GetTaskByProiectDocument = gql`
    query GetTaskByProiect($proiectId: Float!) {
  getTaskByProiect(proiectId: $proiectId) {
    id
    task
    userId
    sefId
    proiectId
    points
    finish
    deadline
  }
}
    `;

export function useGetTaskByProiectQuery(options: Omit<Urql.UseQueryArgs<GetTaskByProiectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetTaskByProiectQuery>({ query: GetTaskByProiectDocument, ...options });
};
export const GetUserByIdDocument = gql`
    query GetUserById($id: Float!) {
  getUserByIdQ(id: $id) {
    id
    username
    email
  }
}
    `;

export function useGetUserByIdQuery(options: Omit<Urql.UseQueryArgs<GetUserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserByIdQuery>({ query: GetUserByIdDocument, ...options });
};
export const GetLoggedUserDocument = gql`
    query getLoggedUser {
  getLoggedUser {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useGetLoggedUserQuery(options: Omit<Urql.UseQueryArgs<GetLoggedUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetLoggedUserQuery>({ query: GetLoggedUserDocument, ...options });
};