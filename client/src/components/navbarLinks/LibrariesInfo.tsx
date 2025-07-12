import { Box, Container, Grid, IconButton, Link, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import library from '../../assets/images/Library - Maunula.jpg';
import libraryMap from '../../assets/images/Library-map-Maunula.jpg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';



const openingHours = [
  { date: '30.6.', day: 'Mon', time: '09–20' },
  { date: '1.7.', day: 'Tue', time: '09–20' },
  { date: '2.7.', day: 'Wed', time: '09–20' },
  { date: '3.7.', day: 'Thu', time: '09–20' },
  { date: '4.7.', day: 'Fri', time: '09–16' },
  { date: '5.7.', day: 'Sat', time: 'Closed' },
  { date: '6.7.', day: 'Sun', time: 'Closed' },
];

const contactInformation =[
    { contactType: 'email', contactDetail: 'Customer Service', contactValue: 'maunulan_kirjasto@col.fi'},
    { contactType: 'email', contactDetail: 'Chief Librarian', contactValue: 'maija.mehiläinen@col.fi'},
    { contactType: 'email', contactDetail: 'Cooperation with Schools', contactValue: 'hella.hämäläinen@col.fi'},
    { contactType: 'email', contactDetail: 'Cooperation with Daycare', contactValue: 'meri.merinen@col.fi'},
    { contactType: 'email', contactDetail: 'Swedish Speaking Schools and Daycare', contactValue: 'kira.koivunen@col.fi'},
    { contactType: 'address', contactDetail: 'Street', contactValue: 'Metsäpurontie 4'},
    { contactType: 'address', contactDetail: 'Postal Code', contactValue: '00630'},
    { contactType: 'address', contactDetail: 'City', contactValue: 'Helsinki'}
];

export default function LibrariesInfo() {
  const theme = useTheme();
  const isLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const isDark = theme.palette.mode === "dark";


  return (
    <Box sx={{ 
      justifyContent: "center", 
      width: 1050,
      p: 2,
      pl: isLargerThanXs ? 20 : 1}}
    >
      <Typography variant="h4" gutterBottom>
        Libraries and opening hours
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }} columns={12}>
        <Grid size={12}>
          <Box sx={{ 
            bgcolor: isDark
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: "flex", 
            justifyContent: "flex-start", 
            alignItems: "flex-start"}}>
            <Typography>Libraries</Typography>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box display="flex" gap={2} mb={2}>
            <Box display="flex" gap={2} mb={2}>
              <Select defaultValue="maunula" size="small">
                <MenuItem value="lumo">Lumo Library, Helsinki</MenuItem>
                <MenuItem value="maunula">Maunula Library, Helsinki</MenuItem>
                <MenuItem value="pasila">Pasila Library, Helsinki</MenuItem>
                <MenuItem value="tikkurila">Tikkurila Library, Vantaa</MenuItem>
                <MenuItem value="sello">Sello Library, Espoo</MenuItem>
              </Select>
              <Select defaultValue="babycare" size="small">
                <MenuItem value="babycare">Baby Care room</MenuItem>
                <MenuItem value="3dprinters">3D Printers</MenuItem>
                <MenuItem value="artrental">Art rental</MenuItem>
                <MenuItem value="filmscanner">Film scanner</MenuItem>
                <MenuItem value="musicalinstruments">Musical Instruments</MenuItem>
              </Select>
            </Box>
          </Box>
        </Grid>        
        <Grid size={5}>
          <Container maxWidth="sm" sx={{ py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Maunula Library
          </Typography>

          <Typography variant="body1" gutterBottom>
            Metsäpurontie 4, 00630 Helsinki{' '}
            <Link href="#"></Link>{' '}
            <DirectionsIcon 
              sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main, }} />
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 0 }}>
            <HomeIcon
              sx={{ fontSize: 16, mr: 1, ml: 1, color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main, }} />
            <Link href="#" > Homepage</Link>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" >
            <EmailIcon sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main, }} />
            <Link href="mailto:maunulan_kirjasto@hel.fi">
              maunulan_kirjasto@hel.fi
            </Link>        
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
            <FacebookIcon sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main, }} />
            <Link href="#">Facebook</Link>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="success.main">
              Open
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon sx={{ fontSize: 16, mr: 1, ml: 1, color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main, }} />
              <Typography variant="body1">Open today 09 – 20</Typography>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ mt: 4 }}>
            A literary living room in the middle of Maunula.
          </Typography>
        </Container>
        </Grid>
        <Grid size={7}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 210 }}>
            <img
              src={libraryMap}
              alt="Library"
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
            />
          </Box>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box sx={{ 
            bgcolor: isDark
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"}}>
            <Typography variant="h6">General</Typography>
          </Box>
        </Grid>
        <Grid size={3}>
          <Box sx={{ 
            bgcolor: isDark
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"}}>
            <Typography variant="h6">Opening hours</Typography>
          </Box>
        </Grid>
        <Grid size={5}>
          <Box sx={{ 
            bgcolor: isDark
              ? theme.palette.primary.light
              : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"}}>
            <Typography variant="h6">Contact details</Typography>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 210 }}>
            <img
              src={library}
              alt="Library"
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
            />
          </Box>
        </Grid>
        <Grid size={3}>
          <Box >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconButton size="small">
                <ArrowBackIosIcon fontSize="small" style={{ fontSize: 13 }}  />
              </IconButton>
              <Typography variant="subtitle2" sx={{ mx: 1 }}>
                Week 27
              </Typography>
              <IconButton size="small">
                <ArrowForwardIosIcon fontSize="small" style={{ fontSize: 13 }}  />
              </IconButton>
            </Box>
            <TableContainer component={Paper}>
              <Table
                size="small"
                sx={{
                  '& .MuiTableCell-root, & .MuiTableRow-root': {
                    borderLeft: 'none',
                    borderRight: 'none',
                    backgroundColor: theme.palette.background.default
                  },
                  '& .MuiTableCell-root': {
                    borderBottom: '1px solid rgba(224, 224, 224, 1)', 
                  },
                  '& .MuiTableRow-root:last-child .MuiTableCell-root': {
                    borderBottom: 0,
                  }
                }}
              >
                <TableBody>
                  {openingHours.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{`${row.date} ${row.day}`}</TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid size={5}>
          <Box>
    {/* E-mail subtitle */}
    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, textTransform: "uppercase" }}>
      E-mail
    </Typography>
    {/* Email contacts list */}
    {contactInformation
      .filter((c) => c.contactType === 'email')
      .map((c) => (
        <Box key={c.contactValue} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <EmailIcon sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.main, }} />
          <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
            {c.contactDetail}:
          </Typography>
          <Typography variant="body2" component="a" href={`mailto:${c.contactValue}`} 
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
              textDecoration: 'underline'
            }}
          >
          {c.contactValue}
        </Typography>
      </Box>
    ))}

    {/* Address subtitle */}
    <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2, mb: 1,  textTransform: "uppercase"}}>
      Address
    </Typography>
    {/* Address in one row */}
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <HomeIcon sx={{ fontSize: 16, mr: 1, ml:1,color: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : theme.palette.secondary.main, }} />
      <Typography variant="body2">
        {`${contactInformation.find(c => c.contactDetail === 'Street')?.contactValue}, `}
        {`${contactInformation.find(c => c.contactDetail === 'Postal Code')?.contactValue} `}
        {contactInformation.find(c => c.contactDetail === 'City')?.contactValue}
      </Typography>
    </Box>
  </Box>
        </Grid>
      </Grid>
    </Box>
  );
}