
import { UserProps } from "../Types/UserType";
import { getToken } from "../auth/TokenManager";
import { CardProps } from "../Types/CardType";


const serverUrl = 'http://localhost:3000/';
const cardUrl = `${serverUrl}card/`;
const usersUrl = `${serverUrl}users/`;

// read all cards - CRUD
export async function getCards(): Promise<Array<CardProps>> {
    const res = await fetch(`${cardUrl}`);
    return res.json();
}

// read one card - CRUD
export async function getCardById(_id: string): Promise<CardProps> {
    const res = await fetch(`${cardUrl}${_id}`, {
        method: 'GET',
        headers: {
             'x-auth-token': getToken()
        }
    });
    return res.json();
}

//create one card - CRUD
export async function addCard(card: CardProps): Promise<CardProps> {
    const res = await fetch(`${cardUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(card)
    });
    return res.json();
}

// delete one card - CRUD
export async function deleteCard(_id: string): Promise<CardProps> {
    const res = await fetch(`${cardUrl}${_id}`, {
        method: 'DELETE',
        headers: {
             'x-auth-token': getToken()
        },
    })
    return res.json()
}

// update one card - CRUD
export async function editCard(
    _id: string,
    card: CardProps
): Promise<CardProps> {
    const res = await fetch(`${cardUrl}${_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
             'x-auth-token': getToken()
        },
        body: JSON.stringify(card)
    })
    return res.json()
}


// Sign Up
export async function signup(user: UserProps): Promise<UserProps> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

        });
        
return res.json();
}


// Login
export async function login(user: UserProps): Promise<UserProps> {
    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}

// read cards by userId - CRUD
export async function getMyCards(): Promise<Array<CardProps>> {
    const res = await fetch(`${cardUrl}myCards`, {
        method: 'GET',
        headers: {
             'x-auth-token': getToken()
        }
    });
    return res.json();
}


// favorite card - CRUD
export async function toggleFavoriteCard(cardId: string | null | undefined): Promise<CardProps> {
  const res = await fetch(`${cardUrl}${cardId}/favorite`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'x-auth-token': getToken()
    },
  });
  return res.json();
}

// read favorite card by user
export async function getUserFavoriteCard(): Promise<any> {
  const res = await fetch(`${cardUrl}getUserFavoriteCards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    'x-auth-token': getToken()
    },
  });
  return res.json();
}

// read all users - CRUD
export async function getUsers(): Promise<Array<UserProps>> {
    const res = await fetch(`${usersUrl}`);
    return res.json();
}

// read one user - CRUD
export async function getUserById(_id: string ): Promise<UserProps> {
    const res = await fetch(`${usersUrl}${_id}`, {
        method: 'GET',
        headers: {
             'x-auth-token': getToken()
        }
        
        
    });
    return res.json();
}


// update user - CRUD
export async function updateUser(
    _id: string,
    user: UserProps
): Promise<UserProps> {
    const res = await fetch(`${usersUrl}${_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
             'x-auth-token': getToken()
        },
        body: JSON.stringify(user)
    })
    return res.json()
}

// update user bussiness - CRUD
export async function updateUserBussiness(
    _id: string,
    user: UserProps
): Promise<UserProps> {
    const res = await fetch(`${usersUrl}bussines/${_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
             'x-auth-token': getToken()
        },
        body: JSON.stringify(user)
    })
    return res.json()
}


// delete one user - CRUD
export async function deleteUser(_id: string): Promise<UserProps> {
    const res = await fetch(`${usersUrl}${_id}`, {
        method: 'DELETE',
        headers: {
             'x-auth-token': getToken()
        },
    })
    return res.json()
}