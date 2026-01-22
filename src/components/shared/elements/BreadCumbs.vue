<script lang="ts" setup> 
import { mainIcons } from '../icons/mainIcons';

interface IBreadCrumbItem {
  name: string
  path: string;
};

interface IBreadCrumbsProps {
  data: IBreadCrumbItem[];
};

const {
  data,
} = defineProps<IBreadCrumbsProps>();
</script>

<template>
  <div class="bread-crumbs">
    <div 
      class="bread-crumbs__item"
      :class="{
        'bread-crumbs__item--last' : index === data.length - 1,
      }"
      v-for="(item, index) in data"
      :key="index"
    >
      <div class="name">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </div>
      <div
        class="icon"
        v-if="index != data.length - 1"
      >
        <span
          class="svg"
          v-html="mainIcons['chevronRight']"
        ></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.bread-crumbs {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.bread-crumbs__item {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  a {
    color: color.$colorTextPrimary;
    text-decoration: none;
  }
}

.bread-crumbs__item--last {
  a {
    color: color.$colorTextSecondary;
  }
}

.name {
  padding: 8px 0px;
}

.icon {
  padding: 0px 4px;
}

.svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>