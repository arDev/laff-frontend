import { UseFormRegister, FieldErrors, FieldValues, FieldPath } from 'react-hook-form';
import { IPersona } from '../../interfaces/IPersona';
import { ErrorMessage } from '@hookform/error-message';
import Requerido from '../MsgCampos/Requerido';

interface FormInputProps<T extends FieldValues> {
    label: string;
    name: FieldPath<T>;
    type: string;
    register: UseFormRegister<IPersona>;
    errors: FieldErrors<IPersona>;
    required?: boolean;
    placeholder?: string;
}

const FormInput = ({
    label,
    name,
    type,
    register,
    errors,
    required = false,
    placeholder = '',
}: FormInputProps<IPersona>) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name, { required })}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <Requerido msg={message || 'Este campo es obligatorio'} />}
            />
        </div>
    );
};

export default FormInput;
