import { useFinanceStore } from "@/store/finance";
import { categories } from "@/utils/categories";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormDataProps {
  description: string;
  value: string;
  expense: string;
  date: string;
}

const schema = yup
  .object({
    description: yup.string().required(),
    value: yup.number().required(),
    date: yup.date().required(),
    expense: yup.string().required(),
  })
  .required();

export default function FormDialog({ open, onClose }: Props) {
  const { addFinance } = useFinanceStore();

  const { handleSubmit, reset, control, formState } = useForm<FormDataProps>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  let categoryKeys: string[] = Object.keys(categories);

  const handleAddEvent = (data: FormDataProps) => {
    const newData = {
      id: uuidv4(),
      description: data.description,
      value: parseFloat(data.value),
      date: data.date,
      expense: categories[data.expense]?.expense,
    };

    addFinance(newData);
    clearFields();
  };

  const clearFields = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Cadastrar</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  value={value ?? null}
                  onChange={onChange}
                  label="Data"
                  slotProps={{
                    textField: {
                      variant: "standard",
                      error: !!errors.date,
                      helperText: errors.date?.message as string,
                    },
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value ?? ""}
                  type="text"
                  label="Descrição"
                  variant="standard"
                  error={!!errors.description}
                  helperText={errors.description?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value ?? ""}
                  type="number"
                  label="Valor"
                  variant="standard"
                  InputProps={{ inputProps: { min: 0, max: 10000 } }}
                  error={!!errors.value}
                  helperText={errors.value?.message as string}
                />
              )}
            />

            <Controller
              control={control}
              name="expense"
              render={({ field: { onChange, value } }) => (
                <TextField
                  select
                  label="Tipo"
                  variant="standard"
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!errors.expense}
                  helperText={errors.expense?.message as string}
                >
                  {categoryKeys.map((key, index) => (
                    <MenuItem key={index} value={key}>
                      {categories[key].title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button type="button" onClick={clearFields}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(handleAddEvent)}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
