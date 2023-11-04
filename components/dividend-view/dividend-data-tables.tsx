import { useState } from "react";
import { Accordion, ActionIcon, Table } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "@radix-ui/react-icons";

import { deleteDividend } from "@/services/dividend.service";
import { ChartData } from "@/types/chart-options.type";
import { Dividend } from "@/types/dividend.type";
import { formatCurrency } from "@/utils/currency-utils";
import { formatDate } from "@/utils/date-utils";
import { showError, showSuccess } from "@/utils/notification-utils";
import { DeleteConfirmationModal } from "../common/delete-confirmation-modal";

interface DividendDataTablesProps {
  dividendsByMonth: ChartData["dividendsByMonth"];
}

function DividendDataTables({ dividendsByMonth }: DividendDataTablesProps) {
  const initialValue = dividendsByMonth[0].month;

  return (
    <Accordion variant="contained" radius="md" defaultValue={initialValue}>
      {dividendsByMonth.map((data) => {
        if (data.dividends?.length === 0) return null;

        return (
          <Accordion.Item key={data.month} value={data.month}>
            <Accordion.Control>{data.month}</Accordion.Control>
            <Accordion.Panel>
              {<DividendTable dividends={data.dividends} />}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

function DividendTable({ dividends }: { dividends: Dividend[] }) {
  const queryClient = useQueryClient();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [idBeingDeleted, setIdBeingDeleted] = useState<string | null>(null);

  async function performDelete() {
    if (!idBeingDeleted) return;

    try {
      setIsDeleting(true);
      await deleteDividend(idBeingDeleted);
      queryClient.invalidateQueries(["statistics"]);
      queryClient.invalidateQueries(["dividendsList"]);
      showSuccess("Dividend successfully removed!");
    } catch {
      showError("Error while removing the dividend!");
    } finally {
      setIdBeingDeleted(null);
      setIsDeleting(false);
      setIsConfirmationModalOpen(false);
    }
  }

  function triggerDeleteConfirmation(id: string) {
    setIsConfirmationModalOpen(true);
    setIdBeingDeleted(id);
  }

  return (
    <>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Date</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dividends.map((dividend) => (
            <tr key={dividend._id}>
              <td title={dividend.stock?.name}>
                <p className="text-xs sm:text-sm">
                  {`${dividend.stock?.country_flag} ${dividend.stock?.ticker}`}
                </p>
              </td>
              <td>
                <p className="text-xs sm:text-sm">
                  {formatDate(dividend.paymentDate)}
                </p>
              </td>
              <td
                title={
                  dividend.country === "US"
                    ? formatCurrency(Number(dividend.cashAmount), "US")
                    : ""
                }
              >
                <p className="text-xs sm:text-sm">
                  {dividend.formattedCashAmount}
                </p>
              </td>
              <td>
                <ActionIcon
                  color="red"
                  variant="light"
                  loading={isDeleting}
                  onClick={() => {
                    if (dividend._id) {
                      triggerDeleteConfirmation(dividend._id);
                    }
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteConfirmationModal
        isOpen={isConfirmationModalOpen}
        isLoading={isDeleting}
        onConfirm={performDelete}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Are you sure you want to delete the dividend?"
      />
    </>
  );
}

export default DividendDataTables;
