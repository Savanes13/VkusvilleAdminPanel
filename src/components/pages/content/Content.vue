<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import TableContent from './components/table/TableContent.vue';
import DefaultInput from '@/components/shared/ui/input/DefaultInput.vue';
import type { IInputDefaultProps } from '@/types/inputs/types';
import { computed, reactive, ref, watch } from 'vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';

interface ITableLineItem {
  key: string;
  value: string;
  required_keys: string[];
}

const contentPageData = ref<ITableLineItem[] | null>(null);
const currentPage = ref<number>(1);
const pageSize = 8;

const searchInputObj = reactive<IInputDefaultProps>({
  value: '',
  label: 'Почта',
  placeholder: 'Почта',
  error: {
    show: false,
    text: ''
  },
});

// сервер всегда отдает валидные данные где есть все ключи, надо сделать ситуацию где юзер ключ удаляет
const stabContent = [
  {
    key: "application_start",
    value: "Для подачи заявления в магистратуру необходимо {application_start} заполнить основные данные {data_check}",
    required_keys: ["application_start", "data_check"]
  },
  {
    key: "personal_info_verification",
    value: "Перед началом обучения требуется {personal_info_verification} подтвердить личную информацию {info_check}",
    required_keys: ["personal_info_verification", "info_check"]
  },
  {
    key: "profile_creation_step",
    value: "Регистрация в программе магистратуры начинается с {profile_creation_step} создания профиля",
    required_keys: ["profile_creation_step"]
  },
  {
    key: "contact_details_entry",
    value: "Чтобы продолжить процесс поступления, нужно {contact_details_entry} указать контактные данные {contact_check}",
    required_keys: ["contact_details_entry", "contact_check"]
  },
  {
    key: "documents_upload",
    value: "Следующим шагом является {documents_upload} загрузка необходимых документов",
    required_keys: ["documents_upload"]
  },
  {
    key: "review_information",
    value: "Для завершения регистрации необходимо {review_information} проверить введённые сведения {review_check}",
    required_keys: ["review_information", "review_check"]
  },
  {
    key: "account_confirmation",
    value: "Подтверждение аккаунта {account_confirmation} требуется для доступа к системе поступления",
    required_keys: ["account_confirmation"]
  },
  {
    key: "application_accuracy_check",
    value: "Перед отправкой заявки {application_accuracy_check} убедитесь в корректности данных",
    required_keys: ["application_accuracy_check"]
  },
  {
    key: "program_selection",
    value: "После заполнения формы можно {program_selection} перейти к выбору программы {selection_check}",
    required_keys: ["program_selection", "selection_check"]
  },
  {
    key: "application_submission",
    value: "Финальным этапом является {application_submission} отправка заявки на рассмотрение",
    required_keys: ["application_submission"]
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

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const getPageData = async () => {
  try {
    //TODO: сюда запрос к api
    contentPageData.value = stabContent;
  } catch (error) {
    console.error("ошибка загрузки данных страницы")
  };
};
getPageData();

// [{key:"one", value: "текст сообщения с аргументом {one} 1 и аргументом {two} 2", required_keys:["one", "two"]},..]
// Так понял, и в такой ситуации я крашу оба ключа в зеленый так как они есть в required_keys? Да

// [{key:"one", value: "текст сообщения с аргументом {one} 1 и аргументом {two} 2", required_keys:["one"]},..]
// а так бы two красил в красный? Да
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
      
    </div>

    <div class="content__content">

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
        <TableContent
          :data="paginatedContent"
          :missing-lines="missingLines"
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
</style>