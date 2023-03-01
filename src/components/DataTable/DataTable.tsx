//DataTable.tsx

import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useGetData } from '../../custom-hooks';
import { serverCalls } from '../../api';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

import { BrickForm } from '../../components/BrickForm';
import { getAuth } from 'firebase/auth'; // ** new ** add this for authentication functionality



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 5 },
    {
        field: 'set_num',
        headerName: 'Set Number',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true,
    },
    {
        field: 'year',
        headerName: 'Year',
        description: 'This column has a value getter and is not sortable.',
        width: 150,
        editable: true,
    },
    {
        field: 'theme_id',
        headerName: 'Theme ID',
        description: 'This column has a value getter and is not sortable.',
        width: 150,
        editable: true,
    },
    {
        field: 'num_parts',
        headerName: 'Number of Parts',
        description: 'This column has a value getter and is not sortable.',
        width: 150,
        editable: true,
    },
    {
        field: 'set_img_url',
        headerName: 'Set Image URL',
        description: 'This column has a value getter and is not sortable.',
        width: 150,
        editable: true,
    },
    {
        field: 'set_url',
        headerName: 'Set Info URL',
        description: 'This column has a value getter and is not sortable.',
        width: 150,
        editable: true,
    },
]



interface gridData {
    data: {
        id?: string;
    }
}

export const DataTable = () => {
    const auth = getAuth()
    let { brickData, getData } = useGetData()
    let [open, setOpen] = useState(false)
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData) // a list of id's from the checked rows
				// Checking Local Storage variable for authenticated user
				const MyAuth = localStorage.getItem('myAuth');
				console.log(MyAuth);

				//Conditional to render DataTable only for authenticated users
			  if (MyAuth == 'true'){
		    return ( //conditionally render datatable
		        <div style={{ height: 600, width: '100%' }}>
		            <h2>Bricks In Our Collection</h2>
		            <DataGrid
		                rows={brickData}
		                columns={columns}
		                pageSize={9}
		                rowsPerPageOptions={[9]}
		                checkboxSelection
		                onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
		                {...brickData}
		            />
		            <Button onClick={handleOpen}>Update</Button>
		            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
		            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
		                <DialogTitle id="form-dialog-title">Update Brick</DialogTitle>
		                <DialogContent>
		                    <DialogContentText>Brick id: {gridData[0]}</DialogContentText>
		                    <BrickForm id={`${gridData[0]}`} />
		                </DialogContent>
		                <DialogActions>
		                    <Button onClick={handleClose} color="primary">Cancel</Button>
		                    <Button onClick={handleClose} color="secondary">Done</Button>
		                </DialogActions>
		            </Dialog>
		        </div>
        )
    } else { 
        return( // **new** does not render datatable if user is not authenticated
        <div>
            <h3>Please Sign In to View Your Brick Collection</h3>
        </div>
    )};

}