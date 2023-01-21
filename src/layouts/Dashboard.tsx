import { Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import logo from "../assets/logo.png";

export default function Dashboard() {
	const profileOverlay = (
		<Popover>
			<div className="shadow py-2">
				{/* image */}
				<div className="d-flex px-3 align-items-center">
					<span className="profile-picture-wrapper" style={{ marginRight: "1rem" }}>
						<Image
							src="https://ui-avatars.com/api/?background=random"
							roundedCircle
							width={30}
							height={30}
						/>
					</span>
                    <div>
                        <div style={{ fontWeight: 600 }}>Patrick Jane</div>
                        <div className="text-xs text-secondary">Administrator</div>
                    </div>
				</div>

                <hr className="border-secondary" style={{ marginBottom: "0.5rem" }} />

                {/* navs */}
                <div className="px-3 d-flex flex-column">
                    {
                        [
                            ['person-fill', 'My Profile'], 
                            ['unlock-fill', 'Change Password'],
                            ['box-arrow-right', 'Logout']
                        ].map((x,i) => <div key={i} className="d-flex align-items-center py-1">
                            <i className={`bi bi-${x[0]}`} style={{ marginRight: "0.5rem" }} />
                            <span>{x[1]}</span>
                        </div>)
                    }
                </div>
			</div>
		</Popover>
	);

	return (
		<div>
			<div className="shadow">
				<Navbar bg="light">
					<Container>
						{/* left side */}
						<div>
							<button style={{ marginRight: "0.5rem" }}>
								<i
									className="bi bi-list"
									style={{ fontSize: "1.5rem" }}
								/>
							</button>
							<Navbar.Brand>
								<img
									src={logo}
									alt="Logo"
									height={30}
									className="d-inline-block align-top"
								/>
							</Navbar.Brand>
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
				</Navbar>
			</div>
			<Outlet />
		</div>
	);
}
