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
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createStudy: Scalars['Boolean']['output'];
  createStudyTag: Scalars['Boolean']['output'];
  createUser: Scalars['Boolean']['output'];
  deleteStudy: Scalars['Boolean']['output'];
  deleteStudyTag: Scalars['Boolean']['output'];
  register: UserResponse;
  update: Scalars['Boolean']['output'];
  updateStudy: Scalars['Boolean']['output'];
};


export type MutationCreateStudyArgs = {
  inputStudy: StudyInput;
};


export type MutationCreateStudyTagArgs = {
  tagKey: Scalars['String']['input'];
  tagLabel: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
};


export type MutationDeleteStudyArgs = {
  studyId: Scalars['Float']['input'];
};


export type MutationDeleteStudyTagArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRegisterArgs = {
  user: UserInput;
};


export type MutationUpdateArgs = {
  user: UserInput;
};


export type MutationUpdateStudyArgs = {
  updateStudy: StudyInput;
};

export type Query = {
  __typename?: 'Query';
  changePassword: Scalars['Boolean']['output'];
  isUser: Scalars['Boolean']['output'];
  login: UserResponse;
  multiReadStudy: StudyMultiResponse;
  readStudyTime: StudyTimeResponse;
  readTags: Array<StudyTag>;
  singleReadStudy: Study;
};


export type QueryChangePasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryIsUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryMultiReadStudyArgs = {
  userId: Scalars['String']['input'];
};


export type QueryReadStudyTimeArgs = {
  date: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};


export type QueryReadTagsArgs = {
  user: Scalars['String']['input'];
};


export type QuerySingleReadStudyArgs = {
  id: Scalars['Float']['input'];
};

export type Study = {
  __typename?: 'Study';
  studyContent: Scalars['String']['output'];
  studyDate: Scalars['Float']['output'];
  studyId: Scalars['Float']['output'];
  studyMinute: Scalars['Float']['output'];
  studyTagId: Scalars['Float']['output'];
  studyTime: Scalars['Float']['output'];
  studyYear: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type StudyInput = {
  studyContent?: InputMaybe<Scalars['String']['input']>;
  studyDate: Scalars['Float']['input'];
  studyId?: InputMaybe<Scalars['Float']['input']>;
  studyMinute: Scalars['Float']['input'];
  studyTagId?: InputMaybe<Scalars['Float']['input']>;
  studyTime: Scalars['Float']['input'];
  studyYear: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

export type StudyMultiObjectType = {
  __typename?: 'StudyMultiObjectType';
  Content: Scalars['String']['output'];
  Date: Scalars['String']['output'];
  Study: Scalars['String']['output'];
  Time: Scalars['String']['output'];
  studyId: Scalars['Float']['output'];
  tagId: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type StudyMultiResponse = {
  __typename?: 'StudyMultiResponse';
  studies?: Maybe<Array<StudyMultiObjectType>>;
};

export type StudyTag = {
  __typename?: 'StudyTag';
  id: Scalars['Float']['output'];
  show: Scalars['Boolean']['output'];
  studyTagKey: Scalars['String']['output'];
  studyTagLabel: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type StudyTimeResponse = {
  __typename?: 'StudyTimeResponse';
  day: StudyTimeType;
  month: StudyTimeType;
  week: StudyTimeType;
};

export type StudyTimeType = {
  __typename?: 'StudyTimeType';
  minute: Scalars['Float']['output'];
  time: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  goal: Scalars['String']['output'];
  professionId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type UserInput = {
  goal?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  professionId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userId: string, userName: string, email: string, professionId: string, goal: string } | null } };

export type ReadStudyTimeQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  date: Scalars['Float']['input'];
}>;


export type ReadStudyTimeQuery = { __typename?: 'Query', readStudyTime: { __typename?: 'StudyTimeResponse', day: { __typename?: 'StudyTimeType', time: number, minute: number }, week: { __typename?: 'StudyTimeType', time: number, minute: number }, month: { __typename?: 'StudyTimeType', time: number, minute: number } } };

export type SigleReadStudyQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type SigleReadStudyQuery = { __typename?: 'Query', singleReadStudy: { __typename?: 'Study', studyId: number, userId: string, studyYear: number, studyDate: number, studyTime: number } };

export type MultiReadStudyQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type MultiReadStudyQuery = { __typename?: 'Query', multiReadStudy: { __typename?: 'StudyMultiResponse', studies?: Array<{ __typename?: 'StudyMultiObjectType', studyId: number, userId: string, tagId: number, Study: string, Date: string, Time: string, Content: string }> | null } };

export type ReadTagsQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type ReadTagsQuery = { __typename?: 'Query', readTags: Array<{ __typename?: 'StudyTag', userId: string, studyTagKey: string, studyTagLabel: string, show: boolean }> };

export type IsUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type IsUserQuery = { __typename?: 'Query', isUser: boolean };

export type RegisterMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  professionId?: InputMaybe<Scalars['String']['input']>;
  goal?: InputMaybe<Scalars['String']['input']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userId: string, userName: string } | null } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type CreateStudyMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  studyYear: Scalars['Float']['input'];
  studyDate: Scalars['Float']['input'];
  studyTime: Scalars['Float']['input'];
  studyMinute: Scalars['Float']['input'];
  studyTagId?: InputMaybe<Scalars['Float']['input']>;
  studyContent?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateStudyMutation = { __typename?: 'Mutation', createStudy: boolean };

