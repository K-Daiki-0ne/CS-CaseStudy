import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { StudyDeleteButton } from '../StudyDeleteButton/StudyDeleteButton';
import { StudyEditButton } from '../StudyEditButton/StudyEditButton'

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

const rows = [
  { id: 1, userId: '', Tagid: 1, Study: 'Snow',      Date: '2022年5月12日', Time: '', Content: '' },
  { id: 2, userId: '', Tagid: 2, Study: 'Lannister', Date: 'Cersei', Time: '', Content: '' },
  { id: 3, userId: '', Tagid: 3, Study: 'Lannister', Date: 'Jaime', Time: '', Content: '' },
  { id: 4, userId: '', Tagid: 4, Study: 'Stark',     Date: 'Arya', Time: '', Content: '' },
  { id: 5, userId: '', Tagid: 5, Study: 'Targaryen', Date: 'Daenerys', Time: null, Content: '' },
  { id: 6, userId: '', Tagid: 6, Study: 'Melisandre', Date: null, Time: '', Content: '' },
  { id: 7, userId: '', Tagid: 7, Study: 'Clifford', Date: 'Ferrara', Time: '', Content: '' },
  { id: 8, userId: '', Tagid: 8, Study: 'Frances', Date: 'Rossini', Time: '', Content: '' },
  { id: 9, userId: '', Tagid: 9, Study: 'Roxie', Date: 'Harvey', Time: '', Content: '' },
];

export const StudyGrid = () => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        columnVisibilityModel={{ id: false, userId: false, Tagid: false }}
        pageSizeOptions={[5]}
        loading={false}
        checkboxSelection={false}
        autoHeight
        autoPageSize
      />
    </Box>
  );
};