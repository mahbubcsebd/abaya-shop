import { useEffect, useRef } from 'react';

const FacebookChatPlugin = ({
    pageId = '407648569098327',
}) => {
    const MessengerRef = useRef(null);

    useEffect(() => {
        if (MessengerRef.current) {
            MessengerRef.current.setAttribute('page_id', pageId);
            MessengerRef.current.setAttribute('attribution', 'biz_inbox');

             window.fbAsyncInit = function () {
                 FB.init({
                     xfbml: true,
                     version: 'API-VERSION',
                 });
             };

             (function (d, s, id) {
                 var js,
                     fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) return;
                 js = d.createElement(s);
                 js.id = id;
                 js.src =
                     'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                 fjs.parentNode.insertBefore(js, fjs);
             })(document, 'script', 'facebook-jssdk');
        }
    }, [pageId]);

    return (
        <>
            <div id="fb-root"></div>
            <div
                ref={MessengerRef}
                id="fb-customer-chat"
                className="fb-customerchat"
            >
                {/* <Image
                    className="w-full h-full"
                    src={messanger}
                    alt="messanger"
                /> */}
            </div>
        </>
    );
};

export default FacebookChatPlugin;
