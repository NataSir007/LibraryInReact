import { Box, Collapse } from "@mui/material";
import FooterContent from "./FooterContent"; // Your existing footer content as a component
import { useState } from "react";

const CollapsibleFooter = () => {
  const [open, setOpen] = useState(false);

  // Show footer when mouse enters hover zone or footer, hide when leaves both
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <>
      {/* Hover zone at the bottom */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 16, // Small height for hover detection
          zIndex: 1301,
          pointerEvents: open ? "none" : "auto", // Don't block mouse when footer is open
        }}
        onMouseEnter={handleMouseEnter}
      />
      {/* Collapsible Footer */}
      <Collapse in={open}>
        <Box
          sx={{
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            zIndex: 1300,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FooterContent />
        </Box>
      </Collapse>
    </>
  );
};

export default CollapsibleFooter;