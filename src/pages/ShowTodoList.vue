<template>
  <div class="show-todo-list">
    <h1 class="bg-dark text-white p-5 text-center display-4">Showing Todo List <br/>{{ todoList.name }}</h1>

    <form action="#" class="w-50 mx-auto" @submit.prevent.stop="saveTodoItem()">
      <input type="text" class="form-control" placeholder="Name" v-model="newTodoItemName">
      <input type="submit" value="Save todo item" class="btn btn-primary d-block w-100 mt-2">
    </form>

    <ul class="list-group mx-auto w-50 mt-5">
      <li class="list-group-item" v-for="todoItem in todoListItems">
        <div class="btn-group">
          <a class="btn btn-danger" href="#" @click.prevent.stop="deleteTodoItem(todoItem.id)">Delete</a>
          <a class="btn btn-warning" href="#" @click.prevent.stop="editBtn($event)">Edit</a>
        </div>
        <input type="text" v-model="todoItem.name" class="todoItem"
        @keyup.enter.prevent="editTodoItemName(todoItem.id, todoItem.name, $event)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoList: {},
      todoListItems: [],
      todoListId: this.$route.params.todo_list_id,
      newTodoItemName: '',
    }
  },

  methods: {
    saveTodoItem() {
      this.$http.post('http://localhost:3000/todo_lists/' + this.todoListId + '/todo_list_items', {
        todo_list_item: {
          name: this.newTodoItemName
        }
      }).then(response => {
        if(response.status === 201) {
          this.todoListItems.push(response.body);
          this.newTodoItemName = "";
        }
      });
    },
    deleteTodoItem(id) {
      this.$http.delete('http://localhost:3000/todo_lists/' + this.todoListId + '/todo_list_items/' + id).then(response => {
        if(response.status === 200) {
          this.todoListItems.forEach( (el, index, arr) => {
            if (el.id === id) {
              arr.splice(index, 1);
            }
          });
        }
      });
    },
    editBtn(evt) {
      $(evt.target).parents('.list-group-item').find('input').focus();
    },
    editTodoItemName(id, newName, evt) {
      $(evt.target).blur();
      this.$http.patch('http://localhost:3000/todo_lists/' + this.todoListId + '/todo_list_items/' + id, {
        todo_list_item: {
          id: id,
          name: newName
        }
      }).then(response => {
        if(response.status === 200) {
          console.log("Edited name OK");
        }
      });
    }
  },

  mounted() {
    this.$http.get('http://localhost:3000/todo_lists/' + this.todoListId).then(response => {
      this.todoList = response.body;
    });
    this.$http.get('http://localhost:3000/todo_lists/' + this.todoListId + '/todo_list_items').then(response => {
      this.todoListItems = response.body;
    });
  }
}
</script>

<style>
.todoItem {
  border: 0;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
}

.checkbox {
  width: 30px;
  height: 30px;
}
</style>
