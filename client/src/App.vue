<template>
  <div id="app">
    <div class="header-section">
    <h1>To-Do List:</h1>
    <img src="../images/todo-img.png">
    </div>
<hr />
      <div class="input-form">
        <input class="input" v-model="description" type="text" placeholder="Lägg till en aktivitet..." />
      <button>
        <a class="btn" @click="addItem">Lägg till</a>
        </button>
        </div>
    <div class="not" v-for="(item, i) in items" :key="item._id">
      <div class="post-column">
       /* <input class="edit-column" v-if="isSelected(item)" v-model="editedDescription" />
        <p v-else class="column">
          {{ i + 1 }}
        {{ item.description }}
      </p>
      <div id="icons">
        <div class="icon-field-remove" @click="removeItem(item, i)">
          <i class="material-icons">delete</i>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {}
      };
    },
    async mounted() {
      const response = await axios.get("api/todoListItems/")
      this.items = response.data;
    },
    methods: {
      async addItem() {
        const response = await axios.post("api/todoListItems/", { 
          description: this.description 
          });
          this.items.push(response.data);
          this.description = "";
        },
        async removeItem(item, i) {
          await axios.delete("api/todoListItems/" + item._id);
          this.items.splice(i, 1);
        },
        isSelected(item) {
          return item._id == this.selected._id;
        },
        async updateItem(item, i) {
          const response = await axios.put("api/todoListItems/" + item._id, {
            description: this.editedDescription
          });
          this.items[i] = response.data;
          this.unselect();
        }
     }
};
</script>