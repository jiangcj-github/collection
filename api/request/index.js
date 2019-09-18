import control from "../control";
import sendBefore from "./process/before";
import sendAfter from "./process/after";
import send from "./process/send";

export default async (req, params) => {

	let rid = control.init(req.name);
	if(!rid) {
		throw 0;
	}

	sendBefore(rid, req, params);
	let res = await send(rid, req, params);
	res = sendAfter(rid, req, params, res);

	control.end(rid);
	return res;
}