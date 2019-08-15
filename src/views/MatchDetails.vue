<template>
  <div class="MatchDetails">
    

    <div class="" v-show="matchStatus == 'scheduled'">
        <div style="width:80%;float:left;">
            <h3>Match Details</h3>
            <p class="">{{match.start_date_time | moment}}</p>
            <p>{{match.team_1_name}} vs. {{match.team_2_name}}</p>
        </div>
        <button id="kickoff" @click="updateMatchStatus('in_progress')" :disabled="rosterSet<1" class="button large success" style="float:right; margin:1rem;">Kickoff</button>

        <div class="field">
            <div class="roster" style="position:absolute;top:1rem;left:2rem;z-index:2; width:87%;">
                <h3 v-show="rosterSet==-1" style="float:left; color:#f68d1b;text-decoration:underline;text-transform:uppercase;">No roster set!</h3>
                <button id="setRoster" 
                        class="button"
                        style="float:right; margin-top:1rem;" 
                        @click="rosterOpen=true, rosterSet=0">
                            Manage Starting Roster
                </button>
            </div>
            <img src="../assets/field-vertical.png" alt="" />
            <div id="lineup-container" v-show="rosterSet >= 0">
                <div class="player text-center" v-for="player in currentRoster" v-bind:key="player.position">
                    <img src="../assets/jersey-sep.png" style="width:60px" v-show="player.name" />
                    <span class="jersey-number" v-show="player.name">{{player.position}}</span>
                    <p v-show="player.name" class="player-name">{{player.name}}</p>
                </div>
                
            </div>
           
        </div>
        <div class="stats">
            <h3>Stats</h3>
            
        </div>
    </div>

    <div v-show="matchStatus == 'in_progress'" class="">
        <h3><strong>First Half</strong></h3>
        <div 
            style="display:inline-block; width:14%;"
            v-for="player in currentRoster" 
            :key="player.position"
            :id="player.name">
                <div 
                    :id="player.id"
                    class="player-selector text-center" 
                    :data-player-id="player.id"
                    :data-player-name="player.name"
                    @click="setActivePlayer($event)">
                    <div class="team-primary-color background" :data-player-id="player.id" :data-player-name="player.name">
                        <div class="team-secondary-color text" :data-player-id="player.id" :data-player-name="player.name">{{player.position}}</div>
                    </div>
                    <p :data-player-id="player.id">{{player.name}}</p>
                </div>
        </div>
        <div class="button-group-container">
            <div class="button-group">
                <h4>Attack</h4>
                <button @click="addStat($event)" class="button large expanded" value="Pass">Pass</button>
                <button class="button secondary large expanded" value="Handling Error">Handling Error</button>
                <button class="button warning large expanded" value="Turnover Lost">Turnover Lost</button>
                <button class="button alert large expanded" value="Penalty">Penalty</button>
                <button class="button success large expanded" value="Score">Score</button>
            </div>
            <div class="button-group">
                <h4>Defence</h4>
                <button class="button large expanded" value="Tackle Made">Tackle Made</button>
                <button class="button warning large expanded" value="Tackle Missed">Tackle Missed</button>
                <button class="button success large expanded" value="Turnover Won">Turnover Won</button>
                <button class="button alert large expanded" value="Penalty">Penalty</button>
            </div>
            <div class="button-group">
                <h4>Set Pieces</h4>
                <button class="button large expanded" value="Kickoff">Kickoff</button>
                <button class="button large expanded" value="Lineout">Lineout</button>
                <button class="button large expanded" value="Scrum">Scrum</button>
            </div>
            <div class="button-group">
                <h4>Personnel</h4>
                <button class="button large expanded">Substitution</button>
            </div>
        </div>
    </div>

    <div v-show="matchStatus == 'halftime'" class="">
        <h3><strong>Halftime</strong></h3>
        <p>Stats</p>
        <button @click="updateMatchStatus('second_half')" class="button success">Start Half</button>
    </div>

    <div v-show="matchStatus == 'second_half'" class="">
        <h3><strong>Second Half</strong></h3>
        
    </div>

    <footer class="footer">
        <section>
            <article>
                <img v-bind:src="match.home_team_logo" width="35px;" />
            </article>
            <article>
                <span class="score">0</span>
                <span>{{match.team_1_name}}</span>
            </article>
            
        </section>
        <section id="clock">
            <article>
                <button @click="updateMatchStatus('halftime')" v-show="matchStatus == 'in_progress'" class="button" style="margin: 0 auto;">Halftime</button>
                <button @click="updateMatchStatus('complete')" v-show="matchStatus == 'second_half'" class="button" style="margin: 0 auto;">Finish Game and Submit</button>
            </article>
            <article>
                <span id="minutes">{{minutes}}</span>
                <span id="middle">:</span>
                <span id="seconds">{{seconds}}</span>
            </article>
            <article>
                <button v-show="!timeOn && matchStatus !=='scheduled' && matchStatus !== 'halftime'" id="start" @click="startTimer" class="button success" style="margin: 0 auto;">Time On</button>
                <button v-show="timeOn" class="button warning"  style="margin: 0 auto;" @click="stopTimer">Time Off</button>
            </article>
           
            
        </section>
        <section>
            
            <article>
                <span class="score">0</span>
                <span>{{match.team_2_name}}</span>
            </article>
            <article>
                <img v-bind:src="match.away_team_logo" width="35px;" />
            </article>
        </section>
    </footer>
    
    <div class="modal" v-show="rosterOpen">
        <button class="button alert" style="float:right;" @click="rosterOpen=false">Cancel</button>
        <h3>Set Starting Roster</h3>

        <ol id="dropdowns">
            <li class="">
                <select id="1" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
            <li class="">
                <select id="2" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name"
                        :data-first-name="player.first_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
            <li class="">
                <select id="3" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name"
                        :data-first-name="player.first_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
            <li class="">
                <select id="4" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name"
                        :data-first-name="player.first_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
            <li class="">
               <select id="5" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name"
                        :data-first-name="player.first_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
            <li class="">
                <select id="6" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name"
                        :data-first-name="player.first_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
             <li class="">
               <select id="7" @change="setRoster($event)">
                    <option :value="null">Select...</option>
                    <option 
                        v-for="player in players" 
                        :key="player.last_name" 
                        :value="player.id" 
                        :data-last-name="player.last_name"
                        :data-first-name="player.first_name">
                            {{ player.last_name }}, {{player.first_name}}
                    </option>
                </select>
            </li>
        </ol>
        <button class="button large success" @click="rosterOpen=false, rosterCount()">Save</button>
    </div>
    <div class="modal-overlay" id="modal-overlay" v-show="rosterOpen" @click="rosterOpen=false"></div>
  </div>
