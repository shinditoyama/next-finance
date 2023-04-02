import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Card, CardContent, Grid, IconButton } from "@mui/material";
import { format } from "date-fns";
import ResumeItem from "./ResumeItem";

interface Props {
  currentMonth: string;
  onMonthChange: (newMonth: string) => void;
  income: number;
  expense: number;
}

export default function InfoArea({
  currentMonth,
  onMonthChange,
  income,
  expense,
}: Props) {
  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(format(new Date(currentDate), "yyyy-M"));
  };

  const handleNextMonth = () => {
    let [year, month] = currentMonth.split("-");
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(format(new Date(currentDate), "yyyy-M"));
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="ArrowBackIcon" onClick={handlePrevMonth}>
              <ArrowBackIcon />
            </IconButton>
            {currentMonth}
            <IconButton aria-label="ArrowForwardIcon" onClick={handleNextMonth}>
              <ArrowForwardIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} md={3}>
            <ResumeItem title="Receitas" value={income} />
          </Grid>
          <Grid item xs={4} md={3}>
            <ResumeItem title="Despesas" value={expense} />
          </Grid>
          <Grid item xs={4} md={3}>
            <ResumeItem
              title="Balanço"
              value={income - expense}
              color={income - expense < 0 ? "red" : "green"}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
