import React from 'react';
import {Skeleton} from '~/components/ui/skeleton';

interface HeadingProps {
    title: string;
    description: string;
    isLoading?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({title, description, isLoading}) => {
    return isLoading ? <div className={'flex flex-col gap-2'}>
        <Skeleton className="h-8 w-[250px]"/>
        <Skeleton className="h-4 w-[250px]"/>
    </div> : <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
}