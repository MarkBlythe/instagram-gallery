import React, {useEffect, useState} from "react";
export const InstagramGallery = (props: any) => {

    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Boolean>(false);
    const [instagramData, setInstagramData] = useState<any>(null);

    useEffect(() => {
        const url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=${props.accessToken}`;
        fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(data => {
          console.log({data});
          if (data.hasOwnProperty('error')){
            setLoading(false);
            setError(true);
          } else {
              setInstagramData(data.data);
              console.log(instagramData);
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
      return <div className="instagram-gallery">LOADING...</div>
    }

    if (error) {
        return <div className="instagram-gallery">Ruh Roh!. Something went wrong.</div>
    }

    return (
        <div className="instagram-gallery">

        </div>
    );

}