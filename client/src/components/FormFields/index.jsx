import React from 'react';
import {TextareaAutosize, TextField} from "@material-ui/core";
import styled from "@emotion/styled";

// styled components
const StyledTextareaAutosize = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px;
`;
const DynamicTextField = styled(TextField)`
  width: 50%;
`;

export const FormFields = ({form, formHandler, fileSelectorHandler}) => {

    return (
        <div className='form_fields'>
            <TextField variant='outlined'
                       margin='normal'
                       fullWidth
                       label='Посилання на зображення'
                       id='image'
                       name='image'
                       value={form.image}
                       onChange={formHandler}
            />
            <label htmlFor='img_input' className='form_fields__img-label'>
                Оберіть зображення
            </label>
            <input id='img_input'
                   type='file'
                   name='img_input'
                   onChange={(e) => fileSelectorHandler(e.target.files)}
            />
            <TextField variant='outlined'
                       margin='normal'
                       fullWidth
                       label='Найменування товару'
                       id='name'
                       name='name'
                       value={form.name}
                       onChange={formHandler}
            />
            <div className="dynamic_field">
                <DynamicTextField variant='outlined'
                                  margin='normal'
                                  label='Ціна'
                                  id='price'
                                  name='price'
                                  value={form.price}
                                  onChange={formHandler}
                />
                <DynamicTextField variant='outlined'
                                  margin='normal'
                                  label='Одиниці виміру'
                                  id='points'
                                  name='points'
                                  value={form.points}
                                  onChange={formHandler}
                />
            </div>
            <TextField variant='outlined'
                       margin='normal'
                       fullWidth
                       label='Якір'
                       id='anchorr'
                       name='anchorr'
                       value={form.anchorr}
                       onChange={formHandler}
            />
            <TextField variant='outlined'
                       margin='normal'
                       fullWidth
                       label='Артикул'
                       id='article'
                       name='article'
                       value={form.article}
                       onChange={formHandler}
            />
            <StyledTextareaAutosize
                id='description'
                name='description'
                minRows={4}
                placeholder="Опис товару"
            />
        </div>
    );
}
