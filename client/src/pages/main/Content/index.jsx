import React, {useState} from 'react'
import Header from "../../../components/Header";
import ItemsList from "../ItemsList";

const Content = ({ items }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchText = (value) => {
        if (value.trim().length === 0) {
            return items;
        }

        const searchText = value.toUpperCase();
        const filteredByName = items.filter(s => s.name.toUpperCase().includes(searchText));
        const filteredByDescription = items.filter(s => {
            if (s.description) {
                return s.description.toUpperCase().includes(searchText);
            }
        });
        return filteredByName.concat(filteredByDescription);
    };

    const renderItems = handleSearchText(searchValue);
    return (
        <div>
            <Header onSetSearchText={setSearchValue}/>
            <div className={'content'}>
                <ItemsList items={renderItems}/>
            </div>
        </div>
    );
}

export default Content;
