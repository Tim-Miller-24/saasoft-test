import type { IStoreStateLocalization } from "~/@types/storeStates"

export const useLocalizationStore = defineStore('localizationStore', {
    state:(): IStoreStateLocalization => ({
        accounts: 'Учётные записи',
        hintForLabels: 'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;',
        notes: 'Метки',
        noteType: 'Тип записи',
        login: 'Логин',
        password: 'Пароль',
        value: 'Значение',  
        local: 'Локальная',
    }),
})