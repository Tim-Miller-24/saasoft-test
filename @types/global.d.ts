interface IAcctount {
    id: number,
    notes: INote[],
    noteType: string,
    login: string,
    password: string | null,
    passwordLength: number,
}

interface INote {
    text: string
}