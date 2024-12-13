import axios from "axios";

const mockApiBaseUrl = "https://674d40e954e1fca9290eda6e.mockapi.io/exercise"; // 올바른 MockAPI 엔드포인트
const openApiUrl = "https://api.api-ninjas.com/v1/exercises"; // Open API 엔드포인트
const openApiKey = "SEXFn1kM8DMXcVswBv6sGg==WsUEwDYmiNjY3Nne"; // Open API 키

// Open API 데이터 가져오기
export const fetchOpenAPIData = async () => {
  try {
    const response = await axios.get(openApiUrl, {
      headers: { "X-Api-Key": openApiKey },
      params: { muscle: "biceps" },
    });
    return response.data;
  } catch (error) {
    console.error("Open API 호출 에러:", error);
    return [];
  }
};

// MockAPI에 데이터 저장
const saveToMockAPI = async (exercise) => {
    try {
      // MockAPI로 전송할 데이터 준비
      const exerciseData = {
        name: exercise.name, // 필수 필드
        calories: parseInt(exercise.calories) || 0, // 소모 칼로리 (숫자 변환)
      };
  
      console.log("보내는 데이터:", exerciseData); // 디버깅용 출력
  
      // MockAPI로 데이터 전송
      await axios.post(mockApiBaseUrl, exerciseData);
  
      console.log(`MockAPI에 저장 완료: ${exercise.name}`);
    } catch (error) {
      console.error("MockAPI 저장 실패:", error.response?.data || error.message);
    }
  };
  

// Open API 데이터를 MockAPI로 동기화
export const syncDataToMockAPI = async () => {
    try {
      const openAPIData = await fetchOpenAPIData();
  
      for (const exercise of openAPIData) {
        const exerciseWithCalories = {
          name: exercise.name,
          calories: calculateCalories(exercise), // 소모 칼로리 계산
        };
        await saveToMockAPI(exerciseWithCalories);
      }
  
      console.log("동기화 완료!");
    } catch (error) {
      console.error("동기화 실패:", error);
    }
  };

// 소모 칼로리 계산
const calculateCalories = (exercise) => {
  const difficultyToCalories = {
    beginner: 50,
    intermediate: 100,
    advanced: 150,
  };
  return difficultyToCalories[exercise.difficulty] || 30;
};
