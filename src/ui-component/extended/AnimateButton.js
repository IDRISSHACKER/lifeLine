import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const AnimateButton = forwardRef(({ children, type, direction, offset, scale }, ref) => {
    return <div ref={ref}>{children} </div>;
});

export default AnimateButton;
