const database = require('../models')

class PofileController {
    static async selectAllPeople(req, res){
      try {
        const allPeople = await database.profiles.findAll()
        return res.status(200).json(allPeople)  
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }

    // selectOnePerson

    static async selectOnePerson(req, res) {
        const { id } = req.params;
        try {
          const onePerson = await database.sequelize.query(
            `select * from profiles where id=${id}`
          );
          return res.status(200).json(onePerson);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

    // createPerson

    static async createPerson(req, res) {
        const newPerson = req.body;
        try {
          const NewCreatedPerson = await database.profiles.create(newPerson);
          return res.status(200).json(NewCreatedPerson);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

    // updatePerson
    // inativatePerson
    // deletePerson



}

module.exports = PofileController