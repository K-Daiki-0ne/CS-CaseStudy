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