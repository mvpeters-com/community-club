import {unstable_noStore as noStore} from "next/cache";
import {api} from '~/trpc/server';
import {SpacesIndex} from '~/components/admin/pages/spaces-index';

const AdminSpacesIndex = async () => {
    noStore();

    const spaces = await api.space.getAll.query();

    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <SpacesIndex data={spaces}/>
    </div>
}

export default AdminSpacesIndex;