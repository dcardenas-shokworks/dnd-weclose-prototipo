import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Select,
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    InputLabel,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    FormHelperText,
    Container,
    OutlinedInput,
    InputAdornment,
    Box
} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ClearIcon from '@mui/icons-material/Clear';
import styles from "./AddDialog.module.css";


export const AddMilestone = (props) => {

    const [days, setDays] = useState(0);
    const [nameMilestone, setNameMilestone] = useState("")
    const [dateMilestone, setDateMilestone] = useState("")
    const [openOptions, setOpenOptions] = useState(false)

    const handleChangeName = (e) => {
        setNameMilestone(e.target.value);
    };

    const handleChangeDate = (e) => {
        setDateMilestone(e.target.value);
    };

  
    const handleChangeDays = (e) => {
        setDays(Number(e.target.value));
    };


    return (
        <>  
            {/* Modal 1 */}
            <Dialog open={true} onClose={props.onClose} fullWidth={true} maxWidth="xs" disableEscapeKeyDown >
                <ClearIcon className="bg-black rounded-full text-white absolute right-0" 
                            sx={{ fontSize: 18, cursor: "pointer" }}
                            onClick={props.onClose}/>
                <div className="px-10 py-5">
                    <DialogTitle>
                        <Typography className="text-black" variant="h6" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
                            New Milestone
                        </Typography>
                    </DialogTitle>
                    <DialogContent className={styles.content}>
                        <FormControl variant="outlined">
                            <span className="text-xs text-gray-800">Name</span>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }} 
                                value={nameMilestone}
                                onChange={handleChangeName}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <span className="text-xs text-gray-800">Days</span>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                type="number"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                value={days}
                                onChange={handleChangeDays}
                            />
                        </FormControl>
                        <div className="flex justify-between">
                            <span className="text-black text-xs">Or select from date</span>
                            <ArrowForwardIcon
                                sx={{ fontSize: 15, cursor: "pointer" }}
                                onClick={() => {
                                    setOpenOptions(!openOptions);
                                }} />
                        </div>
                        {openOptions &&
                            <FormControl variant="outlined">
                                <span className="text-xs text-gray-800">From Date</span>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    value={dateMilestone}
                                    onChange={handleChangeDate}
                                />
                                <span className="text-xs text-gray-800 mt-4">Days</span>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    type="number"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    value={days}
                                    onChange={handleChangeDays}
                                />
                            </FormControl>
                        }
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={props.onClose}>Cancel</Button> */}
                        <Container >
                            <Button
                                className="bg-primary w-full"
                                variant="contained"
                                disabled={ nameMilestone === '' || days === 0 }
                            // onClick={}
                            >
                                Continue
                            </Button>
                        </Container>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
};