</template>

<script>
import moment from 'moment'
import Chart from 'chart.js' //still need to figure this shit out, https://alligator.io/vuejs/vue-chart-js/
import JQuery from 'jquery'
let $ = JQuery

import {match} from '../data/match.json'
import {players} from '../data/players.json'

export default {
    data (){
        return{
            timer: null,
            totalTime: null,
            timeOn: false,
            rosterOpen: false,
            rosterSet: -1,
            match,
            players,
            selectedPlayers: [], //players that haven assigned a roster spot
            activePlayer: { //in-game player you want to add stats to
                name: null,
                id: null
            },
            phase: null, //attack, defense, set piece, personnel
            currentRoster: [
                {
                    "position" : "1",
                    "name": null,
                    "id": null
                },
                {
                    "position" : "2",
                    "name": null,
                    "id": null
                },
                {
                    "position" : "3",
                    "name": null,
                    "id": null
                },
                {
                    "position" : "4",
                    "name": null,
                    "id": null
                },
                {
                    "position" : "5",
                    "name": null,
                    "id": null
                },
                {
                    "position" : "6",
                    "name": null,
                    "id": null
                },
                {
                    "position" : "7",
                    "name": null,
                    "id": null
                }
            ],  
            
            stats: {

            }
        }
    },
    computed : {
        matchStatus: function () {
            return this.match.status;
        },
        minutes: function() {
            const minutes = Math.floor(this.totalTime / 60);
            return this.padTime(minutes);
        },
        seconds: function() {
            const seconds = this.totalTime - (this.minutes * 60);
            return this.padTime(seconds);
        },
              
    },
    // beforeRouteEnter (to, from, next) { //get data befre page enter
    //     getMatch(to.params.id, (err, match) => { 
    //     next(vm => vm.setData(err, match))
    //     })
    // },
    methods : {
        updateMatchStatus(e){
            this.match.status = e;
            if (e == 'in_progress') {
                this.startTimer()
            }
            if (e == 'halftime') {
                this.stopTimer()
            }
            if (e == 'second_half') {
                this.startTimer()
            }
            if (e == 'complete') {
                this.stopTimer()
            }
            //update data with whatever value comes through. Not sure what SE is expecting as values. May have different stuff here depnding on if halftime and other values are accpted or not
        },
        setRoster (event){
            let playerId = event.target.value;
            let positionId = event.target.id - 1; //using id-1 to set position in array
            let lastName = document.querySelectorAll("option[value='"+playerId+"']")[0].dataset.lastName;
            let hasValue = false;

            this.$set(this.currentRoster[positionId], 'id', playerId);
            this.$set(this.currentRoster[positionId], 'name', lastName);
        },
        rosterCount(){
            let rosterCount = document.querySelectorAll('option[data-last-name]:checked').length;
            if (rosterCount === 7){
                this.rosterSet = 1;
            }
        },
        setActivePlayer(event){
            let playerId = event.target.dataset.playerId;
            let playerName = event.target.dataset.playerName;
            
            if (this.activePlayer.id === playerId){//if deselecting player
                $('#'+ playerId +'').removeClass('selected');
                this.$set(this.activePlayer, 'id', null)
                this.$set(this.activePlayer, 'name', null)
            } else { //if selecting player
                $('#'+ playerId +'').addClass('selected');
                this.$set(this.activePlayer, 'id', playerId)
                this.$set(this.activePlayer, 'name', playerName)
            }
        },
        addStat(event){
            let person = "Team";
            let action = event.target.value;
            //need to figure out how to add time accurately
            if (this.activePlayer.id != null) {
                person = this.activePlayer.name;
            }
            console.log(person, action, time);
        },
        // setData(err, match) {
        //     if (err) {
        //         this.error = err.toString()
        //     } else {
        //         this.match = match
        //     }
        // },


        //https://codepen.io/Chuloo/pen/xWVpqq sort of
        startTimer: function() {
            this.timer = setInterval(() => this.countdown(), 1000);
            this.timeOn = true;
        },
        stopTimer: function() {
            clearInterval(this.timer);
            this.timer = null;
            this.timeOn = false;
        },
        
        padTime: function(time) {//adds leading 0 if less than 10
            return (time < 10 ? '0' : '') + time;
        },
        countdown: function() {
            //console.log('timer on')
            this.totalTime++;
        },
        
    },
    filters: {
        moment: function (date) {
            return moment(date).format('MM/DD/YYYY');
        },
    },    
}
</script>