export type UpdateStudyMutationVariables = Exact<{
  studyId?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
  studyYear: Scalars['Float']['input'];
  studyDate: Scalars['Float']['input'];
  studyTime: Scalars['Float']['input'];
  studyMinute: Scalars['Float']['input'];
  studyTagId?: InputMaybe<Scalars['Float']['input']>;
  studyContent?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateStudyMutation = { __typename?: 'Mutation', updateStudy: boolean };

export type DeleteStudyMutationVariables = Exact<{
  studyId: Scalars['Float']['input'];
}>;


export type DeleteStudyMutation = { __typename?: 'Mutation', deleteStudy: boolean };

export type CreateStudyTagMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  tagKey: Scalars['String']['input'];
  tagLabel: Scalars['String']['input'];
}>;


export type CreateStudyTagMutation = { __typename?: 'Mutation', createStudyTag: boolean };

export type DeleteStudyTagMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteStudyTagMutation = { __typename?: 'Mutation', deleteStudyTag: boolean };


export const LoginDocument = gql`
    query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      userId
      userName
      email
      professionId
      goal
    }
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const ReadStudyTimeDocument = gql`
    query ReadStudyTime($userId: String!, $date: Float!) {
  readStudyTime(userId: $userId, date: $date) {
    day {
      time
      minute
    }
    week {
      time
      minute
    }
    month {
      time
      minute
    }
  }
}
    `;

/**
 * __useReadStudyTimeQuery__
 *
 * To run a query within a React component, call `useReadStudyTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadStudyTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadStudyTimeQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useReadStudyTimeQuery(baseOptions: Apollo.QueryHookOptions<ReadStudyTimeQuery, ReadStudyTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReadStudyTimeQuery, ReadStudyTimeQueryVariables>(ReadStudyTimeDocument, options);
      }
export function useReadStudyTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadStudyTimeQuery, ReadStudyTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReadStudyTimeQuery, ReadStudyTimeQueryVariables>(ReadStudyTimeDocument, options);
        }
