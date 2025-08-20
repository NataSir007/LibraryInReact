import { Box, MenuItem, Select } from '@mui/material';
import type { LibraryNameAddress } from '../../types/library/interfaces';
import { useTranslation } from 'react-i18next';

interface LibrarySelectorProps {
  libraries: LibraryNameAddress[];
  selectedLibraryId: number | null; // Allow null for "All libraries"
  onLibraryChange: (libraryId: number | null) => void; // Allow null for "All libraries"
}

export default function LibrarySelector({ libraries, selectedLibraryId, onLibraryChange }: LibrarySelectorProps) {
  const { t } = useTranslation();
  return (
    <Box display="flex" gap={2}>
      <Select
        inputProps={{ 'data-testid': 'library-selector' }}
        value={selectedLibraryId || 0} // Use 0 for "All libraries"
        onChange={(e) => {
          const value = Number(e.target.value);
          onLibraryChange(value === 0 ? null : value);
        }}
        size="small"
      >
        <MenuItem value={0}>{t('librarySelector.allLibraries')}</MenuItem>
        {libraries.map((library) => (
          <MenuItem key={library.id} value={library.id}>
            {library.title}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
