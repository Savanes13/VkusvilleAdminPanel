<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

// выпилить стаб
const stab = [
  { name: "Байнов Руслан Сергеевич", phone: "+7 900 000 00 00", role: "Эксперт 1 уровня" },
  { name: "Иванова Анна Сергеевна", phone: "+7 901 111 11 11", role: "Эксперт 2 уровня" },
  { name: "Петров Алексей Викторович", phone: "+7 902 222 22 22", role: "Менеджер" },
  { name: "Сидорова Марина Николаевна", phone: "+7 903 333 33 33", role: "Эксперт 1 уровня" },
  { name: "Кузнецов Дмитрий Андреевич", phone: "+7 904 444 44 44", role: "Эксперт 3 уровня" },
  { name: "Федорова Елена Петровна", phone: "+7 905 555 55 55", role: "Менеджер" },
  { name: "Смирнов Николай Иванович", phone: "+7 906 666 66 66", role: "Эксперт 2 уровня" },
  { name: "Попова Виктория Сергеевна", phone: "+7 907 777 77 77", role: "Эксперт 1 уровня" },
  { name: "Михайлов Сергей Андреевич", phone: "+7 908 888 88 88", role: "Эксперт 3 уровня" },
  { name: "Никитина Ольга Дмитриевна", phone: "+7 909 999 99 99", role: "Менеджер" }
];
</script>

<template>
  <div class="table">

    <HeaderTable/>

    <LineTable
      v-for="(item, index) in stab"
      :name="item.name"
      :phone="item.phone"
      :role="item.role"
      :key="index"
      :last-line="index === stab.length - 1"
    />

  </div>
</template>

<style lang="scss" scoped>
  
</style>