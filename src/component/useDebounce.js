import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const useDebounce = (value, timeout) => {
	const [state, setState] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setState(value), timeout);

		return () => clearTimeout(handler);
	}, [value, timeout]);

	return state;
};

useDebounce.propTypes = {
	value: PropTypes.string.isRequired,
	timeout: PropTypes.number.isRequired
};

export default useDebounce;
