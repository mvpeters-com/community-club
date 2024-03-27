import {SpacesIndex} from '~/components/admin/pages/spaces-index';

const Loading = () => {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <SpacesIndex data={[]} isLoading={true}/>
    </div>
}

export default Loading;
