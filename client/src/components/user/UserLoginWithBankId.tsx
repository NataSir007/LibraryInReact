import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { banks } from '../../utils/bankData';

const UserLoginWithBankId: React.FC = () => {
    const theme = useTheme();
    const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

    const handleBankClick = (bankId: string) => {
        console.log('Selected bank:', bankId);
        // Handle bank selection logic here
    };

    const handleLogoError = (bankId: string, e: React.SyntheticEvent<HTMLImageElement>) => {
        const bank = banks.find(b => b.id === bankId);
        if (bank?.logoFallback && !logoErrors[bankId]) {
            setLogoErrors(prev => ({ ...prev, [bankId]: true }));
            e.currentTarget.src = bank.logoFallback;
        } else {
            // Don't hide, just log error
            console.error(`Failed to load logo for ${bankId}`);
        }
    };

    const getButtonBgColor = () => {
        return theme.palette.mode === 'dark' 
            ? theme.palette.primary.light 
            : theme.palette.background.default;
    };

    return (
        <Box sx={{ py: 2 }}>
            <Typography 
                variant="h6" 
                sx={{ 
                    mb: 3, 
                    textAlign: 'center', 
                    color: theme.palette.mode === 'dark' 
                        ? theme.palette.primary.contrastText 
                        : theme.palette.primary.main, 
                }}
            >
                Choose your bank
            </Typography>                
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 2,
                    mb: 3,
                }}
            >
                {banks.map((bank) => (
                    <Button
                        key={bank.id}
                        onClick={() => handleBankClick(bank.id)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: '10px',
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'dark' 
                                ? theme.palette.divider 
                                : theme.palette.divider,
                            borderRadius: 1,
                            bgcolor: getButtonBgColor(),
                            textTransform: 'none',
                            minHeight: 100,
                            '&:hover': {
                                bgcolor: getButtonBgColor(),
                                opacity: 0.8,
                                borderColor: 'primary.main',
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src={bank.logo}
                            alt={bank.name}
                            sx={{
                                maxHeight: 'calc(100% - 30px)',
                                maxWidth: 'calc(100% - 20px)',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                mb: 1,
                            }}
                            onError={(e) => handleLogoError(bank.id, e)}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.primary,
                                textAlign: 'center',
                                fontSize: '0.75rem',
                            }}
                        >
                            {bank.name}
                        </Typography>
                    </Button>
                ))}
            </Box>

            <Typography
                variant="body2"
                sx={{
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    mt: 2,
                }}
            >
                You will be redirected to your bank's authentication service
            </Typography>
        </Box>
    );
};

export default UserLoginWithBankId;