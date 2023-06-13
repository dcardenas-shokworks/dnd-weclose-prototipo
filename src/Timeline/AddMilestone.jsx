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
import styles from "./AddDialog.module.css";


export const AddMilestone = (props) => {
    const [deliverableType, setDeliverableType] = useState(0)
    const [text, setText] = useState("");
    const [fileType, setFileType] = useState("text");
    const [parent, setParent] = useState(0);
    const [droppable, setDroppable] = useState(true);

    const [openPrincipalModal, setOpenPrincipalModal] = useState(true);
    const [descriptionDeliFounds, setDescriptionDeliFounds] = useState("")
    const [amountDeliFounds, setAmountDeliFounds] = useState("")
    const [openOptions, setOpenOptions] = useState(false)

    const handleChangeDescription = (e) => {
        setDescriptionDeliFounds(e.target.value);
    };

    const handleChangeAmount = (e) => {
        setAmountDeliFounds(e.target.value);
    };

    const handleChangeNameDeliverable = (e) => {
        setText(e.target.value);
    };

    const handleChangeParent = (e) => {
        setParent(Number(e.target.value));
    };


    const handleOpenPrincipalModal = () => {
        setOpenPrincipalModal(true);
    };

    const handleClosePrincipalModal = () => {
        setOpenPrincipalModal(false);
    };

    console.log(parent);
    console.log(text);
    console.log(droppable);
    return (
        <>

            {/* Modal 1 */}
            <Dialog open={openPrincipalModal} onClose={props.onClose} fullWidth={true} maxWidth="xs">
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
                            // onChange={handleChangeDescription}
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
                            // onChange={handleChangeDescription}
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
                                // onChange={handleChangeDescription}
                                />
                                <span className="text-xs text-gray-800 mt-4">Days</span>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    type="number"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                // onChange={handleChangeDescription}
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
                                disabled={parent === 0}
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
