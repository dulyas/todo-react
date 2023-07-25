import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useState } from "react";
import style from "./message.module.scss";
import "./fly.scss";

interface ErrorMessageProps {
	text: string;
}

const Message: FC<ErrorMessageProps> = ({ text }) => {
	const [message, setMessage] = useState<string>("");
	const [showMessage, setShowMessage] = useState<boolean>(false);

	useEffect(() => {
		setShowMessage(!!text);
	}, [text]);

	useEffect(() => {
		if (text) setMessage(text);
	}, [text]);

	return (
		<CSSTransition
			unmountOnExit
			in={showMessage}
			timeout={200}
			classNames="fly"
		>
			<div
				className={`${style["message"]} ${
					showMessage ? "fly-active" : ""
				}`}
			>
				{message}
			</div>
		</CSSTransition>
	);
};

export default Message;
