import PromotionItem from "@/components/main/PromotionItem";
import React, { useState } from "react";

interface MainPromotionContainerProps {
  period: string;
}

function MainPromotionContainer({ period }: MainPromotionContainerProps) {
  const [promotion, setPromotion] = useState({
    id: 1,
    name: "비비링",
    model_thumbnail:
      "https://file.o-lens.com/main-display/9081ab48-3749-4a14-b16c-55d30c7e61aae9153478-1b54-4481-bf55-be3b7e2fd606.jpeg?w=686",
    period_classifi: "원데이",
  });

  return <PromotionItem promotion={promotion} />;
}

export default MainPromotionContainer;
