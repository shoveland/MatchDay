<template>
  <nav>
    <h1><router-link to="/">MatchDay</router-link></h1>
    <img class="team-logo" v-bind:src="myTeamLogo" />  
    <span>{{user.firstName}} {{user.lastName}}</span>
      
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    //msg: String
  },
  data (){
      return {
          user: {
              firstName: 'Seth',
              lastName: 'Hoveland',
          },
          myTeamLogo: 'https://cdn4.sportngin.com/attachments/team/4905/0960/sep_large_square.jpg' //should this be in the store?
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    nav {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 60% 20% 20%;
        align-items: center;
        border-bottom: 1px solid #ccc;
        h1{
          a{
            text-decoration: none;
            color: #2c3e50;
          }
        }
    }
    
    .team-logo {
        max-width:35px;
        justify-self: right;
    }
</style>