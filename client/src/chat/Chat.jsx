import "./chat.css";
import { Link } from "react-router-dom";

const Chat = () => {
    return (
        <div className="chat">
            <Link to="/chat">
                <i className="bi bi-chat"></i>
                <span className="tooltip-text">Chat</span>
            </Link>
        </div>
    );
};

export default Chat;
