<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  components: {
    Nav
  }
}
</script>


<style lang="scss">
$blue: dodgerblue;
$success: #4fb153;
$warning: #f68d1b;
$alert: #fa5055;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nomargin {
  margin:0;
}

.button {
  padding:.5rem .8rem;
  background: $blue;
  color:white;
  border: 1px solid darken($blue, 5%);
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight:bold;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  display: block;
  &.large {
    padding: 1rem 1.5rem;
  }
  
    &:hover {
      background: darken($blue, 10%);
      border: 1px solid darken($blue, 15%);
    }
    &.nomargin {
      margin:0;
    }
    &.success {
      background: $success;
      border: 1px solid darken($success, 5%);
      &:hover {
        background: darken($success, 10%);
        border: 1px solid darken($success, 15%);
      }
    }
    &.warning {
      background: $warning;
      border: 1px solid darken($warning, 5%);
      color:#222;
      &:hover {
        background: darken($warning, 10%);
        border: 1px solid darken($warning, 15%);
      }
    }
    &.alert {
      background: $alert;
      border: 1px solid darken($alert, 5%);
      &:hover {
        background: darken($alert, 10%);
        border: 1px solid darken($alert, 15%);
      }
    }
    &.expanded {
      width:100%
    }
    &.secondary {
      background: #2c3e50;
      border: 1px solid darken(#2c3e50, 5%);
      &:hover {
        background: darken(#2c3e50, 10%);
        border: 1px solid darken(#2c3e50, 15%);
      }
    }
    
    &:disabled {
      background: #999;
      color: #ccc;
      border-color: #888;
      cursor: default;
      &:hover {
       background: #999;
        color: #ccc;
        border-color: #888; 
      }
    }

  }

  select {
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 100%;
    max-width: 100%; 
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;

    &::-ms-expand {
        display: none;
    }
    &:hover {
        border-color: #888;
    }
    &:focus {
        border-color: #aaa;
        box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: #222; 
        outline: none;
    }
  }
select option {
    font-weight:normal;
}

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width:600px;
        max-width:100%;
        height:90%;
        max-height:100%;
        background: white;
        z-index: 100;
        padding:1rem;
        animation: fadein 0.3s;
    }
    .modal-overlay {
        z-index: 99;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,0.5);
        animation: fadein 0.3s;
        cursor: pointer;
    }
    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
.text-center {
  text-align: center;
}


</style>
