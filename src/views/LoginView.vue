<template>
<v-main>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="8">
                <img :src="image" width="84" height="84"/>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="8">
                <div class="text-h5 text-uppercase ma-2 text-primary-lighten-1 font-weight-black">my wallet</div>
                <div class="text-subtitle-2 mb-12 text-primary-lighten-1 font-italic">v0.1.0</div>
                <div class="text-h6 ma-4 text-primary-lighten-1 font-weight-light">Sign-In to continue</div>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row justify="center">
            <v-spacer></v-spacer>
            <v-col cols="8">
                <v-text-field
                    v-model="userName"
                    required
                    clearable
                    clear-icon="mdi-close"
                    variant="solo-filled"
                    label="Email"
                    bg-color="primary-lighten-1"
                    density="compact"
                    rounded
                    prepend-inner-icon="mdi-email-outline"
                    @click:control="alert = false"
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
                    @click:control="alert = false"
                ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col>
                <v-btn
                    class="mt-2 font-size:24px; font-weight-bold elevation-8 ma-2"
                    text="Login"
                    @click="connect"
                ></v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-col>
                <v-btn
                    text="Register"
                    variant='plain'
                    :ripple="false"
                    color="#ffffff"
                    class="mt-2 font-size:24px; font-weight-bold font-italic ma-2"
                    @click="register"
                >
                </v-btn>                
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-if="alert">
            <v-col>
                <v-alert
                    text="Unable to log into account, please try again."
                    type="error"
                ></v-alert>
            </v-col>
        </v-row>

    </v-container>
</v-main>
</template>

<script setup lang="ts">
    import image from "@/assets/wallet-logo.png"
    import { useRouter } from 'vue-router'
    import { useCurrentUser, useFirebaseAuth } from 'vuefire';
    import { useGlobalStore } from '@/store/globalStore'
    import { ref } from "vue";
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { dbManagerInterface } from '@/controller/dbManagerInterface'

    const userName = ref("")
    const password = ref("")
    const alert = ref(false)

    const router = useRouter()
    const store = useGlobalStore()
    const auth = useFirebaseAuth() // only exists on client side

    function register(){
        router.push('register')
    }

    function connect(){
        const auth = useFirebaseAuth() // only exists on client side
        signInWithEmailAndPassword(auth, userName.value, password.value)
            .then((userCredential) => {
                // Signed in 
                console.log(" Loading User " + JSON.stringify(userCredential.user)) ;
                const userFire = useCurrentUser()
                console.log("Get User UID " + userFire.value.uid)

                store.authenticated = true
                store.auth_userid = userFire.value.uid

                userName.value = ""
                password.value = ""
                alert.value = false

                goToAppPage()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert.value = true
                console.log("Failed to login " + errorMessage + " code ["+errorCode +"]")
            })
    }

    function goToAppPage() {
        const hasAccount = true
        if(hasAccount)
        {
            router.replace('walletlist')
        }
        else
        {
            router.replace('account')
        }
    }
</script>
