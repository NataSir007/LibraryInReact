import { MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function MenuItemLink({children, to}: {children: React.ReactNode, to: string}) {
  return (
    <MenuItem
        component={NavLink}
        to={to}
        sx={{
            fontSize: '1.2rem',
            fontWeight: 'normal',
            color: 'inherit',
            '&.active': {
                color: 'secondary'
            }
        }}
    >
        {children}
    </MenuItem>
  )
}