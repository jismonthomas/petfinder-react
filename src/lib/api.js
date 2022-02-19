const FIREBASE_DOMAIN = process.env.REACT_APP_FIREBASE_URL;

export async function addToFavourites(petData) {

    const response = await fetch(`${FIREBASE_DOMAIN}/favourites/${petData.userId}.json`, {
        method: 'POST',
        body: JSON.stringify({
            petId: petData.petId,
            pet: petData.pet,
            name: petData.name,
            image: petData.image,
            breeds: petData.breeds,
            gender: petData.gender,
            age: petData.age,
            distance: petData.distance
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Could not save favourite');
    }
    return data.name;
}

export async function getUserFavourites(userId) {
    const response = await fetch(`${FIREBASE_DOMAIN}/favourites/${userId}.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Could not get favourites from database');
    }

    const userFavourites = [];

    for (const key in data) {
        const favObj = {
            fbId: key,
            petId: data[key].petId,
            pet: data[key].pet,
            name: data[key].name,
            image: data[key].image,
            breeds: data[key].breeds,
            gender: data[key].gender,
            age: data[key].age,
            distance: data[key].distance
        }
        userFavourites.push(favObj);
    }

    return userFavourites;
}

export async function deleteFBUserFavourite(petData) {

    const response = await fetch(`${FIREBASE_DOMAIN}/favourites/${petData.userId}/${petData.fbId}.json`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Could not delete favourite');
    }
}