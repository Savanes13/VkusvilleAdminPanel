<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import TableContent from './components/table/TableContent.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { computed, reactive, ref, watch } from 'vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import { changeTextContentAbit, changeTextContentAdmin, getContentAbit, getContentAdmin } from '@/api/pages/content/apiContent';
import { checkAuth } from '@/api/user/apiUser';
import { useUserStore } from '@/store/user/userStore';

type TBotsType = "technical" | "applicants"

interface ITableLineItem {
  key: string;
  value: string;
  format_keys: string[];
}

const contentPageData = ref<ITableLineItem[] | null>(null);
const currentPage = ref<number>(1);
const pageSize = 8;
const selectedBot = ref<TBotsType>('technical');

const searchInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Поиск',
  placeholder: 'Поиск',
  error: {
    show: false,
    text: ''
  },
});

const dataSwitch = [
  {
    name: "technical",
    text: "Технический бот"
  },
  {
    name: "applicants",
    text: "Абитуриентский бот"
  }
];

const totalPages = computed(() => {
  return Math.ceil(filteredContent.value.length / pageSize);
});

const paginatedContent = computed<ITableLineItem[]>(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredContent.value.slice(start, end);
});

const filteredContent = computed<ITableLineItem[]>(() => {
  const search = searchInputObj.value.trim().toLowerCase();
    if (!contentPageData.value) return [];
    if (!search) return contentPageData.value;
    return contentPageData.value.filter(item =>
    item.value.toLowerCase().includes(search) || item.key.toLowerCase().includes(search)
  );
});

const missingLines = computed(() => {
  const pageData = paginatedContent.value;
  const missingRows = pageSize - pageData.length;
  return missingRows;
});

watch(() => searchInputObj.value, () => {
  currentPage.value = 1;
});

watch(selectedBot, () => {
  currentPage.value = 1;
  getPageData();
});

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const getPageData = async () => {
  try {
    if (selectedBot.value === 'technical') {
      const response = await getContentAdmin();
      contentPageData.value = response.items;
    } else {
      const response = await getContentAbit();
      contentPageData.value = response.items;
    };
  } catch (error) {
    console.error("ошибка загрузки данных страницы")
  };
};
getPageData();

const changeTextLineTable = async (text: string, key: string) => {
  try {
    if (selectedBot.value === 'technical') {
      await changeTextContentAdmin(text, key);
    } else {
      await changeTextContentAbit(text, key);
    };
    if (contentPageData.value) {
      const changeItem = contentPageData.value.find(item => item.key === key);
      if (changeItem) changeItem.value = text;
    };
  } catch (error) {
    console.error('ошибка обновления текста');
  };
};
</script>

<template>
  <div 
    class="content"
    v-if="contentPageData"
  >
    <PageHeader>
      Контент
    </PageHeader>
    <div class="content__switch">
      <DefaultSwitch
        v-model:value="selectedBot"
        :data="dataSwitch"
      />
    </div>
    <WrapperBlock
      class="content__content"
    >
      <div class="search">
        <DefaultInput
          :is-search="true"
          v-model:value="searchInputObj.value"
          :label="searchInputObj.label"
          :placeholder="searchInputObj.placeholder"
          :error="searchInputObj.error"
        />
      </div>
      <TableContent
        :data="paginatedContent"
        :missing-lines="missingLines"
        @change-text-line="changeTextLineTable"
      />
      
      <!-- Можно вынести в комопнет -->
      <div
        class="pagination" 
        v-if="totalPages > 1"
      >
        <div class="pagination__info">
          <div class="text-pagination">
            <p>Стр</p>
          </div>
          <div class="currentPage text-pagination">
            <p>{{ currentPage }}</p>
          </div>
          <div class="text-pagination">
            <p>из {{ totalPages }}</p>
          </div>
        </div>
        <div class="pagination__buttons">
          <IconButton
            class="button-icon__color-gray"
            icon="chevronLeft"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          />
          <IconButton
            class="button-icon__color-gray"
            icon="chevronRight"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          />
        </div>
      </div>
    </WrapperBlock>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.search {
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 24px;
  margin-top: 16px;
}

.pagination__info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.text-pagination {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: color.$colorTextSecondary;
}

.currentPage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #DDE0E8;
  font-weight: 500;
}

.content__switch {
  margin-bottom: 24px;
}
</style>