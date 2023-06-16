import LensDetailInfoMain from "@/components/lens_detail/LensDetailInfoMain";
import LensDetailInfoSub from "@/components/lens_detail/LensDetailInfoSub";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensApi from "@/interfaces/lensApi";
import { ILensDetail } from "@/types/lens/lens";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const EmptyBox = styled.div`
  text-align: center;
  margin-top: 100px;
`;

function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const idToNum = Number(id);
  const [lensDetail, setLensDetail] = useState<ILensDetail | undefined>();

  if (!id) {
    throw "no id";
  }

  useEffect(() => {
    (async () => {
      const lensApi = new LensApi();
      const lensDetail = await lensApi.getLensDetailById(idToNum);
      setLensDetail(lensDetail);
    })();
  }, [id]);

  return (
    <>
      <BackHomeNavBar title="Detail" />
      {!lensDetail ? (
        <EmptyBox>해당하는 렌즈정보가 없습니다</EmptyBox>
      ) : (
        <>
          <LensDetailInfoMain lensDetail={lensDetail} />
          <LensDetailInfoSub lensDetail={lensDetail} />
        </>
      )}
    </>
  );
}

export default DetailPage;
