import { toast } from "react-toastify";
import { isValidEmail, isValidImageUrl, isValidIsraeliPhoneNumber, isValidPassword } from "../auth/RegexValid";



    interface UserProps {
    _id?: string | null;
    id?: string | null;
    password?: string;
    fName?: string;
    mName?: string;
    lName?: string;
    phone?: string | null;
    email?: string | null;
    imageUrl?: string ;
    imageAlt?: string ;
    state?: string | null;
    country?: string | null;
    city?: string | null;
    street?: string | null;
    houseNumber?: string | null ;
    zip?: string | null;
    token?: string | undefined;
    isAdmin?: boolean;
    checked?: boolean;
   
}

 function validate(user: UserProps): boolean {
        if (!user.fName ) {
            toast.error('First name is required');
            return false;
        }
        if (user.fName.length < 2 ) {
            toast.error('First name lengh must be at least 2 characters long');
            return false;
        }
        if (!user.mName ) {
            toast.error('Middle name is required');
            return false;
        }
        if (!user.lName) {
            toast.error('Last name is required');
            return false;
        }
        if (!user.phone) {
           toast.error('Phone number is required');
            return false;
        }
        if (!isValidIsraeliPhoneNumber(user.phone)) {
            toast.error('User phone must be a valid phone number ');
            return false;
        }
        if (!user.email) {
            toast.error('Email is required');
            return false;
        }
        if(!isValidEmail(user.email)) {
           toast.error('User email must be valid');
            return false;
        }
        if (!user.imageUrl) {
            toast.error('ImageUrl is required');
            return false;
        }
        if (!isValidImageUrl(user.imageUrl)) {
            toast.error('The URL that you trying to add must be one of the supported formts: gif,jpg,png, ');
            return false;
        }
        if (!user.imageAlt) {
            toast.error('ImageAlt is required');
            return false;
        }
        if (!user.state) {
            toast.error('State is required');
            return false;
        }
        if (!user.country) {
            toast.error('Country is required');
            return false;
        }
        if (!user.city) {
            toast.error('City is required');
            return false;
        }
        if (!user.street) {
            toast.error('Street is required');
            return false;
        }
        if (!user.houseNumber) {
            toast.error('House number is required');
            return false;
        }
        if (!user.zip) {
            toast.error('Zip number is required');
            return false;
        }
        return true;
    }

     function validate_2(user: UserProps): boolean {
          if (!user.email) {
            toast.error('Email is required');
            return false;
        }
        if(!isValidEmail(user.email)) {
           toast.error('User email must be valid');
            return false;
        }
        if (!user.password) {
            toast.error('Password is required');
            return false;
        }
        if(!isValidPassword(user.password)) {
            toast.error('Password must be at least 8 characters,including an uppercase letter,a number,and one of the following special characters:!,@,#,$,or &');
            return false;
        }
       return true
     }

    export {
        validate,
        validate_2
    }

    export type {
        UserProps
    }