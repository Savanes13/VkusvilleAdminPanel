<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import TableContent from './components/table/TableContent.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import DefaultSwitch from '@/components/shared/ui/switch/DefaultSwitch.vue';
import contentWorks from './composables/contentWorks';

const {
  contentPageData,
  currentPage,
  selectedBot,
  searchInputObj,
  totalPages,
  paginatedContent,
  missingLines,
  dataSwitchResponsive,
  goToPage,
  changeTextLineTable
} = contentWorks();
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
        :data="dataSwitchResponsive"
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
      <div class="table-wrapper">
        <TableContent
          class="table-content"
          :data="paginatedContent"
          :missing-lines="missingLines"
          @change-text-line="changeTextLineTable"
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

.content {
  margin-bottom: 80px;
}

.search {
  margin-bottom: 20px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-content {
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

@media (max-width: 768px) {
  .content__switch {
    margin-left: 24px;
    margin-bottom: 20px;
  }
}
</style>