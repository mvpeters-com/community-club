'use client'

import * as React from 'react';
import {type ButtonProps, Button} from '~/components/ui/button';
import {useQueryState} from 'nuqs';

export const ModalButton = React.forwardRef<HTMLButtonElement, ButtonProps & {
    modalId: string
}>(
    ({modalId, ...props}, ref) => {
        const [_, setModal] = useQueryState('modal')

        return (
            <Button
                ref={ref}
                {...props}
                onClick={() => setModal(modalId)}
            />
        )
    }
)
ModalButton.displayName = "ModalButton"
