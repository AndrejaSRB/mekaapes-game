import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
// ******** Queires ********
import { GET_GIFTED } from "../../../queries";
// ******** Styles ********
import {
  Wrapper,
  Content,
  Title,
  MainBox,
  TitleBox,
  TableWrapper,
  Row,
  Label,
  PaginationWrapper,
} from "./OogaAttacked.styles";

const OogaAttacked = ({ setLoader, reduceAddress }) => {
  const [totalGifted, setTotalGifted] = useState(0);
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState(null);
  const [getOogaAttacked, { loading, data }] = useLazyQuery(GET_GIFTED);

  useEffect(() => {
    getOogaAttacked({
      variables: {
        skip: 0,
      },
    });
  }, [getOogaAttacked]);

  useEffect(() => {
    if (loading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [loading, setLoader]);

  useEffect(() => {
    if (data?.gameStatus !== null && data?.gameStatus !== undefined) {
      if (data?.gameStatus?.roboOogasGifted) {
        setTotalGifted(data?.gameStatus?.roboOogasGifted);
      }
    }
    if (data?.gifts !== null && data?.gifts !== undefined) {
      setTableData(data.gifts);
    } else {
      setTableData(null);
    }
  }, [data]);

  const handleChangePagination = (newPage) => {
    setPage(newPage);
    getNewData(newPage);
  };

  const getNewData = (page) => {
    console.log("skip", (+page - 1) * 10);
    let skip = (+page - 1) * 10;
    getOogaAttacked({
      variables: {
        skip: +skip,
      },
    });
  };

  const getTributeName = (id, type, level) => {
    if (type === 1) {
      if (level > 0) {
        return `MegaMeka #${id}`;
      } else {
        return `MekaApe #${id}`;
      }
    } else {
      return `Robo Ooga #${id}`;
    }
  };

  const getGiftedTokenName = (id, type) => {
    if (type === 1) {
      return `MekaApe #${id}`;
    } else {
      return `Robo Ooga #${id}`;
    }
  };

  const renderTableData = () => {
    if (tableData && tableData.length > 0) {
      return tableData.map((item) => (
        <Row key={item.id}>
          <div className="token">
            <span className="id">ID</span>
            {getGiftedTokenName(item.id, item.giftOogaType)}
          </div>
          <div className="owner">
            <span>Tr. Owner</span>
            {reduceAddress(item.tributeAccount)}
          </div>
          <div className="owner">
            <span className="tribute-id">Tr. ID</span>
            {getTributeName(
              item.tributeOogaId,
              item.tributeOogaType,
              item.tributeOogaLevel
            )}
          </div>
        </Row>
      ));
    }
  };

  return (
    <Wrapper>
      <Content>
        <Title>Gifted Tokens</Title>
        <MainBox>
          <TitleBox>
            <TableWrapper>
              <Label>
                <div className="token">ID</div>
                <div className="owner">Tribute Owner</div>
                <div className="owner">Tribute ID</div>
              </Label>
              {renderTableData()}
            </TableWrapper>
            <PaginationWrapper
              total={totalGifted}
              responsive={true}
              pageSize={10}
              current={page}
              showSizeChanger={false}
              onChange={handleChangePagination}
            />
          </TitleBox>
        </MainBox>
      </Content>
    </Wrapper>
  );
};

export default OogaAttacked;
