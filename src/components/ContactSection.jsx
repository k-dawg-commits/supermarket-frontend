import {
    Box,
    Typography,
    TextField,
    Paper,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Collapse,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ContactSection({ message, onMessageChanged }) {
    // Add state for the new fields
    const [name, setName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [questionType, setQuestionType] = useState('general');

    // Add state for snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Add state to track if the form is expanded
    const [expanded, setExpanded] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        fetch("https://grocery-shop-be-wd22.onrender.com/submit-message", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                message,
                name,
                contactInfo,
                questionType
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data);

                // Show the snackbar notification
                setSnackbarOpen(true);

                // Optionally reset form fields
                setName('');
                setContactInfo('');
                setQuestionType('general');
                onMessageChanged('');

                // Optionally collapse the form after submission
                setExpanded(false);
            })
            .catch(error => console.log(error));
    }

    // Handle closing the snackbar
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    mx: 'auto',
                    mt: 4,
                    transition: 'all 0.3s ease-in-out',
                    cursor: expanded ? 'default' : 'pointer'
                }}
            >
                {/* Clickable header section */}
                <Box
                    onClick={() => !expanded && setExpanded(true)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ mb: expanded ? 2 : 0 }}>
                        Got a Question?
                    </Typography>

                    {/* Toggle button - only show if already expanded */}
                    {expanded && (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the Box onClick
                                setExpanded(!expanded);
                            }}
                            size="small"
                        >
                            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    )}
                </Box>

                {/* Collapsible form content */}
                <Collapse in={expanded} timeout="auto">
                    <form onSubmit={handleSubmit}>
                        <Typography variant="body1" paragraph>
                            Wanna ask us something? Go ahead—we're here to help!
                            Whether it's about our products, delivery, or anything else, just drop us a message.
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
                            We're always happy to hear from you.
                        </Typography>

                        {/* Name field */}
                        <TextField
                            fullWidth
                            label="Your Name"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Contact information field */}
                        <TextField
                            fullWidth
                            label="Your Email or Phone Number"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            helperText="So we can get back to you"
                        />

                        {/* Question type dropdown */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="question-type-label">Question Regarding</InputLabel>
                            <Select
                                labelId="question-type-label"
                                value={questionType}
                                label="Question Regarding"
                                onChange={(e) => setQuestionType(e.target.value)}
                            >
                                <MenuItem value="general">General Inquiry</MenuItem>
                                <MenuItem value="products">Products</MenuItem>
                                <MenuItem value="delivery">Delivery</MenuItem>
                                <MenuItem value="returns">Returns & Refunds</MenuItem>
                                <MenuItem value="account">My Account</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Message field */}
                        <TextField
                            required
                            fullWidth
                            id="outlined-multiline-static"
                            label="Enter your message here"
                            multiline
                            rows={4}
                            variant="filled"
                            sx={{ mb: 2 }}
                            name="message"
                            value={message}
                            onChange={(e) => {
                                onMessageChanged(e.target.value)
                            }}
                        />

                        {/* Signature section */}
                        <Box sx={{ mb: 3, mt: 3, borderTop: '1px solid #e0e0e0', pt: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                By submitting this form, you agree to our terms and privacy policy.
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#2b8379",
                                "&:hover": {
                                    backgroundColor: "#19a596"
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </form>
                </Collapse>

                {/* Hint text when collapsed */}
                {!expanded && (
                    <Typography variant="body2" color="text.secondary">
                        Click to ask us a question
                    </Typography>
                )}
            </Paper>

            {/* Snackbar notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #2b8379, #19a596)',
                        '& .MuiAlert-icon': {
                            color: 'white'
                        }
                    }}
                >
                    Thank you for your question! We'll get back to you soon.
                </Alert>
            </Snackbar>
        </>
    );
}

export default ContactSection;