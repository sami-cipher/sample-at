import React from 'react';
import PropTypes from 'prop-types';

const Select= ({data, labelAs, valueAs, defaultLabel, value, onChange}) => {
    return (<select onChange={onChange} value={value}>
        <option value={null}>
            {defaultLabel}
        </option>
        {data.map((item, i) =>
            <option key={i} value={item[valueAs]}>
                {item[labelAs]}
            </option>)}
    </select>)
}
Select.propTypes = {
    data: PropTypes.any.isRequired,
    labelAs: PropTypes.string.isRequired,
    valueAs: PropTypes.string.isRequired,
    defaultLabel: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func
}

Select.defaultProps = {
    onChange: () => null // no operation
}
export default Select;
