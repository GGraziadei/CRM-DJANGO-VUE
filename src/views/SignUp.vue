<template>
  <div class="container">
      <div class = "columns">
          <div class="column is-4 is-offset-4 ">
              <h1 class="title">Sign Up</h1>
              <form @submit.prevent="submitForm">
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
                  <div class="field">
                      <label>Repeat Password</label>
                      <div class="control">
                          <input type="password" name="password2" class="input" v-model="password2">
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
    name: 'SignUp',
    data() {
      return {
          username: '',
          password: '',
          password2: '',
          errors: [],
      }  
    },
    methods: {
        async submitForm() {
            this.error = []
            this.$store.commit('setIsLoading', true)
            
            if( this.username === ''){
                this.errors.push('Nome utente mancante')
            }
            
            if( this.password === ''){
                this.errors.push('Inserire una password')
            }
            
            if( this.password2 === ''){
                this.errors.push('Inserire conferma password')
            }
             
            if( this.password !== this.password2){
                this.errors.push('Le passowrd immesse non matchano')
            }
            
            if(this.errors.length === 0){
                const formData = {
                    username: this.username,
                    password: this.password
                }
                
                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                        this.$store.commit('setIsLoading', false)
                        
                        toast({
                            message: 'Account creato con successo',
                            type: 'is-success',
                            dismissable: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right'
                        })
                        
                        this.$router.push('/log-in')
                    })
                    .catch(error => {
                        if( error.response){
                            for(const property in error.response.data){
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
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