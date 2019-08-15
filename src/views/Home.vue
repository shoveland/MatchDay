<template>
  <div class="home">
    <h3>Upcoming</h3>
    <!-- Set my team id in store on login, in request get matches where match date = today and team_instance_id = my team -->
        <div v-for="match in matches" v-bind:key="match.start_date_time" class="match">
            <div class="opponent">
              Opponent: {{match.team_2_name}}
            </div>
            <div class="date">
              Date: {{match.start_date_time | moment}}
            </div>
            <div class="open">
              <router-link class="button nomargin" :to="{name:'MatchDetails', params: {id:match.id}}">Open</router-link>
            </div>
        </div> 
  </div>
</template>

<style lang="scss" scoped>
.match {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 33% 33% 33% ;
  border-bottom: 1px dashed #666;
  &:nth-of-type(even) {
    background: #eee;
  }
}
.opponent, .date {
  padding:1rem;
}
.open {
  padding:.75rem;
  justify-self: center;
  
}
</style>


<script>
// @ is an alias to /src

import moment from 'moment'

export default {
  name: 'home',
  data () {
    return {
      myTeam: '1876243', //this will live in the store (and localstorage?) and persist
      matches: [
        {
          "id": 13557134,
          "team_1_id": 1876243,
          "team_1_name": "Dowling",
          "team_1_is_home": true,
          "team_2_id": 1876249,
          "team_2_name": "Iowa City",
          "status": "scheduled",
          "start_date_time": "2016-04-28T13:15:00-05:00",
          "local_timezone": "US/Central",
          "home_team_logo": null,
          "away_team_logo": null,
          "home_team_logo_large_square": 'https://cdn3.sportngin.com/attachments/team/4905/0843/dowling_large_square.jpg',
          "away_team_logo_large_square": 'https://cdn3.sportngin.com/attachments/team/4834/5035/B-EtG81CYAEUUmr_large_square.jpg',
        },
        {
          "id": 13557137,
          "team_1_id": 1876243,
          "team_1_name": "Urbandale",
          "team_1_is_home": true,
          "team_2_id": 1876249,
          "team_2_name": "SE Polk",
          "status": "scheduled",
          "start_date_time": "2016-04-28T13:15:00-05:01",
          "local_timezone": "US/Central",
          "home_team_logo": null,
          "away_team_logo": null,
          "home_team_logo_large_square": 'https://cdn4.sportngin.com/attachments/team/4905/0989/urb_large_square.jpg',
          "away_team_logo_large_square": 'https://cdn3.sportngin.com/attachments/team/4905/0960/sep_large_square.jpg',
        }
      ]
    }
  },
  methods: {
    
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MM/DD/YYYY');
    }
  },
  components: {
    
  }
}
</script>