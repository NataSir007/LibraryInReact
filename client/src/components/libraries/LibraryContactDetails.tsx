import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import type { Library } from '../../types/library/interfaces';

interface LibraryContactDetailsProps {
  library: Library;
}

export default function LibraryContactDetails({ library }: LibraryContactDetailsProps) {
  return (
    <Box>
      {/* E-mail subtitle */}
      <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, textTransform: "uppercase" }}>
        E-mail
      </Typography>
      {/* Email contacts list */}
      {library.libraryEmailContactDetails.map((contact) => (
        <Box key={contact.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <EmailIcon sx={{ fontSize: 13, mr: 1, ml: 1, color: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.secondary.main, }} />
          <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
            {contact.serviceName}:
          </Typography>
          <Typography variant="body2" component="a" href={`mailto:${contact.contactEmail}`} 
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main,
              textDecoration: 'underline'
            }}
          >
            {contact.contactEmail}
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
          {library.address}
        </Typography>
      </Box>

      {/* Mailing addresses if available */}
      {library.libraryMailingAddresses.length > 0 && (
        <>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2, mb: 1, textTransform: "uppercase"}}>
            Mailing Address
          </Typography>
          {library.libraryMailingAddresses.map((mailingAddr) => (
            <Box key={mailingAddr.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <HomeIcon sx={{ fontSize: 16, mr: 1, ml:1, color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.secondary.main, }} />
              <Typography variant="body2">
                {mailingAddr.postOfficeBox}, {mailingAddr.postalCode} {mailingAddr.locationName}
              </Typography>
            </Box>
          ))}
        </>
      )}

      {/* Phone numbers if available */}
      {library.libraryPhoneNumberContactDetails.length > 0 && (
        <>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 2, mb: 1, textTransform: "uppercase"}}>
            Phone
          </Typography>
          {library.libraryPhoneNumberContactDetails.map((phone) => (
            <Box key={phone.id} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                {phone.serviceName}:
              </Typography>
              <Typography variant="body2">
                {phone.contactPhoneNumber}
              </Typography>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}
