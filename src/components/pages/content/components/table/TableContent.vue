<script lang="ts" setup>
import HeaderTable from './components/HeaderTable.vue';
import LineTable from './components/LineTable.vue';

interface ITableLine {
  key: string;
  value: string;
  format_keys: string[];
}

interface ITableContentProps {
  data: ITableLine[];
  missingLines: number;
}

const {
  data,
  missingLines
} = defineProps<ITableContentProps>();

const emit = defineEmits<{
  (e: 'changeTextLine', value: string, key: string): void;
}>();

const changeText = (text: string, key: string) => {
  emit('changeTextLine', text, key);
}
</script>

<template>
  <div class="table">

    <!-- TODO: сюда поиск -->

    <HeaderTable/>
    <LineTable
      v-for="(item, index) in data"
      :format_keys="item.format_keys"
      :key-line="item.key"
      :text="item.value"
      :key="item.key"
      :last-line="missingLines === 0 && index === data.length - 1"
      @change-text="changeText"
    />
    <LineTable
      v-for="(line, index) in missingLines"
      :empty="true"
      :format_keys="[]"
      key-line=""
      text=""
      :key="index"
      :last-line="index === missingLines - 1"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "@/style/variables/color.scss" as color;

</style>