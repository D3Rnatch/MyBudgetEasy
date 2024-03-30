<template>
    <v-card
        color="background"
    >
        <v-toolbar
            color="primary"
        >
            <v-btn
              icon
              @click="exitWithoutSaving"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title> Account Creation </v-toolbar-title>
        </v-toolbar>

        <v-container>

            <v-row justify="center">
                <v-spacer></v-spacer>
                <v-col cols="8">
                    <v-text-field
                        v-model="userName"
                        required
                        clearable
                        clear-icon="mdi-close"
                        variant="solo-filled"
                        label="Username"
                        bg-color="primary-lighten-1"
                        density="compact"
                        rounded
                        prepend-inner-icon="mdi-account-outline"
                        @click:control="resetError"
                    ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
            <v-row justify="center">
                <v-spacer></v-spacer>
                <v-col cols="8">
                    <v-text-field
                        v-model="email"
                        required
                        clearable
                        clear-icon="mdi-close"
                        variant="solo-filled"
                        label="Email"
                        bg-color="primary-lighten-1"
                        density="compact"
                        rounded
                        prepend-inner-icon="mdi-email-outline"
                        @click:control="resetError"
                    ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
            <v-row justify="center">
                <v-spacer></v-spacer>
                <v-col cols="8">
                    <v-text-field
                        v-model="password"
                        required
                        clearable
                        clear-icon="mdi-close"
                        variant="solo-filled"
                        label="Password"
                        type="password"
                        bg-color="primary-lighten-1"
                        density="compact"
                        rounded
                        prepend-inner-icon="mdi-lock-outline"
                        @click:control="resetError"

                    ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-col>
                    <v-btn
                        class="mt-2 font-size:24px; font-weight-bold font-capitalize elevation-8 ma-2"
                        text="save"
                        @click="createAccount"
                    ></v-btn>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

            <v-row v-if="alert">
                <v-col>
                    <v-alert
                        text="Unable to create account, please try again."
                        type="error"
                    ></v-alert>
                </v-col>
            </v-row>

        </v-container>

    </v-card>
</template>

<style>
</style>

<script setup lang="ts">
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire';
import { dbManagerInterface } from '@/controller/dbManagerInterface'

const router = useRouter()

const userName = ref("")
const email    = ref("")
const password = ref("")
const alert    = ref(false)
const textAlert = ref("")

function resetError() {
    alert.value = false
}

function exitWithoutSaving() {
    router.back()
}

function createAccount() {
    const auth = useFirebaseAuth() // only exists on client side

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            dbManagerInterface.getInstance().addUser(userCredential.user.uid, userName.value, email.value)
            
            userName.value = ""
            password.value = ""
            email.value = ""

            router.back()
        })
        .catch((error) => {
            alert.value = true
        })
}

// TODO add spinner as modal popup to inform User of spining event

</script>