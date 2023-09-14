import axios from "axios";

const apiUrl = "https://www.pre-onboarding-selection-task.shop/todos";
const access_token = localStorage.getItem("access_token");

export const fetchData = async (setTodos) => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    setTodos(response.data);
  } catch (error) {
    console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
  }
};
