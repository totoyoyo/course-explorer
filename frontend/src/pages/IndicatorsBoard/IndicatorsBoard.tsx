import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../states/hooks";
import { IndicatorsState, queryAllIndicators, selectIndicators } from "../../states/indicators/indicatorsSlice";

export function IndicatorsBoard() {
	const indicators: IndicatorsState = useAppSelector(selectIndicators);
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");
	const [step, setStep] = useState<string>("");
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(queryAllIndicators({ start: startTime, end: endTime, step: step }));
	}, [startTime, endTime, step, dispatch]);

	return <div>{JSON.stringify(indicators.indicators)}</div>;
}
