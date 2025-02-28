import { atom } from 'recoil';

type UserState = {
  userId: string;
  userName: string;
  professionId?: string;
  goal?: string; 
};

type StudyTagState = {
  id: number;
  key: number;
  label: string;
  show: boolean;
};

const initialiUser: UserState = {
  userId: '',
  userName: '',
  professionId: '',
};

const initialiStudyTag: StudyTagState[] = [];

/*
 * 学習の状態管理は実施しない
 * 常に最新の学習内容を表示させる必要があり、状態管理とDBの二重管理が複雑化することを回避
 */
export const userState = atom({
  key: 'userState',
  default: initialiUser
});

export const studyTagState = atom({
  key: 'studyTagState',
  default: initialiStudyTag
});

export const studyTagListState = atom({
  key: 'studyTagListState',
  default: 0
})