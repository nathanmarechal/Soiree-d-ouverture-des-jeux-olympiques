<template>
    <div class="user-list">
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Role</th>
            <th>Nom du stand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="index">
            <td>{{ user.prenom }}</td>
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>
            <td>{{ getRoleName(user.id_role) }}</td>
            <td>{{ user.stand ? user.stand.nom_stand : '-' }}</td>
            <td>
              <button class="blue-button" @click="editUser(index)">Modifier</button>
              <button class="red-button" @click="deleteUser(index)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: {
        type: Array,
        required: true,
      },
      filteredUsers: {
        type: Array,
        required: true,
      },
    },

    methods: {
      editUser(index) {
        this.$emit('edit-user', index);
      },
      deleteUser(index) {
        this.$emit('delete-user', index);
      },
/*
        DeleteUser(id) {
          return axios.delete(`${API_URL}/utilisateur/${id}`)
        }

 */
        getRoleName(id_role) {
          switch (id_role) {
            case 1:
              return 'Administrateur';
            case 2:
              return 'Prestataire';
            default:
              return 'Unknown Role';
          }
        }
    },
  };
  </script>
  
  <style scoped>
  .user-list {
    margin-top: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .red-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .blue-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #4d79ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }
  
  .blue-button:hover {
    background-color: #1a53ff;
  }
  
  .red-button:hover {
    background-color: #e60000;
  }

  </style>