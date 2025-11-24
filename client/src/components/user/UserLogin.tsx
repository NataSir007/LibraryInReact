import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserLoginWithLibraryCard from './UserLoginWithLibraryCard';
import UserLoginWithBankId from './UserLoginWithBankId';

interface UserLoginProps {
    open: boolean;
    onClose: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ open, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: theme.palette.primary.main,
                }
            }}
        >
            <DialogTitle sx={{ 
                color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.contrastText',
                fontWeight: 600
            }}>
                Login
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.contrastText',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider', 
                    px: 3,
                    '& .MuiTab-root': {
                        color: 'primary.contrastText',
                        fontWeight: 500,
                        opacity: 0.7,
                    },
                    '& .Mui-selected': {
                        color: 'primary.contrastText',
                        fontWeight: 700,
                        backgroundColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.15)' 
                            : 'primary.dark',
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.mode === 'dark' 
                            ? theme.palette.primary.light 
                            : theme.palette.primary.contrastText,
                        height: 4,
                    }
                }}
            >
                <Tab label="Library Card" />
                <Tab label="Bank ID" />
            </Tabs>
            <DialogContent sx={{ 
                bgcolor: 'background.paper',
                color: 'text.primary'
            }}>
                <Box sx={{ py: 2 }}>
                    {activeTab === 0 && <UserLoginWithLibraryCard />}
                    {activeTab === 1 && <UserLoginWithBankId />}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default UserLogin;
