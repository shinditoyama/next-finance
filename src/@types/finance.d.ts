interface IFinance {
  id: string;
  description: string;
  value: number;
  expense: boolean;
  date: string;
}

interface ICategory {
  [tag: string]: {
    title: string;
    expense: boolean;
  };
}
