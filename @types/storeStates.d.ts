export interface IStoreStateLocalization {
    accounts: string,
    hintForLabels: string,
    notes: string,
    noteType: string,
    login: string,
    password: string,
    value: string,  
    local: string,
}

export interface IAccountsStoreState {
    allAaccounts: IAcctount[],
    savedValidAccounts: IAcctount[],
    accountsCount: number,        
    minimalRequiredInputLength: number,
}