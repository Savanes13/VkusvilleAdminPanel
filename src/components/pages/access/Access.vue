<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { ref } from 'vue';
import AccessBot from './components/AccessBot/AccessBot.vue';
import AccessAdmin from './components/AccessAdmin/AccessAdmin.vue';

type TSelectType = "bot" | "admin";

const selectedBot = ref<TSelectType>('bot');

const selectedItemBot = ref<number>(1);
const selectedItemAdmin = ref<number>(0);

const dataSwitch = [
  {
    name: "bot",
    text: "Доступ в бот"
  },
  {
    name: "admin",
    text: "Доступ в админку"
  }
];

const accessStab = {
  bot: {
    select: [
      {
        id: 1,
        value: "Эксперт 1 уровня"
      },
      {
        id: 2,
        value: "Эксперт 2 уровня"
      },
      {
        id: 3,
        value: "Менеджер продвижения"
      }
    ]
  },
  admin: {

  }
}


const setNewSelectValue = (id: number) => {
  selectedItemBot.value = id;
};
</script>

<template>
  <div class="access">
    <PageHeader>
      Доступы
    </PageHeader>

    <div class="access__switch">
      <DefaultSwitch
        v-model:value="selectedBot"
        :data="dataSwitch"
      />
    </div>



    <transition name="fadeFast" mode="out-in">
      <AccessBot
        v-if="selectedBot === 'bot'"
        key="access-bot"
        :data="accessStab.bot"
        :active-select="selectedItemBot"
        @change-value-select="setNewSelectValue"
      />
      <AccessAdmin
        v-else
        key="access-admin"
      />
    </transition>


  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.access__switch {
  margin-bottom: 24px;
}
</style>