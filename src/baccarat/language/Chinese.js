let MAP = {
    Chinese:'中文',
    English:'英文',
    B:'庄',
    P:'闲',
    Tie:'和',
    Pairs:'对子'
}
export default class  Chinese {
    static getInstance(){return MAP}

    static putDate(key , value){ MAP[key] = value }

}