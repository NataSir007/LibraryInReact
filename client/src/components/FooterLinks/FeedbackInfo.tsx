import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function FeedbackInfo() {
  const { t } = useTranslation();

  const subjects = [
    t("feedback.subjects.fees"),
    t("feedback.subjects.collections"),
    t("feedback.subjects.website"),
    t("feedback.subjects.services"),
    t("feedback.subjects.other"),
  ];

type FormState = {
  subject: string;
  cardNumber: string;
  title: string;
  message: string;
  url: string;
  name: string;
  email: string;
};

type ErrorState = Partial<Record<keyof FormState, string>>;

  const [form, setForm] = useState<FormState>({
    subject: subjects[0],
    cardNumber: '',
    title: '',
    message: '',
    url: '',
    name: '',
    email: '',
  });
 
  const [errors, setErrors] = useState<ErrorState>({});

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: ErrorState = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      console.log('Form submitted', form);
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {t("feedback.title")}
      </Typography>

      <form noValidate onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label={t("feedback.subject")}
          value={form.subject}
          onChange={handleChange('subject')}
          margin="normal"
        >
          {subjects.map((option, index) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label={t("feedback.cardNumber")} 
          value={form.cardNumber}
          onChange={handleChange('cardNumber')}
          margin="normal"
        />

        <TextField
          required
          fullWidth
          label={t("feedback.title")}
          value={form.title}
          onChange={handleChange('title')}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          required
          fullWidth
          multiline
          rows={4}
          label={t("feedback.message")} 
          value={form.message}
          onChange={handleChange('message')}
          margin="normal"
          error={!!errors.message}
          helperText={errors.message}
        />

        <TextField
          fullWidth
          label={t("feedback.url")}
          value={form.url}
          onChange={handleChange('url')}
          placeholder="http://..."
          margin="normal"
        />

        <Typography sx={{ mt: 2 }}>
          {t("feedback.info")}
        </Typography>

        <TextField
          fullWidth
          label={t("feedback.name")}
          value={form.name}
          onChange={handleChange('name')}
          margin="normal"
        />

        <TextField
          fullWidth
          label={t("feedback.email")}
          value={form.email}
          onChange={handleChange('email')}
          margin="normal"
        />

        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
          {t("feedback.privacy")}
        </Typography>

        <Box mt={3}>
          <Button type="submit" variant="outlined">
            {t("feedback.send")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}