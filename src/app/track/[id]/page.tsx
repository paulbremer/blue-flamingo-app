import Link from "next/link";
import TrackDetail from "@/components/TrackDetail";

export default function Track({ params }: { params: { id: string } }) {
    return (
        <div>
            <Link href="/">Go back</Link>
            <TrackDetail id={params.id} />
        </div>
    );
}
