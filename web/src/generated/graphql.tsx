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


export type MutationUpdateStudyArgs = {
  updateStudy: StudyInput;
};

export type Query = {
  __typename?: 'Query';
  changePassword: Scalars['Boolean']['output'];
  login: UserResponse;
  multiReadStudy: StudyMultiResponse;
  readTags: Array<StudyTag>;
  singleReadStudy: Study;
};


export type QueryChangePasswordArgs = {
  email: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryMultiReadStudyArgs = {
  usreId: Scalars['String']['input'];
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
  studyTagId: Scalars['Float']['output'];
  studyTime: Scalars['Float']['output'];
  studyYear: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type StudyInput = {
  studyContent?: InputMaybe<Scalars['String']['input']>;
  studyDate: Scalars['Float']['input'];
  studyId: Scalars['Float']['input'];
  studyTagId?: InputMaybe<Scalars['Float']['input']>;
  studyTime: Scalars['Float']['input'];
  studyYear: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};

export type StudyMultiResponse = {
  __typename?: 'StudyMultiResponse';
  studies?: Maybe<Array<Study>>;
};

export type StudyTag = {
  __typename?: 'StudyTag';
  id: Scalars['Float']['output'];
  show: Scalars['Boolean']['output'];
  studyTagKey: Scalars['String']['output'];
  studyTagLabel: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  age: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  professionId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type UserInput = {
  password: Scalars['String']['input'];
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


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', userId: string, userName: string, email: string, professionId: string } | null } };

export type SigleReadStudyQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type SigleReadStudyQuery = { __typename?: 'Query', singleReadStudy: { __typename?: 'Study', studyId: number, userId: string, studyYear: number, studyDate: number, studyTime: number } };

export type MultiReadStudyQueryVariables = Exact<{
  usreId: Scalars['String']['input'];
}>;


export type MultiReadStudyQuery = { __typename?: 'Query', multiReadStudy: { __typename?: 'StudyMultiResponse', studies?: Array<{ __typename?: 'Study', studyId: number, studyYear: number, studyDate: number, studyTime: number, studyTagId: number, studyContent: string }> | null } };

export type ReadTagsQueryVariables = Exact<{
  user: Scalars['String']['input'];
}>;


export type ReadTagsQuery = { __typename?: 'Query', readTags: Array<{ __typename?: 'StudyTag', userId: string, studyTagKey: string, studyTagLabel: string, show: boolean }> };


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
    query MultiReadStudy($usreId: String!) {
  multiReadStudy(usreId: $usreId) {
    studies {
      studyId
      studyYear
      studyDate
      studyTime
      studyTagId
      studyContent
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
 *      usreId: // value for 'usreId'
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