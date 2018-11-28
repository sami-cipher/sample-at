import React from 'react';

const Input = (props) => {
    const { name, label, value, onChange } = props;
    return (
        <div className="form-group">
            <label htmlFor="name">{label}</label>
            <input type="text" className="form-control"
                name={name}
                value={value}
                onChange={onChange}/>
        </div>)
}

export default Input;