import React, { useState } from "react";
import "../src/style/formTabs.css";
import { validate } from "cpf-check";
import logo from "./img/lit-logo.svg";
import { Tabs, Tab, TabPanel } from "react-tabs";
import { useEffect } from "react";
import axios from "axios";

function addNewRole() {
  alert(`Cargo Criado!`);
}

function FormTabs() {
  const [currentTab, setCurrentTab] = useState(0);

  const [formData, setFormData] = useState({
    id_profile: "",
    name: "",
    cpf: "",
    email: "",
    date_start: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.cpf ||
      !formData.date_start ||
      !formData.id_profile ||
      // !formData.role ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Por favor preencha todos os campos obrigatórios");
    } else if (!validate(formData.cpf)) {
      alert("CPF inválido, por favor verifique se digitou corretamente");
    } else if (formData.password.length < 8) {
      alert("Senha precisa ter pelo menos 8 caracteres");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/.test(formData.password)
    ) {
      alert(
        "Senha precisa ter pelo menos uma letra maiúscula, uma minúscula e um caractere especial"
      );
    } else if (!formData.confirmPassword) {
      alert("Confirmação de senha é obrigatório");
    } else if (formData.password !== formData.confirmPassword) {
      alert("Senhas não correspondem");
    } else {
      await console.log(formData);
      alert("Dados envaidos para o console.");
    }
  };

  return (
    <Tabs
      className="tab-center-tabs"
      selectedIndex={currentTab}
      onSelect={setCurrentTab}
    >
      <div className="tab-center-div">
        <Tab className="tab-list tabs-tab tabs-tab--selected tab-center-tab">
          Cadastrar
        </Tab>
        <Tab className="tab-list tabs-tab tabs-tab--selected tab-center-tab">
          Consultar
        </Tab>
        <Tab className="tab-list tabs-tab tabs-tab--selected tab-center-tab">
          Atualizar
        </Tab>
        <Tab className="tab-list tabs-tab tabs-tab--selected tab-center-tab">
          Excluir
        </Tab>
      </div>
      <TabPanel className="tabs-tab-panel">
        <InsertTab
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </TabPanel>
      <TabPanel className="tabs-tab-panel">
        <ReadTab
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </TabPanel>
      <TabPanel className="tabs-tab-panel">
        <UpdateTab
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </TabPanel>
      <TabPanel className="tabs-tab-panel">
        <DeleteTab
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </TabPanel>
    </Tabs>
  );
}

function InsertTab({ formData, handleChange, handleSubmit }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  //subi o json dos cargos para o github, pois a api para o mysql é no localhost
  useEffect(() => {
    axios
      .get("https://edtech85.github.io/testedb/roles.json")
      .then((response) => setRoles(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSelectChange = (event) => {
    setSelectedRole(roles.find((role) => role.id === event.target.value));
  };
  // eslint-disable-next-line
  const role = roles.find((role) => role.id === selectedRole);
  return (
    <form className="form form-border-logo" onSubmit={handleSubmit}>
      <img src={logo} className="form-logo" alt="Logo da empresa" />
      <label>Cadastrar Novo Usuário:</label>
      <label>
        {" "}
        Nome:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        {" "}
        CPF:
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
      </label>

      <label>
        {" "}
        E-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        {" "}
        Matrícula:
        <input
          type="text"
          name="id_profile"
          value={formData.id_profile}
          // como a matricula(id_profile) tem o incremente de 1 e é um dado único não pode ser inserida
          //readOnly
          onChange={handleChange}
        />
      </label>

      <label>
        {" "}
        Cargo:
        <select onChange={handleSelectChange}>
          <option value={0}>Selecione</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              ID: {role.id}, Cargo: {role.role_name},
            </option>
          ))}
        </select>
      </label>
        <input type="button" value="Criar Cargo" onClick={addNewRole} />
        <br />

      <label>
        {" "}
        Data de contratação:
        <input
          type="date"
          name="date_start"
          value={formData.date_start}
          onChange={handleChange}
        />
      </label>

      <label>
        {" "}
        Senha:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* a tag text abaixo mostra o password */}
        <text>{formData.password}</text>
      </label>

      <label>
        {" "}
        Confirmar Senha:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {/* a tag text abaixo mostra o password */}
        <text>{formData.confirmPassword}</text>
      </label>

      <button type="submit">Cadastrar</button>
      <br />
    </form>
  );
}

// function ReadTab({ handleChange, handleSubmit }) {
//   const [profiles, setProfiles] = useState([]);
//   const [selectedUser, setSelectedUser] = useState({});

//   useEffect(() => {
//     axios
//       .get("https://edtech85.github.io/testedb/profiles.json")
//       .then((response) => setProfiles(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   const handleSelectChange = (event) => {
//     setSelectedUser(profiles.find((user) => user.id === event.target.value));
//   };
//   const user = profiles.find((user) => user.id === selectedUser);
//   return (
//     <form className="form form-border-logo" onSubmit={handleSubmit}>
//       <img src={logo} className="form-logo" alt="Logo da empresa" />
//       <label>Consultar Cadastro do Usuário:</label>

