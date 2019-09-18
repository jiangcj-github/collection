
import control from "../../control";

export default (rid, req, params, res) => {
	control.isValid(rid);

	return res;
}