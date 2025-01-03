import "./MsgCampos.css"

type error = {
    msg: string
    
}

const Requerido = ({ msg }: error) => {

    return (
        <p className="colorText">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{msg}
        </p>
    )
}

export default Requerido;