import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

interface InputFieldProps {
    name: string;
    label: string;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type = 'text' }) => {
    const [field, meta] = useField(name);

    return (
        <div>
            <TextField
                fullWidth
                label={label}
                type={type}
                {...field}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
            />
        </div>
    );
};

export default InputField;
