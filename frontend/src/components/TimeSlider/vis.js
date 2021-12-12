import * as d3 from "d3";



export const hide_marks = () => {
	console.log("Style", style);
	let marks_selection = d3.selectAll(".MuiSlider-markLabel");
	console.log("Marks are ", marks_selection);
	marks_selection.style("opacity", 0);
	marks_selection.on("mouseover", mouseover);
	marks_selection.on("mouseout", mouseout);
};

function mouseover(event, d) {
	console.log("Selected node", d);
	console.log("Selected event", event);
	console.log("This this", this);
	d3.select(this).transition().duration(100).style("opacity", 1);
}

function mouseout(event, d) {
	d3.select(this).transition().duration(500).style("opacity", 0);
}
