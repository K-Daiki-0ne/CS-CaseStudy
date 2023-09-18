import { selector } from 'recoil';
import { userState, studyTagState, studyTagListState } from './atoms';

export const userInfoState = selector({
  key: 'userInfoState',
  get: ({ get }) => {
    return get(userState)
  }
});

export const fillterStudyTagState = selector({
  key: 'fillterStudyTagState',
  get: ({ get }) => {
    const studyTags = get(studyTagState);
    // 非表示のタグは表示しない
    return studyTags.filter((tag) => tag.show)
  }
});

// 指定したタグIDに一致するデータを返却
// 一覧を表示するために使用する
export const studyTagListSingleState = selector({
  key: 'studyTagListSingleState',
  get: ({ get }) => {
    const studyTagId = get(studyTagListState);
    const studyTagsList = get(studyTagState);

    const studyTag = studyTagsList.filter((tag) => tag.tagId == studyTagId);
    
    return studyTag[0].tagId, studyTag[0].tagLabel
  }
})
