const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

module.exports = [
    {
        userID: 1,
        roleID: 2,
        firstName: 'Ash',
        lastName: 'Ketchum',
        avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/85a954df-43b3-4b66-9e8d-94fe01b0451f/da9k0wb-1ae6c8d8-0b1f-46db-a6c9-3f9b44fc29bc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg1YTk1NGRmLTQzYjMtNGI2Ni05ZThkLTk0ZmUwMWIwNDUxZlwvZGE5azB3Yi0xYWU2YzhkOC0wYjFmLTQ2ZGItYTZjOS0zZjliNDRmYzI5YmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ySQkI8GmpoOQ3KvsCwlwXd1l_QjJ7DsuqmcGP9fwnsE',
        email: 'ashKetchum@pokemon.com',
        password: bcrypt.hashSync('GottaCatchEmAll', 12), // GottaCatchEmAll
        secret: uuidv4(),
        city: 'PalletTown',
        address: 'OakRoad 12',
        zipCode: '5690 PT',
        roles: ['admin', 'user']
    },
    {
        userID: 2,
        roleID: 1,
        firstName: 'Brock',
        lastName: 'Harrison',
        avatar: 'https://e7.pngegg.com/pngimages/335/411/png-clipart-brock-pikachu-groudon-pokemon-diamond-and-pearl-ash-ketchum-pikachu-game-child.png',
        email: 'brockHarrison@pokemon.com',
        password: bcrypt.hashSync('pebbleMan', 12), // pebbleMan
        secret: uuidv4(),
        city: 'Pewter City',
        address: 'rockyMountains 3',
        zipCode: '8721 PC',
        roles: ['user']
    },
    {
        userID: 3,
        roleID: 1,
        firstName: 'Misty',
        lastName: 'Kasumi',
        avatar: 'https://cdn2.bulbagarden.net/upload/thumb/b/b1/Misty_AG.png/200px-Misty_AG.png',
        email: 'mistyKasumi@pokemon.com',
        password: bcrypt.hashSync('iLikeWater', 12), // iLikeWater,
        secret: uuidv4(),
        city: 'Cerulian City',
        address: 'pond 33',
        zipCode: '9540 CT',
        roles: ['user']
    }
]