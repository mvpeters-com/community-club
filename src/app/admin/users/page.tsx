import {UsersIndex} from "~/components/admin/pages/users-index";
import {unstable_noStore as noStore} from "next/cache";
import {api} from '~/trpc/server';

const AdminIndex = async () => {
    noStore();

    const users = await api.user.getAll.query();

    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <UsersIndex data={users}/>
    </div>
}

export default AdminIndex;