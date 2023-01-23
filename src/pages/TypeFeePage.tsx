import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setData } from "../redux/slices/feeTypeSlice";
import FeeType from "../interfaces/FeeType";
import ReactDOM from "react-dom/client";

import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-responsive-bs4";
import "datatables.net-select-bs4";
import "datatables.net-rowreorder-bs4";
import {
	Button,
	Collapse,
	Dropdown,
	DropdownButton,
	Form,
	Pagination,
} from "react-bootstrap";
import { getFeeTypes } from "../services/feeTypeService";

const data = getFeeTypes()

export default function TypeFeePage() {
	// const data = [
	// 	["1", "Service Fee", "Desc", "Active"],
	// 	["2", "Service Fee", "Desc", "Inactive"],
	// 	["3", "Service Fee", "Desc", "Active"],
	// ];
	const navigate = useNavigate()
	const tableRef = useRef<HTMLTableElement>(null);
	const table = useRef<any>(null);
	const [expandAdvancedOptions, setExpandAdvancedOptions] = useState(false);
	const [tableReady, setTableReady] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [filterActive, setFilterActive] = useState(true);
	const [pageLength, setPageLength] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedRows, setSelectedRows] = useState<number[]>([]);
	const dispatch = useAppDispatch();

	const handleEditClick = (data: FeeType) => {
		dispatch(setData(data))
		navigate('/edit')
	};

	const handleDetailsClick = (data: FeeType) => {
		dispatch(setData(data))
		navigate('/details')
	};

	useEffect(() => {
		if (tableRef.current) {
			const tableInstance = $(tableRef.current).DataTable({
				data: getFeeTypes(),
				//@ts-ignore
				rowReorder: true,
				pageLength: 10,
				responsive: {
					details: {
						type: "column",
						target: 2,
					},
				},
				order: [[2, "asc"]],
				select: {
					style: "multi",
					selector: "td:nth-child(2)",
				},
				columns: [
					{
						title: "",
						orderable: false,
						className: "reorder all w-8",
						data: null,
						defaultContent: '<i class="bi bi-grip-vertical"></i>',
						//   width: "10px"
					},
					{
						title: "",
						orderable: false,
						className: "select-checkbox all w-8",
						data: null,
						defaultContent: "",
						// width: "1 rem",
					},
					{
						title: "Fee Type Code",
						data: "code",
						className: "all whitespace-normal",
					},
					{
						title: "Fee Type Name",
						data: "translations.en.name",
						className: "all whitespace-normal",
					},
					{
						title: "Description",
						data: "translations.en.description",
						className: "min-tablet whitespace-normal",
					},
					{
						title: "Status",
						data: "status",
						className: "min-tablet",
					},
					{
						title: "Actions",
						name: "Actions",
						orderable: false,
						createdCell: function (
							td: any,
							cellData: any,
							rowData: any
						) {
							const span = document.createElement("span");
							span.classList.add(
								"d-flex",
								"gap-2",
								"text-3E40AE",
								"d-inline"
							);

							const pencilIcon = document.createElement("i");
							pencilIcon.classList.add("bi", "bi-pencil-square");
							pencilIcon.onclick = () => handleEditClick(rowData as FeeType)

							const eyeIcon = document.createElement("i");
							eyeIcon.classList.add("bi", "bi-eye");
							eyeIcon.onclick = () => handleDetailsClick(rowData as FeeType)

							const trashIcon = document.createElement("i");
							trashIcon.classList.add("bi", "bi-trash");

							span.appendChild(pencilIcon);
							span.appendChild(eyeIcon);
							span.appendChild(trashIcon);

							td.appendChild(span)
						},
						defaultContent: '',
						className: "min-desktop",
					},
				],
				dom: "t",
			});

			tableInstance.on("select", (e, dt, type, indexes) =>
				handleSelectRow(indexes)
			);
			tableInstance.on("deselect", (e, dt, type, indexes) =>
				handleDeselectRow(indexes)
			);

			setTableReady(true);

			return () => {
				tableInstance.destroy(false);
			};
		}
	}, []);

	useEffect(() => {
		if (table.current) {
			table.current.destroy();
		}
	}, []);

	//Handles filter
	useEffect(() => {
		if (tableRef.current) {
			//apply search
			$(tableRef.current)
				.DataTable()
				.search(searchKeyword)
				.column(5)
				.search(filterActive ? "^Active" : "^Inactive", true)
				.draw();
		}
	}, [searchKeyword, filterActive]);

	//Handles page size change
	useEffect(() => {
		if (tableRef.current) {
			//apply
			$(tableRef.current).DataTable().page.len(pageLength).draw();
		}
	}, [pageLength]);

	const handleSelectRow = (indexes: number[]) => {
		setSelectedRows((prev) => [...new Set([...prev, ...indexes])]);
	};

	const handleDeselectRow = (indexes: number[]) => {
		setSelectedRows((prev) =>
			prev.filter((x) => indexes.indexOf(x) === -1)
		);
	};

	const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		// const value = event.target.value
		setSearchKeyword(event.target.value);
	};

	const handleSelectActive = (value: string) => {
		//apply the search
		setFilterActive(value === "Active");
	};

	const handlePageLengthChange = (size: number) => {
		setPageLength(size);
	};

	const handlePageChange = (pageNumber: number) => {
		if (tableRef.current) {
			setCurrentPage(pageNumber);

			$(tableRef.current)
				.DataTable()
				.page(pageNumber - 1)
				.draw("page");
		}
	};

	const getTableInfo = () => {
		if (tableRef.current) {
			return $(tableRef.current).DataTable().page.info();
		}
	};

	const getPageNumbers = (): number[] => {
		if (tableRef.current) {
			const currentPage = getTableInfo()!.page + 1;
			const totalPages = getTableInfo()!.pages;
			const leftPages = 1;
			const rightPages = 1;
			const pages: number[] = [];
			for (
				let i = Math.max(1, currentPage - leftPages);
				i <= Math.min(currentPage + rightPages, totalPages);
				i++
			) {
				pages.push(i);
			}
			return pages;
		}
		return [];
	};

	return (
		<main>
			<h2>Fee Type</h2>
			<div className="d-flex flex-column flex-md-row-reverse justify-content-between gap-2">
				<div className="d-flex justify-content-end gap-2">
					<span className="btn-table-action">
						<i className="bi bi-download"></i>
					</span>
					<span className="btn-table-action">
						<i className="bi bi-printer"></i>
					</span>
					<Link to="/create">
						<Button variant="warning" className="font-medium">
							<i className="bi bi-file-earmark-plus" />
							&nbsp;&nbsp;Create New
						</Button>
					</Link>
				</div>

				<div className="d-flex flex-column flex-md-row gap-2">
					{/* search */}
					<div className="input-group position-relative">
						<input
							type="text"
							className="form-control search-input rounded-8"
							placeholder="Search"
							value={searchKeyword}
							maxLength={256}
							onChange={handleSearchInput}
						/>
						<div className="position-absolute search-icon">
							<i className="bi bi-search"></i>
						</div>
					</div>

					{/* advanced options */}
					<div className="align-self-end font-bold d-md-flex align-items-md-center align-self-md-stretch">
						<span className="whitespace-md-nowrap">
							Advanced Options
						</span>
						&nbsp;&nbsp;
						<div
							className={`d-inline-flex transition ${
								expandAdvancedOptions && "rotate-180"
							}`}
							onClick={() =>
								setExpandAdvancedOptions(!expandAdvancedOptions)
							}
						>
							<span className="bi bi-chevron-double-down text-sm" />
						</div>
					</div>
				</div>

				{selectedRows.length > 0 && (
					<div className="d-flex gap-2">
						<Dropdown>
							<Dropdown.Toggle variant="success">
								Update Status
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item>Active</Dropdown.Item>
								<Dropdown.Item>Inactive</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>

						<Button variant="success">Remove Fee Type</Button>
					</div>
				)}
			</div>
			<Collapse in={expandAdvancedOptions}>
				<div className="advanced-options">
					<h6>Status</h6>
					<Form.Select
						className="w-auto"
						value={filterActive ? "Active" : "Inactive"}
						onChange={(e) => handleSelectActive(e.target.value)}
					>
						<option value="Active">Active</option>
						<option value="Inactive">Inactive</option>
					</Form.Select>
				</div>
			</Collapse>
			<div id="main-table-container">
				<table
					id="main-table"
					className="display responsive nowrap"
					width="100%"
					ref={tableRef}
				></table>
			</div>
			<div className="d-flex flex-column flex-md-row justify-content-md-between">
				<div className="d-flex gap-2 text-sm align-items-center">
					<Form.Select
						className="form-control d-inline w-min form-control-sm"
						onChange={(e) =>
							handlePageLengthChange(+e.target.value)
						}
					>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</Form.Select>
					{tableReady && (
						<span>
							Showing {getTableInfo()!.start + 1} -{" "}
							{getTableInfo()!.end} of{" "}
							{getTableInfo()!.recordsDisplay}
						</span>
					)}
				</div>
				<div className="d-flex text-sm align-items-center mt-4 gap-2">
					<span className="font-semibold d-inline">Page:</span>
					{(() => {
						if (!tableReady) return;
						const tableInfo = getTableInfo()!;
						const pageNumbers = getPageNumbers();
						return (
							<Pagination>
								<Pagination.Prev
									disabled={pageNumbers[0] === 1}
									onClick={() =>
										handlePageChange(tableInfo.page)
									}
								/>
								{pageNumbers[0] > 1 && <Pagination.Ellipsis />}
								{pageNumbers.map((x) => (
									<Pagination.Item
										key={x}
										active={tableInfo.page + 1 === x}
										onClick={() => handlePageChange(x)}
									>
										{x}
									</Pagination.Item>
								))}
								{pageNumbers[pageNumbers.length - 1] !==
									tableInfo.pages && <Pagination.Ellipsis />}
								<Pagination.Next
									disabled={
										tableInfo.pages === tableInfo.page
									}
									onClick={() =>
										handlePageChange(tableInfo.page + 2)
									}
								/>
							</Pagination>
						);
					})()}
				</div>
			</div>
		</main>
	);
}