export type ReadStudyTimeQueryHookResult = ReturnType<typeof useReadStudyTimeQuery>;
export type ReadStudyTimeLazyQueryHookResult = ReturnType<typeof useReadStudyTimeLazyQuery>;
export type ReadStudyTimeQueryResult = Apollo.QueryResult<ReadStudyTimeQuery, ReadStudyTimeQueryVariables>;
export const SigleReadStudyDocument = gql`
    query SigleReadStudy($id: Float!) {
  singleReadStudy(id: $id) {
    studyId
    userId
    studyYear
    studyDate
    studyTime
  }
}
    `;

/**
 * __useSigleReadStudyQuery__
 *
 * To run a query within a React component, call `useSigleReadStudyQuery` and pass it any options that fit your needs.
 * When your component renders, `useSigleReadStudyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSigleReadStudyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSigleReadStudyQuery(baseOptions: Apollo.QueryHookOptions<SigleReadStudyQuery, SigleReadStudyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SigleReadStudyQuery, SigleReadStudyQueryVariables>(SigleReadStudyDocument, options);
      }
export function useSigleReadStudyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SigleReadStudyQuery, SigleReadStudyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SigleReadStudyQuery, SigleReadStudyQueryVariables>(SigleReadStudyDocument, options);
        }
export type SigleReadStudyQueryHookResult = ReturnType<typeof useSigleReadStudyQuery>;
export type SigleReadStudyLazyQueryHookResult = ReturnType<typeof useSigleReadStudyLazyQuery>;
export type SigleReadStudyQueryResult = Apollo.QueryResult<SigleReadStudyQuery, SigleReadStudyQueryVariables>;
export const MultiReadStudyDocument = gql`
    query MultiReadStudy($userId: String!) {
  multiReadStudy(userId: $userId) {
    studies {
      studyId
      userId
      tagId
      Study
      Date
      Time
      Content
    }
  }
}
    `;

/**
 * __useMultiReadStudyQuery__
 *
 * To run a query within a React component, call `useMultiReadStudyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMultiReadStudyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMultiReadStudyQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMultiReadStudyQuery(baseOptions: Apollo.QueryHookOptions<MultiReadStudyQuery, MultiReadStudyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MultiReadStudyQuery, MultiReadStudyQueryVariables>(MultiReadStudyDocument, options);
      }
export function useMultiReadStudyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MultiReadStudyQuery, MultiReadStudyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MultiReadStudyQuery, MultiReadStudyQueryVariables>(MultiReadStudyDocument, options);
        }
export type MultiReadStudyQueryHookResult = ReturnType<typeof useMultiReadStudyQuery>;
export type MultiReadStudyLazyQueryHookResult = ReturnType<typeof useMultiReadStudyLazyQuery>;
export type MultiReadStudyQueryResult = Apollo.QueryResult<MultiReadStudyQuery, MultiReadStudyQueryVariables>;
export const ReadTagsDocument = gql`
    query ReadTags($user: String!) {
  readTags(user: $user) {
    userId
    studyTagKey
    studyTagLabel
    show
  }
}
    `;

/**
 * __useReadTagsQuery__
 *
 * To run a query within a React component, call `useReadTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReadTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReadTagsQuery({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useReadTagsQuery(baseOptions: Apollo.QueryHookOptions<ReadTagsQuery, ReadTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReadTagsQuery, ReadTagsQueryVariables>(ReadTagsDocument, options);
      }
export function useReadTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReadTagsQuery, ReadTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReadTagsQuery, ReadTagsQueryVariables>(ReadTagsDocument, options);
        }
export type ReadTagsQueryHookResult = ReturnType<typeof useReadTagsQuery>;
export type ReadTagsLazyQueryHookResult = ReturnType<typeof useReadTagsLazyQuery>;
export type ReadTagsQueryResult = Apollo.QueryResult<ReadTagsQuery, ReadTagsQueryVariables>;
export const IsUserDocument = gql`
    query IsUser($userId: String!) {
  isUser(userId: $userId)
}
    `;

/**
 * __useIsUserQuery__
 *
 * To run a query within a React component, call `useIsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIsUserQuery(baseOptions: Apollo.QueryHookOptions<IsUserQuery, IsUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUserQuery, IsUserQueryVariables>(IsUserDocument, options);
      }
export function useIsUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserQuery, IsUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUserQuery, IsUserQueryVariables>(IsUserDocument, options);
        }
export type IsUserQueryHookResult = ReturnType<typeof useIsUserQuery>;
export type IsUserLazyQueryHookResult = ReturnType<typeof useIsUserLazyQuery>;
export type IsUserQueryResult = Apollo.QueryResult<IsUserQuery, IsUserQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($userId: String!, $userName: String!, $password: String, $professionId: String, $goal: String) {
  register(
    user: {userId: $userId, userName: $userName, password: $password, professionId: $professionId, goal: $goal}
  ) {
    errors {
      field
      message
    }
    user {
      userId
      userName
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *      professionId: // value for 'professionId'
 *      goal: // value for 'goal'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!) {
  createUser(email: $email)
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
 *      email: // value for 'email'
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
export const CreateStudyDocument = gql`
    mutation CreateStudy($userId: String!, $studyYear: Float!, $studyDate: Float!, $studyTime: Float!, $studyMinute: Float!, $studyTagId: Float, $studyContent: String) {
  createStudy(
    inputStudy: {userId: $userId, studyYear: $studyYear, studyDate: $studyDate, studyTime: $studyTime, studyMinute: $studyMinute, studyTagId: $studyTagId, studyContent: $studyContent}
  )
}
    `;
export type CreateStudyMutationFn = Apollo.MutationFunction<CreateStudyMutation, CreateStudyMutationVariables>;

/**
 * __useCreateStudyMutation__
 *
 * To run a mutation, you first call `useCreateStudyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudyMutation, { data, loading, error }] = useCreateStudyMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      studyYear: // value for 'studyYear'
 *      studyDate: // value for 'studyDate'
 *      studyTime: // value for 'studyTime'
 *      studyMinute: // value for 'studyMinute'
 *      studyTagId: // value for 'studyTagId'
 *      studyContent: // value for 'studyContent'
 *   },
 * });
 */
