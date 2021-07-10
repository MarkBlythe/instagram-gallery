import React, { useEffect, useState } from "react";
import "./styles.scss";

interface GalleryProps {
    accessToken: string;
    count: number;
}

export const InstagramGallery = (props: GalleryProps) => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);
    const [instagramData, setInstagramData] = useState<any>(null);

    useEffect(() => {
        const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=${props.accessToken}`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log({ data });
                if (data.hasOwnProperty("error")) {
                    setLoading(false);
                    setError(true);
                } else {
                    setInstagramData(data.data);
                    console.log(instagramData);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="instagram-gallery">LOADING...</div>;
    }

    if (error) {
        return (
            <div className="instagram-gallery">
                Ruh Roh!. Something went wrong.
            </div>
        );
    }

    return (
        <div className="instagram-gallery">
            {instagramData
                .slice(0, props.count)
                .map((feed: any, index: any) => (
                    <div key={index} className="instagram-item">
                        <a
                            key={index}
                            href={feed.permalink}
                            className="ig-instagram-link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {feed.media_type === "IMAGE" ||
                            feed.media_type === "CAROUSEL_ALBUM" ? (
                                <img
                                    className="instagram-image"
                                    key={index}
                                    src={feed.media_url}
                                    alt="description"
                                />
                            ) : (
                                <video className="instagram-image" key={index}>
                                    <source
                                        src={feed.media_url}
                                        type="video/mp4"
                                    />
                                </video>
                            )}
                        </a>
                    </div>
                ))}
        </div>
    );
};
