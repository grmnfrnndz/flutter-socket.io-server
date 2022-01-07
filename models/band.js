const { v4: uuidV4 } = require('uuid');


class Band{


    // npm install uuid => sirve para generar id unicos

    constructor(
        name= 'no-name'
    ) {
        this.id = uuidV4(); // identificador unico
        this.name = name;
        this.votes = 0;
    }


}



module.exports = Band;
