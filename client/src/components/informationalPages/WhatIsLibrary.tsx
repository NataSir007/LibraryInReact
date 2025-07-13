import { Box, Typography, List, ListItem, ListItemText, Link, ListItemIcon, Divider } from "@mui/material";
import { useTranslation } from 'react-i18next';


export default function WhatIsLibrary() {
  const {t} = useTranslation();

  const whatKirjastoOffers = [
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet1"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet2"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet3"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet4"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet5"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet6"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet7"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet8"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet9"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet10"),
  t("whatIsLibrary.whatKirjastoOffersBullets.bullet11")
];

const statistics = [
  t("whatIsLibrary.statisticsBullets.bullet1"),
  t("whatIsLibrary.statisticsBullets.bullet2"),
  t("whatIsLibrary.statisticsBullets.bullet3"),
  t("whatIsLibrary.statisticsBullets.bullet4"),
  t("whatIsLibrary.statisticsBullets.bullet5"),
  t("whatIsLibrary.statisticsBullets.bullet6"),
  t("whatIsLibrary.statisticsBullets.bullet7")
];

return (
  <Box sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
    <Typography variant="h4" gutterBottom>
      What is Kirjasto?
    </Typography>
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
      {/* Sidebar Links */}
      <Box sx={{ minWidth: 180, maxWidth: 280, wordBreak: "break-word"}}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <Link href="#what-Kirjasto-libraries-offer" underline="hover">
            {t("whatIsLibrary.whatKirjastoOffers")}
          </Link>
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <Link href="#statistics" underline="hover">
            {t("whatIsLibrary.statistics")}
          </Link>
        </Typography>        
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("whatIsLibrary.paragraph1")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("whatIsLibrary.paragraph2")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("whatIsLibrary.paragraph3")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("whatIsLibrary.paragraph4")}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Box id="what-Kirjasto-libraries-offer" sx={{ mt: 4, scrollMarginTop: "80px" }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {t("whatIsLibrary.whatKirjastoOffers")}
          </Typography>
          <List dense>
            {whatKirjastoOffers.map((item) => (
              <ListItem key={item}>
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
                <ListItemText
                  primary={item}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Box id="statistics" sx={{ mt: 4, scrollMarginTop: "80px" }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {t("whatIsLibrary.statistics")}
          </Typography>
          <List dense>
            {statistics.map((item) => (
              <ListItem key={item}>
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
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box> 
        
        <Divider sx={{ my: 2 }} />       
      </Box>
    </Box>
  </Box>
);
}
