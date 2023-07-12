
// phone regex validation
 export const isValidIsraeliPhoneNumber = (phoneNumber: string): boolean => {
    const israeliNumberRegex = /^((((\+972)|0)(([234689]\d{7 })|([57]\d{8}))|(1[5789]\d{8}))|\*\d{3,6})$/;
    return israeliNumberRegex.test(phoneNumber);
};

// email regex validation 
export const isValidEmail = (userEmail: string): boolean => {
    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return validEmail.test(userEmail);
};

// password regex validation
export const isValidPassword = (userPassword: string): boolean => {
    const validPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&]).{8,}$/;
    return validPassword.test(userPassword);
};

// imageUrl regex validatin
export const isValidImageUrl = (userImageUrl: string): boolean => {
    const ValidImageUrl = /\bhttps?:\/\/\S+?\.(?:jpe?g|png|gif)\b/;
    return ValidImageUrl.test(userImageUrl);
};