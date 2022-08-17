import React from 'react'

export const DynamicField = ({idx, dynamicKey, dynamicKeysFormHandler, dynamicValue, dynamicValuesFormHandler }) => {

    return (
        <div className="dynamic_field">
            <input className="dynamic_field__item"
                   placeholder="Enter field name"
                   id={`itemKey${idx}`}
                   type="text"
                   name={`itemKey${idx}`}
                   value={dynamicKey}
                   onChange={dynamicKeysFormHandler}
            />
            <input className="dynamic_field__item"
                   placeholder="Enter field value"
                   id={`itemValue${idx}`}
                   type="text"
                   name={`itemValue${idx}`}
                   value={dynamicValue}
                   onChange={dynamicValuesFormHandler}
            />
        </div>
    );
}
