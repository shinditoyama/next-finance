import { formatCurrency } from "@/utils/dateFormatter";
import { Box } from "@mui/material";

interface Props {
  title: string;
  value: number;
  color?: string;
}

export default function ResumeItem({ title, value, color }: Props) {
  return (
    <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
      <Box sx={{ color: "#888" }}>{title}</Box>
      <Box sx={{ color: color }}>{formatCurrency(value)}</Box>
    </Box>
  );
}
