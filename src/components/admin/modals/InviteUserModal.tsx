'use client';

import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {api} from '~/trpc/react';
import {toast} from 'sonner';
import {serverRevalidatePath} from '~/lib/revalidate';
import {Button} from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle
} from '~/components/ui/dialog';
import {useQueryState} from 'nuqs';
import {useRouterReady} from '~/lib/client-utils';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
    Form,
} from '~/components/ui/form';

import {FormInput} from '~/components/form/FormInput';
import {CreateUser, createUserSchema} from '~/lib/schemas/users';

export const InviteUserModal: React.FC = () => {
    const {t} = useTranslation('admin')
    const [modal, setModal] = useQueryState('modal')

    const isReady = useRouterReady()
    const isDialogOpen = isReady && modal === 'invite-user';

    const form = useForm<CreateUser>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            emailAddress: "",
        },
    })

    const onOpenChange = async (isOpen: boolean) => {
        await setModal(isOpen ? 'invite-user' : null)
    }

    const {mutate: addUser, isLoading} = api.user.createUser.useMutation({
        onSuccess: () => {
            form.reset()
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

    return <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
                <form
                    className="flex flex-col"
                    onSubmit={form.handleSubmit((values) => {
                        console.log(values)
                        addUser(values);
                    })}>
                    <DialogHeader>
                        <DialogTitle>
                            {t('users.invite.title')}
                        </DialogTitle>
                        <DialogDescription>
                            {t('users.invite.description')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <FormInput
                            control={form.control}
                            name="firstName"
                            label={t('users.invite.firstName')}
                            placeholder="John"
                        />
                        <FormInput
                            control={form.control}
                            name="lastName"
                            label={t('users.invite.lastName')}
                            placeholder="Doe"
                        />

                        <FormInput
                            control={form.control}
                            name="emailAddress"
                            label={t('users.invite.email')}
                            type="email"
                            placeholder="john@doe.com"
                        />
                    </div>

                    <DialogFooter className={'max-sm:mt-auto'}>
                        <Button
                            loading={isLoading}
                            type="submit">
                            {t('users.invite.button')}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}