<script lang="ts" setup>
import { computed } from 'vue';

interface ISwitchItem {
  name: string;
  text: string;
};

interface IDefaultSwitchProps {
  data: ISwitchItem[];
  value: string;
  headerSwitch?: boolean
};

const {
  data,
  value,
  headerSwitch = false
} = defineProps<IDefaultSwitchProps>();

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const changeSwitch = (nameSwitch: string) => {
  switchValue.value = nameSwitch; 
};

const switchValue = computed({
  get: () => value,
  set: (newValue: string) => {
    emit('update:value', newValue)
  }
});
</script>

<template>
  <div 
    class="default-switch"
    :class="{'default-switch--header' : headerSwitch}"
  >
    <div class="default-switch__items">
      <div 
        v-for="item in data"
        class="item"
        :class="{'item--active' : switchValue === item.name}"
        @click="changeSwitch(item.name)"
        :key="item.name"
      >
        <p>{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-switch {
  display: inline-flex;
  background: #F5F5F5;
  height: 42px;
  border-radius: 16px;
  padding: 4px;
}

.default-switch__items {
  display: flex;
  align-items: center;
}

.item {
  padding: 7px 12px;
  border-radius: 12px;
  color: #333333;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.item--active {
  background: #FFFFFF;
  color: #179C49;
}

@media (max-width: 500px) {
  .default-switch--header {
    height: 32px;
    border-radius: 12px;
  }

  .default-switch--header .item {
    padding: 4px 12px;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>