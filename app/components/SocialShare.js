'use client';

import { useEffect, useState } from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    XIcon,
} from 'react-share';

const SocialShare = () => {
    const [shareUrl, setShareUrl] = useState('');

      useEffect(() => {
          if (process) {
              setShareUrl(window.location.href);
          }
      }, []);


    return (
        <div className="flex items-center gap-4">
            <h3 className="text-xl font-medium text-gray-900">
                Share:
            </h3>
            <div className="flex items-center gap-2">
                <FacebookShareButton
                    url={shareUrl}
                >
                    <FacebookIcon
                        size={24}
                        round
                    />
                </FacebookShareButton>
                <TwitterShareButton
                    url={shareUrl}
                >
                    <XIcon
                        size={24}
                        round
                    />
                </TwitterShareButton>
                <LinkedinShareButton
                    url={shareUrl}
                >
                    <LinkedinIcon
                        size={24}
                        round
                    />
                </LinkedinShareButton>
                <TelegramShareButton
                    url={shareUrl}
                >
                    <TelegramIcon
                        size={24}
                        round
                    />
                </TelegramShareButton>
                <WhatsappShareButton
                    url={shareUrl}
                >
                    <WhatsappIcon
                        size={24}
                        round
                    />
                </WhatsappShareButton>
            </div>
        </div>
    );
};

export default SocialShare;
