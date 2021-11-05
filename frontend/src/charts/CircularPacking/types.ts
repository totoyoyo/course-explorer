import {SimulationNodeDatum} from "d3-force";

export interface NodeDatum extends SimulationNodeDatum {
    name: string
}

export interface CircularPackingProps {
    data: NodeDatum[];
}