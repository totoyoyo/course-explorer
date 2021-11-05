import * as d3 from 'd3';
import {CircularPackingProps, NodeDatum} from "./types";

let width = 450;
let height = 450;

const draw = (props: CircularPackingProps) => {
    d3.select('.vis-circular-packing > *').remove();
    let svg = d3.select('.vis-circular-packing')
        .append("svg")
        .attr("width", 450)
        .attr("height", 450);

    let node = svg.append("g")
        .selectAll("circle")
        .data(props.data)
        .enter()
        .append("circle")
        .attr("r", 25)
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", "#69b3a2")
        .style("fill-opacity", 0.3)
        .attr("stroke", "#69a2b2")
        .style("stroke-width", 4);

    // Features of the forces applied to the nodes:
    let simulation  = d3.forceSimulation<NodeDatum>()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(props.data)
        .on("tick", function() {
            node
                .attr("cx", d => d.x || null)
                .attr("cy", d => d.y || null)
        });

};

export default draw;