<template>
    <v-sheet max-width="300" height="300" class="mx-auto" >
      <v-form fast-fail @submit.prevent v-model="isFormValid">
        
        <v-text-field
          v-model="userName"
          required
          clearable
          clear-icon="mdi-close"
          variant="solo-filled"
          class="mb-2"
          :rules="emailRules"
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          required
          clearable
          clear-icon="mdi-close"
          variant="solo-filled"
          class="mb-2"
          :rules="pwdRules"
          label="Password"
          counter
          minlength="6"
        ></v-text-field>

        <v-btn
          :loading="loading"
          type="submit"
          block
          class="mt-2"
          text="Login"
          :disabled="!isFormValid"
          @click="connect"
        ></v-btn>

        <v-btn
          block
          class="mt-2"
          text="Register"
          @click="createAccount"
        ></v-btn>
      </v-form>
    </v-sheet>
  </template>
  
<script setup lang="ts">
    import { ref, defineEmits, reactive } from 'vue'
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
    import { useCurrentUser, useFirebaseAuth } from 'vuefire';

    const userName = ref(null)
    const password = ref(null)
    const loading = ref(false)
    const isFormValid = ref(false)
    const emit = defineEmits(['signInSuccess'])
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const emailRules = [
        value => {
          let val:string = value as string
          if (value 
            && emailRegex.test(val)) 
                return true

          return 'You must enter a valid email.'
        },
    ]

    const pwdRules = [
        value => {
            if (value && ((value as string).length >= 6)) return true

            return 'You must enter a password of minimum 6 characters.'
        },
    ]

    function createAccount() {
        const auth = useFirebaseAuth() // only exists on client side
        createUserWithEmailAndPassword(auth, userName.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                userName.value = ""
                password.value = ""
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Failed to login " + errorMessage + " code ["+errorCode +"]")
            })
    }

    function connect() {
        const auth = useFirebaseAuth() // only exists on client side
        signInWithEmailAndPassword(auth, userName.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                userName.value = ""
                password.value = ""
                const userFire = useCurrentUser()
                console.log("Get User UID " + userFire.value.uid)
                emit('signInSuccess')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Failed to login " + errorMessage + " code ["+errorCode +"]")
            })
    }


</script>