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
        professionId,
        goal
      }
    }
  }
`;

export const READ_STUSY_TIME = gql`
  query ReadStudyTime($userId: String!, $date: Float!) {
    readStudyTime(userId: $userId, date: $date) {
      day {
        time,
        minute
      }
      week {
        time,
        minute
      }
      month {
        time,
        minute
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
  query MultiReadStudy($userId: String!, $date: Float!) {
    multiReadStudy(userId: $userId, date: $date) {
      studies {
        studyId,
        userId,
        tagId,
        Study,
        Date,
        Time,
        Content
      },
      day {
        time,
        minute
      },
      week {
        time,
        minute
      },
      month {
        time,
        minute
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
`;

export const READ_USER_FOR_USERID = gql`
  query ReadUserForUserId($userId: String!) {
    readUserForUserId(userId: $userId) {
      errors {
        field,
        message
      }
      user {
        userId,
        userName,
        professionId,
        goal
      }
    }
  }
`

export const REGISTER_USER = gql`
  mutation Register($userId: String!, $userName: String!, $password: String, $professionId: String, $goal: String) {
    register(user: {
      userId: $userId,
      userName: $userName,
      password: $password,
      professionId: $professionId
      goal: $goal
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
  mutation CreateStudy(
    $userId: String!, 
    $studyYear: Float!, 
    $studyDate: Float!, 
    $studyTime: Float!, 
    $studyMinute: Float!, 
    $studyTagId: Float, 
    $studyContent: String
    ) { createStudy(inputStudy: {
      userId: $userId,
      studyYear: $studyYear,
      studyDate: $studyDate,
      studyTime: $studyTime,
      studyMinute: $studyMinute,
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
    $studyMinute: Float!, 
    $studyTagId: Float, 
    $studyContent: String
  ) { updateStudy(updateStudy: {
      studyId: $studyId,
      userId: $userId,
      studyYear: $studyYear,
      studyDate: $studyDate,
      studyTime: $studyTime,
      studyMinute: $studyMinute,
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
  mutation CreateStudyTag($userId: String!, $key: String!, $label: String!  ) {
    createStudyTag(userId: $userId, key: $key, label: $label)
  }
`;

export const DELETE_STUDY_TAG = gql`
  mutation DeleteStudyTag($id: Float!) {
    deleteStudyTag(id: $id)
  }
`;