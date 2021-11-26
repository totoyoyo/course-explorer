import React, { useState, useEffect } from "react";
import draw from "./VisHistogram";

export interface Students {
	name: string;
	officeHours: number;
	piazzaPosts: number;
	numberOfCommits: number;
}

export interface HistogramProps {
	data: Students[];
}
const DATA = [
	{
		name: "student1",
		officeHours: 20,
		piazzaPosts: 30,
		numberOfCommits: 2
	},
	{
		name: "student2",
		officeHours: 22,
		piazzaPosts: 8,
		numberOfCommits: 10
	},
	{
		name: "student3",
		officeHours: 1,
		piazzaPosts: 19,
		numberOfCommits: 5
	},
	{
		name: "student4",
		officeHours: 30,
		piazzaPosts: 2,
		numberOfCommits: 12
	},
	{
		name: "student5",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student6",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student7",
		officeHours: 2,
		piazzaPosts: 19,
		numberOfCommits: 19
	},
	{
		name: "student8",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student9",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student10",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 20
	},
	{
		name: "student11",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student12",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student13",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student14",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student15",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student16",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student17",
		officeHours: 2,
		piazzaPosts: 16,
		numberOfCommits: 2
	},
	{
		name: "student18",
		officeHours: 2,
		piazzaPosts: 0,
		numberOfCommits: 2
	}
];

export default function Histogram(props: HistogramProps) {
	const [data, setData] = useState<Students[]>(DATA);

	useEffect(() => {
		draw(data);
	}, [data]);

	return <div className="Histogram" />;
}
