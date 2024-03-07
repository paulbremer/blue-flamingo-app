const getAccessToken = async () => {
    const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

    if (!refresh_token) return;

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refresh_token);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_SPOTIFY_CODE}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
    });

    return response.json();
};

export const getUserInfo = async () => {
    const { access_token } = await getAccessToken();

    const result = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return result.json();
};

export const getTrackById = async ({ id }: { id: string }) => {
    const { access_token } = await getAccessToken();

    const result = await fetch(
        `https://api.spotify.com/v1/tracks/${id}?market=NL`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    return result.json();
};
export const getTopTracks = async ({ limit = 10, offset = 0 }: any) => {
    const { access_token } = await getAccessToken();

    const result = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}&offset=${offset}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    return result.json();
};
