<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { reactive } from 'vue';

const searchInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Поиск',
  placeholder: 'Поиск',
  error: {
    show: false,
    text: ''
  },
});


</script>

<template>
  <div class="experts">
    <PageHeader>
      Эксперты
    </PageHeader>

    <WrapperBlock>
      <div class="search">
        <DefaultInput
          :is-search="true"
          v-model:value="searchInputObj.value"
          :label="searchInputObj.label"
          :placeholder="searchInputObj.placeholder"
          :error="searchInputObj.error"
        />
      </div>

      <!-- <div>
        <DefaultCh
        <div>
          <p></p>
        </div>
      </div> -->
    </WrapperBlock>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>