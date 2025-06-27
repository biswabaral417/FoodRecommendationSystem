import React from 'react'

interface inpTextClassProps {
    div?: string,
    label?: string,
    input?: string


}

interface inpTextProps {
    id: string
    placeholder?: string
    children?: string,
    styles?: inpTextClassProps
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const InputText: React.FC<inpTextProps> = ({ id, children, placeholder, styles, onChange, value, onBlur, onFocus }) => {
    return (
        <div className={styles?.div}>
            <label htmlFor={id} className={styles?.label}>{children}</label>
            <input type="text" className={styles?.input} id={id} placeholder={placeholder} onChange={onChange} value={value} onBlur={onBlur} onFocus={onFocus} />
        </div>
    )
}

export default InputText