export interface Products {
  "products": [
    {
      id: string;
      name: string;
      image: string;
      recomendedEmojis: string;
    }
  ];
}
export interface SurveyRequest {
  surveyId: string;
  _items: SurveyRequestItem[];
}
export interface SurveyRequestItem {
  productId: string;
  selectedEmojis: string;
}