export function useCreateStudyMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudyMutation, CreateStudyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudyMutation, CreateStudyMutationVariables>(CreateStudyDocument, options);
      }
export type CreateStudyMutationHookResult = ReturnType<typeof useCreateStudyMutation>;
export type CreateStudyMutationResult = Apollo.MutationResult<CreateStudyMutation>;
export type CreateStudyMutationOptions = Apollo.BaseMutationOptions<CreateStudyMutation, CreateStudyMutationVariables>;
export const UpdateStudyDocument = gql`
    mutation UpdateStudy($studyId: Float, $userId: String!, $studyYear: Float!, $studyDate: Float!, $studyTime: Float!, $studyMinute: Float!, $studyTagId: Float, $studyContent: String) {
  updateStudy(
    updateStudy: {studyId: $studyId, userId: $userId, studyYear: $studyYear, studyDate: $studyDate, studyTime: $studyTime, studyMinute: $studyMinute, studyTagId: $studyTagId, studyContent: $studyContent}
  )
}
    `;
export type UpdateStudyMutationFn = Apollo.MutationFunction<UpdateStudyMutation, UpdateStudyMutationVariables>;

/**
 * __useUpdateStudyMutation__
 *
 * To run a mutation, you first call `useUpdateStudyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudyMutation, { data, loading, error }] = useUpdateStudyMutation({
 *   variables: {
 *      studyId: // value for 'studyId'
 *      userId: // value for 'userId'
 *      studyYear: // value for 'studyYear'
 *      studyDate: // value for 'studyDate'
 *      studyTime: // value for 'studyTime'
 *      studyMinute: // value for 'studyMinute'
 *      studyTagId: // value for 'studyTagId'
 *      studyContent: // value for 'studyContent'
 *   },
 * });
 */