//       <label>
//         {" "}
//         Selecione um usuário
//         <select onChange={handleSelectChange}>
//           <option value={0}>Selecione um usuário</option>
//           {profiles.map((user) => (
//             <option key={user.id} value={user.id}>
//               ID: {user.id}, Nome: {user.name},
//             </option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Nome:
//         <input
//           type="text"
//           name="name"
//           value={selectedUser.name}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         CPF:
//         <input
//           type="text"
//           name="cpf"
//           value={selectedUser.cpf}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         E-mail:
//         <input
//           type="email"
//           name="email"
//           value={selectedUser.email}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Matrícula:
//         <input
//           type="text"
//           name="id_profile"
//           value={selectedUser.id_profile}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Cargo:
//         <input
//           type="text"
//           name="role"
//           value={selectedUser.role}
//           onChange={handleChange}
//         />
//       </label>

//       <label>
//         Data de contratação:
//         <input
//           type="date"
//           name="date_start"
//           value={selectedUser.date_start}
//           onChange={handleChange}
//         />
//       </label>

//       <button type="submit">Consultar</button>
//     </form>
//   );
// }

function ReadTab({ handleChange, handleSubmit }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  // useEffect(() => {
  //   axios
  //     .get("https://edtech85.github.io/testedb/profiles.json")
  //     .then((response) => setProfiles(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "https://edtech85.github.io/testedb/profiles.json"
      );
      setUsers(response.data);
      console.log('response.data linha 358');
      console.log(response.data);
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    console.log('selectedUserId linha 367')
    console.log(selectedUserId)

    if (selectedUserId === "") {
      setSelectedUser(null);
    } else {
      const selectedUser = users.find(user => user.id === selectedUserId);
      setSelectedUser(selectedUser);
      console.log('selectedUserId linha374')
      console.log(selectedUserId.name)
    }
  };


 

  return (


    
    <form className="form form-border-logo" onSubmit={handleSubmit}>
      <img src={logo} className="form-logo" alt="Logo da empresa" />
      <label>Consultar Cadastro do Usuário:</label>

      <label>
        {" "}
        Selecione um usuário
        <select onChange={handleUserChange}>
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              ID: {user.id}, Nome: {user.name},
            </option>
          ))}
        </select>
      </label>

      {/* <label>
        {" "}
        Selecione um usuário
        <select onChange={handleSelectChange}>
          <option value={0}>Selecione um usuário</option>
          {profiles.map((user) => (
            <option key={user.id} value={user.id}>
              ID: {user.id}, Nome: {user.name},
            </option>
          ))}
        </select>
      </label> */}

      {selectedUser.id && (
        
        <div>
          <label>
            Nome:
            <input type="text" name="name" value={selectedUser.name} readOnly onChange={handleUserChange}/>
          </label>

          <label>
            CPF:
            <input type="text" name="cpf" value={selectedUser.cpf} readOnly />
          </label>

          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={selectedUser.email}
              readOnly
            />
          </label>

          <label>
            Matrícula:
            <input
              type="text"
              name="id_profile"
              value={selectedUser.id_profile}
              readOnly
            />
          </label>

          <label>
            Cargo:
            <input type="text" name="role" value={selectedUser.role} readOnly />
          </label>

          <label>
            Data de contratação:
            <input
              type="date"
              name="date_start"
              value={selectedUser.date_start}
              readOnly
            />
          </label>

          <button type="submit">Consultar</button>
        </div>
      )}
    </form>
  );
}

function UpdateTab({ formData, handleChange, handleSubmit }) {
  return (
    <form className="form form-border-logo" onSubmit={handleSubmit}>
      <img src={logo} className="form-logo" alt="Logo da empresa" />
      <label>Atualizar Cadastro do Usuário:</label>
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
      </label>

      <label>
        E-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Matrícula:
        <input
          type="text"
          name="id_profile"
          value={formData.id_profile}
          onChange={handleChange}
        />
      </label>

      <label>
        Cargo:
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </label>

      <label>
        Data de contratação:
        <input
          type="date"
          name="date_start"
          value={formData.date_start}
          onChange={handleChange}
        />
      </label>

      <label>
        {" "}
        Senha:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>

      <label>
        Confirmar Senha:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Atualizar</button>
      <br />
    </form>
  );
}

function DeleteTab({ formData, handleChange, handleSubmit }) {
  return (
    <form className="form form-border-logo" onSubmit={handleSubmit}>
      <img src={logo} className="form-logo" alt="Logo da empresa" />
      <label>Excluir Usuário:</label>
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
        />
      </label>

      <label>
        E-mail:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Matrícula:
        <input
          type="text"
          name="id_profile"
          value={formData.id_profile}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Excluir</button>
      <br />
    </form>
  );
}

export default FormTabs;
