<template>
    <div class="home">
      <!--<img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
      <AccountSetup @submit-account="addAccountToDb"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import AccountSetup from '@/components/AccountSetup.vue';
  
  import { useAccountDataStore, useGlobalStore } from '@/store/globalStore'
  import { AccountDAO } from '@/dao/AccountDAO';
  import { UserDAO } from '@/dao/UserDAO';
  import { OwnershipMode } from '@/model/componentModel'
  
  const gstore = useGlobalStore()
  const store = useAccountDataStore()
  const db = new AccountDAO
  const usrDb = new UserDAO
  
  function addAccountToDb()
  {
    let accountUID = db.addAccount(store.tmpAccount)
    db.setCategories(accountUID, store.tmpCategories)
    
    // Update the store with appropriate information.
    store.currentUser.accounts.push({ key:accountUID, mode: OwnershipMode.Owner })
    
    usrDb.addUser(gstore.auth_userid, store.currentUser)   
  }
  
  </script>
  