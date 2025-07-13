import { Box, Typography, Link, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function HowAreMaterialsSelected(){
  const {t} = useTranslation();

  return (
    <Box sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
       {t("howAreMaterialsSelected.title")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Sidebar Links */}
        <Box sx={{ minWidth: 180, maxWidth: 280, wordBreak: "break-word"}}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#what-do-the-material-selection-processes"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("howAreMaterialsSelected.subtitle1")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#how-are-new-works-acquired"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("howAreMaterialsSelected.subtitle2")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#more-copies-of-popular-new-works"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("howAreMaterialsSelected.subtitle3")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#customers-acquisition-requests"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("howAreMaterialsSelected.subtitle4")}
            </Link>
          </Typography>
        </Box>
    
        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("howAreMaterialsSelected.paragraph1")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("howAreMaterialsSelected.paragraph2")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("howAreMaterialsSelected.paragraph3")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("howAreMaterialsSelected.paragraph4")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 5 }}>
            {t("howAreMaterialsSelected.paragraph5")}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box id="what-do-the-material-selection-processes" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("howAreMaterialsSelected.subtitle1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph3")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph4")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph5.beforeLink")}
              <Link href="#" underline="hover">
                {t("howAreMaterialsSelected.subtitle1Paragraph5.link")}
              </Link>
              {t("howAreMaterialsSelected.subtitle1Paragraph5.afterLink")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph6")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("howAreMaterialsSelected.subtitle1Paragraph7")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box  id="how-are-new-works-acquired" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              {t("howAreMaterialsSelected.subtitle2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle2Paragraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle2Paragraph2")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("howAreMaterialsSelected.subtitle2Paragraph3")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box  id="more-copies-of-popular-new-works" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              {t("howAreMaterialsSelected.subtitle3")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle3Paragraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle2Paragraph1")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("howAreMaterialsSelected.subtitle3Paragraph3")}
            </Typography>
          </Box>  

          <Divider sx={{ my: 2 }} />
          <Box  id="customers-acquisition-requests" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              {t("howAreMaterialsSelected.subtitle4")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle4Paragraph1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle4Paragraph2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle4Paragraph3")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("howAreMaterialsSelected.subtitle4Paragraph4")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("howAreMaterialsSelected.subtitle4Paragraph5")}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />       
        </Box>
      </Box>
    </Box>
  );
}