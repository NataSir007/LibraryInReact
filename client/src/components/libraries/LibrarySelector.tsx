import { Box, MenuItem, Select } from '@mui/material';
import type { Library } from '../../types/library/interfaces';

interface LibrarySelectorProps {
  libraries: Library[];
  selectedLibraryId: number;
  onLibraryChange: (libraryId: number) => void;
}

export default function LibrarySelector({ libraries, selectedLibraryId, onLibraryChange }: LibrarySelectorProps) {
  return (
    <Box display="flex" gap={2} mb={2}>
      <Select 
        value={selectedLibraryId} 
        onChange={(e) => onLibraryChange(Number(e.target.value))}
        size="small"
      >
        {libraries.map((library) => (
          <MenuItem key={library.id} value={library.id}>
            {library.name}
          </MenuItem>
        ))}
      </Select>
      <Select defaultValue="babycare" size="small">
        <MenuItem value="babycare">Baby Care room</MenuItem>
        <MenuItem value="3dprinters">3D Printers</MenuItem>
        <MenuItem value="artrental">Art rental</MenuItem>
        <MenuItem value="filmscanner">Film scanner</MenuItem>
        <MenuItem value="musicalinstruments">Musical Instruments</MenuItem>
      </Select>
    </Box>
  );
}
