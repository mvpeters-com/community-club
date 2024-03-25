"use client";

import React, {useState, useTransition} from 'react';

import {MoreVertical, Plus, Trash} from "lucide-react";
import {Button} from '~/components/ui/button';
import {Separator} from '~/components/ui/separator';
import {Heading} from "~/components/ui/heading";
import {DataTable} from "~/components/ui/data-table";
import {type User} from "src/types";
import {type ColumnDef} from '@tanstack/react-table';
import useTranslation from 'next-translate/useTranslation';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';

import {ConfirmDialog} from '~/components/common/ComfirmDialog';
import {api} from '~/trpc/react';
import {serverRevalidatePath} from '~/lib/revalidate';
import {toast} from 'sonner';
import {ModalButton} from '~/components/common/ModalButton';
import {InviteUserModal} from '~/components/admin/modals/InviteUserModal';

interface ProductsClientProps {
    data: User[];
    isLoading?: boolean;
}

interface CellActionProps {
    data: User;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const {t} = useTranslation('admin');

    const [isDeleteModalOpen,
        setIsDeleteModalOpen
    ] = useState(false);

    const {mutate: deleteUser, isLoading: isDeleteLoading} = api.user.deleteUser.useMutation({
        onSuccess: () => {
            toast.success(t('users.delete.success'));
        },
        onError: (error) => {
            toast.error(t('users.delete.error'));
            console.error(error);
        },
        onSettled: () => {
            setIsDeleteModalOpen(false);
            serverRevalidatePath('/admin/users');
        }
    })

    return (
        <>
            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                isLoading={isDeleteLoading}
                setOpen={setIsDeleteModalOpen}
                onConfirm={() => deleteUser({
                    userId: data.id
                })}
            />

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export const dynamic = 'force-dynamic'

export const UsersIndex: React.FC<ProductsClientProps> = ({data, isLoading}) => {
    const {t} = useTranslation('admin');

    const columns: ColumnDef<User>[] = [
        // {
        //     id: "select",
        //     header: ({table}) => (
        //         <Checkbox
        //             disabled={isLoading}
        //             checked={table.getIsAllPageRowsSelected()}
        //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //             aria-label="Select all"
        //         />
        //     ),
        //     cell: ({row}) => (
        //         <Checkbox
        //             disabled={isLoading}
        //             checked={row.getIsSelected()}
        //             onCheckedChange={(value) => row.toggleSelected(!!value)}
        //             aria-label="Select row"
        //         />
        //     ),
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "fullName",
            header: t('users.table.name'),
            enableSorting: true,
            meta: {
                skeleton: 'text',
            }
        },
        {
            accessorKey: "email",
            header: t('users.table.email'),
            meta: {
                skeleton: 'text',
            }
        },
        {
            accessorKey: "isAdmin",
            header: t('users.table.isAdmin'),
            cell: ({getValue}) => getValue() ? "ja" : "nee",
            meta: {
                skeleton: 'text',
            }
        },
        {
            id: "actions",
            cell: ({row}) => <CellAction data={row.original}/>,
        },
    ];

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={isLoading ? `Users` : `Users (${data.length})`}
                    description="Manage users and their permissions."
                />

                <ModalButton
                    modalId={'invite-user'}
                    disabled={isLoading}
                    className="text-xs md:text-sm"
                >
                    <Plus
                        className="mr-2 h-4 w-4"/>{t('users.invite.button')}
                </ModalButton>
            </div>

            <Separator/>

            <DataTable searchKey="fullName" isLoading={isLoading} columns={columns} data={data}/>

            <InviteUserModal/>
        </>
    );
};