<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { reactive, ref } from 'vue';
import TableExperts from './components/table/TableExperts.vue';

const haveWorkDeadline = ref<boolean>(false);
// TODO: типизирвоать
const expertsPageData = ref<any | null>(null);

const searchInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Поиск',
  placeholder: 'Поиск',
  error: {
    show: false,
    text: ''
  },
});

// const stabExperts = [
  
// ]

const getPageData = async () => {
  try {
    //TODO: сюда запрос к api
    // expertsPageData.value = stabExperts;
  } catch (error) {
    console.error("ошибка загрузки данных страницы")
  };
};
getPageData();
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

      <div class="checkbox-block">
        <CheckMark
          v-model:state="haveWorkDeadline"
        />
        <div>
          <p>Есть хотя бы 1 работа на грани дедлайна</p>
        </div>
      </div>

      <TableExperts/>
    </WrapperBlock>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.search {
  margin-bottom: 8px;
}

.checkbox-block {
  display: flex;
  padding: 10px 0px;
  gap: 10px;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;  
  color: color.$colorTextPrimary;
  margin-bottom: 20px;
}
</style>