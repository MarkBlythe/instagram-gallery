import React, { useEffect, useState } from "react";

interface GalleryProps {
    accessToken: string;
    count: number;
    pagination?: boolean;
}

export const InstagramGallery = (props: GalleryProps) => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);
    const [instagramData, setInstagramData] = useState<any>(null);
    const [usePagination, setUsePagination] = useState<boolean>(false);
    const [paginationNextUrl, setPaginationNextUrl] = useState<string>("");
    const [paginationPrevUrl, setPaginationPrevUrl] = useState<string>("");

    const fetchInstagramData = (url: string) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.hasOwnProperty("error")) {
                    setLoading(false);
                    setError(true);
                } else {
                    setInstagramData(data);
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
        const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&limit=${props.count}&access_token=${props.accessToken}`;
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
            {instagramData.data
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
                                    alt="description"
                                />
                            ) : (
                                <video className="instagram-image" key={index}>
                                    <source
                                        src={item.media_url}
                                        type="video/mp4"
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
