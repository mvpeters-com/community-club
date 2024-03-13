"use client";
import {Plus} from "lucide-react";
import {useRouter} from "next/navigation";
import {columns} from "./columns";
import {Button} from '~/components/ui/button';
import {Separator} from '~/components/ui/separator';
import {Heading} from "~/components/ui/heading";
import {DataTable} from "~/components/ui/data-table";
import {type User} from "~/components/types";

interface ProductsClientProps {
    data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = ({data}) => {
    const router = useRouter();

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