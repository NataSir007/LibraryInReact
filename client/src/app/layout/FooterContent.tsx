import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Use short keys for translation
const footerLinks = [
  {
    header: "about",
    links: [
      { text: "whatIsLibrary", href: "what-is-library" },
      { text: "cookieSettings", href: "cookie-settings" },
      { text: "howAreMaterialsSelected", href: "how-are-materials-selected" },
    ],
  },
  {
    header: "findMore",
    links: [
      { text: "searchHistory", href: "search-history" },
    ],
  },
  {
    header: "needHelp",
    links: [
      { text: "searchTips", href: "search-tips" },
      { text: "feedback", href: "feedback" },
    ],
  },
];

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isLargerThanXs = useMediaQuery(theme.breakpoints.up("sm"));
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        position: "fixed",
        left: 0,
        bottom: 0,
        bgcolor: isDark
          ? theme.palette.primary.light
          : theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        pt: 4,
        pb: 2,
        boxShadow: 1,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Grid container spacing={2} columns={isLargerThanXs ? 20 : 12}>
        <Grid size={isLargerThanXs ? 4 : 0} />
        {footerLinks.map((section) => (
          <Grid key={section.header} size={isLargerThanXs ? 4 : 4}>
            <Box sx={{ minWidth: 120, textAlign: "center" }}>
              <Typography variant="subtitle1" fontWeight={700}>
                {t(`footerContent.${section.header}`)}
              </Typography>
              {section.links.map((link) => (
                <Typography key={section.header + link.text} variant="body2" sx={{ mb: 0.5 }}>
                  <RouterLink
                    to={link.href}
                    style={{
                      color: "background.paper",
                      textDecoration: "underline",
                    }}
                  >
                    {t(`footerContent.${link.text}`)}
                  </RouterLink>
                </Typography>
              ))}
            </Box>
          </Grid>
        ))}
        <Grid size={isLargerThanXs ? 4 : 0} />
      </Grid>
      <Box sx={{ height: 24, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", mt: 3 }}>
        <Typography variant="h6" color="inherit">
          © 2025 Kirjasto
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;