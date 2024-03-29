import LensDetailInfoMain from "@/components/lens_detail/LensDetailInfoMain";
import LensDetailInfoSub from "@/components/lens_detail/LensDetailInfoSub";
import BackHomeNavBar from "@/components/menu/BackHomeNavBar";
import LensApi from "@/interfaces/lensApi";
import { ILensDetail } from "@/types/lens/lens";
import styled from "styled-components";

const EmptyBox = styled.div`
  text-align: center;
  margin-top: 100px;
`;

interface DetailPageProps {
  lensDetail: ILensDetail | undefined;
}

interface DetailParamsProps {
  params: {
    id: number;
  };
}

function DetailPage({ lensDetail }: DetailPageProps) {
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

export async function getServerSideProps({ params }: DetailParamsProps) {
  const { id } = params;
  const lensApi = new LensApi();
  const lensDetail = await lensApi.getLensDetailById(id);
  return {
    props: { lensDetail },
  };
}

export default DetailPage;
