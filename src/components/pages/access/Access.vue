<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { ref } from 'vue';
import AccessBot from './components/AccessBot/AccessBot.vue';
import AccessAdmin from './components/AccessAdmin/AccessAdmin.vue';

type TSelectType = "bot" | "admin";

const selectedBot = ref<TSelectType>('bot');

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