<style lang="scss" scoped>
    .team-primary-color.background{
        background:#000;
        width:50px;
        height:50px;
        border-radius:50%;
        margin:0 auto;
    }
    .team-secondary-color.text{
        color:goldenrod;
        font-size:2.1rem;
        font-weight:bold;
    }
    .player-selector {
        cursor: pointer;
        padding:1rem;
        border: 1px solid #2c3e50;
        margin: 0 0.5rem;
        &.selected {
            background:#aaa;
        }
    }
    .field {
        width:45%;
        vertical-align: top;
        display:inline-block;
        padding:1rem;
        position: relative;
        img {
            position:relative;
            z-index: 1;
            width:100%; 
        }

        .button {
            z-index: 2;
            &#kickoff{
                top:80%;
            }
        }
    }
    .stats {
        width:45%;
        display: inline-block;
        vertical-align: top;
        padding:1rem;
    }
    #lineup-container {
        position:absolute;
        width:90%;
        height:80%;
        z-index: 2;
        top:15%;
        left:5%;
        display:grid;
        grid-template-columns: 33% 33% 33%;
        align-items: center;
        .player {
            position: relative;
            max-height:150px;
            .jersey-number {
                position:absolute;
                color:goldenrod; //not sure if team colors are passin in team object or not
                font-size:2em;
                font-weight:bold;
                left:46%;
                top:5px;
                z-index:3
            }
            .player-name {
                font-weight:bold;
                color:white;
                background:#222;
                width:95%;
                padding:.25rem 0;
                margin:0;
            }
        }
        
    }
    ol {
        li {
            margin-bottom:1.5rem;
            padding-left:1rem;
        }
    }
    .footer {
        position:fixed;
        z-index: 100;
        bottom:0;
        left:0;
        width:100%;
        background: #222;
        color:white;
        display: grid;
        grid-template-columns: 33% 33% 33%;
        align-items: center;
        justify-items: stretch;
        &>section {
            display:grid;
            grid-template-columns: 50% 50%;
            align-items: center;
            justify-items: stretch;
            text-align: center;
            &#clock{
                display:grid;
                font-size: 1.75rem;
                font-weight: bold;
                grid-column-gap: 5px;
                grid-template-columns: 33% 33% 33%;
                align-items: center;
                justify-items: center;
            }
            article {
                text-align: center;
                justify-self: stretch;
            }
            img {
                display:block;
                margin: 0 auto;
            }
            .score {
                display: block;
                font-size:2rem;
                font-weight: bold;
            }
        }
    }
    .button-group-container {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 25% 25% 25% 25% ;
    }
    
</style>
