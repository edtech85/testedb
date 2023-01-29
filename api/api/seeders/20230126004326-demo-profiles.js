"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "profiles",
      [
        {
          name: "Edson Costa",
          cpf: "00494306025",
          email: "edson.costa@lit.com.br",
          date_start: "2022-01-03",
          role_id: "3",
          password: "Edson$1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Marcos Sanchez",
          cpf: "11133355577",
          email: "marcos.saanchez@lit.com.br",
          date_start: "2018-02-04",
          role_id: "1",
          password: "Marcos$1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Henrique Valentin",
          cpf: "22244466688800",
          email: "henrique.valentin@lit.com.br",
          date_start: "2020-06-06",
          role_id: "2",
          password: "Henrique$1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("profiles", null, {});
  },
};
