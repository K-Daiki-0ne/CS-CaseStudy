import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { 
    field: 'id',
    headerName: 'ID',
    width: 0
  },
  {
    field: 'Study',
    headerName: '学習',
    width: 80
  },
  {
    field: 'Date',
    headerName: '日付',
    width: 120
  },
  {
    field: 'Time',
    headerName: 'Time',
    type: 'number',
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
        pageSizeOptions={[5]}
        checkboxSelection
        autoHeight
        autoPageSize
      />
    </Box>
  );
};