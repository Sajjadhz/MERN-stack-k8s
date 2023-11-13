const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateJobInput(data) {
    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
    data.link = !isEmpty(data.link) ? data.link : "";
    data.id = !isEmpty(data.id) ? data.id : "";
// Name checks

    if (Validator.isEmpty(data.link)) {
        errors.link = "Link is required";
    }else{
        if (!Validator.isURL(data.link)) {
            console.log(1);
            errors.linkincorrect = "Link is incorrect";
        }else if (!Validator.isURL(data.link) && !Validator.isMagnetURI(data.link) ) {
            console.log(2);
            errors.magnetincorrect = "Magnet link is not correct";
        }
    }

    if (Validator.isEmpty(data.id)) {
        errors.id = "User not found";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};