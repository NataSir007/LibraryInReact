import { Box } from '@mui/material';

interface LibraryImageProps {
  src: string;
  alt: string;
}

export default function LibraryImage({ src, alt }: LibraryImageProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 210 }}>
      <img
        src={src}
        alt={alt}
        style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
      />
    </Box>
  );
}
