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
  } from "firebase/firestore";
  import { db, firebaseApp } from "../../../../firebase";
import Swal from 'sweetalert2';
import { Email } from '@mui/icons-material';


function AddForm({closeEvent}) {
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

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleContactNumberChange = (event) => {
        setContactNumber(event.target.value);
    };

    const handleCurrentCollegeChange = (event) => {
        setCurrentCollege(event.target.value);
    };

    const handleCurrentYearChange = (event) => {
        setCurrentYear(event.target.value);
    };

    const handleClassificationConcernChange = (event) => {
        setClassificationConcern(event.target.value);
    };

    const handleNatureConcernChange = (event) => {
        setNatureConcern(event.target.value);
    };

    const handleConcernChange = (event) => {
        setConcern(event.target.value);
    };


    const createUser = async () => {
        await addDoc(empCollectionRef, {
            studenNumber: Number(StudenNumber),
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
        });
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your File has been Submitted.","success")

    };

    useEffect(() => {
        getUsers();
      }, []);
    
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
                <TextField 
                    id ="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleEmailChange}
                    value={Email}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Contact Number" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleContactNumberChange}
                    value={ContactNumber}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
             <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Current College" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleCurrentCollegeChange}
                    value={CurrentCollege}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Current Year" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleCurrentYearChange}
                    value={CurrentYear}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="COC" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleClassificationConcernChange}
                    value={ClassificationConcern}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="NOC" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleNatureConcernChange}
                    value={NatureConcern}
                    sx = {{ minWidth: "100%"}}
                    >
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Concern" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleConcernChange}
                    value={Concern}
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

                    {/* <Select
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

                        </Select> */}
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

export default AddForm;