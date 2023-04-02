import DataGrid from "@/components/DataGrid";
import Header from "@/components/Header";
import InfoArea from "@/components/InfoArea";
import SEO from "@/components/SEO";
import { useStore } from "@/hooks/useStore";
import { useFinanceStore } from "@/store/finance";
import { getCurrentMonth } from "@/utils/dateFormatter";
import { Box, Container } from "@mui/material";
import { endOfMonth } from "date-fns";
import { useState } from "react";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const startDate = new Date(currentMonth);
  const endDate = endOfMonth(new Date(currentMonth));

  const finances = useStore(useFinanceStore, (state) => state.finances);

  const filterdData = finances
    ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter(
      (v) => new Date(v.date) >= startDate && new Date(v.date) <= endDate
    );

  const amountIncome = filterdData
    ?.filter((item) => !item.expense)
    .map((vl) => vl.value);
  const amountExpense = filterdData
    ?.filter((item) => item.expense)
    .map((vl) => vl.value);

  const income = amountIncome?.reduce((acc, cur) => acc + cur, 0);
  const expense = amountExpense?.reduce((acc, cur) => acc + cur, 0);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  return (
    <Box>
      <SEO title="Sistema Financeiro" />
      <Header>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income || 0}
          expense={expense || 0}
        />
      </Header>
      <Container sx={{ marginTop: { xs: -2, md: -4 }, marginBottom: 4 }}>
        <DataGrid rows={filterdData} />
      </Container>
    </Box>
  );
}
