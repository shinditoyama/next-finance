import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "primary.main",
        height: "30vh",
      }}
    >
      <Container>{children}</Container>
    </Box>
  );
}
