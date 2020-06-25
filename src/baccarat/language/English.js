let MAP = {
    Chinese:'Chinese',
    English:'English',
    B:'Banker',
    P:'Player',
    Tie:'Tie',
    Pairs:'Pairs'
}
export default class English{

    static getInstance(){return MAP}

    static putDate(key , value){ MAP[key] = value }

}