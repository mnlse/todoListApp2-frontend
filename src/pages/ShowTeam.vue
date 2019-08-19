<template>
  <div class="todo-lists">
    <h1 class="text-center display-4 bg-dark text-white p-5">Showing team {{ $route.params.id }}</h1>

    <form action="#" class="w-50 mx-auto" 
      @submit.prevent.stop="submitForm()">
      <h5 class="text-center mt-3">New Todo List</h5>
      <input type="text" class="form-control" 
      v-model="newTodoListInput">
      <input type="submit" class="btn btn-primary btn-block mt-3">
    </form>

    <h1 class="display-4 text-center mt-5">Listing todo lists</h1>

    <div class="card w-50 mx-auto mt-2" v-for="todoList in todoLists">
      <div class="card-body">
        <h5 class="card-title">
          <input type="text" v-model="todoList.name" class="todoListNameInput" 
          @keyup.enter.stop="newTodoListName(todoList.id, todoList.name, $event)">
        </h5>
        <div class="btn-group">
          <a class="btn btn-primary" href="#" @click.prevent="showTodoList(todoList.id)">See todo list</a>
          <a class="btn btn-danger" href="#" @click.prevent="deleteTodoList(todoList.id)">Delete</a>
          <a class="btn btn-warning" href="#" @click.prevent="editTodoList($event)">Edit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoLists: [],
      newTodoListInput: '',
      id: this.$route.params.id
    }
  },
  methods: {
    submitForm() {
      this.$http.post('http://localhost:3000/teams/' + this.id + '/todo_lists', {
        todo_list: {
          name: this.newTodoListInput
        }
      }).then(response => {
        if(response.status === 201) {
          this.todoLists.push(response.body);
        }
      });
    },
    deleteTodoList(id) {
      this.$http.delete('http://localhost:3000/teams/' + this.id + '/todo_lists/' + id).then(response => {
        if(response.status === 200) {
          this.todoLists.forEach( (el, index, array) => {
            if(el.id === id) {
              array.splice(index, 1);
            }
          });
        }
      });
    },
    showTodoList(id) {
      this.$router.push({ name: 'ShowTodoList', params: { todo_list_id: id } })
    },
    newTodoListName(id, newName, evt) {
      this.$http.patch('http://localhost:3000/teams/' + this.id + '/todo_lists/' + id, {
        todo_list: {
          name: newName
        }
      }).then(response => {
        if(response.status === 200) {
          $(evt.target).blur();
        }
      });
    },
    editTodoList(evt) {
      $(evt.target).parents('.card-body').find('input').focus();
    }
  },
  mounted() {
    this.$http.get('http://localhost:3000/teams/' + this.id + '/todo_lists').then(response => {
      this.todoLists = response.body;
      console.log(response);
    });
  }
}
</script>

<style>
input.todoListNameInput {
  border: 0;
}
</style>
