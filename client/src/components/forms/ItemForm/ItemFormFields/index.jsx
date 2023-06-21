import React from 'react';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

// styled components
const StyledTextareaAutosize = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  padding: 10px;
`;
const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    margin: 5px 0;
  }
`;
const HalfTextField = styled(TextField)`
  &.MuiFormControl-root {
    width: 50%;
    margin: 5px 0;
  }
`;

export const FormFields = ({form, formHandler, fileSelectorHandler}) => {

    return (
        <div className='form-fields'>
            <StyledTextField variant='outlined'
                             fullWidth
                             label='Посилання на зображення'
                             id='image'
                             name='image'
                             value={form.image}
                             onChange={formHandler}
            />
            <label htmlFor='img_input' className='form-fields__img-label'>
                Оберіть зображення
            </label>
            <input id='img_input'
                   type='file'
                   name='img_input'
                   onChange={(e) => fileSelectorHandler(e.target.files)}
            />
            <StyledTextField variant='outlined'
                             fullWidth
                             label='Найменування товару'
                             id='name'
                             name='name'
                             value={form.name}
                             onChange={formHandler}
            />
            <div className="dynamic-field">
                <HalfTextField variant='outlined'
                                  label='Ціна'
                                  id='price'
                                  name='price'
                                  value={form.price}
                                  onChange={formHandler}
                />
                <HalfTextField variant='outlined'
                                  label='Одиниці виміру'
                                  id='points'
                                  name='points'
                                  value={form.points}
                                  onChange={formHandler}
                />
            </div>
            <StyledTextField variant='outlined'
                             fullWidth
                             label='Якір'
                             id='anchorr'
                             name='anchorr'
                             value={form.anchorr}
                             onChange={formHandler}
            />
            <StyledTextField variant='outlined'
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
                value={form.description}
                onChange={formHandler}
            />
        </div>
    );
}
