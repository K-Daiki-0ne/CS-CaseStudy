import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        field,
        message
      }
      user {
        userId,
        userName,
        email,
        professionId
      }
    }
  }
`;

export const SINGLE_READ_STUDY = gql`
  query SigleReadStudy($id: Float!) {
    singleReadStudy(id: $id) {
      studyId,
      userId,
      studyYear,
      studyDate,
      studyTime
    }
  }
`;

export const MULTI_READ_STUDY = gql`
  query MultiReadStudy($usreId: String!) {
    multiReadStudy(usreId: $usreId) {
      studies {
        studyId,
        studyYear,
        studyDate,
        studyTime,
        studyTagId,
        studyContent
      }  
    }
  }
`;

export const READ_TAGS = gql`
  query ReadTags($user: String!) {
    readTags(user: $user) {
      userId,
      studyTagKey,
      studyTagLabel,
      show  
    }
  }
`;

export const IS_USER = gql`
  query IsUser($userId: String!) {
    isUser(userId: $userId)
  }
`

export const REGISTER_USER = gql`
  mutation Register($userId: String!, $userName: String!, $password: String, $professionId: String) {
    register(user: {
      userId: $userId,
      userName: $userName,
      password: $password,
      professionId: $professionId
    }) {
      errors {
        field,
        message
      }
      user {
        userId,
        userName
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!) {
    createUser(email: $email)
  }
`;

export const CREATE_STUDY = gql`
  mutation CreateStudy($userId: String!, $studyYear: Float!, $studyDate: Float!, $studyTime: Float!, $studyTagId: Float, $studyContent: String) {
    createStudy(inputStudy: {
      userId: $userId,
      studyYear: $studyYear,
      studyDate: $studyDate,
      studyTime: $studyTime,
      studyTagId: $studyTagId,
      studyContent: $studyContent
    })
  }
`;

export const UPDATE_STUDY = gql`
  mutation UpdateStudy(
    $studyId: Float, 
    $userId: String!, 
    $studyYear: Float!, 
    $studyDate: Float!, 
    $studyTime: Float!, 
    $studyTagId: Float, 
    $studyContent: String
  ) { updateStudy(updateStudy: {
      studyId: $studyId,
      userId: $userId,
      studyYear: $studyYear,
      studyDate: $studyDate,
      studyTime: $studyTime,
      studyTagId: $studyTagId,
      studyContent: $studyContent
    })
  }
`;

export const DELETE_STUDY = gql`
  mutation DeleteStudy($studyId: Float!) {
    deleteStudy(studyId: $studyId)
  }
`;

export const CREATE_STUDY_TAG = gql`
  mutation CreateStudyTag($userId: String!, $tagKey: String!, $tagLabel: String!) {
    createStudyTag(userId: $userId, tagKey: $tagKey, tagLabel: $tagLabel)
  }
`;

export const DELETE_STUDY_TAG = gql`
  mutation DeleteStudyTag($id: Float!) {
    deleteStudyTag(id: $id)
  }
`;