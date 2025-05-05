export default function Button(props) {
    const {outline, className, children, ...rest} = props;
    const classname = `btn ${outline ? "btn-outline" : "btn-default"} ${className ?? ""}`

    return <button className={classname} {...rest}>{children}</button>
}