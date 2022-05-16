export function validator(data, config) {
    const errors = {};
    const validate = (validateMthod, data, config) => {
        switch (validateMthod) {
            case "isRequered":
                if (data.trim() === "") return config.massage;
                break;

            default:
                break;
        }
    };

    for (const fieldName in data) {
        for (const validateMthod in config[fieldName]) {
            const error = validate(
                validateMthod,
                data[fieldName],
                config[fieldName][validateMthod]
            );
            if (error) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
