import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { ExpandMore, ExpandLess, CheckCircle } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const categoryKeys = [
  "chat",
  "map",
  "essential",
  "analytics",
] as const;

type CategoryKey = typeof categoryKeys[number];

type ExpandedState = Record<CategoryKey, boolean>;
type EnabledState = Record<CategoryKey, boolean>;

const initialEnabled: EnabledState = {
  chat: true,
  map: true,
  essential: true,
  analytics: true,
};

const initialExpanded: ExpandedState = {
  chat: false,
  map: false,
  essential: false,
  analytics: false,
};

const CookieSettings: React.FC = () => {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState<ExpandedState>(initialExpanded);
  const [enabled, setEnabled] = useState<EnabledState>(initialEnabled);

  const toggleExpanded = (key: CategoryKey) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleEnabled = (key: CategoryKey) => {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setOnlyEssential = () => {
    setEnabled({
      chat: false,
      map: false,
      essential: true,
      analytics: false,
    });
  };

  return (
    <Paper sx={{ maxWidth: 750, margin: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("cookieSettings.title")}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t("cookieSettings.description")}{" "}
        <a href="#">{t("cookieSettings.privacyInfo")}</a>.
      </Typography>

      {categoryKeys.map((categoryKey) => (
        <Box
          key={categoryKey}
          sx={{
            mt: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 1,
            bgcolor: enabled[categoryKey] ? "#f5faff" : "#fafafa",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer", userSelect: "none" }}
              onClick={() => toggleExpanded(categoryKey)}
              aria-expanded={expanded[categoryKey]}
              aria-controls={`cookie-desc-${categoryKey}`}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleExpanded(categoryKey);
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, mr: 1, color: (theme) => theme.palette.grey[900] }}
                >
                  {t(`cookieSettings.categories.${categoryKey}`)}
                </Typography>
              {expanded[categoryKey] ? (
                <ExpandLess sx={{ color: (theme) => theme.palette.grey[900] }} />
              ) : (
                <ExpandMore sx={{ color: (theme) => theme.palette.grey[900] }} />
              )}
            </Box>

            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={enabled[categoryKey]}
                    onChange={() => toggleEnabled(categoryKey)}
                  />
                }
                label=""
              />
              {enabled[categoryKey] && (
                <CheckCircle color="success" sx={{ ml: 1 }} />
              )}
            </Box>
          </Box>

          <Collapse in={expanded[categoryKey]}>
            <Typography
              id={`cookie-desc-${categoryKey}`}
              variant="body2"
              sx={{ pl: 1, pt: 1, color: (theme) => theme.palette.grey[900] }}
            >
              {/* Description for {category} goes here. */}
              {t(`cookieSettings.categoryDescriptions.${categoryKey}`)}
            </Typography>
          </Collapse>
        </Box>
      ))}

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Button variant="contained" color="primary">
          {t("cookieSettings.acceptAll")}
        </Button>
        <Button variant="outlined" onClick={setOnlyEssential}>
          {t("cookieSettings.acceptEssential")}
        </Button>
        <Button variant="text">{t("cookieSettings.save")}</Button>
      </Box>
    </Paper>
  );
};

export default CookieSettings;