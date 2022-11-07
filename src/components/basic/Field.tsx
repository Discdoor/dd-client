import * as React from 'react';

/**
 * Field options.
 */
class FieldOptions {
    /**
     * The field identifier.
     */
    ident: string;

    /**
     * The name of the field.
     */
    name: string;

    /**
     * The field option type.
     */
    type: string;
}

/**
 * Creates a form field.
 * @param name The name of the field to create.
 * @returns 
 */
const FormField = (opts: FieldOptions) => {
    return <div className='field'>
        <div className="name">{opts.name}</div>
        <input name={opts.ident} type={opts.type}></input>
    </div>
}

export default FormField