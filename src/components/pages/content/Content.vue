<script lang="ts" setup>
import PageHeader from '@/components/shared/elements/PageHeader.vue';
import WrapperBlock from '@/components/shared/elements/WrapperBlock.vue';
import TableContent from './components/table/TableContent.vue';

const stabContent = [
  {
    id: 1,
    text: 'Чтобы зарегистрироваться в нашей магистратуре, нужно как миниум',
    key: "confirm_user_personal_data_message"
  },
  {
    id: 2,
    text: 'Чтобы зарегистрироваться в нашей магистратуре, нужно как миниум',
    key: "confirm_user_personal_data_message"
  },
  {
    id: 3,
    text: 'Чтобы зарегистрироваться в нашей магистратуре, нужно как миниум',
    key: "confirm_user_personal_data_message"
  },
]
  
</script>

<template>
  <div class="content">
    <PageHeader>
      Контент
    </PageHeader>

    <div class="content__switch">
      
    </div>

    <div class="content__content">

      <WrapperBlock>

        <div class="search">

        </div>

        <TableContent
        
        />
        

      </WrapperBlock>

    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>