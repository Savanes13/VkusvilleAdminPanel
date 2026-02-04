import { getApplicantPage } from "@/api/pages/applicant/apiApplicant";
import { useCompanyStore } from "@/store/company/companyStore";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default function applicantWorks () {
  const companyStore = useCompanyStore();

  const route = useRoute();
  const applicantId = route.params.id;
  const pageDataArr = ref<null | any>(null);

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
    breadCrumb
  }
}