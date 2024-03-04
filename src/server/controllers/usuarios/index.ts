import * as create from "./Create";
import * as getAll from "./GetAll";
import * as get from "./Get";
import * as remove from "./Remove";
import * as update from "./Update";

export const UsuariosController = {
	...create, ...getAll, ...get, ...remove, ...update
};
