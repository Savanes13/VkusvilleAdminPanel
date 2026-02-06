<script lang="ts" setup>
import { ref } from 'vue';
import { selectIcons } from '../../icons/select/icons';

interface ISelectItem {
  id: number;
  value: string;
};

interface IDefaultSelectProps {
  data: ISelectItem[];
  activeItem: number;
  label: string
};

const {
  data,
  activeItem,
  label
} = defineProps<IDefaultSelectProps>();

const emit = defineEmits<{
  (e: 'changeValue', id: number): void;
}>();

const selectIsOpen = ref<boolean>(false);

const toggleSelect = () => {
  if (selectIsOpen.value === true) {
    selectIsOpen.value = false;
  } else {
    selectIsOpen.value = true;
  }
}

const setNewSelectValue = (id: number) => {
  emit('changeValue', id);
  selectIsOpen.value = false;
};
</script>

<template>
  <div class="default-select">
    <div class="default-select__label">
      <p>{{ label }}</p>
    </div>
    <div 
      class="default-select__selected-item"
      @click="toggleSelect"
    >
      <div>
        <p>{{ data.find(item => item.id === activeItem)?.value || 'Выберите' }}</p>
      </div>
      <div
        class="svg"
        :class="{'svg--reverse' : selectIsOpen}"
      >
        <span
          v-html="selectIcons['chevronDown']"
        ></span>
      </div>
    </div>
    <transition :name="'fade-slide'" mode="out-in">
      <div 
        class="default-select__hide-block"
        v-if="selectIsOpen"
      >
        <div
          class="hide-item"
          v-for="(item, index) in data"
          :key="index"
          @click="setNewSelectValue(item.id)"
        >
          <div>
            <p>{{ item.value }}</p>
          </div>
          <div v-if="activeItem === item.id">
            <span
              class="svg check-svg"
              v-html="selectIcons['check']"
            ></span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/transition.scss" as transition;

.default-select {
  position: relative;
  width: 100%;
  user-select: none;
}

.default-select__selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #DDE0E8;
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextPrimary;
}

.svg span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg svg {
  display: block;
}

.svg--reverse {
  transform: rotate(180deg);
}

.default-select__label {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: color.$colorTextSecondary;
  margin-bottom: 4px;
}

.default-select__hide-block {
  position: absolute;
  top: 70px;
  width: 100%;
  background: color.$colorTextWhite;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0px 0px 6px 0px #00103D0F;
  box-shadow: 0px 6px 12px 0px #00103D0F;
  box-shadow: 0px 6px 20px 0px #00103D0F;
  box-shadow: 0px 10px 36px 0px #00103D14;
  z-index: 1;
}

.hide-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  border-radius: 12px;
  color: color.$colorTextPrimary;
  cursor: pointer;
  transition: background-color transition.$medium;
}

.hide-item:hover {
  background: color.$colorBackgroundWhite_Hover;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity transition.$medium, transform transition.$medium, max-height transition.$medium;
  overflow: hidden;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-14px);
  max-height: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 400px;
}
</style>