<template>
  <div class="index">
    <h1 class="display-4 text-center mt-5 mb-4">New Team</h1>

    <form action="#" class="w-50 mx-auto" @submit.prevent.stop="submitForm($event)">
      <p>
        <input type="text" class="form-control" v-model="newTeamInput">
      </p>
      <p class="text-center">
        <input type="submit" class="btn btn-primary text-white d-block w-100" value="New Team">
      </p>
    </form>

    <h1 class="display-4 text-center mt-5">List teams</h1>
    <div class="columns w-75 mx-auto">
      <div class="card mx-auto mb-3 d-inline-block" v-for="team in teams">
        <div class="card-body">
          <h5 class="card-title">
            <input type="text" @click.prevent.stop
            v-model="team.name" class="team-name-field"
            @keyup.enter="saveNewTeamName(team.id, team.name)">
          </h5>
          <div class="card-text">{{ team.description }}</div>
          <div class="btn-group d-block pt-3 clearfix">
            <a class="btn btn-primary w-25 float-left" href="#" @click.prevent.stop="clickCard(team.id)">See Team</a>
            <a class="btn btn-danger w-25 float-left" href="#" @click.prevent.stop="deleteTeam($event, team.id)">Delete</a>
            <a class="btn btn-warning w-25 float-left" href="#" @click.prevent.stop="editTeam($event, team.id)">Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [],
      newTeamInput: '',
      editMode: false
    }
  },
  methods: {
    clickCard(teamId) {
      this.$router.push({name: 'ShowTeam', params: { id: teamId }});
    },
    submitForm(evt) {
      this.$http.post('http://localhost:3000/teams', {
        name: this.newTeamInput
      }).then(response => {
        var name = this.newTeamInput;
        this.teams.push({ name: name, id: response.body.id });
        this.newTeamInput = "";
      })
    },
    deleteTeam(evt, id) {
      this.$http.delete('http://localhost:3000/teams/' + id).then(response => {
        if(response.status === 200) {
          this.teams.forEach((team, index, arr) => {
            if(team.id === id) {
              arr.splice(index, 1)
            }
          });
        }
      });
    },
    editTeam(evt, id) {
      $(evt.target).parents('.card').find('.team-name-field').focus();
    },

    saveNewTeamName(id, teamName) {
      this.$http.patch('http://localhost:3000/teams/' + id, {
        team: {
          name: teamName
        }
      }).then(response => {
        console.log(response);
        document.activeElement.blur();
      });
    }
  },
  created() {
    var that = this;
    this.$http.get('http://localhost:3000/teams').then(response => {
      that.teams = response.body;
    }, err => {
      console.log(err);
    });
  }
}
</script>

<style scoped lang="scss">
.card {
  &:hover {
    background: #E4E4E4;
  }
}

.team-name-field {
  border: 0;
  padding: 1rem;
  cursor: default;
}

a {
  display: block;
  width: 100%;
}

.columns {
  display: column;
  column-count: 2;

  .card {
    width: 100%;
  }
}
</style>
