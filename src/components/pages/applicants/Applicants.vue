<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import applicantsWorks from './composables/applicantsWorks';
import TableApplicants from './components/table/TableApplicants.vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import CheckMark from '@/components/shared/ui/checkbox/CheckMark.vue';

const {
  paginatedContent,
  searchInputObj,
  totalPages,
  currentPage,
  overdueDeadlineSortActivity,
  goToPage,
  missingLines
} = applicantsWorks();
</script>

<template>
  <div class="applicants">
    <PageHeader>
      Абитуриенты
    </PageHeader>
    <WrapperBlock
      class="applicants__content"
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
      <div class="checkbox-block">
        <CheckMark
          v-model:state="overdueDeadlineSortActivity"
        />
        <div>
          <p>Просрочившие дедлайн</p>
        </div>
      </div>
      <div class="table-wrapper">
        <TableApplicants
          class="table-applicants"
          :data="paginatedContent"
          :missing-lines="missingLines"
        />
      </div>
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
  margin-bottom: 8px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-applicants {
  width: 100%;
  min-width: 1100px; 
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
</style>