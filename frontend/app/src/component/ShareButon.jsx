import { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButon = ({ video, tweet, isNested, isMain }) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  return (
    <div>
      <div
        onClick={() => {
          setShowShareOptions(!showShareOptions);
        }}
      >
        {isNested ? (
          "Share"
        ) : (
          <span className={`${isMain ? "text-white" : "text-black"}`}>
            <IoShareSocial className=" text-xl mb-2 " />
          </span>
        )}
      </div>
      {showShareOptions && (
        <div className="flex gap-2 mt-2 sm:flex-row flex-col">
          <FacebookShareButton
            url={
              video
                ? ` ${import.meta.env.VITE_FRONTEND_URL}/video-rec-page/${video._id}/user/${video.owner._id}`
                : ` ${import.meta.env.VITE_FRONTEND_URL}/main-tweet/${tweet._id}`
            }
            quote={video ? video?.title : tweet?.content}
            videoFile={video ? video?.videoFile : tweet?.video?.videoFile || {}}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <WhatsappShareButton
            url={
              video
                ? ` ${import.meta.env.VITE_FRONTEND_URL}/video-rec-page/${video._id}/user/${video.owner._id}`
                : ` ${import.meta.env.VITE_FRONTEND_URL}/main-tweet/${tweet._id}`
            }
            title={video ? video?.title : tweet?.content}
            separator=" -  "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TwitterShareButton
            url={
              video
                ? `  ${import.meta.env.VITE_FRONTEND_URL}/video-rec-page/${video._id}/user/${video.owner._id}`
                : ` ${import.meta.env.VITE_FRONTEND_URL}/main-tweet/${tweet._id}`
            }
            quote={video ? video?.title : tweet?.content}
            videoFile={video ? video?.videoFile : tweet?.video?.videoFile || {}}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButon;
