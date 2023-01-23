import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Dashboard() {

    const location = useLocation()
    const navigate = useNavigate()

    const navigateToIndex = () => navigate("/")

	return (
		<div>
			<Navbar />
            <Container className="mt-4">
                <Breadcrumb className="text-xs">
                    <Breadcrumb.Item as="span">Master Data Management</Breadcrumb.Item>
                    <Breadcrumb.Item active={ location.pathname === "/" } onClick={ navigateToIndex }>Fee Type</Breadcrumb.Item>
                    {
                        location.pathname !== "/" && (
                            <Breadcrumb.Item active>
                                {
                                    location.pathname === "/create" ? "Create Fee Type"
                                    : ""
                                }
                            </Breadcrumb.Item>
                        )
                    }
                </Breadcrumb>
			    <Outlet />
            </Container>
            <p className="text-center text-xs mt-4" style={{ color: '#818181' }}>© 2020 Bayu Buana Travel Services. All Rights Reserved.</p>
		</div>
	);
}
