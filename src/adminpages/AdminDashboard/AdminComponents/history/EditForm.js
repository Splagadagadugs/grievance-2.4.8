import { Box, Button, IconButton, Select, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from '@mui/material/MenuItem';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    get,
  } from "firebase/firestore";
  import { db, firebaseApp } from "../../../../firebase";
import Swal from 'sweetalert2';


function EditForm({fid, closeEvent}) {
    const [StudenNumber, setStudenNumber] = useState(0);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [MaidenName, setMaidenName] = useState("");
    const [Email, setEmail] = useState("");
    const [ContactNumber, setContactNumber] = useState("");
    const [CurrentCollege, setCurrentCollege] = useState("");
    const [CurrentYear, setCurrentYear] = useState("");
    const [ClassificationConcern, setClassificationConcern] = useState("");
    const [NatureConcern, setNatureConcern] = useState("");
    const [Concern, setConcern] = useState("");
    const [Status, setStatus] = useState("");
    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "forms");


    useEffect(() => {
        console.log("FID: " + fid.id);
        setStudenNumber(fid.StudenNumber);
        setFirstName(fid.firstName)
        setLastName(fid.LastName);
        setMaidenName(fid.MaidenName);
        setEmail(fid.Email);
        setContactNumber(fid,ContactNumber);
        setCurrentCollege(fid.CurrentCollege);
        setCurrentYear(fid.CurrentYear);
        setClassificationConcern(fid.ClassificationConcern);
        setNatureConcern(fid.NatureConcern);
        setConcern(fid.Concern);
        setStatus(fid.Status)

    }, []);

    const handleStudenNumberChange = (event) => {
        setStudenNumber(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleMaidenNameChange = (event) => {
        setMaidenName(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };


    const createUser = async () => {
        const userDoc = doc(db, "forms", fid.id);
        const newFields = {
            studenNumber: StudenNumber,
            firstName: FirstName,
            lastName: LastName,
            maidenName: MaidenName,
            email: Email,
            contactNumber: ContactNumber,
            currentCollege: CurrentCollege,
            currentYear: CurrentYear,
            classificationConcern: ClassificationConcern,
            natureConcern: NatureConcern,
            concern: Concern,
            status: Status,
        };
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Submitted", "Your file has been updated.", " success");

    };

    // useEffect(() => {
    //     getUsers();
    //   }, []);
    
      const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    

    const currencies = [
        {
          value: 'pending',
          label: 'Pending',
        },
        {
          value: 'completed',
          label: 'Completed',
        },
      
      ];
      

  return (
    <>
        <Box sx ={{ m :2}}/>
        <Typography variant="h5" align="center">
            Add Entry
        </Typography>
        <IconButton
            style = {{ position: "absolute", top: "0", right: "0"}}
            onClick = {closeEvent}
        >
            <CloseIcon/>
        </IconButton>
        <Box height={20}/>
        <Grid container spacing = {2}>
            <Grid item xs={12}>
                <TextField 
                id ="outlined-basic" 
                label="Student Number" 
                variant="outlined" 
                size ="small" 
                type="number"
                sx = {{ minWidth: "100%"}}
                onChange={handleStudenNumberChange}
                value={StudenNumber}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleFirstNameChange}
                    value={FirstName}
                    sx = {{ minWidth: "100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Last Name" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleLastNameChange}
                    value={LastName}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Maiden Name" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleMaidenNameChange}
                    value={MaidenName}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                {/* <TextField 
                    id ="outlined-basic" 
                    label="Status" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleStatusChange}
                    value={Status}
                    sx = {{ minWidth: "100%"}}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField> */}

                    <Select
                        id ="outlined-basic" 
                        label="Status" 
                        variant="outlined" 
                        size ="small" 
                        value={Status}
                        onChange={handleStatusChange}
                        sx = {{ minWidth: "100%"}}
                    >
                        {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                        </MenuItem>
                                      ))}
                    </Select>

                       
            </Grid>
            

            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    <Button variant ="contained" onClick={createUser}>
                        Submit
                    </Button>
                </Typography>
            </Grid>
        </Grid>
        <Box sx ={{ m: 4}}/>
    </>
  )
}

export default EditForm;