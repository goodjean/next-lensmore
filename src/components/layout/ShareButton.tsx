import React from "react";
import { IoArrowRedoOutline } from "react-icons/io5";
import { FacebookShareButton } from "react-share";
import styled from "styled-components";

const ShareButtonStyle = styled.div`
  width: 11%;
  display: flex;
  justify-content: center;
`;

interface ShareButtonProps {
  url: string;
  name: string;
}

function ShareButton({ url, name }: ShareButtonProps) {
  const shareUrl = url; // 공유할 URL
  const title = `${name} 홈페이지`; // 공유할 제목

  return (
    <ShareButtonStyle>
      <FacebookShareButton url={shareUrl} quote={title}>
        <IoArrowRedoOutline size={17} />
      </FacebookShareButton>
    </ShareButtonStyle>
  );
}

export default ShareButton;
