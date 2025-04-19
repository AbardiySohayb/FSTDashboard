import { Box, Avatar, styled, alpha } from "@mui/material"
import { primaryColor } from "../../utils/theme"

export const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 30,
  padding: "4px 16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  flex: 1,
}))

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${alpha(primaryColor, 0.2)}`,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}))

export const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 8,
  "& .MuiSvgIcon-root": {
    color: primaryColor,
    marginRight: 8,
  },
}))

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`employee-tabpanel-${index}`}
      aria-labelledby={`employee-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}
