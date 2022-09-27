import React, {useEffect, useState} from 'react';
import NovaPoshta from 'novaposhta';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from "@emotion/styled";
import {setInfoModal} from "../../../utils/swal/helpers";

const StyledAutocomplete = styled(Autocomplete)`
  margin-bottom: 15px;
  & .MuiIconButton-root {
    padding: 0;
  }
`;

const NP = ({cityValue, warehouseValue, onSetCityValue, onSetWarehouseValue}) => {
    const [citiesData, setCitiesData] = useState([]);
    const [warehousesData, setWarehousesData] = useState([]);
    const [inputCityValue, setInputCityValue] = useState('');
    const [inputWarehouseValue, setInputWarehouseValue] = useState('');

    const api = new NovaPoshta();

    const getCities = async (value) => {
        try {
            const {data} = await api.address.getCities({FindByString: value});
            setCitiesData(data);
        } catch (errors) {
            if (Array.isArray(errors)) {
                errors.forEach((error) => {
                    setInfoModal(error.message, 'warning');
                });
            }
        }
    }

    const getWarehouses = async (cityRef, value) => {
        try {
            const {data} = await api.address.getWarehouses({CityRef: cityRef, FindByString: value});
            setWarehousesData(data);
        } catch (errors) {
            if (Array.isArray(errors)) {
                errors.forEach((error) => {
                    setInfoModal(error.message, 'warning');
                });
            }
        }
    }

    useEffect(() => {
        if (inputCityValue) {
            const cityData = inputCityValue.split(',').join('').split(' ');
            getCities(cityData[0]);
        }
    }, [inputCityValue]);

    useEffect(() => {
        if (cityValue) {
            const cityData = inputCityValue.split(',').join('').split(' ');
            if (!citiesData.length) {
                getCities(cityData[0]);
            }
            const chosenCity = citiesData.find(el => el.Description === cityData[0] && el.AreaDescription === cityData[1]);
            const cityRef = chosenCity?.Ref;
            getWarehouses(cityRef, inputWarehouseValue);
        } else {
            onSetWarehouseValue('');
        }
    }, [citiesData, cityValue, inputWarehouseValue]);

    const cities = citiesData.map(el => `${el.Description}, ${el.AreaDescription} обл.`);
    const warehouses = warehousesData.map(el => `${el.Description}`);

    return (
        <div>
            <h3>Оберіть відділеня чи поштомат</h3>
            <StyledAutocomplete
                value={cityValue}
                onChange={(event, newValue) => {
                    onSetCityValue(newValue);
                }}
                inputValue={inputCityValue}
                onInputChange={(event, newInputValue) => {
                    setInputCityValue(newInputValue);
                }}
                id="city"
                options={cities}
                renderInput={(params) => <TextField {...params} label="Населений пункт"/>}
            />
            {
                cityValue && (
                    <StyledAutocomplete
                        value={warehouseValue}
                        onChange={(event, newValue) => {
                            onSetWarehouseValue(newValue);
                        }}
                        inputValue={inputWarehouseValue}
                        onInputChange={(event, newInputValue) => {
                            setInputWarehouseValue(newInputValue);
                        }}
                        id="warehouse"
                        options={warehouses}
                        renderInput={(params) => <TextField {...params} label="Відділення чи поштомат"/>}
                    />
                )
            }
        </div>
    )
}

export default NP;