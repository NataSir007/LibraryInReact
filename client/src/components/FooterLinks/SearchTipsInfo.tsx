import { Box, Typography, Link, Divider, List, ListItemIcon, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

export default function SearchTipsInfo() {
    const { t } = useTranslation();
  return (
    <Box sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t("searchTips.title")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Sidebar Links */}
        <Box sx={{ minWidth: 180, maxWidth: 280, wordBreak: "break-word"}}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#basic-search"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleBasic")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#narrowing-search"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleNarrowing")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#advanced-search"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleAdvanced")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#logical-search-operators"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleLogical")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#phrase-searches"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitlePhrase")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#wildcard-characters"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleWildcard")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#fuzzy-searches"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleFuzzy")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#proximity-searches"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleProximity")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#range-searches"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleRange")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#weighted-search-terms"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleWeighted")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#search-by-classification"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
               {t("searchTips.subtitleSearch")}
            </Link>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <Link
              href="#saved-searches-and-alert-schedule"
              underline="hover"
              sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              {t("searchTips.subtitleSaved")}
            </Link>
          </Typography>
        </Box>  
        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          <Box id="basic-search" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <SearchIcon sx={{ fontSize: "1.5em" }} />
              {t("searchTips.subtitleBasic")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleBasicParagraphs.p1")}
            </Typography>
            <Typography>
              {t("searchTips.subtitleBasicParagraphs.p2-1")}
              <Box component="span" fontStyle="italic" display="inline">
                {t("searchTips.subtitleBasicParagraphs.p2-2")}
              </Box> 
              {t("searchTips.subtitleBasicParagraphs.p2-3")}
              <Box component="span" fontStyle="italic" display="inline">
                {t("searchTips.subtitleBasicParagraphs.p2-4")}
              </Box>
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="narrowing-search" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleNarrowing")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleNarrowingParagraphs.p1")}
              <Box component="span" fontWeight="bold" display="inline">
                {t("searchTips.subtitleNarrowingParagraphs.p2")}
              </Box> 
              {t("searchTips.subtitleNarrowingParagraphs.p3")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("searchTips.subtitleNarrowingParagraphs.p4")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="advanced-search" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <SearchIcon sx={{ fontSize: "1.3em" }} />
                <AddIcon sx={{ fontSize: "1.0em", pb: 1 }} />
              </Box>
              {t("searchTips.subtitleAdvanced")}
            </Typography>
            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleAdvancedParagraphs.fields.title")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleAdvancedParagraphs.fields.p1")}
            </Typography>
            <Typography sx={{ mb: 3 }}>
              {t("searchTips.subtitleAdvancedParagraphs.fields.p2")}
            </Typography>
            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
            {t("searchTips.subtitleAdvancedParagraphs.match.title")}
            </Typography>
            <Typography >
              {t("searchTips.subtitleAdvancedParagraphs.match.p1")} 
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
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.match.bullet1-1")} 
                  </Box> 
                  {t("searchTips.subtitleAdvancedParagraphs.match.bullet1-2")} 
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
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.match.bullet2-3")} 
                  </Box> 
                  {t("searchTips.subtitleAdvancedParagraphs.match.bullet2-2")} 
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
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.match.bullet3-1")} 
                  </Box> {t("searchTips.subtitleAdvancedParagraphs.match.bullet3-2")} 
                </ListItemText>
              </ListItem>
            </List>
            <Typography sx={{ mb: 3 }}>
              <Box component="span" fontWeight="bold" display="inline">
                {t("searchTips.subtitleAdvancedParagraphs.match.p2-1")} 
              </Box>
              {t("searchTips.subtitleAdvancedParagraphs.match.p2-2")} 
            </Typography>

            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleAdvancedParagraphs.groups.title")}
            </Typography>
            <List dense sx={{ mb: 3 }}>
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
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.groups.bullet1-1")}
                  </Box> a{t("searchTips.subtitleAdvancedParagraphs.groups.bullet1-2")}
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
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.groups.bullet2-1")}
                  </Box> 
                  {t("searchTips.subtitleAdvancedParagraphs.groups.bullet2-2")}
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
                  {t("searchTips.subtitleAdvancedParagraphs.groups.bullet3-1")} 
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.groups.bullet3-2")} 
                  </Box> 
                  {t("searchTips.subtitleAdvancedParagraphs.groups.bullet3-3")} 
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.groups.bullet3-4")} 
                  </Box> 
                  {t("searchTips.subtitleAdvancedParagraphs.groups.bullet3-5")} 
                </ListItemText>
              </ListItem>
            </List>
            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleAdvancedParagraphs.example.title")}
            </Typography>
            <Typography >
              {t("searchTips.subtitleAdvancedParagraphs.example.p1")}
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
                  {t("searchTips.subtitleAdvancedParagraphs.example.bullet1")}
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
                  {t("searchTips.subtitleAdvancedParagraphs.example.bullet2-1")}
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.example.bullet2-2")}
                  </Box> 
                  {t("searchTips.subtitleAdvancedParagraphs.example.bullet2-3")} 
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.example.bullet2-4")}
                  </Box>
                  {t("searchTips.subtitleAdvancedParagraphs.example.bullet2-5")}
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
                  {t("searchTips.subtitleAdvancedParagraphs.example.bullet3")}
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
                  {t("searchTips.subtitleAdvancedParagraphs.example.bullet4-1")}
                  <Box component="span" fontWeight="bold" display="inline">
                    {t("searchTips.subtitleAdvancedParagraphs.example.bullet4-2")}
                  </Box>.
                </ListItemText>
              </ListItem>
            </List>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="logical-search-operators" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleLogical")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              You can combine terms into complex queries with Boolean operators. The following operators can be used: 
              <Box component="span" fontWeight="bold" display="inline">{t("searchTips.subtitleLogicalOperators.and")} </Box>{t("searchTips.subtitleLogicalParagraphs.comma")} 
              <Box component="span" fontWeight="bold" display="inline">{t("searchTips.subtitleLogicalOperators.plus")} </Box>{t("searchTips.subtitleLogicalParagraphs.comma")}  
              <Box component="span" fontWeight="bold" display="inline">{t("searchTips.subtitleLogicalOperators.or")}</Box>{t("searchTips.subtitleLogicalParagraphs.comma")}  
              <Box component="span" fontWeight="bold" display="inline">{t("searchTips.subtitleLogicalOperators.not")}</Box>{t("searchTips.subtitleLogicalParagraphs.commaAnd")} 
              <Box component="span" fontWeight="bold" display="inline">{t("searchTips.subtitleLogicalOperators.minus")}</Box>{t("searchTips.subtitleLogicalParagraphs.point")} 
            </Typography>
            <Typography sx={{ mb: 3 }}>
              <Box component="span" fontWeight="bold" display="inline">
                {t("searchTips.subtitleLogicalParagraphs.nb")} 
              </Box> 
              {t("searchTips.subtitleLogicalParagraphs.nbP")} 
            </Typography>

            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleLogicalOperators.and")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleLogicalParagraphs.pAnd1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleLogicalParagraphs.pAnd2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8' }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                economics Keynes
              </Typography>
            </Paper>
            <Typography sx={{ mb: 2, mt: 1 }}>
              {t("searchTips.subtitleLogicalParagraphs.pAnd3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                economics AND Keynes
              </Typography>
            </Paper>

            <Typography variant="subtitle1"  gutterBottom fontWeight="bold" sx={{ fontSize: "1.75rem" }}>
              {t("searchTips.subtitleLogicalOperators.plus")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <Box component="span" fontWeight="bold" display="inline">
                {t("searchTips.subtitleLogicalOperators.and")}
              </Box>, 
              {t("searchTips.subtitleLogicalParagraphs.pPlus1")}
              <Box component="span" fontWeight="bold" display="inline">
                 {t("searchTips.subtitleLogicalOperators.and")}
              </Box> 
              {t("searchTips.subtitleLogicalParagraphs.pPlus2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleLogicalParagraphs.pPlus3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                +economics Keynes
              </Typography>
            </Paper>

            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleLogicalOperators.or")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleLogicalParagraphs.pOr1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleLogicalParagraphs.pOr2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                "economics Keynes" OR Keynes
              </Typography>
            </Paper>

            <Typography variant="subtitle1"  fontWeight="bold" sx={{ fontSize: "1.5rem" }}>
              {t("searchTips.subtitleLogicalOperators.exclamationMarkMinus")}
            </Typography>
            <Typography >
              {t("searchTips.subtitleLogicalParagraphs.pExclamationMarkMinus1")}
            </Typography>
            <Typography >
              {t("searchTips.subtitleLogicalParagraphs.pExclamationMarkMinus2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                economics !-Keynes
              </Typography>
            </Paper>
            <Typography sx={{ mb: 5 }}>
              {t("searchTips.subtitleLogicalParagraphs.pExclamationMarkMinus3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                !-economics
              </Typography>
            </Paper>
            <Typography >
              {t("searchTips.subtitleLogicalParagraphs.pExclamationMarkMinus4")}  
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                \!-merkki hakuehtona
              </Typography>
            </Paper>
            <Typography >
              {t("searchTips.subtitleLogicalParagraphs.pExclamationMarkMinus5")} 
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="phrase-searches" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitlePhrase")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitlePhraseParagraphs.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitlePhraseParagraphs.p2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                “Helsingin yliopisto”
              </Typography>
            </Paper>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitlePhraseParagraphs.p3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                “classroom board”
              </Typography>
            </Paper>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box id="wildcard-characters" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleWildcard")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.p1-1")}
              <Box component="span" fontWeight="bold" display="inline">*</Box>
              {t("searchTips.subtitleWildcardParagraphs.p1-2")}
              <Box component="span" fontWeight="bold" display="inline">?</Box>
              {t("searchTips.subtitleWildcardParagraphs.p1-3")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.p2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.p3")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.p4")}
            </Typography>

            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleWildcardParagraphs.asterisk.title")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.asterisk.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.asterisk.p2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                competit*
              </Typography>
            </Paper>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.asterisk.p3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                colo*r
              </Typography>
            </Paper>

            <Typography variant="subtitle1"  gutterBottom fontWeight="bold">
              {t("searchTips.subtitleWildcardParagraphs.questionMark.title")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.questionMark.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWildcardParagraphs.questionMark.p2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                wom?n
              </Typography>
            </Paper>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="fuzzy-searches" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleFuzzy")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleFuzzyParagraphs.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <Box component="span" fontWeight="bold" display="inline">~</Box> {t("searchTips.subtitleFuzzyParagraphs.p2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleFuzzyParagraphs.p3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                ~roam
              </Typography>
            </Paper>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleFuzzyParagraphs.p4")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleFuzzyParagraphs.p5")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                roam~0.8
              </Typography>
            </Paper>
            <Typography sx={{ mb: 5 }}>           
              {t("searchTips.subtitleFuzzyParagraphs.p6")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="proximity-searches" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleProximity")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleRangeParagraphs.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
            <Box component="span" fontWeight="bold" display="inline">~</Box>{t("searchTips.subtitleRangeParagraphs.p2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleRangeParagraphs.p3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                "economics Keynes"~10
              </Typography>
            </Paper>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="range-searches" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleRange")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleRangeParagraphs.p1-1")}
              <Box component="span" fontWeight="bold" display="inline">
                {`{ }`}               
              </Box> 
              {t("searchTips.subtitleRangeParagraphs.p1-2")} 
              <Box component="span" fontWeight="bold" display="inline">
                {`[ ]`}
              </Box>
              {t("searchTips.subtitleRangeParagraphs.p1-2")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleRangeParagraphs.p2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                {'{A TO D}'}
              </Typography>
            </Paper>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleRangeParagraphs.p3")}
            </Typography>          
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                [2002 TO 2003]
              </Typography>
            </Paper>
            <Typography sx={{ mb: 5 }}>
              {t("searchTips.subtitleRangeParagraphs.p4")}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          <Box id="weighted-search-terms" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleWeighted")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleWeightedParagraphs.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
             {t("searchTips.subtitleWeightedParagraphs.p2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                economics Keynes^5
              </Typography>
            </Paper>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="search-by-classification" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleSearch")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleSearchParagraphs.p1")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleSearchParagraphs.p2")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                "kirjasto 654.92"
              </Typography>
            </Paper>
            <Typography sx={{ mb: 2 }}>
              {t("searchTips.subtitleSearchParagraphs.p3")}
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, py: 0.5, backgroundColor: '#f8f8f8', mb: 3 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', color: 'grey.900'}}>
                "kirjasto 67.452"
              </Typography>
            </Paper>
            <Typography sx={{ mb: 5 }}>
              {t("searchTips.subtitleSearchParagraphs.p4")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box id="saved-searches-and-alert-schedule" sx={{ mt: 4, scrollMarginTop: "80px" }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {t("searchTips.subtitleSaved")}
            </Typography>
            <Typography sx={{ mb: 5 }}>
              {t("searchTips.subtitleSavedParagraph")}
            </Typography>          
          </Box>
        </Box>
      </Box>
    </Box>
   );
}


