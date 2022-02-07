import styled from "styled-components";

import { Paper, Grid } from "@mui/material";

export const StyledGrid =  styled(Grid)`
    &:hover {
        border: 1px solid #1976d2;
    }

    div {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 5;
    }

    position: relative;
`;

export const ModalContainer = styled(Paper)`
    position: absolute;
    top: 20%;
    left: 50%;
    padding: 12px 24px;
    transform: translate(-50%, -50%);
    width: 80%;
    min-width: 200px;
    max-width: 640px;
    border-radius: 8px;
    outline: none;
`;