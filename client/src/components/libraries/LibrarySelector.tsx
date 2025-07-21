import { Box, MenuItem, Select } from '@mui/material';
import type { Library } from '../../types/library/interfaces';
import { useTranslation } from 'react-i18next';

interface LibrarySelectorProps {
  libraries: Library[];
  selectedLibraryId: number | null; // Allow null for "All libraries"
  onLibraryChange: (libraryId: number | null) => void; // Allow null for "All libraries"
}

export default function LibrarySelector({ libraries, selectedLibraryId, onLibraryChange }: LibrarySelectorProps) {
  const { t } = useTranslation();
  return (
    <Box display="flex" gap={2} mb={2}>
      <Select 
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
            {library.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
