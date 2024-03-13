import {UserClient} from "~/components/admin/tables/users/client";
import {unstable_noStore as noStore} from 'next/dist/server/web/spec-extension/unstable-no-store';
import {api} from '~/trpc/server';

const breadcrumbItems = [{title: "Users", link: "/admin/user"}];

const AdminIndex = async () => {
    noStore();
    const users = await api.user.getAll.query();

    return <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <UserClient data={users}/>
    </div>
}

export default AdminIndex;