import { useEffect, useState } from "react";
import { debounce } from "lodash";

// @ts-ignore
export function useResize(ref) {
	const [state, setState] = useState<{ width: number; height: number }>();
	useEffect(() => {
		const getSize = debounce(() => {
			if (!ref || !ref.current) {
				return;
			}
			const width = ref.current.offsetWidth;
			const height = ref.current.offsetHeight;
			setState({
				width: width,
				height: height
			});
		}, 1000);

		window.addEventListener("resize", getSize);
		getSize();
		return () => window.removeEventListener("resize", getSize);
	}, [ref]);

	return state;
}
