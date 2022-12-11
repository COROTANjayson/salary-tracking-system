
import React, { useEffect, useState } from "react";
import {
    useMediaQuery,
    Container,
} from '@mui/material';

import Box from '@mui/material/Box';



export default function CompanyPage() {
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    return (
        <div>
            <Container maxWidth="xs">
                <Box
                
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 760,
                    }}
                >
                    Hellosd
                </Box>
            </Container>

        </div>
    )
}
