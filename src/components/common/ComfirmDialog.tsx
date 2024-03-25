import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import useTranslation from 'next-translate/useTranslation';

export const ConfirmDialog = ({
                                  isOpen,
                                  setOpen,
                                  onConfirm,
                                  title,
                                  description,
                                  isLoading,
                                  confirmText,
                                  cancelText
                              }: {
    isOpen: boolean,
    setOpen: (value: boolean) => void,
    onConfirm: () => void,
    title?: string,
    description?: string,
    confirmText?: string,
    cancelText?: string,
    isLoading?: boolean
}) => {
    const {t} = useTranslation('common')

    return <AlertDialog open={isOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    {title ?? t('dialog.confirm.title')}
                </AlertDialogTitle>
                <AlertDialogDescription>
                    {description ?? t('dialog.confirm.description')}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                    {cancelText ?? t('dialog.confirm.cancel')}
                </AlertDialogCancel>

                <AlertDialogAction disabled={isLoading}
                                   onClick={() => onConfirm()}
                >
                    {confirmText ?? t('dialog.confirm.confirm')}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}