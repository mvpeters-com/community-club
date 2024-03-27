"use client";

import React, {useState} from 'react';

import {MoreVertical, Plus, Trash} from "lucide-react";
import {Button} from '~/components/ui/button';
import {Separator} from '~/components/ui/separator';
import {Heading} from "~/components/ui/heading";
import {DataTable} from "~/components/ui/data-table";
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
import {type Space} from '~/server/db/schema';


interface CellActionProps {
    data: Space;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const {t} = useTranslation('admin');

    const [isDeleteModalOpen,
        setIsDeleteModalOpen
    ] = useState(false);

    const {mutate: deleteSpace, isLoading: isDeleteLoading} = api.space.delete.useMutation({
        onSuccess: () => {
            toast.success(t('spaces.delete.success'));
        },
        onError: (error) => {
            toast.error(t('spaces.delete.error'));
            console.error(error);
        },
        onSettled: () => {
            setIsDeleteModalOpen(false);
            serverRevalidatePath('/admin/spaces');
        }
    })

    return (
        <>
            <ConfirmDialog
                isOpen={isDeleteModalOpen}
                isLoading={isDeleteLoading}
                setOpen={setIsDeleteModalOpen}
                onConfirm={() => deleteSpace({
                    id: data.id
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

interface SpacesIndexProps {
    data: Space[];
    isLoading?: boolean;
}


export const SpacesIndex: React.FC<SpacesIndexProps> = ({data, isLoading}) => {
    const {t} = useTranslation('admin');

    const columns: ColumnDef<Space>[] = [
        {
            accessorKey: "name",
            header: t('spaces.table.name'),
            enableSorting: true,
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
                    title={isLoading ? `Spaces` : `Spaces (${data.length})`}
                    description={t('spaces.table.description')}
                />

                <ModalButton
                    modalId={'add-space'}
                    disabled={isLoading}
                    className="text-xs md:text-sm"
                >
                    <Plus className="mr-2 h-4 w-4"/>{t('spaces.add.button')}
                </ModalButton>
            </div>

            <Separator/>

            <DataTable searchKey="name" isLoading={isLoading} columns={columns} data={data}/>

            <InviteUserModal/>
        </>
    );
};