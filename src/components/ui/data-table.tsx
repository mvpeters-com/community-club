"use client";

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";


import {Input} from "./input";
import {Button} from "./button";
import {ScrollArea, ScrollBar} from '~/components/ui/scroll-area';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '~/components/ui/table';
import useTranslation from 'next-translate/useTranslation';
import {range} from '~/lib/utils';
import {Skeleton} from '~/components/ui/skeleton';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading?: boolean;
    searchKey: string;
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             searchKey,
                                             isLoading,
                                         }: DataTableProps<TData, TValue>) {
    const {t} = useTranslation('common')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    /* this can be used to get the selectedrows
    console.log("value", table.getFilteredSelectedRowModel()); */

    return (
        <>
            <Input
                placeholder={`Search`}
                value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                disabled={isLoading}
                onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="w-full md:max-w-sm"
            />
            <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
                <Table className="relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, index) => {
                            return (
                                <TableRow key={`${headerGroup.id}${index}`}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableHeader>

                    <TableBody>
                        {isLoading ? range(0, 4).map((index) => {
                            return (
                                <TableRow key={index}>
                                    {columns.map((column, index) => {
                                        return <TableCell key={`loading-${index}`}>
                                            {column.meta?.skeleton === 'text' ? <Skeleton
                                                className="h-8 w-[150px]"
                                            /> : null}
                                        </TableCell>;
                                    })}
                                </TableRow>
                            );
                        }) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (

                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/*<div className="flex-1 text-sm text-muted-foreground">*/}
                {/*    {table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
                {/*    {table.getFilteredRowModel().rows.length} row(s) selected.*/}
                {/*</div>*/}

                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {t('pagination.previous')}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {t('pagination.next')}
                    </Button>
                </div>
            </div>
        </>
    );
}