import { getApplicantPage } from "@/api/pages/applicant/apiApplicant";
import { useCompanyStore } from "@/store/company/companyStore";
import { useUserStore } from "@/store/user/userStore";
import type { IApplicantDataTypeFirstStage } from "@/types/pages/applicant/applicantTypes";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default function applicantWorks () {
  type TStages = "stage1" | "stage2"

  const companyStore = useCompanyStore();

  const route = useRoute();
  const applicantId = route.params.id;
  const pageDataArr = ref<null | IApplicantDataTypeFirstStage>(null);
  const selectedStage = ref<TStages>('stage1');
  const editingIsActive = ref<boolean>(false);
  const userStore = useUserStore();

  const activateEditing = () => {
    editingIsActive.value = true;
  };

  const finishEditing = () => {
    editingIsActive.value = false;
  };

  const breadCrumb = computed(() => [
    {
      name: "Абитуриенты",
      path: "/applicants"
    },
    {
      name: pageDataArr.value?.display_name ?? "",
      path: `/applicant/${applicantId}`
    }
  ]);

  const dataSwitch = [
    {
      name: "stage1",
      text: "1 этап"
    },
    {
      name: "stage2",
      text: "2 этап"
    }
  ];

  const getPageData = async () => {
    try {
      if(!applicantId) return;
      const respone = await getApplicantPage(Number(applicantId), 1);
      pageDataArr.value = respone;
    } catch (error) {
      console.error('ошибка при получении данных страницы')
    }
  };

  watch(() => companyStore.selectedCompany, () => {
      getPageData()
    },{ immediate: true }
  )
  
  return {
    pageDataArr,
    breadCrumb,
    selectedStage,
    dataSwitch,
    editingIsActive,
    userStore,
    activateEditing,
    finishEditing
  }
}