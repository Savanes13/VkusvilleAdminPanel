<script lang="ts" setup>
import FirstStageWindow from '@/components/shared/elements/modalWindow/stages/firstStageWindow/FirstStageWindow.vue';
import SecondStageWindow from '@/components/shared/elements/modalWindow/stages/secondStageWindow/SecondStageWindow.vue';
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import DefaultButton from '@/components/shared/ui/button/DefaultButton.vue';
import meeting from '@/assets/images/mainIcons/meeting.svg';
import one from '@/assets/images/mainIcons/one.svg';
import { ref, watch } from 'vue';
import IconButton from '@/components/shared/ui/button/IconButton.vue';
import { getContenStagesPage } from '@/api/pages/stages/apiStages';
import type { IStage } from '@/types/pages/stages/typesStages';
import { useCompanyStore } from '@/store/company/companyStore';

const pageDataArr = ref<null | IStage[]>(null);
const stageWindowVisibility = ref<boolean>(false);
const numberSelectedStage = ref<number>(0);
const companyStore = useCompanyStore();

watch(stageWindowVisibility, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const closeStageWindow = () => {
  stageWindowVisibility.value = false;
  numberSelectedStage.value = 0;
}

const openStageWindow = (number: number) => {
  stageWindowVisibility.value = true;
  numberSelectedStage.value = number;
}

const formatTimestamp = (ts: number) => {
  const date = new Date(ts)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  .format(date)
  .replace(' г.', '')
}

const setNewStageValue = (id: number, obj: IStage) => {
  if(!pageDataArr.value) return;
  if(id === 1) pageDataArr.value[0] = obj
  if(id === 2) pageDataArr.value[1] = obj
};

const getPageData = async () => {
  try {
    const response = await getContenStagesPage();
    pageDataArr.value = response.items;
  } catch (error) {
    console.error('ошибка при получении данных страницы')
  }
}

watch(() => companyStore.selectedCompany, () => {
    getPageData()
  },{ immediate: true }
)
</script>

<template>
  <div 
    class="stages"
    v-if="pageDataArr"
  >
    <PageHeader>
      Этапы
    </PageHeader>
    <div class="stages__items">
      <div class="wrap-editable">
        <WrapperBlock>
          <div class="header-stage">
            <div class="header-stage__title">
              <div class="counter">
                <p>Этап 1</p>
              </div>
              <div class="name">
                <p>Эссе и кружок</p>
              </div>
            </div>
            <IconButton
              class="button-icon__color-green-transparent"
              icon="edit"
              color-icon="transparent"
              @click="openStageWindow(1)"
            />
          </div>
          <div class="info-stage">
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="meeting" alt="">
                </div>
                <div>
                  <p>Даты и дедлайны</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дата начала этапа</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.deadlines.start_date ? formatTimestamp(pageDataArr[0].deadlines.start_date) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн возможности начать этап</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.deadlines.start_until ? formatTimestamp(pageDataArr[0]?.deadlines.start_until) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн отправки всех заданий</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.deadlines.send_until ? formatTimestamp(pageDataArr[0]?.deadlines.send_until) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Время на выполнение задания</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.deadlines.time_to_complete_hours }} часа</p>
                </div>
              </div>
            </div>
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="one" alt="">
                </div>
                <div>
                  <p>Оценка</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Проходной балл</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.min_grade_to_pass }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Текущий множитель оценки</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.grade_mul }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки стуктуры и логики</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.grades[0]?.grades.length ? Math.min(...pageDataArr[0].grades[0].grades) : '-' }} - {{ pageDataArr[0]?.grades[0]?.grades.length ? Math.max(...pageDataArr[0].grades[0].grades) : '-' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки содержательности и мотивация</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.grades[1]?.grades.length ? Math.min(...pageDataArr[0].grades[1].grades) : '-' }} - {{ pageDataArr[0]?.grades[1]?.grades.length ? Math.max(...pageDataArr[0].grades[1].grades) : '-' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оценки цели и связь с программой</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[0]?.grades[2]?.grades.length ? Math.min(...pageDataArr[0].grades[2].grades) : '-' }} - {{ pageDataArr[0]?.grades[2]?.grades.length ? Math.max(...pageDataArr[0].grades[2].grades) : '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </WrapperBlock>
        <WrapperBlock>
          <div class="header-stage">
            <div class="header-stage__title">
              <div class="counter">
                <p>Этап 2</p>
              </div>
              <div class="name">
                <p>Кейс</p>
              </div>
            </div>
            <IconButton
              class="button-icon__color-green-transparent"
              icon="edit"
              color-icon="transparent"
              @click="openStageWindow(2)"
            />
          </div>
          <div class="info-stage">
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="meeting" alt="">
                </div>
                <div>
                  <p>Даты и дедлайны</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дата начала этапа</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.deadlines.start_date ? formatTimestamp(pageDataArr[1]?.deadlines.start_date) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн возможности начать этап</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.deadlines.start_until ? formatTimestamp(pageDataArr[1]?.deadlines.start_until) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Дедлайн отправки всех заданий</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.deadlines.send_until ? formatTimestamp(pageDataArr[1]?.deadlines.send_until) : '' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Время на выполнение задания</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.deadlines.time_to_complete_hours }} часа</p>
                </div>
              </div>
            </div>
            <div class="info-stage__item">
              <div class="title-block">
                <div>
                  <img :src="one" alt="">
                </div>
                <div>
                  <p>Оценка</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Проходной балл</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.min_grade_to_pass }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Текущий множитель оценки</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.grade_mul }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Целостность решения</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.grades[0]?.grades.length ? Math.min(...pageDataArr[1].grades[0].grades) : '-' }} - {{ pageDataArr[1]?.grades[0]?.grades.length ? Math.max(...pageDataArr[1].grades[0].grades) : '-' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Аргументация предложенного решения</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.grades[1]?.grades.length ? Math.min(...pageDataArr[1].grades[1].grades) : '-' }} - {{ pageDataArr[1]?.grades[1]?.grades.length ? Math.max(...pageDataArr[1].grades[1].grades) : '-' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Реалистичность и здравый смысл</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.grades[2]?.grades.length ? Math.min(...pageDataArr[1].grades[2].grades) : '-' }} - {{ pageDataArr[1]?.grades[2]?.grades.length ? Math.max(...pageDataArr[1].grades[2].grades) : '-' }}</p>
                </div>
              </div>
              <div class="item-block">
                <div class="item-block__name">
                  <p>Оригинальность подхода</p>
                </div>
                <div class="item-block__text">
                  <p>{{ pageDataArr[1]?.grades[3]?.grades.length ? Math.min(...pageDataArr[1].grades[3].grades) : '-' }} - {{ pageDataArr[1]?.grades[3]?.grades.length ? Math.max(...pageDataArr[1].grades[3].grades) : '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </WrapperBlock>
      </div>
      <WrapperBlock>
        <div class="header-stage header-stage--interviews">
          <div class="header-stage__title">
            <div class="counter">
              <p>Этап 3</p>
            </div>
            <div class="name">
              <p>Собеседования</p>
            </div>
          </div>
        </div>
        <div class="not-configurable">
          <p>Этот этап не настраивается</p>
        </div>
        <div class="interview-button">
          <DefaultButton 
            class="default-button__color-green-transparent default-button__size--small"
            right-icon="chevronRight"
          >
            К собеседованиям
          </DefaultButton>
        </div>
      </WrapperBlock>
    </div>
    <transition name="fadeFast">
      <FirstStageWindow
        v-if="stageWindowVisibility && numberSelectedStage === 1 && pageDataArr[0]"
        :data="pageDataArr[0]"
        @close="closeStageWindow"
        @set-new-obj="(obj) => setNewStageValue(1, obj)"
      />
    </transition>
    <transition name="fadeFast">
      <SecondStageWindow
        v-if="stageWindowVisibility && numberSelectedStage === 2 && pageDataArr[1]"
        :data="pageDataArr[1]"
        @close="closeStageWindow"
        @set-new-obj="(obj) => setNewStageValue(2, obj)"
      />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

.stages__items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.wrap-editable {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.header-stage {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header-stage--interviews {
  margin-bottom: 8px;
}

.counter {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: color.$colorTextSecondary;
  margin-bottom: 8px;
}

.name {
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  color: #333333;
}

.wrapper-block {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.info-stage {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.info-stage__item:first-child {
  flex: 0 0 auto;
}

.info-stage__item:last-child {
  flex: 1 1 auto; 
}

.info-stage__item {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border-radius: 16px;
  border: 1px solid #D0D7E5;
  padding: 20px;
  flex: 1;
}

.title-block {
  display: flex;
  gap: 4px;
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: color.$colorTextPrimary;
}

.item-block {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.item-block__text {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
}

.item-block__name {
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #747F9C;
}

.not-configurable {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 20px;
  color: color.$colorTextSecondary;
}

.interview-button {
  width: 210px;
}

@media (max-width: 1400px) {
  .wrap-editable {
    grid-template-columns: 1fr;
  }

  .stages {
    margin-bottom: 80px;
  }
}

@media (max-width: 850px) {
  .item-block {
    flex-direction: column;
    gap: 6px;
  }
}

@media (max-width: 768px) {
  .item-block {
    flex-direction: row;
    gap: 10px;
  }
}

@media (max-width: 550px) {
  .item-block {
    flex-direction: column;
    gap: 4px;
  }
}
</style>