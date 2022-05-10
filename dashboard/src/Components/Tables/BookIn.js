import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { updateTestInformation } from "../../features/test_information/testInformationSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { get_requests } from "../../features/Tests/singleTestSlice";
import {
  updateTestSchedule,
  resetTestsScheduleUpadte,
} from "../../features/testSchedule/testScheduleSlice";
import ModalForm from "../Modal_form/ModalForm";
import ScheduleModal from "../Forms/ScheduleModal";
import { updateCCTestInformation } from "../../features/CCTest_information/CCTest_informationSlice";
import { BiMinus, BiPlus } from "react-icons/bi";

const BookInTable = ({ data, handleClick }) => {
  const { register } = useForm();
  const [status, setTestStatus] = useState(data?.status);
  const [error, setError] = useState(false);
  const [move_ticket, setMoveTicket] = useState("");
  const [f_move_ticket, setFMoveTicket] = useState([]);
  const [display, setDisplay] = useState("none");
  const [scheduleDisplay, setScheduleDisplay] = useState("none");
  const [text, setText] = useState(false);
  const [check, setCheck] = useState(false);
  let batches = [];

  const params = useParams();
  const reportNo = params.bookId;

  const [testInformation, setTestInfotmation] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { testInfo, isLoading } = useSelector(
    (state) => state.singleTestRequest
  );

  console.log(testInfo);

  const { isUpdated } = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(get_requests(reportNo));
  }, [reportNo, dispatch]);

  useEffect(() => {
    if (display === "none") {
      setText(false);
    }
  }, [display]);

  useEffect(() => {
    let descriptions;
    let batch_no = [];
    let id_no = [];
    if (testInfo?.reportNo?.includes("CC")) {
      descriptions = testInfo?.CC_info?.map((item) => {
        if (batch_no.indexOf(item.batch_no) === -1) {
          batch_no.push(item.batch_no);
          id_no.push(item.id);
        }
        return item.id;
      });
    } else {
      descriptions = testInfo?.test_information?.map((item) => {
        if (batch_no.indexOf(item.batch_no) === -1) {
          batch_no.push(item.batch_no);
          id_no.push(item.id);
        }
        return item.id;
      });
    }

    //remove undefine
    console.log(descriptions, id_no);

    setTestInfotmation(
      descriptions?.reduce(
        (options, option, index) => [
          ...options,
          {
            [option]: !id_no.includes(option)
              ? true
              : testInfo?.test_information[index].Received === "true"
              ? true
              : false,
          },
        ],
        []
      )
    );
    setFMoveTicket(
      descriptions?.reduce(
        (options, option, index) => [
          ...options,
          {
            [option]: testInfo?.test_information[index].move_ticket
              ? testInfo?.test_information[index].move_ticket
              : "N/A",
          },
        ],
        []
      )
    );
  }, [testInfo]);

  console.log(testInformation);

  const handleChange = (e, i) => {
    const { name } = e.target;
    let info = [...testInformation];
    let infoIndex = { ...info[i] };
    infoIndex[name] = !info[i][name];

    info[i] = infoIndex;

    setTestInfotmation(info);
  };

  const handleChangeInput = (e) => {
    setMoveTicket(e.target.value);
    setError(false);
  };

  const checkAll = (e) => {
    e.preventDefault();
    const test = testInformation.reduce(
      (options, option) => [
        ...options,
        {
          [Object.keys(option)]: true,
        },
      ],
      []
    );

    setTestInfotmation(test);
    setCheck((prevState) => !prevState);
  };

  const unCheckAll = (e) => {
    e.preventDefault();
    const test = testInformation.reduce(
      (options, option) => [
        ...options,
        {
          [Object.keys(option)]: false,
        },
      ],
      []
    );

    setTestInfotmation(test);
    setCheck((prevState) => !prevState);
  };

  useEffect(() => {
    let count = 0;
    for (var i = 0; i <= testInformation?.length; i++) {
      for (var name in testInformation[i]) {
        if (testInformation[i][name] === false) {
          count++;
        }
      }
    }
    if (count === 0) {
      setTestStatus("Booked In");
    } else {
      setTestStatus("Received");
    }
  }, [testInformation]);

  useEffect(() => {
    if (isUpdated && text) {
      toast.success("Samples Successfully booked in");
      dispatch(resetTestsScheduleUpadte());
    }
  }, [isUpdated, navigate, dispatch, text]);

  const tests = () => {
    let modifiedTest;
    const testsDescrip = testInfo?.tests?.map((item) => JSON.parse(item));
    if (testsDescrip.length > 0) {
      modifiedTest = testsDescrip?.map((item, index) =>
        Object.values(item)[0]
          ? index !== testsDescrip.length - 1
            ? Object.keys(item)[0] + ", "
            : Object.keys(item)[0]
          : ""
      );
    }
    return modifiedTest;
  };

  const onSubmitValues = (e) => {
    const { value } = e.target;

    if (!text && value === "yes") {
      setText(true);
      // dispatch data
      const testData = {
        testInformation,
        reportNo: testInfo.reportNo,
        status,
        move_ticket: f_move_ticket
          ? f_move_ticket + " & " + move_ticket
          : move_ticket,
      };

      dispatch(updateTestInformation(testData));
      dispatch(updateCCTestInformation(testData));
      dispatch(updateTestSchedule(testData));
    } else if (!text && value === "no") {
      setDisplay("none");
    }

    if (text && value === "yes") {
      setDisplay("none");
      setScheduleDisplay("block");
      // submit values scheduling data
      // const testData = {
      //   reportNo: testInfo.reportNo,
      //   start: initialState.start,
      //   status: "In Progress",
      // };
    } else if (text && value === "no") {
      setScheduleDisplay("none");
      setDisplay("none");
      //navigate to book In form
      navigate("/bookin");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // check if all the required information has been inserted
    let count = 0;
    for (var i = 0; i <= testInformation?.length; i++) {
      for (var name in testInformation[i]) {
        if (testInformation[i][name] === false) {
          count++;
        }
      }
    }
    if (!move_ticket) {
      setError(true);
    } else {
      if (!text) {
        if (count !== 0) {
          toast.error("You haven't received all the Samples");
          setText(false);
          setDisplay("block");
        } else {
          setDisplay("block");
          setText(true);
          //dispatch value to the back end
          const testData = {
            testInformation,
            reportNo: testInfo.reportNo,
            status,
            move_ticket: f_move_ticket
              ? f_move_ticket + " & " + move_ticket
              : move_ticket,
          };

          dispatch(updateTestInformation(testData));
          dispatch(updateCCTestInformation(testData));
          dispatch(updateTestSchedule(testData));
        }
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Header>
        <Button onClick={!check ? checkAll : unCheckAll} color="blue">
          {check ? "Uncheck All" : "Check All"}
        </Button>
        <div>
          {testInfo?.reportNo?.includes("CC") ? "Somalac Lot No.:" : "Lot No.:"}
          <span>
            {testInfo.test_type === "Development"
              ? "Development"
              : (testInfo?.test_information?.length > 0 &&
                  testInfo?.test_information[0].description) ||
                (testInfo?.CC_info?.length > 0 &&
                  testInfo?.CC_info[0]?.CCC_Slurry_Batch_No?.split("/")[0])}
          </span>
        </div>
      </Header>

      <TableContainer>
        <thead>
          {testInfo?.test?.facility_name
            ?.toLowerCase()
            .includes("combustible") ? (
            <TableTr>
              <TableHeader>Batch No</TableHeader>
              <TableHeader>CCC No.</TableHeader>
              <TableHeader>Coating Date</TableHeader>
              <TableHeader>Coating No.</TableHeader>
              <TableHeader>Marked</TableHeader>
              <TableHeader>Dry Mass</TableHeader>
              <TableHeader>Section</TableHeader>
              <TableHeader>Received</TableHeader>
              {f_move_ticket?.length > 0 && (
                <TableHeader>Move Ticket</TableHeader>
              )}
            </TableTr>
          ) : (
            <TableTr>
              <TableHeader>Batch No</TableHeader>
              <TableHeader>
                {testInfo?.reportNo?.includes("FS") ? "Quantity" : "Sample"}
              </TableHeader>
              <TableHeader>Test(s)</TableHeader>
              <TableHeader>Section</TableHeader>
              <TableHeader>Received</TableHeader>
              {f_move_ticket?.length > 0 && (
                <TableHeader>Move Ticket</TableHeader>
              )}
            </TableTr>
          )}
        </thead>
        {testInfo?.test_information?.length > 0 && (
          <tbody>
            {testInfo?.test_information?.map((item, index) => {
              const { description, batch_no, sample, id, lot_number } = item;

              console.log(batches);
              if (batches.indexOf(batch_no) === -1) {
                batches.push(batch_no);

                return (
                  <TableTr key={index}>
                    <Tbody>
                      {testInfo?.test_type === "Development"
                        ? description
                        : lot_number
                        ? "FL" + "-" + lot_number + " " + batch_no
                        : batch_no}
                    </Tbody>
                    <Tbody>{sample}</Tbody>
                    <Tbody>{tests()}</Tbody>
                    <Tbody> {testInfo?.test.facility_name}</Tbody>

                    <Tbody>
                      <form>
                        <input
                          type="checkbox"
                          name={id}
                          checked={
                            testInformation?.length > 0 &&
                            testInformation[index][id]
                          }
                          {...register(`${id}`, {
                            onChange: (e) => {
                              handleChange(e, index);
                            },
                          })}
                        />
                      </form>
                    </Tbody>
                    {f_move_ticket?.length > 0 && (
                      <Tbody>
                        {testInformation?.length > 0 &&
                        testInformation[index][id]
                          ? f_move_ticket[index].move_ticket
                          : "N/A"}
                      </Tbody>
                    )}
                  </TableTr>
                );
              }
            })}
          </tbody>
        )}
        {testInfo?.CC_info?.length > 0 && (
          <tbody>
            {testInfo?.CC_info?.map((item, index) => {
              const {
                CCC_Slurry_Batch_No,
                CCC_No,
                Coating_date,
                Coating_number,
                Marked,
                Dry_mass,
                id,
              } = item;

              return (
                <TableTr key={index}>
                  <Tbody>{CCC_Slurry_Batch_No}</Tbody>
                  <Tbody>{CCC_No}</Tbody>
                  <Tbody>{Coating_date}</Tbody>
                  <Tbody> {Coating_number}</Tbody>
                  <Tbody> {Marked}</Tbody>
                  <Tbody> {Dry_mass}</Tbody>
                  <Tbody> {testInfo?.test.facility_name}</Tbody>
                  <Tbody>
                    <form>
                      <input
                        type="checkbox"
                        checked={
                          testInformation?.length > 0 &&
                          testInformation[index][id]
                            ? testInformation[index][id]
                            : false
                        }
                        {...register(`${id}`, {
                          onChange: (e) => {
                            handleChange(e, index);
                          },
                        })}
                      />
                    </form>
                  </Tbody>
                </TableTr>
              );
            })}
          </tbody>
        )}
      </TableContainer>
      <Input>
        <input
          type="text"
          placeholder="Enter move ticket number"
          name="move_ticket"
          {...register("move_ticket", {
            required: true,
            onChange: (e) => handleChangeInput(e),
          })}
        />
        {error && <p>Move ticket is a required field</p>}
      </Input>
      <ModalForm display={scheduleDisplay} setDisplay={setScheduleDisplay}>
        <ScheduleModal reportNo={reportNo} setDisplay={setScheduleDisplay} />
      </ModalForm>
      <ModalForm display={display} setDisplay={setDisplay}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          {!text && (
            <span style={{ color: "red", margin: "5px" }}>
              Note: You haven't received all samples
            </span>
          )}
          <p>
            {!text
              ? "Would you like to submit a form? "
              : "Would you like to schedule a Test?"}
          </p>
          <div>
            <Button
              color="blue"
              type="submit"
              value="yes"
              onClick={(e) => onSubmitValues(e)}
            >
              Yes
            </Button>
            <Button
              color="red"
              type="submit"
              value="no"
              onClick={(e) => onSubmitValues(e)}
            >
              No
            </Button>
          </div>
        </div>
      </ModalForm>
      <Button type="submit" onClick={(e) => onSubmit(e)} color="blue">
        Verify
      </Button>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  padding: 10px 40px;
`;

const TableContainer = styled.table`
  border-collapse: collapse;
  z-index: 9999;
  box-sizing: border-box;
  width: 100%;
`;

const TableTr = styled.tr`
  input {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
  }

  button {
    font-size: 24px;
    font-weight: 600;
    padding: 2px 2px;
    border: none;
    border-radius: 50%;
    line-height: 20px;
    cursor: pointer;
    color: white;
    background-color: ${(props) => (props.add ? "blue" : "red")};
  }
`;

const TableHeader = styled.th`
  border-bottom: 1px solid lightgrey;
  text-align: left;
  justify-content: center;
  height: 50px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;

const Tbody = styled.td`
  text-align: left;
  border-bottom: 0.5px solid lightgrey;
  padding: 10px 0;
  font-size: 12px;
`;

const Button = styled.button`
  text-transform: uppercase;
  align-items: right;
  justify-content: right;

  padding: 5px 10px;
  margin-top: 10px;
  color: ${(props) => props.color};
  background-color: smokewhite;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    margin: 10px;
    font-weight: bold;
  }

  span {
    color: blue;
  }
`;

const Input = styled.div`
  padding: 20px;

  input {
    padding: 10px;
    border: solid 1px red;
  }

  p {
    color: red;
    margin-top: 10px;
    font-size: 12px;
  }
`;

export default BookInTable;
