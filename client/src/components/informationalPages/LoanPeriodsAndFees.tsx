import React from "react";
import { Box, Typography, Link, Divider, ListItemIcon, ListItem, List, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoanPeriodsAndFees: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t("loanPeriodsAndFees.title")}
      </Typography>

      {/* Flex container for sidebar and main content */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Sidebar Links */}
        <Box sx={{ minWidth: 180, maxWidth: 280, wordBreak: "break-word" }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#loan-periods"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("loanPeriodsAndFees.loanPeriodsTitle")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#joint-fees"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("loanPeriodsAndFees.jointFeesTitle")}
            </Link>
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1  }}>
          <Box id="loan-periods" sx={{ mt: 0, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("loanPeriodsAndFees.loanPeriodsTitle")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("loanPeriodsAndFees.generalPeriod")}
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
                  {t("loanPeriodsAndFees.bestsellers")} 
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
                  {t("loanPeriodsAndFees.musicCDs")} 
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
                  {t("loanPeriodsAndFees.dvdsBlurays")} 
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
                  {t("loanPeriodsAndFees.consoleGames")} 
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
                  {t("loanPeriodsAndFees.boardGames")} 
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
                  {t("loanPeriodsAndFees.objects")} 
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
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              {t("loanPeriodsAndFees.limitsTitle")}
            </Typography>
            <List dense>
              {/* ...list items for limits... */}
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <Typography component="span" fontWeight="bold" fontSize="1.5rem"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary.main
                          : theme.palette.primary.main
                    }}>
                    •
                  </Typography>
                </ListItemIcon>
                <ListItemText>
                  {t("loanPeriodsAndFees.limitsConsoleGames")}
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
                  {t("loanPeriodsAndFees.limitsOtherMaterials")} 
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
                  {t("loanPeriodsAndFees.limitsPendingReservations")} 
                </ListItemText>
              </ListItem>
            </List>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box id="joint-fees" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("loanPeriodsAndFees.jointFeesTitle")}
            </Typography>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              {t("loanPeriodsAndFees.overdueFeesTitle")}
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
                  {t("loanPeriodsAndFees.overdueFee")} 
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
                  {t("loanPeriodsAndFees.maxOverdueFee")} 
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
                  {t("loanPeriodsAndFees.uncollectedReservationFee")} 
                </ListItemText>
              </ListItem>
            </List>
            <Typography sx={{ mb: 2 }}>
              {t("loanPeriodsAndFees.overdueFeeNote")}
            </Typography>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              {t("loanPeriodsAndFees.maxOutstandingDebtTitle")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("loanPeriodsAndFees.maxOutstandingDebtText")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoanPeriodsAndFees;