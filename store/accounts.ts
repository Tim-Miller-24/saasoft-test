import type { IAccountsStoreState } from '~/@types/storeStates';
import { NoteType } from '~/@types/enums';

export const useAccountsStore = defineStore('accountsStore', {
    state:(): IAccountsStoreState => ({
        allAaccounts: [] as IAcctount[],
        savedValidAccounts: [] as IAcctount[],

        accountsCount: 0 as number,        

        minimalRequiredInputLength: 6 as number,
    }),

    actions: {
        createAcctount (): void {
            this.allAaccounts.push({
                id: this.accountsCount++,
                login: '',
                notes: [] as INote[],
                noteType: NoteType.local as NoteType,
                password: '',
                passwordLength: 0,
            })
        },

        saveAccount(account: IAcctount): void {
            let savedIds = this.savedValidAccounts.map(item => item.id);

            let isSaved = savedIds.includes(account.id);

            account.passwordLength = account.password?.length || 0;

            if (account.noteType === NoteType.ldap) {
                account.password = null;
            }

            if (isSaved) {
                this.updateSavedAccount(account);
            }   
            else {
                this.addToSavedNewAccount(account);
            }
        },

        addToSavedNewAccount(account: IAcctount): void {
            this.savedValidAccounts.push(account);
        },

        updateSavedAccount(account: IAcctount): void {
            let includesAccountIndex = this.savedValidAccounts.findIndex(item => item.id === account.id);

            if (includesAccountIndex !== -1) {
                this.savedValidAccounts[includesAccountIndex] = account;
            }
        },

        removeAccount(id: number): void  {
            this.allAaccounts = this.allAaccounts.filter(account => account.id !== id);
            this.savedValidAccounts = this.savedValidAccounts.filter(account => account.id !== id);
            
            this.accountsCount--;
        },

        setDefault (): void {
            this.accountsCount = this.savedValidAccounts?.length || 0;
            this.allAaccounts = this.savedValidAccounts.map(acc => ({ ...acc }));
        }
    },

    persist: {
        paths: ['savedValidAccounts']
    }
})