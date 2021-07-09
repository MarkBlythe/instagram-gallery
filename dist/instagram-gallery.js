"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramGallery = void 0;
const react_1 = require("react");
const InstagramGallery = (props) => {
    const [loading, setLoading] = react_1.useState(true);
    const [error, setError] = react_1.useState(false);
    const [instagramData, setInstagramData] = react_1.useState(null);
    react_1.useEffect(() => {
        const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=${props.accessToken}`;
        fetch(url)
            .then((response) => {
            return response.json();
        })
            .then(data => {
            console.log({ data });
            if (data.hasOwnProperty('error')) {
                setLoading(false);
                setError(true);
            }
            else {
                setInstagramData(data.data);
                setLoading(false);
            }
        })
            .catch((error) => {
            console.error('Error:', error);
            setError(true);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return "LOADING...";
    }
    if (error) {
        return "Ruh Roh!. Something went wrong.";
    }
    return (react_1.default.createElement("div", { className: "instagram-gallery" }));
};
exports.InstagramGallery = InstagramGallery;
