<template>
      <div>
        <v-card
            class="mx-auto"
            max-width="344"
        >

            <v-card-title>
                MyBudgetEasy
            </v-card-title>

            
            <LoginForm @signInSuccess="prepareAndGoToAppPage()"></LoginForm>
        </v-card>
    </div>
</template>

<script setup lang="ts">
    import LoginForm from '@/components/LoginForm.vue'; // @ is an alias to /src
    import { useRouter } from 'vue-router'
    import { useFirebaseAuth } from 'vuefire';
    import { useGlobalStore } from '@/store/globalStore'

    const router = useRouter()
    const store = useGlobalStore()
    const auth = useFirebaseAuth() // only exists on client side

    if(store.authenticated && store.auth_userid)
    {
        // Temporary removed until authentication through cookies is working.
        // store.authenticated = false
        // store.auth_userid = ""
        // Check User still exists on database.
        // goToAppPage();

        console.log("Past logged in " + store.auth_userid)
    }

    function prepareAndGoToAppPage(){
        store.authenticated = true
        store.auth_userid = auth.currentUser.uid

        goToAppPage()
    }

    function goToAppPage() {
        const hasAccount = true
        if(hasAccount)
        {
            router.replace('account/dashboard')
        }
        else
        {
            router.replace('account')
        }
        //router.replace('account/dashboard') // Will load the default Account
    }
</script>
