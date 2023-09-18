import { useState, useEffect, FC } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from '@apollo/client';
import { useRecoilValue } from 'recoil';
import { MultiReadStudyQuery } from '../../generated/graphql';
import { MULTI_READ_STUDY } from '../../graphql/graphql'
import { StudyDeleteButton } from '../StudyDeleteButton/StudyDeleteButton';
import { StudyEditButton } from '../StudyEditButton/StudyEditButton';
import { userInfoState } from '../../store/selectors';

const columns = [
  {
    field: "deleteBtn",
    headerName: "削除",
    sortable: false,
    width: 65,
    disableClickEventBubbling: true,
    filterable: false,
    renderCell: (params: any) => <StudyDeleteButton studyId={params.id} />
  },
  {
    field: "editBtn",
    headerName: "編集",
    sortable: false,
    width: 65,
    filterable: false,
    disableClickEventBubbling: true,
    renderCell: (params: any) => <StudyEditButton  props={{ 
      studyId: params.id,
      userId: params.userId,
      studyDate: params.Date, 
      studyTime: params.Time, 
      studyTagId: params.Tagid 
    }} />
  },
  { 
    field: 'id',
    headerName: 'ID',
    hide: true,
    width: 70
  },
  { 
    field: 'userId',
    headerName: 'UserID',
    hide: true,
    width: 70
  },
  { 
    field: 'Tagid',
    headerName: 'Tag',
    hide: true,
    width: 70
  },
  {
    field: 'Study',
    headerName: '学習タグ',
    width: 100
  },
  {
    field: 'Date',
    headerName: '学習日',
    width: 120
  },
  {
    field: 'Time',
    headerName: '学習時間',
    width: 110
  },
  {
    field: 'Content',
    headerName: '学習内容',
    width: 620
  }
];

type StudyArray = {
  id: number;
  userId: string;
  Tagid: number;
  Study: string;
  Date: string;
  Time: string;
  Content: string
}

type Props = { props: StudyArray[] }

export const StudyGrid: FC<Props> = ({ props }) => {

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={props}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        columnVisibilityModel={{ id: false, userId: false, Tagid: false }}
        // pageSizeOptions={[5]}
        // loading={loading}
        checkboxSelection={false}
        autoHeight
        autoPageSize
      />
    </Box>
  );
};