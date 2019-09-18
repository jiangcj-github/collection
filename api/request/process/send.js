import control from "../../control";

export default async (rid, req, params) => {
	control.isValid(rid);
	
	return new Promise((rev, rej)=>{

		rev(0);

	});
}