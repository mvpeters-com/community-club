import {unstable_noStore as noStore} from "next/cache";
import Link from "next/link";
import {api} from '~/trpc/server';

const EventsIndex = async ({params}: {
    params: {
        spaceSlug: string;
    }
}) => {
    noStore();

    const space = await api.event.getEventSpace.query({
        slug: params.spaceSlug
    });

    if (!space) {
        return <></>
    }

    return (
        <div>
            <h1>{space.name}</h1>

            <div>
                {space.events.map((event) => (
                    <div className={'flex gap-2'} key={event.id}>
                        <h2>{event.name}</h2>

                        {event?.isOnline && (
                            <Link href={`/events/${space.slug}/room/${event.slug}`}>
                               join
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsIndex;