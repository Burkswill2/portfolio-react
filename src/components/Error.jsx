import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
/**
 * Displays the Error Message of the component
 * @constructor
 */

export interface ErrorProps {
    message: string,
}
export default function ErrorMessage({ message } : ErrorProps) {
    const [alertOpen, setAlertOpen] = React.useState(true);

    return (
        <>
            {alertOpen &&
                <Stack>
                    <Alert
                        variant="outlined"
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setAlertOpen(false)}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <AlertTitle>Error:</AlertTitle>
                        {message}
                    </Alert>
                </Stack>
            }
        </>
    );
}
