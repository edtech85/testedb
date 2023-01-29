const database = require("../models");

class RoleController {
  static async selectAllRoles(req, res) {
    try {
      const allRoles = await database.roles.sequelize.query(
        `select * from roles`
      );
      return res.status(200).json(allRoles);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async selectOneRole(req, res) {
    const { id } = req.params;
    try {
      const oneRole = await database.sequelize.query(
        `select * from roles where id=${id}`
      );
      return res.status(200).json(oneRole);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createRole(req, res) {
    const newRole = req.body;
    try {
      const NewCreatedRole = await database.roles.create(newRole);
      return res.status(200).json(NewCreatedRole);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }


  static async updateRole(req, res) {
    const { id } = req.params;
    const newInfo = req.body;
    try {
      await database.roles.update(newInfo, { where: { id: Number(id) } });
      const updatedRole = await database.roles.sequelize.query(
        `select * from roles where id=${id}`
      );
      return res.status(200).json(updatedRole);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteRole(req, res) {
    const { id } = req.params;
    try {
      await database.roles.destroy({ where: { id: Number(id) } });
      return res.status(200).json({ mensagem: `Cargo id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // até aqui

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const newInfo = req.body;
    try {
      await database.Matriculas.update(newInfo, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const MatriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(MatriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) } });
      return res.status(200).json({ mensagem: `id ${matriculaId} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = RoleController;
