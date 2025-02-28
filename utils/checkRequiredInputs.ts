export const checkRequiredInputs = (inputs: (string | null)[], minLength: number = 6): boolean => {
    return inputs.every(item => {
        if (item) {
            return item?.length >= minLength;
        }
        else {
            return false;
        }
    });
}