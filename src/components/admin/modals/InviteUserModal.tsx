'use client';

import React, {useState} from 'react';
import useTranslation from 'next-translate/useTranslation';
import {api} from '~/trpc/react';
import {toast} from 'sonner';
import {serverRevalidatePath} from '~/lib/revalidate';
import {Button} from '~/components/ui/button';
import {Plus} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from '~/components/ui/dialog';
import {Label} from '~/components/ui/label';
import {Input} from '~/components/ui/input';
import {useQueryState} from 'nuqs';
import {useRouterReady} from '~/lib/client-utils';

export const InviteUserModal: React.FC = () => {
    const {t} = useTranslation('admin')
    const [modal, setModal] = useQueryState('modal')

    const isReady = useRouterReady()
    const isDialogOpen = isReady && modal === 'invite-user';

    const onOpenChange = async (isOpen: boolean) => {
        await setModal(isOpen ? 'invite-user' : null)
    }

    const {mutate: addUser} = api.user.createUser.useMutation({
        onSuccess: () => {
            toast.success(t('users.invite.success'))
            return onOpenChange(false)
        },
        onError: (error) => {
            toast.error(t('users.invite.error'))
            console.error(error);
        },
        onSettled: () => {
            serverRevalidatePath('/admin/users')
        }
    })

    return <>
        <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {t('users.invite.title')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('users.invite.description')}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        {t('users.invite.button')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}