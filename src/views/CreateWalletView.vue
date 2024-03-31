<template>
    <v-app-bar :elevation="7" color="primary">
      <template v-slot:prepend>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <v-app-bar-title> Wallet Edition</v-app-bar-title>
    </v-app-bar>
    <v-main class="layout" height="800">
      <v-container>
        <v-row>
          <v-spacer/>
          <v-col>
            <v-card color="primary-darken-2"  class="pa-2" width="300">
             <template v-slot:prepend>
                  <img :src="image" width="32" height="32"/>
              </template>
              <template v-slot:title>
                <div class="mt-2 font-size:12px; font-weight-bold text-uppercase ma-2">Wallet Name</div>
              </template>
              <v-text-field
                  required
                  clearable
                  clear-icon="mdi-close"
                  variant="solo-filled"
                  label="Wallet name"
                  bg-color="primary-lighten-1"
                  density="compact"
                  rounded
                  prepend-inner-icon="mdi-account-outline"
                  v-model="walletName"
              ></v-text-field>
            </v-card>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row>
          <v-spacer />
          <v-col>
            <UIItemCollectionCreation width="300" maxHeight="150" color="primary-darken-2" title="Enveloppes Setup:" @item-list-changed="onCategoriesChanged"/>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row>
          <v-spacer />
          <v-col>
            <UIItemCollectionCreation width="300" maxHeight="150" color="primary-darken-2" title="User names:" @item-list-changed="onItemChanged"/>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row>
          <v-spacer />
          <v-col>
            <v-btn
              class="mt-2 font-size:24px; font-weight-bold font-capitalize elevation-8 ma-2"
              text="save"
              @click="addAccountToDb"
            ></v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-main>
</template>

<style>
  .layout {
    background-color: rgb(var(--v-theme-background));
  }
</style>

<script setup lang="ts">
  import AccountSetup from '@/components/AccountSetup.vue';
  import image from "@/assets/cash-cash.png"
  import UIItemCollectionCreation from '@/widgets/UIItemCollectionCreation.vue';

  import { useAccountDataStore, useGlobalStore } from '@/store/globalStore'
  import { AccountDAO } from '@/dao/AccountDAO';
  import { UserDAO } from '@/dao/UserDAO';
  import { AccountImpl, CategoryImpl, OwnershipMode } from '@/model/componentModel'
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useCurrentUser } from 'vuefire';
  
  const gstore = useGlobalStore()
  const store = useAccountDataStore()
  const db = new AccountDAO
  const usrDb = new UserDAO
  const router = useRouter()
  const walletName = ref("")
  const actors = ref(new Array<string>())
  const categories = ref(new Array<string>())

  const gStore = useGlobalStore()

  function addAccountToDb()
  {
    const userFire = useCurrentUser()

    let localAccount = new AccountImpl
    localAccount.name = walletName.value

    localAccount.users.push({uid: userFire.value.uid, name: store.currentUser.name})
    store.tmpAccount = localAccount

    let localCtegories:CategoryImpl[] = []
    for(let i=0; i< categories.value.length; ++i){
        localCtegories.push({color: "#0c0c0c", title: categories.value.at(i), timestamp:null})
    }

    store.tmpCategories = localCtegories
    
    let accountUID = db.addAccount(store.tmpAccount)
    db.setCategories(accountUID, store.tmpCategories)
    
    // Update the store with appropriate information.
    store.currentUser.accounts.push({ key:accountUID, mode: OwnershipMode.Owner })
    
    usrDb.addUser(userFire.value.uid, store.currentUser)

    goBack()
  }
  
  function goBack()
  {
    router.replace('walletlist')
  }

  function onItemChanged(items)
  {
    actors.value = items
  }

  function onCategoriesChanged(items)
  {
    categories.value = items
  }

  </script>
  