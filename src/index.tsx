import React, { useState } from "react";
import styled from "styled-components";

interface IProps {
  size?: number;
  itemsPerPage?: number;
  pageSize?: number;
  initPage?: number;
  dataLength?: number;
  initTotalPage: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 5%;
`;

const PageList = styled.div<{ selected: boolean }>`
  color: ${(props) => (props.selected ? "red" : "black")};
`;
export const Pagination: React.FC<IProps> = ({
  size = 5,
  itemsPerPage = 10,
  pageSize = 5,
  initPage = 1,
  dataLength = 10,
  initTotalPage = -1,
}) => {
  const [pageIndex, setPageIndex] = useState<number>(initPage);
  const [startPage, setStartPage] = useState<number>(initPage);
  const [totalPage] = useState<number>(initTotalPage);

  const movePageIndex = (pageIndex: number) => () => {
    setPageIndex(pageIndex);
  };

  const changePageGroup = (direction: string) => () => {
    const newStartPage =
      direction === "next" ? startPage + pageSize : startPage - pageSize;
    if (newStartPage > 0 && newStartPage <= Math.ceil(totalPage / dataLength)) {
      setStartPage(newStartPage);
      setPageIndex(newStartPage);
    }
  };

  const nextEndPage = () => {
    const total = Math.ceil(totalPage / dataLength);
    const lastPage = !(totalPage % dataLength) ? 0 : 1;
    const resultPage = total - (total % pageSize) + lastPage;

    setStartPage(resultPage);
    setPageIndex(resultPage);
  };

  const prevEndPage = () => {
    setPageIndex(initPage);
    setStartPage(initPage);
  };

  return (
    <Wrapper>
      <ArrowWrapper>
        <div onClick={prevEndPage}>
          <div>{"<<"}</div>
        </div>
        <div onClick={changePageGroup("prev")}>
          <div>{"<"}</div>
        </div>
      </ArrowWrapper>
      {new Array(size).fill("").map(
        (_, index) =>
          index + startPage <= Math.ceil(totalPage / itemsPerPage) && (
            <div key={index} onClick={movePageIndex(index + startPage)}>
              <PageList selected={index + startPage === pageIndex}>
                {index + startPage}
              </PageList>
            </div>
          )
      )}
      <ArrowWrapper>
        <div onClick={changePageGroup("next")}>
          <div>{">"}</div>
        </div>
        <div onClick={nextEndPage}>
          <div>{">>"} </div>
        </div>
      </ArrowWrapper>
    </Wrapper>
  );
};

export default Pagination;
