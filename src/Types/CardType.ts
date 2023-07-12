import { toast } from "react-toastify";
import { isValidImageUrl } from "../auth/RegexValid";

 interface CardProps {
    favoritePage?: boolean;
    userId?: string | null;
    _id?: string | null;
    title: string;
    subtitle?: string | null;
    description?: string | null;
    phone?: string | null;
    email?: string | null;
    web?: string | null;
    imageUrl: string  ;
    imageAlt?: string ;
    state?: string | null;
    country?: string | null;
    city?: string | null;
    street?: string | null;
    houseNumber?: string | null ;
    zip?: string | null;
    onDelete?: Function; 
    handleSearch?: Function; 
    favorites?: [string] | null;     
}

function validate(card:CardProps): boolean {
        if (!card.title) {
            toast.error('Title is required');
            return false;
        }
        if (!card.subtitle) {
            toast.error('Subtitle is required');
            return false;
        }
        if (!card.description) {
            toast.error('Description is required');
            return false;
        }

        if (!card.phone) {
           toast.error('Phone is required');
            return false;
        }

        if (!card.email) {
            toast.error('Email is required');
            return false;
        }

        if (!card.web) {
            toast.error('Web is required');
            return false;
        }

         if (!card.imageUrl) {
            toast.error('ImageUrl is required');
            return false;
        }

        if (!isValidImageUrl(card.imageUrl)) {
            toast.error('The URL that you trying to add must be one of the supported formts: gif,jpg,png,  ');
            return false;
        }

        if (!card.imageAlt) {
            toast.error('ImageAlt is required');
            return false;
        }

        if (!card.country) {
            toast.error('Country is required');
            return false;
        }

        if (!card.city) {
           toast.error('City is required');
            return false;
        }

        if (!card.street) {
            toast.error('Street is required');
            return false;
        }

        if (!card.houseNumber) {
            toast.error('House number is required');
            return false;
        }

        if (!card.zip) {
            toast.error('Zip is required');
            return false;
        }
        return true;
    }

export {
    validate
}

export type {
    CardProps
}