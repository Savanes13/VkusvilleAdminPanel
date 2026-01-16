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
  dataSwitch,
  totalPages,
  paginatedContent,
  missingLines,
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