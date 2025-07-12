import { Box, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SearchHistoryInfo = () => {
  const { t } = useTranslation();
  
  return (
    <Box sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t("searchHistory.titleSaveSearches")}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t("searchHistory.loginLink1")}
        <Link href="#" underline="hover">
        {t("searchHistory.loginLink2")}
        </Link> 
        {t("searchHistory.loginLink3")}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {t("searchHistory.titleRecentSearches")}
      </Typography>
      <Typography
        variant="subtitle1" 
        gutterBottom
        color="info.main" // Use the theme's info color
      >
        {t("searchHistory.noSearches")}
      </Typography>
    </Box>
  );
};

export default SearchHistoryInfo;
