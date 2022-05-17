export function validator(data, config) {
    const errors = {};
    const validate = (validateMthod, data, config) => {
        let statusValidate = true;
        switch (validateMthod) {
            case "isRequered":
                statusValidate = data.trim() === "";
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.massage;
    };

    for (const fieldName in data) {
        for (const validateMthod in config[fieldName]) {
            const error = validate(
                validateMthod,
                data[fieldName],
                config[fieldName][validateMthod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
