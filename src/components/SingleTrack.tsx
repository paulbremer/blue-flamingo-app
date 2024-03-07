import Link from "next/link";
import Image from "next/image";

const SingleTrack = ({ track }: any) => {
    const { artists, album, duration_ms, id, name } = track;

    return (
        <li>
            <Link href={`/track/${id}`}>
                <div className="flex justify-between gap-x-6 py-3">
                    <div className="flex min-w-0 gap-x-4">
                        <Image
                            src={album.images[1].url}
                            width={300}
                            height={300}
                            alt={`Albumcover ${album.name}`}
                            className="h-12 w-12 flex-none rounded-md bg-gray-50"
                            priority
                        />

                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{artists[0].name}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{new Date(duration_ms).toISOString().slice(14, -5)}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            {album.name}
                        </p>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default SingleTrack;
