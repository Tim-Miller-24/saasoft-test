<template>
    <div class="table-row">
        <el-input
            v-model="notesInput"
            :placeholder="localizationStore.value"
            clearable
            size="large"
            maxlength="50"
            @blur="convertNotesToArray"
        />

        <el-select
            v-model="props.item.noteType"
            placeholder="Select"
            size="large"
            @change="onSelectChange"
            >
            <el-option
                v-for="item in NoteType"
                :key="item"
                :label="item"
                :value="item"
            />
        </el-select>

        <el-input
            v-model="props.item.login"
            :placeholder="localizationStore.value"
            clearable
            size="large"
            maxlength="100"
            @focus="isLoginError = false"
            @blur="checkValidation"
            :class="[{'error': isLoginError}]"
        />

        <el-input
            v-model="props.item.password"
            type="password"
            :placeholder="
                props.item.passwordLength
                ? passwordMask
                : localizationStore.value
            "
            :show-password="props.item.noteType === NoteType.local"
            size="large"
            maxlength="100"
            @focus="isPasswordError = false;"
            @blur="checkValidation"
            :class="[{'error': isPasswordError}]"
        />

        <Icon name="iconamoon:trash-light" class="table-row__trash" @click="onTrashClick" />
    </div>
</template>

<script setup lang="ts">
import { NoteType } from '~/@types/enums';

const localizationStore = useLocalizationStore();
const accountsStore = useAccountsStore();

const { minimalRequiredInputLength } = storeToRefs(accountsStore);

const isLoginError = ref<boolean>(false);
const isPasswordError = ref<boolean>(false);

const notesInput = ref<string>('');
const passwordMask = ref<string>('');

const props = withDefaults(
    defineProps<{item?: IAcctount}>(),
    {
        item: () => ({} as IAcctount)
    }
)

onMounted(() => {
    convertArrayToNotes();
    createMaskedPassword();
})

const convertArrayToNotes = (): void => {
    let convertedString: string = '';

    props.item.notes.forEach(item => {
        convertedString += item.text + '; ';
    })

    notesInput.value = convertedString;
}

const convertNotesToArray = (): void => {
    let splitedArray = notesInput.value?.split(';');

    let convertedObject: INote[] = [];

    splitedArray.forEach(item => {
        convertedObject.push({text: item.trim()});
    });

    props.item.notes = convertedObject;

    checkValidation();
}

const onSelectChange = (): void => {
    if (props.item.noteType === NoteType.ldap) {
        props.item.password = null;
        createMaskedPassword();
    }

    checkValidation();
}


const checkValidation = (): void => {
    let isValide: boolean = checkRequiredInputs([props.item.login, props.item.password], minimalRequiredInputLength.value);

    if (!isValide) {
        if (props.item.login.length < minimalRequiredInputLength.value) {
            isLoginError.value = true;
        }
        if (!props.item.password || props.item.password?.length < minimalRequiredInputLength.value) {
            isPasswordError.value = true;
        }

        return;
    }

    accountsStore.saveAccount(props.item);
    createMaskedPassword();
}

const createMaskedPassword = (): void => {
    if (props.item.noteType === NoteType.ldap) {
        passwordMask.value = '';

        for (let i: number = 0; i < props.item.passwordLength; i++) {
            passwordMask.value += '*';
        }
    }
}

const onTrashClick = (): void => {
    accountsStore.removeAccount(props.item.id);
}

</script>

<style lang="scss" scoped>
.table-row {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 10px;

    &__trash {
        height: 30px;
        max-width: 24px;
        width: 100%;
        background-color: rgb(112, 112, 112);

        cursor: pointer;
    }
}

.error {
    box-shadow: 0 0 10px 1px rgba(255, 0, 0, 0.693);
}
</style>