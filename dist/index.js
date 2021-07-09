

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

___$insertStyle(".instagram-gallery {\n  display: -webkit-box;\n  display: flex;\n  flex-wrap: wrap;\n}\n.instagram-gallery .instagram-item {\n  -webkit-box-flex: 0;\n  flex: 0 0 calc(100%/6 - 10px);\n  margin: 5px;\n  display: block;\n  position: relative;\n}\n.instagram-gallery .instagram-item .instagram-image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: 0.25s;\n  transition: 0.25s;\n  -o-object-fit: cover;\n  object-fit: cover;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n@media (max-width: 480px) {\n  .instagram-gallery .instagram-item {\n    flex: 0 0 calc(100%/2 - 10px);\n    margin: 5px;\n  }\n}\n@media (min-width: 481px) and (max-width: 767px) {\n  .instagram-gallery .instagram-item {\n    flex: 0 0 calc(100%/3 - 10px);\n    margin: 5px;\n  }\n}");

var InstagramGallery = function (props) {
    var _a = React.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = React.useState(false), error = _b[0], setError = _b[1];
    var _c = React.useState(null), instagramData = _c[0], setInstagramData = _c[1];
    React.useEffect(function () {
        var url = "https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=" + props.accessToken;
        fetch(url)
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            console.log({ data: data });
            if (data.hasOwnProperty('error')) {
                setLoading(false);
                setError(true);
            }
            else {
                setInstagramData(data.data);
                console.log(instagramData);
                setLoading(false);
            }
        })
            .catch(function (error) {
            console.error('Error:', error);
            setError(true);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return React__default['default'].createElement("div", { className: "instagram-gallery" }, "LOADING...");
    }
    if (error) {
        return React__default['default'].createElement("div", { className: "instagram-gallery" }, "Ruh Roh!. Something went wrong.");
    }
    return (React__default['default'].createElement("div", { className: "instagram-gallery" }, instagramData.slice(0, props.count).map(function (feed, index) { return (React__default['default'].createElement("div", { key: index, className: "instagram-item" },
        React__default['default'].createElement("a", { key: index, href: feed.permalink, className: "ig-instagram-link", target: "_blank", rel: "noreferrer" }, (feed.media_type === 'IMAGE' || feed.media_type === 'CAROUSEL_ALBUM') ?
            React__default['default'].createElement("img", { className: "instagram-image", key: index, src: feed.media_url, alt: "description" }) :
            // <video className="instagram-image" key={index} src={feed.media_url} type="video/mp4"></video>
            React__default['default'].createElement("img", { className: "instagram-image", key: index, src: feed.media_url, alt: "description" })))); })));
};

exports.InstagramGallery = InstagramGallery;
//# sourceMappingURL=index.js.map
