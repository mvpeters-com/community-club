import {api} from '~/trpc/server';
import {RoomDetail} from '~/components/events/room-detail';

const EventRoomDetail = async ({params}: {
    params: {
        eventSlug: string;
        spaceSlug: string;
    }
}) => {
    const token = await api.event.getRoomToken.query({
        room: params.eventSlug
    });

    console.log(token);

    return (
        <div>
            {params.spaceSlug} - {params.eventSlug}

            <RoomDetail token={token}/>
        </div>
    );
}

export default EventRoomDetail;