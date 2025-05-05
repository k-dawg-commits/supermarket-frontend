export default function Input(props) {
    const {placeholder, type = "text", className, required, ...rest} = props
    const classname = className ?? ""
    return (
        <label className="label">
            {placeholder}
            {required && <span className="input-required">*</span>}
            <div>
                <input required={required} className={`input ${classname}`} type={type} placeholder={placeholder} {...rest} />
            </div>
        </label>
    )
}