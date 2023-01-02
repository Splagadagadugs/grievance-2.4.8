import React, { useEffect, useState, useMemo } from "react";
import { db, firebaseApp } from "../../firebase";
import "./Dashboard.css";
import TextField from '@mui/material/TextField';
import { DataGrid, GridToolbar,  GridActionsCellItem } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';  
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataGridCustomToolbar from '../../components/ComponentTools/DataGridCustomToolbar';
import { Menu, MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);




  // LOGIC FOR HOVERING IN THE TABLE TO SHOW FULL TEXT
  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: 1,
        height: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};


const Completed = () => {
  
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [rowss, setRowss] = useState([]);
  const empCollectionRef = collection(db, "forms");


  {/*DELETE FUNCTION */}

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRowss(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "forms", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };



  const columns = [
    {field: "actions", headerName: "Action", width: 130, 
    
    renderCell: (params) => {
      return (
        <>
        <Stack spacing ={4} direction ="row">
        <EditIcon        
        />
        <DeleteIcon 
          style={{
            fontSize: "20px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => {
            deleteUser(rows.id);
          }}
        />
        </Stack>
        </>
         )
    }, 
    editable: false},
    {field: "status", headerName:"Status", width: 130, renderCell: renderCellExpand,
    type: 'singleSelect', 
    valueOptions:[
      'Pending', 
      'Fulfilled', 
      'Rejected'], 
      editable: true},
    {field: "studentnumber", headerName:"StudentNumber", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "lastName", headerName:"Last Name", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "firstName", headerName:"First Name", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "maidenName", headerName:"Maiden Name", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "email", headerName:"Email", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "contactnumber", headerName:"Contact Number", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "collegeyear", headerName:"College Year", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "currentyear", headerName:"Current Year", width: 130, renderCell: renderCellExpand,editable: true},
    {field: "classificationconcern", headerName:"COC", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "natureconcern", headerName:"NOC", width: 130, renderCell: renderCellExpand, editable: true},
    {field: "concern", headerName:"Concern", width: 130, renderCell: renderCellExpand, editable: true},

  ];

  const rows = posts.map((row) => ({

    action: row.Action,
    status: row.Status,
    id: row.id,
    studentnumber: row.StudentNumber,
    firstName: row.firstName,
    lastName: row.lastName,
    maidenName: row.maidenName,
    email: row.Email,
    contactnumber: row.ContactNumber,
    collegeyear: row.CurrentCollege,
    currentyear: row.CurrentYear,
    classificationconcern: row.ClassificationConcern,
    natureconcern: row.NatureConcern,
    aboutconcern: row.AboutConcern,
    concern: row.Concern,

  }))

  useEffect(() => {
    const posts = [];
    // const subscriber = db.collection("forms").orderBy('ClassificationConcern', 'asc').onSnapshot((querySnapshot) => {
    const subscriber = db.collection("forms").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setPosts(posts);
    });

    // return cleanup function
    return () => subscriber();
  }, [db]); 

const handleSearch = (event) => {
  setSearch(event.target.value);
};



  return (

    <div className="table-container" style={{height: "500px", width: ""}}>

      {/* <h1>Answers:</h1> */}
     {/* <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          value={search}
          onChange={handleSearch}
        /> */}
    
    <DataGrid
        sx={{
          justifyContent: 'center',
          boxShadow: 2,
          borderColor: 'primary.',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}

      rows={rows} 
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      experimentalFeatures={{ newEditingApi: true }}
      components={{ Toolbar: DataGridCustomToolbar}}
    
    />
    </div>
)}
export default Completed;