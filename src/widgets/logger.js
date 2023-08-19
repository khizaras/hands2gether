import moment from "moment";

const logger = {
	info(name, msg) {
		console.info(
			`[info][${moment().format("HH:mm:ss")}] ${
				name ? `[${name}]` : `[${msg}]`
			}   ${msg && `[${msg}]`}  `
		);
	},
};

export default logger;
