import React, {useEffect, useState} from 'react';
import NovaPoshta from 'novaposhta';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const NP = () => {
    const [citiesData, setCitiesData] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const api = new NovaPoshta();

    useEffect(() => {
        api.address.getCities({FindByString: inputValue}).then(({data}) => {
                if (!citiesData.length) {
                    setCitiesData(data);
                }
            })
            .catch((errors) => {
                if (Array.isArray(errors)) {
                    errors.forEach((error) => console.log(`[${ error.code || '-' }] ${ error.en || error.uk || error.ru || error.message }`));
                }
            });
    }, [inputValue]);

    const cities = citiesData.map(el => `${el.Description}, ${el.AreaDescription} обл.`)

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={cities}
                renderInput={(params) => <TextField {...params} label="Населений пункт" />}
            />
        </div>
    )
}

export default NP;