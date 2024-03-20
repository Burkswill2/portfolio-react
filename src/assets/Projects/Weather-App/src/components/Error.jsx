import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './error.scss';
/**
 * Displays the Error Message of the component
 * @constructor
 */

export interface ErrorProps {
    message: string,
}
export default function ErrorMessage({ message } : ErrorProps) {
    // const [alertOpen, setAlertOpen] = React.useState(true);

    return (
        <>
            <Alert
                variant="filled"
                severity="error"

                sx={{
                    height: "120px",
                    display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'start',
                }}
            >
                <AlertTitle
                    sx={{
                        maxHeight: "25px"
                    }}
                >Error</AlertTitle>
                {message}
            </Alert>
        </>
    );
}
