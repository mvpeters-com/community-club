import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '~/components/ui/form';
import {Input} from '~/components/ui/input';
import React, {HTMLInputTypeAttribute} from 'react';
import {Control, ControllerProps, FieldPath, FieldValues} from 'react-hook-form';

export const FormInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
      name,
      label,
      placeholder,
      control,
      type = 'text',
  }: {
    label: string,
    placeholder?: string,
    name: TName,
    control: Control<TFieldValues>,
    type?: HTMLInputTypeAttribute,
}) => {
    return <FormField
        control={control}
        name={name}
        render={({field}) => (
            <FormItem className="grid w-full items-center gap-1.5">
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <FormControl>
                    <Input type={type} placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
    />
}