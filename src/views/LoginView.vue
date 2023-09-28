<template>
      <div>
        <v-card
            class="mx-auto"
            max-width="344"
        >

            <v-card-title>
                MyBudgetEasy
            </v-card-title>

            
            <LoginForm @signInSuccess="goToAppPage()"></LoginForm>
        </v-card>
    </div>
</template>

<script setup lang="ts">
    import LoginForm from '@/components/LoginForm.vue'; // @ is an alias to /src
    import { useRouter } from 'vue-router'
    import { useFirebaseAuth } from 'vuefire';

    const router = useRouter()
    
    const auth = useFirebaseAuth() // only exists on client side

    // check if user is logged-in or not
    if(auth.currentUser) {
        goToAppPage();
    }

    function goToAppPage() {
        console.log("going account")
        router.replace('account')
    }

</script>
