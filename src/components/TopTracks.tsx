"use client";

import { useEffect, useState } from "react";
import { getTopTracks } from "@/lib/spotify";
import SingleTrack from "@/components/SingleTrack";
import Pagination from "@/components/Pagination";
import { useSpotifyStore } from "@/stores/spotifyStore";

export default function TopTracks() {
    const currentOffset = useSpotifyStore((state: any) => state.currentOffset);
    const setTopTracks = useSpotifyStore((state: any) => state.setTopTracks);
    const currentLimit = useSpotifyStore((state: any) => state.currentLimit);
    const topTracks = useSpotifyStore((state: any) => state.topTracks);
    const [totalTracks, setTotalTracks] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getTopTracks({ limit: currentLimit, offset: currentOffset });
            setTopTracks(result.items);
            setTotalTracks(result.total);
        };
        fetchData();
    }, [setTopTracks, currentLimit, currentOffset]);

    return (
        <section>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">🔥 Top Tracks</h2>

            <ul role="list" className="divide-y divide-gray-100">
                {topTracks.map((track: {}, index: number) => (
                    <SingleTrack key={index} track={track} />
                ))}
            </ul>

            <Pagination total={totalTracks} />
        </section>
    );
}
