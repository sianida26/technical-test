import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Dashboard() {
	return (
		<div>
			<Navbar />
            <Container className="mt-4">
                <Breadcrumb className="text-xs">
                    <Breadcrumb.Item>Master Data Management</Breadcrumb.Item>
                    <Breadcrumb.Item active>Fee Type</Breadcrumb.Item>
                </Breadcrumb>
			    <Outlet />
            </Container>
		</div>
	);
}
