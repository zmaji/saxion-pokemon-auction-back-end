module.exports = [
    {
        userID: 1,
        roleID: 1,
        firstName: 'Ash',
        lastName: 'Ketchum',
        email: 'ashKetchum@pokemon.com',
        password: 'GottaCatchEmAll',
        city: 'PalletTown',
        address: 'OakRoad 12',
        zipCode: '5690 PT',
        pokemonCards: [
            {
                cardID: 1,
                userID: 1,
                name: 'Pikachu',
                startingAmount: 20,
                imageURL: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F03%2FCute-Pikachu-Wallpapers-HD-free-download.png&f=1&nofb=1',
                availabilityDate: '10-9-2021',
                cardType: 'Pokemon',
                rarity: 'Rare',
                element: 'Electric',
                weakness: 'Grass',
                resistance: 'Electric'
            },
            {
                cardID: 3,
                userID: 1,
                name: 'Charmander',
                startingAmount: 35,
                imageURL: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
                availabilityDate: '25-9-2021',
                cardType: 'Pokemon',
                rarity: 'Rare',
                element: 'Fire',
                weakness: 'Water',
                resistance: 'Grass'
            }
        ]
    },
    {
        userID: 2,
        roleID: 1,
        firstName: 'Brock',
        lastName: 'Harrison',
        email: 'brockHarrison@pokemon.com',
        password: 'pebbleMan',
        city: 'Pewter City',
        address: 'rockyMountains 3',
        zipCode: '8721 PC',
        pokemonCards: [
            {
                cardID: 4,
                userID: 2,
                name: 'Bulbasaur',
                startingAmount: 50,
                imageURL: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
                availabilityDate: '27-9-2021',
                cardType: 'Pokemon',
                rarity: 'Rare',
                element: 'Grass',
                weakness: 'Fire',
                resistance: 'Water'
            }
        ]
    },
    {
        userID: 3,
        roleID: 1,
        firstName: 'Misty',
        lastName: 'Kasumi',
        email: 'mistyKasumi@pokemon.com',
        password: 'iLikeWater',
        city: 'Cerulian City',
        address: 'pond 33',
        zipCode: '9540 CT',
        pokemonCards: [
            {
                cardID: 2,
                userID: 3,
                name: 'Squirtle',
                startingAmount: 40,
                imageURL: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
                availabilityDate: '22-9-2021',
                cardType: 'Pokemon',
                rarity: 'Rare',
                element: 'Water',
                weakness: 'Electric',
                resistance: 'Fire'
            }
        ]
    }
]