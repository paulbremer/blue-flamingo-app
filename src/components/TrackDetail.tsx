"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getTrackById } from "@/lib/spotify";

type TrackProps = {
    name: string;
    artists: any[];
    album: {
        name: string;
        images: any[];
    };
    duration_ms: string;
    preview_url: string;
};

export default function TrackDetail({ id }: { id: string }) {
    const [trackInfo, setTrackInfo] = useState<TrackProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTrackById({ id });
            setTrackInfo(result);
        };
        fetchData();
    }, [id]);

    if (!trackInfo) return;

    const { artists, album, name, duration_ms, preview_url } = trackInfo;

    const features = [
        { name: "Artists", description: artists[0].name },
        { name: "Title", description: name },
        { name: "Album", description: album.name },
        { name: "Duration", description: new Date(duration_ms).toISOString().slice(14, -5) },
    ];

    if (artists.length > 1) {
        const description = artists.map((artist, index) =>
            index > 0 ? (index + 1 === artists.length ? `${artist.name}.` : `${artist.name}, `) : null
        );
        features.push({
            name: "Additional Artists",
            description: description,
        });
    }

    return (
        <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Track Details</h2>
                    <p className="mt-4 text-gray-500">
                        A track from {artists[0].name} called {name} from the album {album.name}.
                    </p>

                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {features.map((feature) => (
                            <div key={feature.name} className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
                    <Image
                        src={album.images[1].url}
                        alt={`Albumcover ${album.name}`}
                        width={300}
                        height={300}
                        className="rounded-lg bg-gray-100"
                        priority
                    />
                    <figure className="rounded-lg bg-gray-100">
                        <audio controls src={preview_url}></audio>
                    </figure>
                </div>
            </div>
        </div>
    );
}
