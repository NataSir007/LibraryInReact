import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Typography, Link, useTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const UserLoginWithBankId: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [pin, setPin] = useState('');
    const [remember, setRemember] = useState(false);
    const theme = useTheme();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                  LibraryInReact Libraries
                </Typography>
                <TextField
                  fullWidth
                  label="Library card number"
                  required
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  inputProps={{
                    autoComplete: 'off'
                  }}
                   sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: theme.palette.mode === 'dark' ? '#2a2a2a' : theme.palette.background.default,
                      '& input': {
                        color: theme.palette.mode === 'dark' ? '#9e9e9e' : 'inherit',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#2a2a2a' : theme.palette.background.default} inset`,
                          WebkitTextFillColor: theme.palette.mode === 'dark' ? '#9e9e9e' : 'inherit',
                        }
                      },
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? '#4a4a4a' : theme.palette.divider,
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.mode === 'dark' ? '#9e9e9e' : 'inherit'
                    }
                  }}
                />
                <TextField
                  fullWidth
                  label="PIN"
                  type="password"
                  required
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: theme.palette.mode === 'dark' ? '#2a2a2a' : theme.palette.background.default,
                      '& input': {
                        color: theme.palette.mode === 'dark' ? '#9e9e9e' : 'inherit',
                        '&:-webkit-autofill': {
                          WebkitBoxShadow: `0 0 0 100px ${theme.palette.mode === 'dark' ? '#2a2a2a' : theme.palette.background.default} inset`,
                          WebkitTextFillColor: theme.palette.mode === 'dark' ? '#9e9e9e' : 'inherit',
                        }
                      },
                      '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? '#4a4a4a' : theme.palette.divider,
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.mode === 'dark' ? '#9e9e9e' : 'inherit'
                    }
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                  }
                  label={
                        <Box>
                            <Typography variant="body2">
                                Remember my login for the next 180 days
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Leave this unchecked on devices in shared use
                            </Typography>
                        </Box>
                    }
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="outlined" color="primary" sx={{ mb: 1 }}>
                    Login
                </Button>
                <Box sx={{ mb: 1 }}>
                    <Link href="#" underline="always" sx={{ fontSize: 14, color: 'primary.main', '&:hover': { color: 'primary.dark' } }}>
                        Forgot your PIN?
                    </Link>
                </Box>
                <Box>
                    <Link href="#" underline="always" sx={{ fontSize: 14, color: 'primary.main', '&:hover': { color: 'primary.dark' } }}>
                        Library card pre-registration
                    </Link>
                </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <InfoIcon color="primary" />
                    <Typography variant="body2">
                        Library services, that are enabled by a library card, can automatically be accessed with the account.
                    </Typography>
                </Box>
                <Box sx={{ bgcolor: 'background.default', borderRadius: 1, p: 2 }}> {/* Background Light (#F8F6FA) */}
                    <Typography variant="body2">
                        When you log in using your library card, the service will store the library card number and PIN code as well as your name, email address and home library.                        
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default UserLoginWithBankId;