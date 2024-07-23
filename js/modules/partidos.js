import { connect } from "../../helpers/db/conexion.js";

export class partido extends connect{
    static instance; 
    constructor() {
        if(typeof movis.instance === "object") {
            return movis.instance;
        }
        super();
        this.collection = this.db.collection("partido");
        movis.instance = this;
        return this;
    }

    async registrarPartido(){


    }



}