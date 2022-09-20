import React, {useEffect} from 'react'
import {NavLink, useLocation} from "react-router-dom";
import PermPhoneMsgIcon from "@material-ui/icons/PermPhoneMsg";
import {IconButton, makeStyles} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import {useFiltersData} from "../../context/FiltersContext";

const useStyles = makeStyles((theme) => ({
        phoneIconButton: {
            minWidth: 25,
            maxHeight: 50,
            backgroundColor: 'rgba(0,0,0,0.4)',
        },
        phoneIcon: {
            fontSize: 25,
            color: '#c7ec7c',
        },
        iconCloseButton: {
            position: 'absolute',
            right: -10,
            top: -2,
            minWidth: 40,
        },
        closeIcon: {
            fontSize: 40,
            color: 'red',
        }
    })
);

const Header = () => {
    const {searchValue, onSetSearchValue} = useFiltersData();
    const {phoneIcon, phoneIconButton, iconCloseButton, closeIcon} = useStyles();
    const location = useLocation();

    // Handlers
    const handleClearSearchInput = () => {
        onSetSearchValue('');
    }

    useEffect(() => {
        return () => {
            handleClearSearchInput();
        }
    }, []);

    useEffect(() => {
        const hash = location.hash
        setTimeout(() => {
            if (hash && document.getElementById(hash.substr(1))) {
                document.getElementById(hash.substr(1)).scrollIntoView({behavior: "auto"})
            }
        }, 300)
    }, [location.hash]);

    return (
        <div className='header'>
            <div className={"header__top"}>
                <div className={"header__phone"}>
                    <a href={'tel:+380638924039'}>
                        <div className={"header__phone_icon"}>
                            <IconButton className={phoneIconButton}>
                                <PermPhoneMsgIcon className={phoneIcon}/>
                            </IconButton>
                        </div>
                        <div className="header__phone_number">+38 063 892 40 39</div>
                    </a>
                </div>
                <div className={"header__search"}>
                    <input
                        placeholder={'Пошук товарів'}
                        type={'text'}
                        value={searchValue}
                        onChange={(e) => onSetSearchValue(e.currentTarget.value)}
                    />
                    {
                        searchValue && (
                            <IconButton className={iconCloseButton} onClick={handleClearSearchInput}>
                                <Cancel className={closeIcon}/>
                            </IconButton>
                        )
                    }
                </div>
            </div>
            <header className="header__bottom">
                <div className={"header__title"}>
                    Завітайте до нас за адресою:
                    <a href="https://maps.app.goo.gl/m7H8jk5311XCQxrT9" target="_blank"> вул. Героїв Дніпра, 51, Київ,
                        02000 (дивитись на карті) </a>
                    або ми доставимо Вам товари по Києву чи у будь-яку іншу точку України
                    <div className="header__delivery">
                        <NavLink to="/delivery">
                            Ознайомитись з умовами оплати та доставки
                        </NavLink>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
