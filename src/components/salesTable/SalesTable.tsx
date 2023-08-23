"use client";

import salesData from "../../sales_data_sample.json";
import "./salesTable.scss";
import { useRef, useState } from "react";
import {
  ColumnDef,
  ExpandedState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SalesData } from "@/types";
import Icon from "@mdi/react";
import {
  mdiSortAscending,
  mdiSortDescending,
  mdiPlus,
  mdiMinus,
} from "@mdi/js";
import { ActionIcon, Checkbox } from "@mantine/core";

const columns: ColumnDef<SalesData>[] = [
  {
    id: "select",
    size: 50,
    enableSorting: false,

    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="select-cell">
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    id: "expand",
    size: 50,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="select-cell">
        <ActionIcon
          {...{
            onClick: () => row.toggleExpanded(),
            "aria-label": "Expand Row",
          }}
        >
          <Icon path={row.getIsExpanded() ? mdiMinus : mdiPlus} size={1} />
        </ActionIcon>
      </div>
    ),
  },
  { header: "Order #", accessorKey: "ORDERNUMBER", size: 100 },
  { header: "Status", accessorKey: "STATUS", size: 100 },
  { header: "Order Date", accessorKey: "ORDERDATE" },
  {
    header: "Profit",
    id: "SALES",
    accessorFn: (row) => `$${row.SALES}`,
    size: 100,
  },
  { header: "Customer", accessorKey: "CUSTOMERNAME", size: 300 },
  {
    header: "Contact",
    id: "FULLNAME",
    size: 200,
    accessorFn: (row) => `${row.CONTACTFIRSTNAME} ${row.CONTACTLASTNAME}`,
  },
  {
    header: "Country",
    accessorKey: "COUNTRY",
    size: 100,
    cell: ({ row, getValue }) => (
      <span
        title={`${row.original.CITY}, ${
          row.original.STATE || row.original.TERRITORY
        }`}
      >
        {`${getValue()}`}
      </span>
    ),
  },
  {
    header: "Product Line",
    accessorKey: "PRODUCTLINE",
    cell: ({ row, getValue }) => (
      <span title={row.original.PRODUCTCODE}>{`${getValue()}`}</span>
    ),
  },
  { header: "Size", accessorKey: "DEALSIZE", size: 100 },
];

export default function SalesTable() {
  const parentRef = useRef(null);
  const [data, setData] = useState(() => [...salesData]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
    },
    enableSortingRemoval: true,
    enableMultiRemove: true,
    enableMultiSort: true,
    manualExpanding: true,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    defaultColumn: {
      size: 150,
      minSize: 20,
    },
  });

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 10,
  });

  const { getVirtualItems, getTotalSize } = rowVirtualizer;
  const virtualRows = getVirtualItems();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? getTotalSize() - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  const { rows } = table.getRowModel();

  return (
    <>
      <div ref={parentRef} className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {!header.column.getCanSort() ? null : (
                          <Icon
                            size={0.9}
                            path={
                              {
                                asc: mdiSortAscending,
                                desc: mdiSortDescending,
                              }[header.column.getIsSorted() as string] ?? ""
                            }
                          />
                        )}
                        <sub>
                          {header.column.getSortIndex() > -1
                            ? header.column.getSortIndex() + 1
                            : null}
                        </sub>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}

            {getVirtualItems().map((vRow) => {
              const row = rows[vRow.index] as Row<SalesData>;
              return (
                <>
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {!row.getIsExpanded() ? null : (
                      <td
                        className="expanded-row"
                        colSpan={table.getAllColumns().length}
                      >
                        {row.original.QUANTITYORDERED} units at $
                        {row.original.PRICEEACH}. Profit: ${row.original.SALES}{" "}
                        MSRP: ${row.original.MSRP}
                        <br />
                        Phone: {row.original.PHONE}
                        <br />
                        Address: {row.original.ADDRESSLINE1}{" "}
                        {row.original.ADDRESSLINE2} {row.original.CITY},{" "}
                        {row.original.STATE || row.original.TERRITORY},{" "}
                        {row.original.COUNTRY} {row.original.POSTALCODE}
                      </td>
                    )}
                  </tr>
                </>
              );
            })}

            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-bottom">
        Selected Records: {table.getSelectedRowModel().rows.length}
      </div>
    </>
  );
}
