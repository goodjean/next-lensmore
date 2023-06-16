import PromotionItem from "@/components/main/PromotionItem";
import PromotionApi from "@/interfaces/promotionApi";
import { IPromotion } from "@/types/lens/lens";
import React, { useEffect, useState } from "react";

interface MainPromotionContainerProps {
  period: string;
}

function MainPromotionContainer({ period }: MainPromotionContainerProps) {
  const [promotion, setPromotion] = useState<IPromotion | undefined>();

  useEffect(() => {
    (async () => {
      const promotionApi = new PromotionApi();
      const PromotionProduct = await promotionApi.getPromotionProductByPeriod(period);
      setPromotion(PromotionProduct);
    })();
  }, [period]);

  return <PromotionItem promotion={promotion} />;
}

export default MainPromotionContainer;
