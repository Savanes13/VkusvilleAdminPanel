<script lang="ts" setup>
interface IBackgroundModalProps {
  greyMobile?: boolean
};

const {
  greyMobile = false
} = defineProps<IBackgroundModalProps>();
</script>

<template>
  <Teleport to="body">
    <div
      class="background-modal"
      :class="{'background-modal--grey' : greyMobile}"
    >
      <slot></slot>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.background-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: #00000080;
}

.background-modal--grey {
  background: #00000080;
}

@media (max-width: 500px) {
  .background-modal--grey {
    background: color.$colorBackgroundSecondary;
    align-items: start;
    padding-top: 4px;
  }
}
</style>