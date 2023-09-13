import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query Login($email: String!, $password: String!) {
    login(email: email, password: password) {
      errors {
        field,
        errors
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
  query SigleReadStudy($id: Number!) {
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
  query MultiReadStudy($userId: String!) {
    multiReadStudy(userId: $userId) {
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
  query ReadTags($userId: String!) {
    readTags(userId: $userId) {
      userId,
      studyTagKey,
      studyTagLabel,
      show  
    }
  }
`;