import { getApplicantPage } from "@/api/pages/applicant/apiApplicant";
import { useCompanyStore } from "@/store/company/companyStore";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default function applicantWorks () {
  type TStages = "stage1" | "stage2"

  const companyStore = useCompanyStore();

  const route = useRoute();
  const applicantId = route.params.id;
  const pageDataArr = ref<null | any>(null);
  const selectedStage = ref<TStages>('stage1');
  const editingIsActive = ref<boolean>(false);

  const activateEditing = () => {
    editingIsActive.value = true;
  };

  const finishEditing = () => {
    editingIsActive.value = false;
  };

  const breadCrumb = [
    {
      name: "Абитуриенты",
      path: "/applicants"
    },
    {
      name: "Корзина",
      path: "/cart"
    },
  ];

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



  // const getPageData = async () => {
  //   try {
  //     if(!applicantId) return;
  //     getApplicantPage(Number(applicantId), 1)
  //   } catch (error) {
  //     console.error('ошибка при получении данных страницы')
  //   }
  // };

  // watch(() => companyStore.selectedCompany, () => {
  //     getPageData()
  //   },{ immediate: true }
  // )
  
  return {
    breadCrumb,
    selectedStage,
    dataSwitch,
    editingIsActive,
    activateEditing,
    finishEditing
  }
}