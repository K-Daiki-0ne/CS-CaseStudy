import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { StudyDeleteButton } from '../StudyDeleteButton/StudyDeleteButton';

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
    renderCell: (params: any) => <StudyDeleteButton studyId={params.id}/>
  },

  { 
    field: 'id',
    headerName: 'ID',
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
];

const rows = [
  { id: 1, Study: 'Snow',      Date: '2022年5月12日', Time: 35 },
  { id: 2, Study: 'Lannister', Date: 'Cersei', Time: 42 },
  { id: 3, Study: 'Lannister', Date: 'Jaime', Time: 45 },
  { id: 4, Study: 'Stark',     Date: 'Arya', Time: 16 },
  { id: 5, Study: 'Targaryen', Date: 'Daenerys', Time: null },
  { id: 6, Study: 'Melisandre', Date: null, Time: 150 },
  { id: 7, Study: 'Clifford', Date: 'Ferrara', Time: 44 },
  { id: 8, Study: 'Frances', Date: 'Rossini', Time: 36 },
  { id: 9, Study: 'Roxie', Date: 'Harvey', Time: 65 },
];

export const StudyGrid = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
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
        columnVisibilityModel={{ id: false }}
        pageSizeOptions={[5]}
        loading={false}
        checkboxSelection={false}
        autoHeight
        autoPageSize
      />
    </Box>
  );
};