export function useUpdateStudyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudyMutation, UpdateStudyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudyMutation, UpdateStudyMutationVariables>(UpdateStudyDocument, options);
      }
export type UpdateStudyMutationHookResult = ReturnType<typeof useUpdateStudyMutation>;
export type UpdateStudyMutationResult = Apollo.MutationResult<UpdateStudyMutation>;
export type UpdateStudyMutationOptions = Apollo.BaseMutationOptions<UpdateStudyMutation, UpdateStudyMutationVariables>;
export const DeleteStudyDocument = gql`
    mutation DeleteStudy($studyId: Float!) {
  deleteStudy(studyId: $studyId)
}
    `;
export type DeleteStudyMutationFn = Apollo.MutationFunction<DeleteStudyMutation, DeleteStudyMutationVariables>;

/**
 * __useDeleteStudyMutation__
 *
 * To run a mutation, you first call `useDeleteStudyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudyMutation, { data, loading, error }] = useDeleteStudyMutation({
 *   variables: {
 *      studyId: // value for 'studyId'
 *   },
 * });
 */
export function useDeleteStudyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudyMutation, DeleteStudyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudyMutation, DeleteStudyMutationVariables>(DeleteStudyDocument, options);
      }
export type DeleteStudyMutationHookResult = ReturnType<typeof useDeleteStudyMutation>;
export type DeleteStudyMutationResult = Apollo.MutationResult<DeleteStudyMutation>;
export type DeleteStudyMutationOptions = Apollo.BaseMutationOptions<DeleteStudyMutation, DeleteStudyMutationVariables>;
export const CreateStudyTagDocument = gql`
    mutation CreateStudyTag($userId: String!, $tagKey: String!, $tagLabel: String!) {
  createStudyTag(userId: $userId, tagKey: $tagKey, tagLabel: $tagLabel)
}
    `;
export type CreateStudyTagMutationFn = Apollo.MutationFunction<CreateStudyTagMutation, CreateStudyTagMutationVariables>;

/**
 * __useCreateStudyTagMutation__
 *
 * To run a mutation, you first call `useCreateStudyTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudyTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudyTagMutation, { data, loading, error }] = useCreateStudyTagMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      tagKey: // value for 'tagKey'
 *      tagLabel: // value for 'tagLabel'
 *   },
 * });
 */
export function useCreateStudyTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudyTagMutation, CreateStudyTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudyTagMutation, CreateStudyTagMutationVariables>(CreateStudyTagDocument, options);
      }
export type CreateStudyTagMutationHookResult = ReturnType<typeof useCreateStudyTagMutation>;
export type CreateStudyTagMutationResult = Apollo.MutationResult<CreateStudyTagMutation>;
export type CreateStudyTagMutationOptions = Apollo.BaseMutationOptions<CreateStudyTagMutation, CreateStudyTagMutationVariables>;
export const DeleteStudyTagDocument = gql`
    mutation DeleteStudyTag($id: Float!) {
  deleteStudyTag(id: $id)
}
    `;
export type DeleteStudyTagMutationFn = Apollo.MutationFunction<DeleteStudyTagMutation, DeleteStudyTagMutationVariables>;

/**
 * __useDeleteStudyTagMutation__
 *
 * To run a mutation, you first call `useDeleteStudyTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudyTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudyTagMutation, { data, loading, error }] = useDeleteStudyTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStudyTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudyTagMutation, DeleteStudyTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStudyTagMutation, DeleteStudyTagMutationVariables>(DeleteStudyTagDocument, options);
      }
export type DeleteStudyTagMutationHookResult = ReturnType<typeof useDeleteStudyTagMutation>;
export type DeleteStudyTagMutationResult = Apollo.MutationResult<DeleteStudyTagMutation>;
export type DeleteStudyTagMutationOptions = Apollo.BaseMutationOptions<DeleteStudyTagMutation, DeleteStudyTagMutationVariables>;