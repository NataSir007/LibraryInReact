import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ 
      bgcolor: isDark
        ? theme.palette.primary.light
        : theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    }}>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}
