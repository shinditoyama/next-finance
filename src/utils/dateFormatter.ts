import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string) =>
  format(new Date(date), "dd/MM/yyyy", {
    locale: ptBR,
  });

export const getCurrentMonth = () =>
  format(new Date(), "yyyy-M", {
    locale: ptBR,
  });

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
