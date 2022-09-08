import React from 'react'

export const FormFields = ({form, formHandler, fileSelectorHandler}) => {

    return (
        <div className="form_fields">
            <input placeholder="Enter a link for the image"
                   id="image"
                   type="text"
                   name={"image"}
                   value={form.image}
                   onChange={formHandler}
            />
            <label htmlFor="img_input">
                Chose item image
            </label>
            <input id="img_input"
                   type="file"
                   name={"img_input"}
                   onChange={(e) => fileSelectorHandler(e.target.files)}
            />
            <input placeholder="Enter a name"
                   id="name"
                   type="text"
                   name={"name"}
                   value={form.name}
                   onChange={formHandler}
            />
            <div className="dynamic_field">
                <input className="dynamic_field__item"
                       placeholder="Enter a price"
                       id="price"
                       type="text"
                       name={"price"}
                       value={form.price}
                       onChange={formHandler}
                />
                <input className="dynamic_field__item"
                       placeholder="Enter points of item"
                       id="points"
                       type="text"
                       name={"points"}
                       value={form.points}
                       onChange={formHandler}
                />
            </div>
            <input placeholder="Enter an anchor"
                   id="anchorr"
                   type="text"
                   name={"anchorr"}
                   value={form.anchorr}
                   onChange={formHandler}
            />
            <input placeholder="Enter an article"
                   id="article"
                   type="text"
                   name={"article"}
                   value={form.article}
                   onChange={formHandler}
            />
            <textarea placeholder="Enter a description"
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={formHandler}
            />
        </div>
    );
}
