import '../styles/popup.css'

const Popup = props => {
    return (props.trigger) ? (
        <div className="popup-box">
            <div className="box">
                <button className="btn-close" onClick={props.handleClose}>X</button>
                {props.content}
            </div>
        </div>
    ) : null;
}

export default Popup;