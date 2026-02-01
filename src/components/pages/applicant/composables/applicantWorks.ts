import { useCompanyStore } from "@/store/company/companyStore";
import { watch } from "vue";

export default function applicantWorks () {
  const companyStore = useCompanyStore();

  const breadCrumb = [
    {
      name: "Главная",
      path: "/"
    },
    {
      name: "Корзина",
      path: "/cart"
    },
  ];

  // const getPageData = async () => {
  //   try {

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