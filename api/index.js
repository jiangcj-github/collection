import route from "./route";
import request from "./request";
let API = {};

route.map(req =>{
	API[req.name] = async params =>request(req, params);
});

export default API;