import { useFinanceStore } from "@/store/finance";
import { formatCurrency, formatDate } from "@/utils/dateFormatter";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable, {
  MaterialReactTableProps,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_PT_BR } from "material-react-table/locales/pt-BR";
import { useMemo, useState } from "react";
import FormDialog from "./FormDialog";

interface Props {
  rows: IFinance[] | undefined;
}

export default function DataGrid({ rows }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteFinance, updateFinance } = useFinanceStore();

  const handleSaveRowEdits: MaterialReactTableProps<IFinance>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      const { id } = row.original;
      const { description, value } = values;

      updateFinance(id, { description, value: Number(value) });
      exitEditingMode();
    };

  const columns = useMemo<MRT_ColumnDef<IFinance>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Data",
        enableEditing: false,
        Cell: ({ row }) => formatDate(row.original.date),
      },
      {
        accessorKey: "description",
        header: "Descrição",
      },
      {
        accessorKey: "value",
        header: "Valor",
        Cell: ({ row }) => (
          <Box sx={{ color: `${row.original.expense ? "red" : "green"}` }}>
            {formatCurrency(row.original.value)}
          </Box>
        ),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          type: "number",
        }),
      },
      {
        accessorKey: "expense",
        header: "Tipo",
        enableEditing: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <Chip
            label={row.original.expense ? "Saída" : "Entrada"}
            color={row.original.expense ? "error" : "success"}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={rows ?? []}
        enableEditing={true}
        enableDensityToggle={false}
        initialState={{
          density: "compact",
        }}
        enableColumnFilters={false}
        onEditingRowSave={handleSaveRowEdits}
        //onEditingRowCancel={() => {}}
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                color="success"
                onClick={() => table.setEditingRow(row)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => deleteFinance(row.original.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <Button
            color="success"
            onClick={() => setIsOpen(true)}
            variant="contained"
          >
            Create New Data
          </Button>
        )}
        muiTablePaginationProps={{
          rowsPerPageOptions: [5, 10, 20],
          showFirstButton: false,
          showLastButton: false,
        }}
        localization={MRT_Localization_PT_BR}
      />
      <FormDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
