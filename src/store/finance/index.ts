import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UpdateProps {
  description: string;
  value: number;
}

interface FinanceState {
  finances: IFinance[];
  addFinance: (data: IFinance) => void;
  deleteFinance: (dataId: string) => void;
  updateFinance: (dataId: string, data: UpdateProps) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      finances: [],
      addFinance: (data: IFinance) => {
        set((state) => ({ finances: [...state.finances, data] }));
      },
      deleteFinance: (dataId: string) => {
        set((state) => ({
          finances: state.finances.filter((v) => v.id !== dataId),
        }));
      },
      updateFinance: (dataId: string, data: UpdateProps) => {
        set((state) => ({
          finances: state.finances.map((item) => {
            if (item.id === dataId) {
              // console.log("Editing data", data);
              item.description = data.description;
              item.value = data.value;
            }
            return item;
          }),
        }));
      },
    }),
    {
      name: "finance-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
