import ModalVideo from "react-modal-video";
import PropTypes from 'prop-types';

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

// Define prop types
ModalVideoComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  videoId: PropTypes.string.isRequired,
};
