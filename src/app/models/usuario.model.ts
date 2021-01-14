export class Usuario {

    constructor(
        private _nombre: string,
        private _email: string,
        private _role?: string,
        private _google?: boolean,
        private _imagen?: string,
        private _uid?: string
    ) { }

    public get role(): string {
        return this._role || '';
    }

    public set role(_role: string) {
        this._role = _role;
    }

    public get google(): boolean{
        return this._google || false;
    }

    public set google(_google: boolean){
        this._google = _google;
    }

    public get nombre(): string{
        return this._nombre;
    }

    public set nombre(_nombre: string){
        this._nombre = _nombre;
    }

    public get email(): string{
        return this._email;
    }

    public set email(_email: string){
        this._email = _email;
    }

    public get imagen(): string{
        return this._imagen || '';
    }

    public set img(_imagen: string){
        this._imagen = _imagen;
    }

    public get uid(): string{
        return this._uid || '';
    }

    public set uid(_uid: string){
        this._uid = _uid;
    }
}