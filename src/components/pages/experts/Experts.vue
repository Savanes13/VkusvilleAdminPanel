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

const stabExperts = [
  {
    id: 2123,
    name: "Байнов Руслан Сергеевич",
    isAuth: true,
    untested: {
      first: 0,
      second: 2
    },
    overdue: {
      first: 1,
      second: 0
    },
    deadline: {
      first: 1,
      second: 4
    },
  },
  {
    id: 2124,
    name: "Иванова Мария Алексеевна",
    isAuth: true,
    untested: {
      first: 3,
      second: 1
    },
    overdue: {
      first: 0,
      second: 2
    },
    deadline: {
      first: 2,
      second: 1
    },
  },
  {
    id: 2125,
    name: "Петров Андрей Николаевич",
    isAuth: false,
    untested: {
      first: 1,
      second: 0
    },
    overdue: {
      first: 2,
      second: 1
    },
    deadline: {
      first: 0,
      second: 3
    },
  },
  {
    id: 2126,
    name: "Смирнова Ольга Викторовна",
    isAuth: true,
    untested: {
      first: 4,
      second: 2
    },
    overdue: {
      first: 0,
      second: 0
    },
    deadline: {
      first: 3,
      second: 1
    },
  },
  {
    id: 2127,
    name: "Кузнецов Дмитрий Игоревич",
    isAuth: true,
    untested: {
      first: 0,
      second: 1
    },
    overdue: {
      first: 1,
      second: 1
    },
    deadline: {
      first: 2,
      second: 2
    },
  }
];

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

      <TableExperts
        :data="stabExperts"
      />
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