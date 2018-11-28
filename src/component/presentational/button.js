import React from 'react';
import PropTypes from 'prop-types';

const Button= ({label, onClick}) => 
    <button
        type="button"
        className="btn btn-primary btn-xs"
        onClick={onClick}>
        {label}
    </button>

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

Button.defaultProps = {
    onClick: () => null // no operation
}
export default Button;
