<template>
  <div class="container">
      <div class = "columns">
          <div class="column is-4 is-offset-4 ">
              <h1 class="title">Log In</h1>
              <form  @submit.prevent="submitForm">
                  <div class="field">
                      <label>Email</label>
                      <div class="control">
                          <input type="email" name="email" class="input" v-model="username">
                      </div>
                  </div>
                   <div class="field">
                      <label>Password</label>
                      <div class="control">
                          <input type="password" name="password" class="input" v-model="password">
                      </div>
                  </div>
                  <div class="notification is-danger" v-if="this.errors.length !== 0">
                      <p v-for="error in errors" v-bind:key="error"> {{ error }} </p>
                  </div>
                  <div class="field">
                      <div class="control">
                          <button class="button is-success ">Submit</button>
                      </div>
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
    name: 'LogIn',
    data() {
      return {
          username: '',
          password: '',
          errors: [],
      }  
    },
    methods: {
        async submitForm() {
            this.$store.commit('setIsLoading', true)
            
            this.error = []
            if( this.username === ''){
                this.errors.push('Nome utente mancante')
            }
            
            if( this.password === ''){
                this.errors.push('Inserire una password')
            }

            if(this.errors.length === 0){
                axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem('token')
            
                const formData = {
                    username: this.username,
                    password: this.password
                }
                
                axios
                    .post('/api/v1/token/login', formData)
                    .then(response => {
                        const token = response.data.auth_token
                        this.$store.commit('setToken', token)
                        axios.defaults.headers.common['Authorization'] = 'Token ' + token
                        localStorage.setItem('token', token)
                        this.$store.commit('setIsLoading', false)
                        toast({
                            message: 'Autenticato con successo !',
                            type: 'is-success',
                            dismissable: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right'
                        })
                        this.$router.push('/dashboard/my-account')
                    })
                    .catch(error => {
                        if( error.response){
                            for(const property in error.response.data){
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            this.username = ''
                            this.password = ''
                        }else if (error.message){
                            this.errors.push('Errore imprevisto')
                        }
                    })
                this.$store.commit('setIsLoading', false)
            }
        }
    },
}
</script>