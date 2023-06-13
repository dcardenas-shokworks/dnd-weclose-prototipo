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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NumericFormat } from 'react-number-format';
import styles from "./AddDialog.module.css";


const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="$"
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export const AddDeliverable = (props) => {
    const [deliverableType, setDeliverableType] = useState(0)
    const [text, setText] = useState("");
    const [fileType, setFileType] = useState("text");
    const [parent, setParent] = useState(0);
    const [droppable, setDroppable] = useState(true);

    const [openPrincipalModal, setOpenPrincipalModal] = useState(true);
    const [openSecondModal, setOpenSecondModal] = useState(false);
    const [openThirdModal, setOpenThirdModal] = useState(false);
    const [descriptionDeliFounds, setDescriptionDeliFounds] = useState("")
    const [amountDeliFounds, setAmountDeliFounds] = useState("")

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

    const handleOpenThirdModal = () => {
        setOpenThirdModal(true);
    };

    const handleCloseThirdModal = () => {
        setOpenThirdModal(false);
    };
    const handleOpenSecondModal = () => {
        setOpenSecondModal(true);
    };

    const handleCloseSecondModal = () => {
        setOpenSecondModal(false);
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
            {/* Modal 3 Deliverables Founds */}
            <Dialog open={openThirdModal} onClose={handleCloseThirdModal}>
                <div className="flex flex-col">
                    <DialogTitle>
                        <div className="flex items-center gap-4">
                            <ArrowBackIcon
                                sx={{ fontSize: 15, cursor: "pointer" }}
                                onClick={() => {
                                    handleCloseThirdModal(); // Cierra el tercer modal 
                                    handleOpenPrincipalModal(); // Abre el primer modal
                                }} />
                            <Typography className="text-black" variant="h6" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
                                New Deliverable
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent className={styles.content}>
                        <div className="flex flex-col gap-4">
                            <FormControl className={styles.select} disabled>
                                <span className="text-xs text-gray-800">Deliverable</span>
                                <Select value={parent}>
                                    <MenuItem value={300}>Document</MenuItem>
                                    <MenuItem value={400}>Funds</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined">
                                <span className="text-xs text-gray-800">Description</span>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={handleChangeDescription}
                                />
                            </FormControl>
                            {/* <FormControl variant="outlined">
                                <span className="text-xs text-gray-800">Amount</span>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    startAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    value={amountDeliFounds}
                                    onChange={handleChangeAmount}
                                    inputProps={{
                                        inputComponent: NumericFormatCustom,
                                      }}
                                    
                                />
                            </FormControl> */}
                            <Box className="flex flex-col w-full">
                                <span className="text-xs text-gray-800">Amount</span>
                                <TextField
                                    value={amountDeliFounds}
                                    onChange={handleChangeAmount}
                                    name=""
                                    id=""
                                    InputProps={{
                                        inputComponent: NumericFormatCustom,
                                    }}
                                    variant="outlined"
                                />
                            </Box>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={props.onClose}>Cancel</Button> */}
                        <Container className={styles.container_button}>
                            <Button
                                className="bg-primary w-full"
                                variant="contained"
                                disabled={descriptionDeliFounds === "" || amountDeliFounds === ""}
                                onClick={() =>
                                    props.onSubmit({
                                        parent,
                                        droppable,
                                        text,
                                        data: {
                                            fileType
                                        }
                                    })
                                }
                            >
                                Continue
                            </Button>
                        </Container>
                    </DialogActions>
                </div>
            </Dialog>

            {/* Modal 2 Deliverables Documents */}
            <Dialog open={openSecondModal} onClose={handleCloseSecondModal}>
                <div className="flex flex-col">
                    <DialogTitle>
                        <div className="flex items-center gap-4">
                            <ArrowBackIcon
                                sx={{ fontSize: 15, cursor: "pointer" }}
                                onClick={() => {
                                    handleCloseSecondModal(); // Cierra el segundo modal después de un breve retraso
                                    handleOpenPrincipalModal(); // Abre el primer modal
                                }} />
                            <Typography className="text-black" variant="h6" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
                                New Deliverable
                            </Typography>
                        </div>
                    </DialogTitle>
                    <DialogContent className={styles.content}>
                        <div>
                            <FormControl className={styles.select} disabled>
                                <span className="text-xs text-gray-800">Deliverable</span>
                                <Select value={parent}>
                                    <MenuItem value={300}>Document</MenuItem>
                                    <MenuItem value={400}>Funds</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="flex flex-col">
                            <FormControl variant="outlined">
                                <span className="text-xs text-gray-800">Name</span>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    onChange={handleChangeNameDeliverable}
                                />
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={props.onClose}>Cancel</Button> */}
                        <Container className={styles.container_button}>
                            <Button
                                className="bg-primary w-full"
                                variant="contained"
                                disabled={text === ""}
                                onClick={() =>
                                    props.onSubmit({
                                        parent,
                                        droppable,
                                        text,
                                        data: {
                                            fileType
                                        }
                                    })
                                }
                            >
                                Continue
                            </Button>
                        </Container>
                    </DialogActions>
                </div>
                {/* Contenido y acciones del segundo modal */}
            </Dialog>

            {/* Modal 1 */}
            <Dialog open={openPrincipalModal} onClose={props.onClose}>
                <DialogTitle>
                    <Typography className="text-black" variant="h6" style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '24px' }}>
                        New Deliverable
                    </Typography>
                </DialogTitle>
                <DialogContent className={styles.content}>
                    <div>
                        <FormControl className={styles.select}>
                            <span className="text-xs text-gray-800">Deliverable</span>
                            <Select
                                displayEmpty={true}
                                value={parent}
                                onChange={handleChangeParent}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected === 0) {
                                        return <span className="text-gray-500">Select type of deliverable</span>;
                                    } else if (selected === 300) {
                                        return <span>Document</span>;
                                    } else {
                                        return <span>Funds</span>;
                                    }
                                }}>
                                <MenuItem disabled value="">
                                    <em>Select type of deliverable</em>
                                </MenuItem>
                                <MenuItem value={300}>Document</MenuItem>
                                <MenuItem value={400}>Funds</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={props.onClose}>Cancel</Button> */}
                    <Container className={styles.container_button}>
                        <Button
                            className="bg-primary w-full"
                            variant="contained"
                            disabled={parent === 0}
                            onClick={() => {
                                if (parent === 300) {
                                    handleClosePrincipalModal(); // Cierra el primer modal 
                                    handleOpenSecondModal(); // Abre el segundo modal
                                } else {
                                    handleClosePrincipalModal(); // Cierra el primer modal 
                                    handleOpenThirdModal(); // Abre el tercer modal 
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </Container>
                </DialogActions>
            </Dialog>
        </>
    );
};
