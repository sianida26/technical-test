import React, { useEffect, useRef, useState } from "react";

import $ from "jquery";
import "datatables.net";
 
export default function TypeFeePage() {
	const data = [
		[
			"Tiger Nixon",
			"System Architect",
			"Edinburgh",
			"5421",
			"2011/04/25",
			"$320,800",
		],
		[
			"Garrett Winters",
			"Accountant",
			"Tokyo",
			"8422",
			"2011/07/25",
			"$170,750",
		],
		[
			"Ashton Cox",
			"Junior Technical Author",
			"San Francisco",
			"1562",
			"2009/01/12",
			"$86,000",
		],
	];
	const tableRef = useRef<HTMLTableElement>(null);
	const table = useRef<any>(null);
    const [ a, setA ] = useState(false)
	useEffect(() => {
		if (tableRef.current) {
			const table = $(tableRef.current).DataTable({
				data: data,
				columns: [
					{ title: "Name" },
					{ title: "Position" },
					{ title: "Office" },
					{ title: "Extn." },
					{ title: "Start date" },
					{ title: "Salary" },
				],
			});
			return () => { table.destroy(false) }
		}
	}, []);

	useEffect(() => {
		if (table.current) {
			table.current.destroy();
		}
	}, []);

	return (
		<main>
			<h2>Fee Type</h2>
			<table className="display" width="100%" ref={tableRef}></table>
		</main>
	);
}
