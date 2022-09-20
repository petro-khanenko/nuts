import React from "react";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

const Delivery = () => {

    return (
        <div className="delivery">
            <div className="basket__go-back-button">
                <NavLink to={'/'}>
                    <Button startIcon={<ArrowBackIos/>}
                            variant='contained'
                            size='large'
                            color='secondary'
                    >
                        До списку товарів
                    </Button>
                </NavLink>
            </div>
            <h2 className="delivery__title">Умови оплати та доставки</h2>
            <div className="delivery__content">
                <div className="delivery__section-title">Оплата:</div>
                <ul>
                    <li>Оплата готівкою при самовивозі.</li>
                    <li>Оплата на картку ПриватБанку чи monobank.</li>
                    <li>Накладений платіж при доставці Новою Поштою (20 грн + %).</li>
                </ul>
                <div className="delivery__section-title">Способи доставки:</div>
                <ul>
                    <li>Самовивіз за адресою <a href="https://maps.app.goo.gl/m7H8jk5311XCQxrT9" target="_blank"> вул. Героїв Дніпра, 51, Київ,
                        02000 (дивитись на карті) </a>.</li>
                    <li>Доставка службою доставки Нова Пошта до відділення чи адресна доставка згідно тарифів перевізника
                        <br/><a href="https://novaposhta.ua/delivery" target="_blank">(ознайомитись із тарифами можна за посиланням)</a>.</li>
                </ul>
            </div>
        </div>)
}

export default Delivery;
