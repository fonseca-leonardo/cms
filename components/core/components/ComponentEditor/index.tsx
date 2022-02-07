import React, { useState } from 'react';
import { 
    Button,
    Divider,
    Grid,
    Menu,
    MenuItem,
    Modal,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';
import registerComponents from '../../../register';

import { ModalContainer, StyledGrid } from './styles';
import StringInput from '../Inputs/StringInput';

interface Props {
    config: {
        col: {
            sm: number
            md: number
            lg: number
            xl: number
            xs: number
        };
        name: string;
        component: string;
        props: any;
        id: string;
    }
    onComponentUpdate(data: any): Promise<void>;
    onDeleteComponent(componentId: string): Promise<void>;

}

const ComponentEditor: React.FC<Props> = ({
    config: {
        col: { ...breakpoints },
        name,
        component,
        props,
        id,
    },
    children,
    onComponentUpdate,
    onDeleteComponent
}) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [updateValues, setUpdateValues] = useState<any>({...props});
    const [loading, setLoading] = useState<boolean>(false);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setUpdateValues(props);
    };

    const handleModalOpen = () => {
        handleClose();
        setOpenModal(true);
    }

    const handleModalSubmit = async () => {
        setLoading(true);
        await onComponentUpdate({ props: updateValues, id, col: { ...breakpoints }, component });
        setLoading(false);
        setOpenModal(false);
    }

    const renderInputs = () => {
        const inputs = registerComponents[component];
        const inputsKeys = Object.keys(inputs.editor);

        return inputsKeys.map(key => (
           <Grid key={`${inputs.name}-${key}`} item xs={12}>
               {
                   inputs.editor[key].type === 'string' && (
                       <StringInput
                            label={inputs.editor[key].name}
                            variant='standard'
                            value={updateValues[key]}
                            onChange={(event) => setUpdateValues((prev: any) => ({...prev, [key]: event.target.value }))}
                            fullWidth
                        />
                   )
               }
               {
                   inputs.editor[key].type === 'select' && (
                        <FormControl>
                            <FormLabel>{inputs.editor[key].name}</FormLabel>
                            <RadioGroup
                                value={updateValues[key]}
                                onChange={(event) => setUpdateValues((prev: any) => ({...prev, [key]: event.target.value }))}
                            >
                                <Grid container>
                                    {
                                        inputs.editor[key].select?.map(item => (
                                            <Grid
                                                key={item.value}
                                                item
                                            >
                                                <FormControlLabel
                                                    value={item.value}
                                                    control={<Radio />}
                                                    label={item.name}
                                                /> 
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                   )
               }
           </Grid> 
        ));
    }

    return (
        <>
            <StyledGrid item onClick={(e) => handleClick(e)} {...breakpoints}>
                <div />
                {children}
            </StyledGrid>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleModalOpen}>Editar</MenuItem>
                <MenuItem onClick={() => onDeleteComponent(id)}>Remover</MenuItem>
            </Menu>
            {
                openModal && (
                    <Modal open={openModal} onClose={() => setOpenModal(!openModal)}>
                        <ModalContainer>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" component="h2">
                                        Editar - {name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid container item spacing={2}>
                                    {renderInputs()}
                                </Grid>
                                <Grid container item justifyContent="flex-end" spacing={3}>
                                    <Grid item>
                                        <Button color="error" onClick={() => setOpenModal(!openModal)} >Cancelar</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={handleModalSubmit}>Salvar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ModalContainer>
                    </Modal>
                )
            }
        </>
    );
}

export default ComponentEditor;
