import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
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

export const REGISTER_USER = gql`
  mutation Register($userId: String!, $userName: String!, $password, String, $professionId: String) {
    register(user: { userId: $userId, userName: $userName, password: $password, professionId: $professionId }) {
      errors {
        field,
        message
      }
      user {
        userId,
        userName,
        professionId
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
  mutation CreateStudy($userId: String!, $studyYear: Number, $studyDate: Number, $studyTime: Number, $studyTagId: Number, $studyContent: String) {
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
  mutation UpdateStudy($studyId: Number!, $userId: String!, $studyYear: Number, $studyDate: Number, @studyTime: Number, $studyTagId: number, $studyContent: String) {
    updateStudy(updateStudy: {
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
  mutation DeleteStudy($studyId: Number!) {
    deleteStudy(studyId: $studyId)
  }
`;

export const CREATE_STUDY_TAG = gql`
  mutation CreateStudyTag($userId: String!, $tagKey: String!, $tagLabel: String!) {
    createStudyTag(userId: $userId, tagKey: $tagKey, tagLabel: $tagLabel)
  }
`;

export const DELETE_STUDY_TAG = gql`
  mutation DeleteStudyTag($id: Number!) {
    deleteStudyTag(id: $id)
  }
`;