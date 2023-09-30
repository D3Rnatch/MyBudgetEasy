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
        goToAppPage();
    }

    function prepareAndGoToAppPage(){
        store.authenticated = true
        store.auth_userid = auth.currentUser.uid
        goToAppPage()
    }

    function goToAppPage() {
        router.replace('account')
    }

</script>
