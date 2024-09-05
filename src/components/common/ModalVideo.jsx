
import React from "react";
import ModalVideo from "react-modal-video";
export default function ModalVideoComponent({ isOpen, setIsOpen, videoId }) {
  return (
    <ModalVideo
      channel="youtube"
      youtube={{ mute: 0, autoplay: 0 }}
      isOpen={isOpen}
      videoId={videoId}
      onClose={() => setIsOpen(false)}
    />
  );
}
