<template>
  <div class="container">
      <div class = "columns is-multiline">
          <div class="column is-12">
              <h1 class="title">My Account</h1>
          </div>
      </div>
      <div class="column is-12">
          <button @click ="logout()" class="button is-danger">Log Out</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
    name: 'MyAccount',
    methods: {
        async logout() {
             await axios
                .post('/api/v1/token/logout')
                .then(response => {
                    console.log('Logged Out ' + JSON.stringify(response))
                })
                .catch(error => {
                   console.log(JSON.stringify(error)) 
                })
            toast({
                message: 'Arrivederci !',
                type: 'is-danger',
                dismissable: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right'
            })
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('token')
            this.$store.commit('removeToken')
            this.$router.push('/log-in')
        }
    }
}
</script>