import React, { useEffect, useState } from "react";

interface GalleryProps {
    accessToken: string;
    count: number;
    pagination?: boolean;
}

export const InstagramGallery = (props: GalleryProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [instagramData, setInstagramData] = useState<any>(null);
    const [instagramGalleryData, setInstagramGalleryData] = useState<any[]>([]);
    const [usePagination, setUsePagination] = useState<boolean>(false);
    const [paginationNextUrl, setPaginationNextUrl] = useState<string>("");
    const [paginationPrevUrl, setPaginationPrevUrl] = useState<string>("");

    const fetchInstagramData = (url: string) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setLoading(false);
                    setErrorMessage(data.error.message);
                    setError(true);
                } else {
                    setInstagramData(data);
                    setInstagramGalleryData(data.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(true);
                setLoading(false);
            });
    };

    useEffect(() => {
        const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&limit=${props.count}&access_token=${props.accessToken}`;
        fetchInstagramData(url);
    }, []);

    useEffect(() => {
        if (props.pagination) {
            setUsePagination(props.pagination);
        }
    }, [props]);

    useEffect(() => {
        if (instagramData !== null) {
            setPaginationNextUrl(instagramData.paging.next);
            setPaginationPrevUrl(instagramData.paging.previous);
        }
    }, [instagramData]);

    const handlePaginationNext = () => {
        fetchInstagramData(paginationNextUrl);
    };

    const handlePaginationPrev = () => {
        fetchInstagramData(paginationPrevUrl);
    };

    if (error && errorMessage) {
        return (
            <div className="instagram-gallery">
                <p>InstagramGallery: Something went wrong.</p>
                <p>{errorMessage}</p>
            </div>
        );
    }

    if (loading) {
        return <div className="instagram-gallery">LOADING...</div>;
    }

    return (
        <div className="instagram-gallery">
            {instagramGalleryData &&
                instagramGalleryData
                    .slice(0, props.count)
                    .map((item: any, index: any) => (
                        <div key={index} className="instagram-item">
                            <a
                                key={index}
                                href={item.permalink}
                                className="instagram-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.media_type === "IMAGE" ||
                                item.media_type === "CAROUSEL_ALBUM" ? (
                                    <img
                                        className="instagram-image"
                                        key={index}
                                        src={item.media_url}
                                        alt={item.caption}
                                    />
                                ) : (
                                    <video
                                        src={item.media_url}
                                        className="instagram-image"
                                        key={index}
                                        autoPlay
                                        muted
                                        playsInline
                                        controls
                                    >
                                        <source
                                            src={item.media_url}
                                            type="video/mp4"
                                        />
                                        <source
                                            src={item.media_url}
                                            type="video/webm"
                                        />
                                    </video>
                                )}
                            </a>
                        </div>
                    ))}
            {usePagination && (
                <div className="pagination">
                    {paginationPrevUrl && (
                        <button
                            className="pagination-btn pagination-prev"
                            type="button"
                            onClick={handlePaginationPrev}
                        >
                            Previous
                        </button>
                    )}
                    {paginationNextUrl && (
                        <button
                            className="pagination-btn pagination-next"
                            type="button"
                            onClick={handlePaginationNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
