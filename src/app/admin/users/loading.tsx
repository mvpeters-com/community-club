import {UsersIndex} from '~/components/admin/pages/users-index';

const Loading = () => {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <UsersIndex data={[]} isLoading={true}/>
    </div>
}

export default Loading;
