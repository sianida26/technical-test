import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import usFlag from "../../assets/flag_us.png"
import chinaFlag from "../../assets/flag_china.png"
import franceFlag from "../../assets/flag_france.png"
import indonesiaFlag from "../../assets/flag_indonesia.png"
import japanFlag from "../../assets/flag_japan.png"
import malaysiaFlag from "../../assets/flag_malaysia.png"
import southKoreaFlag from "../../assets/flag_south_korea.png"
import thailandFlag from "../../assets/flag_thailand.png"

const LANGUAGES = [
    {
        displayName: "Bahasa Indonesia",
        flag: indonesiaFlag,
        id: "ind",
    },
    {
        displayName: "English (US)",
        flag: usFlag,
        id: "en-us",
    },
    {
        displayName: "日本語",
        flag: japanFlag,
        id: "jpn",
    },
    {
        displayName: "ภาษาไทย",
        flag: thailandFlag,
        id: "tha",
    },
    {
        displayName: "Bahasa Malaysia",
        flag: malaysiaFlag,
        id: "msa",
    },
    {
        displayName: "한국어",
        flag: southKoreaFlag,
        id: "kor",
    },
    {
        displayName: "简体中文",
        flag: chinaFlag,
        id: "chi",
    },
    {
        displayName: "Français",
        flag: franceFlag,
        id: "fra",
    },
]

interface Props {
    show: boolean
    onClose?: () => void
    onLanguageChange?: () => void
}

export default function LanguageModal(props: Props) {

    const [ currentLanguage, setCurrentLanguage ] = useState("en-us")

    const handleChooseLanguage = (id: string) => {
        setCurrentLanguage(id)
        props.onClose?.()
    }

	return (
		<Modal show={props.show} size="sm" centered onHide={ props.onClose }>
			<Modal.Header closeButton>
				<Modal.Title>Select Your Language</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column">
                {
                    LANGUAGES.map(lang => (
                        <div key={ lang.id } className={`d-flex align-items-center px-4 py-2 gap-2 ${ currentLanguage === lang.id && "bg-success text-white" }`} onClick={ () => handleChooseLanguage(lang.id) }>
                            <img src={ lang.flag } alt="Flag of United States of America" width={30} height={30} className={`flag-round ${ currentLanguage === lang.id ? "lang-active" : "lang-inactive" }`} />
                            <span className="flex-grow-1">{ lang.displayName }</span>
                            <i className="bi bi-check-lg text-white" />
                        </div>
                    ))
                }
            </Modal.Body>
		</Modal>
	);
}
