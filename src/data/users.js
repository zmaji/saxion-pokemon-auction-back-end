const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

module.exports = [
    {
        userID: 1,
        roleID: 2,
        firstName: 'Ash',
        lastName: 'Ketchum',
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
        email: 'mistyKasumi@pokemon.com',
        password: bcrypt.hashSync('iLikeWater', 12), // iLikeWater,
        secret: uuidv4(),
        city: 'Cerulian City',
        address: 'pond 33',
        zipCode: '9540 CT',
        roles: ['user']
    }
]