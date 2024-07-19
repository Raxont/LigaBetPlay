import { MongoClient } from "mongodb";

export class connect{
    user;
    port;
    #pass;
    #host;
    #cluster;
    #dbName;

   static instance
   constructor({host: h, user: u, pass: w, port: p, cluster: c, dbName: d}=
   {
       user:"mongo",
       port: 47797,
       pass: "PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF",
       host: "mongodb://",
       cluster: "monorail.proxy.rlwy.net",
       dbName: "test"
   })
   {
       if(typeof connect.instance === "object"){
           return connect.instance;
       }
       this.user = u;
       this.port = p;
       this.#pass = w;
       this.#host = h;
       this.#cluster = c;
       this.#dbName = d;
       this.#open();
       this.db = this.conexion.db(this.getDbName)
       connect.instance = this;
       return this;
   }
   set setPass(pass){
       this.#pass = pass
   }
   set setHost(host){
       this.#host = host
   }
   set setCluster(cluster){
       this.#cluster = cluster
   }
   set setDbName(dbName){
       this.#dbName = dbName
   }
   get getPass(){
       return this.#pass
   }
   get getHost(){
       return this.#host
   }
   get getCluster(){
       return this.#cluster
   }
   get getDbName(){
       return this.#dbName
   }
   async #open(){
       this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/`);
       await this.conexion.connect();
   }
   async reconnect(){
       await this.#open();
   }
   async close(){
       await this.conexion.close();
   }
}