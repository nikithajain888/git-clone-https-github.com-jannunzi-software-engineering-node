import User from "./User";

export default class Tuit {
    private id: string;
    private tuit: string = '';
    private postedOn: Date | null=null;
    private postedBy: User | null=null;
    constructor(id: string, tuit: string) {
        this.id = id; this.tuit = tuit; 
    }
    get tTuit() { return this.tuit; }
 }