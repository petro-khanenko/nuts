import React, {useState} from 'react'
import {DynamicField} from "./DynamicField/DynamicField";

let counter = 0;

export const DynamicFields = ({   dynamicKeysForm,
                                  dynamicValuesForm,
                                  dynamicKeysFormHandler,
                                  dynamicValuesFormHandler,
                                  initFieldsCount = []
                              }) => {

    const [addFieldsCount, setAddFieldsCount] = useState(initFieldsCount)

    return (
        <div>
            {addFieldsCount.map((el, idx) => <DynamicField dynamicKey={dynamicKeysForm[`itemKey${idx}`]}
                                                           dynamicValue={dynamicValuesForm[`itemValue${idx}`]}
                                                           dynamicKeysFormHandler={dynamicKeysFormHandler}
                                                           dynamicValuesFormHandler={dynamicValuesFormHandler}
                                                           idx={idx}
                                                           key={el}
            />)}
            <div className="dynamic_field">
                <button onClick={() => setAddFieldsCount(prev => [...prev, counter += 1])}

                >Add field
                </button>
                <button onClick={() => setAddFieldsCount(prev => prev.slice(0, prev.length - 1))}
                        className="dynamic_field__item"
                >Remove field
                </button>
            </div>
        </div>
    );
}
