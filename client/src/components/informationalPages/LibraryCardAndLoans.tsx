import { Box, Typography, Link, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LibraryCardAndLoans() {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t("libraryCardAndLoans.title")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Sidebar Links */}
        <Box sx={{ minWidth: 180, maxWidth: 280, wordBreak: "break-word" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#pin-code-and-your-details"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("libraryCardAndLoans.pinCodeAndYourDetails")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#power-of-attorney"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("libraryCardAndLoans.powerOfAttorney")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#loans"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("libraryCardAndLoans.loans")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#returning"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("libraryCardAndLoans.returning")}
            </Link>
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Box id="pin-code-and-your-details" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("libraryCardAndLoans.pinCodeAndYourDetails")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.pinParagraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.pinParagraph2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.pinParagraph3")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box id="power-of-attorney" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("libraryCardAndLoans.powerOfAttorney")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.powerParagraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.powerParagraph2")}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                    }}
                  >
                    •
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  {t("libraryCardAndLoans.powerList1")} 
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                    }}
                  >
                    •
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  {t("libraryCardAndLoans.powerList2")} 
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                    }}
                  >
                    •
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  {t("libraryCardAndLoans.powerList3")} 
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                    }}
                  >
                    •
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  {t("libraryCardAndLoans.powerList4")} 
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Typography
                    component="span"
                    fontWeight="bold"
                    fontSize="1.5rem"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                    }}
                  >
                    •
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  {t("loanPeriodsAndFees.ematerials")} 
                </ListItemText>
              </ListItem>
            </List>

            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.powerParagraph3")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box id="loans" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("libraryCardAndLoans.loans")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.loansParagraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.loansParagraph2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.loansParagraph3")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box id="returning" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("libraryCardAndLoans.returning")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.returningParagraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.returningParagraph2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("libraryCardAndLoans.returningParagraph3")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
    </Box>
  );
}