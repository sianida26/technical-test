import { useState } from "react"

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import BsNavbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import logo from "../assets/logo.png";
import usFlag from "../assets/flag_us.png";
import useWindowSize from "../hooks/useWindowSize";
import LanguageModal from "./modals/LanguageModal";

export default function Navbar() {

    const [ showSidebar, setShowSidebar ] = useState(false);
    const [ showLanguageModal, setShowLanguageModal ] = useState(false);

    const closeSidebar = () => {
        setShowSidebar(false)
    }

    const closeLanguageModal = () => {
        setShowLanguageModal(false)
    }

    const openLanguageModal = () => {
        closeSidebar()
        setShowLanguageModal(true)
    }

	const profileOverlay = (
		<Popover>
			<div className="shadow py-2">
				{/* image */}
				<div className="d-flex px-3 align-items-center">
					<span
						className="profile-picture-wrapper"
						style={{ marginRight: "1rem" }}
					>
						<Image
							src="https://ui-avatars.com/api/?background=random"
							roundedCircle
							width={30}
							height={30}
						/>
					</span>
					<div>
						<div style={{ fontWeight: 600 }}>Patrick Jane</div>
						<div className="text-xs text-secondary">
							Administrator
						</div>
					</div>
				</div>

				<hr
					className="border-secondary"
					style={{ marginBottom: "0.5rem" }}
				/>

				{/* navs */}
				<div className="px-3 d-flex flex-column">
					{[
						["person-fill", "My Profile"],
						["unlock-fill", "Change Password"],
						["box-arrow-right", "Logout"],
					].map((x, i) => (
						<div key={i} className="d-flex align-items-center py-1">
							<i
								className={`bi bi-${x[0]}`}
								style={{ marginRight: "0.5rem" }}
							/>
							<span>{x[1]}</span>
						</div>
					))}
				</div>
			</div>
		</Popover>
	);

	const Sidebar = () => (
		<BsNavbar.Collapse id="sidebar-nav" in={showSidebar}>
			<div className="navbar-overlay" onClick={() => setShowSidebar(false)}>
				<div className="mr-auto sidebar d-flex flex-column px-2 py-4 text-white font-semibold gap-3" onClick={(e) => e.stopPropagation()}>
                    {/* Language control */}
                    <button className="d-flex align-items-center gap-2 text-white font-semibold" onClick={ openLanguageModal }>
                        <img src={ usFlag } alt="Flag of United States of America" width={25} height={25} style={{ border: "2px solid white", borderRadius: "9999px"}} />
                        English (US)
                    </button>

                    {/* Currency control */}
                    <div className="d-flex align-items-center">
                        IDR Indonesian Rupiah
                    </div>

                    {/* Master Data Management */}
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center pl-3 pr-1 py-1" style={{ backgroundColor: '#FDC300' }}>
                            <i className="bi bi-briefcase-fill" />
                            <span className="px-2">Master Data Management</span>
                            <i className="bi bi-chevron-right" />
                        </div>
                        <div className="d-flex flex-column pl-7 font-normal gap-2 mt-2">
                            {
                                ['Standard Mark-Up', 'Standard Service Fee', 'Fee Type', 'Frequent Traveler Program', 'Standard Ancillary Fee', 'Rating Type', 'Setup Flight Commision', 'Special Dates', 'Corporate Rating']
                                .map((item, i) => (
                                    <nav key={i} onClick={() => setShowSidebar(false)}>
                                            { item === "Fee Type" ? <span style={{ color: '#FDC300' }}>Fee Type</span> : <span>{ item }</span> }
                                        </nav>
                                    ))
                            }
                        </div>
                    </div>
                </div>
			</div>
		</BsNavbar.Collapse>
	);

	return (
		<div className="shadow">
			{/* Always show sidebar when screen is lg or larger */}
			<BsNavbar bg="light" expand="lg" onToggle={() => setShowSidebar(!showSidebar)}>
				<Container>
					{/* left side */}
					<div>
						<BsNavbar.Toggle aria-controls="sidebar-nav" className="border-none" />
						<BsNavbar.Brand>
							<img
								src={logo}
								alt="Logo"
								height={30}
								className="d-inline-block align-top"
							/>
						</BsNavbar.Brand>
                        <Sidebar />
					</div>

					{/* right side */}
					<div className="d-flex align-items-center">
						{/* help */}
						<i className="bi bi-question-circle-fill mx-1" />

						{/* notification */}
						<span className="position-relative mx-1">
							<i className="bi bi-bell"></i>
							<span className="notification-bubble"></span>
						</span>

						{/* profile */}
						<OverlayTrigger
							trigger="click"
							placement="bottom"
							overlay={profileOverlay}
							rootClose
						>
							<span className="profile-picture-wrapper">
								<Image
									src="https://ui-avatars.com/api/?background=random"
									roundedCircle
									width={30}
									height={30}
								/>
							</span>
						</OverlayTrigger>
					</div>
				</Container>
			</BsNavbar>

            {/* Language Modal */}
            <LanguageModal show={ showLanguageModal } onClose={ closeLanguageModal } />
		</div>
	);
}
