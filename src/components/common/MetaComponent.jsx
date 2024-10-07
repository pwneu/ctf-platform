import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from 'prop-types';

export default function MetaComponent({ meta }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
      </Helmet>
    </HelmetProvider>
  );
}

// Define prop types
MetaComponent.propTypes = {
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
