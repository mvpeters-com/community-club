"use client";
import {Plus} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from '~/components/ui/button';
import {Separator} from '~/components/ui/separator';
import {Heading} from "~/components/ui/heading";
import {DataTable} from "~/components/ui/data-table";
import {Checkbox} from '~/components/ui/checkbox';
import {type User} from "~/components/types";
import {type ColumnDef} from '@tanstack/react-table';
import useTranslation from 'next-translate/useTranslation';


interface ProductsClientProps {
    data: User[];
}

export const UsersTable: React.FC<ProductsClientProps> = ({data}) => {
    const router = useRouter();
    const {t} = useTranslation('admin');

    const columns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "fullName",
            header: t('users.name'),
        },
        {
            accessorKey: "email",
             header: t('users.email'),
        },
        {
            accessorKey: "isAdmin",
             header: t('users.isAdmin'),
            cell: ({getValue}) => getValue() ? "ja" : "nee",
        },
        {
            id: "actions",
            // cell: ({row}) => <CellAction data={row.original}/>,
        },
    ];

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Users (${data.length})`}
                    description="Manage users and their permissions."
                />

                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/user/new`)}
                >
                    <Plus className="mr-2 h-4 w-4"/> Add New
                </Button>
            </div>

            <Separator/>

            <DataTable searchKey="fullName" columns={columns} data={data}/>
        </>
    );
};