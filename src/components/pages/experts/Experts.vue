<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { computed, reactive, ref, watch } from 'vue';
import TableExperts from './components/table/TableExperts.vue';
import { getContentExpertsPage } from '@/api/pages/experts/apiExperts';
import type { IExpertPage, TExpertsPageData } from '@/types/pages/experts/typesExperts';
import { useCompanyStore } from '@/store/company/companyStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const haveWorkDeadline = ref<boolean>(route.query.stuck === 'true');
const expertsPageData = ref<null | TExpertsPageData>(null);
const companyStore = useCompanyStore();

const searchInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Поиск',
  placeholder: 'Поиск',
  error: {
    show: false,
    text: ''
  },
});

const filteredContent = computed<IExpertPage[]>(() => {
  const search = searchInputObj.value.trim().toLowerCase();
    if (!expertsPageData.value) return [];
    if (!search) return expertsPageData.value;
    return expertsPageData.value.filter(item =>
    item.display_name.toLowerCase().includes(search) 
  );
});

const sortingContent = computed<IExpertPage[]>(() => {
  if (!haveWorkDeadline.value) return filteredContent.value;
  return filteredContent.value.filter(item =>
    (item.deadline_tasks?.[0]?.value ?? 0) > 0 || (item.deadline_tasks?.[1]?.value ?? 0) > 0
  );
});

const getPageData = async () => {
  try {
    const response = await getContentExpertsPage();
    expertsPageData.value = response.items;
  } catch (error) {
    console.error("ошибка загрузки данных страницы")
  };
};

watch(() => companyStore.selectedCompany, () => {
    getPageData()
  },{ immediate: true }
)
</script>

<template>
  <div 
    class="experts"
    v-if="expertsPageData" 
  >
    <PageHeader
      hint-text="Статистика работы экспертов: непроверенные задания, просрочки и риск дедлайна. Помогает отслеживать загрузку и оперативно реагировать"
      :hint-width="300"
      :hint-height="100"
    >
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
      <div
        v-if="sortingContent.length > 0"
        class="table-wrapper"
      >
        <TableExperts
          :data="sortingContent"
          class="table-expert"
        />
      </div>
      <div
        class="no-found"
        v-else
      >
        <p>По вашему запросу ничего не найдено</p>
      </div>
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

.no-found {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;  
  color: color.$colorTextPrimary;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-expert {
  width: 100%;
  min-width: 1300px; 
  border-collapse: collapse;
  padding-bottom: 10px;
}

.table-wrapper::-webkit-scrollbar {
  height: 8px !important;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-track {
  background: color.$colorBackgroundSecondary;
  border-radius: 6px;
  overflow: hidden;
  cursor: default !important;
}

.table-wrapper::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: color.$colorTextTertiary;
  cursor: default !important;
}
</style>