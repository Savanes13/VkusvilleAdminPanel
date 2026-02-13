<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import AccessBot from './components/AccessBot/AccessBot.vue';
import AccessAdmin from './components/AccessAdmin/AccessAdmin.vue';
import { useUserStore } from '@/store/user/userStore';
import { useRouter } from 'vue-router';

type TSelectType = "bot" | "admin";

const selectedBot = ref<TSelectType>('bot');
const userStore = useUserStore();
const router = useRouter();

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

onMounted(() => {
  if (userStore.role === 'GUEST') {
    router.push('/dashboard');
    return;
  }
  window.addEventListener('resize', updateWidth);
});

const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

const dataSwitchResponsive = computed(() => {
  return dataSwitch.map(item => {
    if (windowWidth.value < 360 && item.name === "bot") {
      return { ...item, text: "Бот" };
    }
    if (windowWidth.value < 360 && item.name === "admin") {
      return { ...item, text: "Админка" };
    }
    return item;
  });
});
</script>

<template>
  <div class="access">
    <PageHeader
      hint-text="Управление доступами к тех-боту и админке. Доступ в бот выдаётся по номеру телефона, доступ в админку — по токену"
      :hint-width="280"
      :hint-height="100"
    >
      Доступы
    </PageHeader>
    <div class="access__switch">
      <DefaultSwitch
        v-model:value="selectedBot"
        :data="dataSwitchResponsive"
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

.access {
  margin-bottom: 80px;
}

.access__switch {
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .access__switch {
    margin-left: 24px;
    margin-bottom: 20px;
  }
}
</style>