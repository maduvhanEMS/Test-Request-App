import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  register_request,
  reset,
  resetCreated,
  update_request,
} from "../../features/Tests/testSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { createTestSchedule } from "../../features/testSchedule/testScheduleSlice";
import { createTestInformation } from "../../features/test_information/testInformationSlice";
import { sendEmail } from "../../features/email/emailSlice";
import { getFacility } from "../../features/facility/facilitySlice";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "white",
      fontSize: "10px",
    },
  },
};

const EditTestForm = ({ data, test, id, departments, user }) => {
  const [safety, setSafety] = useState([]);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const params = useParams();
  const currentId = params.testRequestId;
  const { facilities, isSuccess } = useSelector((state) => state.facilities);

  const { isUpdated } = useSelector((state) => state.testRequest);

  const [inputValues, setInputValues] = useState({
    requestorId: user?.id,
    departmentId: "",
    test_type: "",
    facilityId: data?.id,
    test_description: "",
    additional: "",
    tests: [],
    test_information: [],
    safety: [],
    products: [],
  });

  useEffect(() => {
    if (test.length !== 0) {
      setInputValues(test);
    }
  }, [test]);

  useEffect(() => {
    if (inputValues?.facilityId) {
      dispatch(getFacility(inputValues.facilityId));
    }
  }, [inputValues.facilityId, dispatch]);

  useEffect(() => {
    if (test?.length !== 0) {
      const jsontests = test?.tests?.map((item) => JSON.parse(item));
      const safety = test.development[0]?.safety?.map((item) =>
        JSON.parse(item)
      );

      setInputValues((prevState) => ({
        ...prevState,
        tests: jsontests,
        safety: safety,
      }));
    }

    if (isSuccess && facilities.safety?.length > 0) {
      const safetyData = facilities.safety[0].name.map((item) =>
        JSON.parse(item)
      );
      setSafety(safetyData);
    }
  }, [id, test, dispatch, isSuccess, facilities]);

  const handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    const size = inputValues?.test_information?.length;
    const jsonData = data?.header[0]?.name?.map((item) => JSON.parse(item));
    const headers = jsonData?.map((item) => item.headerName);
    const newHeaders = headers.reduce(
      (options, option) => ({
        ...options,
        [option]:
          option === "number"
            ? parseInt(inputValues.test_information[size - 1][option]) + 1
            : inputValues.test_information[size - 1][option],
      }),
      {}
    );

    setInputValues((prevState) => ({
      ...prevState,
      test_information: [...prevState.test_information, newHeaders],
    }));
  };

  const handleRemove = (e, i) => {
    e.preventDefault();
    let list = { ...inputValues };
    let info = [...list.test_information];
    info.splice(i, 1);
    list.test_information = info;

    setInputValues(list);
  };

  const ignoreValues = [
    "id",
    "createdAt",
    "updatedAt",
    "reportNo",
    "Received",
    "number",
    "testRequestId",
    "file",
    "filename",
  ];
  const ignoreValuesCC = [
    "id",
    "createdAt",
    "updatedAt",
    "reportNo",
    "Received",
    "testRequestId",
    "file",
    "filename",
    "CC_type",
  ];

  const ignoreValuesFlare = [
    "id",
    "createdAt",
    "updatedAt",
    "reportNo",
    "Received",
    "testRequestId",
    "file",
    "filename",
    "reference_lot",
    "number",
  ];

  // useEffect(() => {
  //   if (isCreated) {
  //     dispatch(createTestSchedule(inputValues));
  //     dispatch(createTestInformation(inputValues));

  //     const emailData = {
  //       name: user.username,
  //       reportNo: inputValues.reportNo,
  //       Link: `http://localhost:3000/newRequest/${inputValues.reportNo}`,
  //     };
  //     dispatch(sendEmail(emailData));
  //     toast.success(
  //       `Report Number ${inputValues.reportNo} Succesfully created`
  //     );

  //     dispatch(resetCreated());
  //   }
  // }, [isCreated, inputValues, dispatch, user]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Test form successfully approved");
      navigate("/product?page=1");
    }

    return () => {
      dispatch(reset());
    };
  });

  const onSubmit = (data) => {
    //before dispatching the form
    //ensure that status has been selected

    if (!inputValues.status) {
      toast.error("Pipulate all the required fields");
    } else {
      const testData = {
        status: inputValues.status,
        reportNo: inputValues.reportNo,
      };
      dispatch(update_request(testData));
    }
  };

  return (
    <Container>
      {/* <h3>Test Request Form</h3> */}
      <Span></Span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>General Information</FormHeader>
        <FormContainer>
          <Row>
            <FieldControl color={!inputValues?.requestorId ? "red" : "blue"}>
              <label htmlFor="Requestor">
                Requestor <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                disabled
                value={inputValues?.user?.username}
                id="requestorId"
                readOnly
              />
            </FieldControl>

            <FieldControl>
              <label htmlFor="productId">
                Product Name <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                multiple
                fullWidth
                name="products"
                value={inputValues.products}
                style={{ fontSize: "12px" }}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                variant="outlined"
              ></Select>
            </FieldControl>

            {inputValues?.productId === "Other" && (
              <Other color={!inputValues?.Other ? "blue" : "red"}>
                <label htmlFor="Other">if other, please specify</label>
                <input
                  type="text"
                  value={inputValues?.Other}
                  id="Other"
                  readOnly
                />
              </Other>
            )}

            <FieldControl color={!inputValues?.test_type ? "red" : "blue"}>
              <label htmlFor="test_type">
                Test Type <span style={{ color: "red" }}>*</span>
              </label>
              <select id="test_type" value={inputValues?.test_type} readOnly>
                <option value="">...Select</option>
                <option value="Production">Production</option>
                <option value="Development">Development</option>
              </select>
            </FieldControl>
            <FieldControl
              color={!inputValues?.test_description ? "red" : "blue"}
            >
              <label htmlFor="test_description">
                Test Description <span style={{ color: "red" }}>*</span>
              </label>

              <textarea
                value={inputValues?.test_description}
                readOnly
              ></textarea>
            </FieldControl>
          </Row>
          <Row>
            <FieldControl color={!inputValues?.departmentId ? "Red" : "blue"}>
              <label htmlFor="Department">
                Department <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={inputValues?.departmentId}
                id="departmentId"
                readOnly
              >
                <option value="">Please select</option>
                {departments?.map((item, key) => {
                  return (
                    <option value={item.id}>{item.department_name}</option>
                  );
                })}
              </select>
            </FieldControl>
            <FieldControl>
              <label htmlFor="expected_date"> Results Expected</label>
              <input
                type="date"
                value={inputValues?.expected_date}
                id="expected_date"
                readOnly
              />
            </FieldControl>
            {inputValues?.product_name === "Other" && (
              <FieldControl
                color={!inputValues?.product_specification ? "blue" : "red"}
              >
                <label htmlFor="product_specification">
                  Product Specification <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={inputValues?.product_specification}
                  id="product_specification"
                  readOnly
                />
              </FieldControl>
            )}

            {inputValues?.test_type === "Development" && (
              <FieldControl
                color={!inputValues?.product_specification ? "blue" : "red"}
              >
                <label htmlFor="cost_centre">
                  Cost Centre <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={
                    inputValues?.development?.length > 0 &&
                    inputValues?.development[0]?.cost_center
                  }
                  id="cost_centre"
                  readOnly
                />
              </FieldControl>
            )}

            <FieldControl>
              <label htmlFor="test_instruction">
                Test Instruction or WP No.{" "}
              </label>
              <input
                type="text"
                value={inputValues?.wp}
                id="test_instruction"
                readOnly
              />
            </FieldControl>
          </Row>
        </FormContainer>
        {/* Think of creating a separate form Maduvha */}
        <FormHeader>Test(s) Required</FormHeader>
        {inputValues && (
          <p
            style={{
              color: "red",
              fontWeight: "500",
              padding: "0 20px",
              lineHeight: "2rem",
            }}
          >
            Note: Please select at least one test, otherwise you won't be able
            to submit the form!!!
          </p>
        )}
        <TestContainer>
          {inputValues?.tests?.map((item, i) => {
            const name = Object.keys(item)[0];
            const value = Object.values(item)[0];

            return (
              <FieldControl key={i}>
                <input type="checkbox" id={name} checked={value} readOnly />
                <label htmlFor="dynamic_vivacity">{name}</label>
              </FieldControl>
            );
          })}
        </TestContainer>
        {/* Think of creating a separate form Maduvha */}
        <FormHeader>Test Information</FormHeader>
        {id === 2 && (
          <TableContainer style={{ paddingRight: "20px" }}>
            <FieldControl
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label>Aleady Fired in the Closed Vessel? </label>
              <select id="Department" readOnly>
                <option value="">Please select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </FieldControl>
          </TableContainer>
        )}
        <TableContainer>
          <thead>
            <TableTr add>
              {inputValues?.test_information?.length > 0 &&
                Object.entries(inputValues.test_information[0]).map(
                  ([key, value]) => (
                    <TableHeader key={key + value}>
                      {key === "batch_no" &&
                      inputValues?.test_type === "Development"
                        ? ""
                        : !inputValues?.reportNo?.includes("FS")
                        ? !ignoreValues.includes(key) && key.toUpperCase()
                        : !ignoreValuesFlare.includes(key) && key.toUpperCase()}
                    </TableHeader>
                  )
                )}

              {inputValues?.CC_info?.length > 0 &&
                Object.entries(inputValues.CC_info[0]).map(([key, value]) => (
                  <TableHeader key={key + value}>
                    {!ignoreValuesCC.includes(key) && key.toUpperCase()}
                  </TableHeader>
                ))}

              <TableHeader>
                <button onClick={(e) => handleAddClick(e)}>
                  <BiPlus />
                </button>
              </TableHeader>
            </TableTr>
          </thead>
          <tbody>
            {inputValues?.test_information?.map((items, index) => {
              return (
                <TableTr key={index}>
                  <>
                    {Object.entries(items).map(([key, value]) => (
                      <Tbody key={index + key}>
                        {key === "description" &&
                        inputValues?.test_type !== "Development" &&
                        !inputValues?.reportNo?.includes("FS") ? (
                          <div>
                            <select value={value} readOnly name={key}>
                              <option>Please select</option>
                              <option value="ML">Mixer Load</option>
                              <option value="SL">Sub Lot</option>
                              <option value="Final Lot">Final Lot</option>
                            </select>
                            {inputValues?.test_information[index][key] ===
                              "Final Lot" && (
                              <input
                                type="text"
                                placeholder="Lot number"
                                name="final_lot"
                                min="0"
                                readOnly
                              />
                            )}
                          </div>
                        ) : key === "batch_no" &&
                          inputValues?.test_type === "Development" ? (
                          ""
                        ) : !inputValues?.reportNo?.includes("FS") ? (
                          !ignoreValues.includes(key) && (
                            <input
                              type="text"
                              value={value}
                              name={key}
                              readOnly
                            />
                          )
                        ) : (
                          !ignoreValuesFlare.includes(key) && (
                            <input
                              type="text"
                              value={value}
                              name={key}
                              readOnly
                            />
                          )
                        )}
                      </Tbody>
                    ))}

                    {inputValues?.test_information.length !== 1 && (
                      <Tbody>
                        <button>
                          <BiMinus onClick={(e) => handleRemove(e, index)} />
                        </button>
                      </Tbody>
                    )}
                  </>
                </TableTr>
              );
            })}
          </tbody>
          <tbody>
            {inputValues?.CC_info?.map((items, index) => {
              return (
                <TableTr key={index}>
                  <>
                    {Object.entries(items).map(([key, value]) => (
                      <Tbody key={index + key}>
                        {!ignoreValuesCC.includes(key) && (
                          <input
                            type="text"
                            value={value}
                            name={key}
                            readOnly
                          />
                        )}
                      </Tbody>
                    ))}

                    {inputValues?.test_information.length !== 1 && (
                      <Tbody>
                        <button>
                          <BiMinus onClick={(e) => handleRemove(e, index)} />
                        </button>
                      </Tbody>
                    )}
                  </>
                </TableTr>
              );
            })}
          </tbody>
        </TableContainer>
        {/* Think of creating a separate form Maduvha */}
        <FormHeader>Additional Information</FormHeader>
        <Additional>
          <textarea
            value={inputValues?.additional}
            placeholder={inputValues?.additional}
            readOnly
          ></textarea>
          <FieldControl>
            <input
              type="file"
              placeholder="upload"
              style={{
                width: "100%",
                border: "none",
                background: "white",
                margin: "0",
              }}
              readOnly
            />
          </FieldControl>
          {inputValues?.file && inputValues?.file.name}
        </Additional>
        {/* Think of creating a separate form Maduvha */}
        {inputValues?.test_type === "Development" && (
          <>
            <FormHeader>Safety Analysis</FormHeader>
            <TableContainer>
              <tbody>
                {safety.map((items, index) => {
                  const { safetyName, description } = items;

                  return (
                    <TableTr key={index}>
                      <Tbody style={{ fontSize: "14px", fontWeight: "500" }}>
                        {safetyName}
                      </Tbody>
                      <Tbody style={{ fontSize: "13px" }}>{description}</Tbody>
                      <Tbody>
                        <FieldControl style={{ margin: "0", padding: "0" }}>
                          <select
                            style={{
                              margin: "0",
                              padding: "4px",
                              background: "white",
                            }}
                            value={inputValues.safety[index][safetyName]}
                            type="text"
                          >
                            <option value="">..Select.</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </FieldControl>
                      </Tbody>
                    </TableTr>
                  );
                })}
              </tbody>
            </TableContainer>

            {/* Think of creating a separate form Maduvha */}
            <FormHeader>Product Classification</FormHeader>
            <TableContainer>
              <thead>
                <TableTr add>
                  <TableHeader>Product</TableHeader>
                  <TableHeader>Class</TableHeader>
                  <TableHeader>Group</TableHeader>
                </TableTr>
              </thead>
              <tbody>
                {inputValues.products.map((item, index) => (
                  <TableTr>
                    <Tbody>
                      <input type="text" value={item} readOnly />
                    </Tbody>
                    <Tbody>
                      <input
                        type="text"
                        value={inputValues?.development[0].exp_class[index]}
                        readOnly
                      />
                    </Tbody>
                    <Tbody>
                      <input
                        type="text"
                        value={inputValues?.development[0].group[index]}
                        readOnly
                      />
                    </Tbody>
                  </TableTr>
                ))}
              </tbody>
            </TableContainer>
            {/* Think of creating a separate form Maduvha */}
            <FormHeader>Product and test safety declaration</FormHeader>
            <p
              style={{
                color: "black",
                fontWeight: "500",
                padding: "0 20px",
                lineHeight: "2rem",
              }}
            >
              I declare that Regulation 2.7(f) of the Explosive act is in place
              and that all preparations is done according to standard procedures
              (or the attached work program), furthermore the product is safe
              for handling,
            </p>
            <FieldControl
              style={{
                padding: "20px",
                justifyContent: "space-between",
                left: "0",
              }}
            >
              <label
                style={{
                  minWidth: "350px",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              >
                Development Scientist/Technial Manager{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" value={inputValues?.user?.username} readOnly />
            </FieldControl>
          </>
        )}
        {currentId && (
          <FieldControl
            style={{
              padding: "20px",
              left: "0",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
            color={!inputValues?.status ? "blue" : "red"}
          >
            <label style={{ marginRight: "20px" }}>
              Approve/Reject: <span style={{ color: "red" }}>*</span>{" "}
            </label>

            <select
              type="text"
              {...register("status", {
                required: true,
                onChange: (e) => handleChange(e),
              })}
            >
              <option value="">Please select</option>
              <option value="Rejected">Rejected</option>
              <option value="Approved">Approved</option>
            </select>
          </FieldControl>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Container>
  );
};

export default EditTestForm;

const Container = styled.div`
  // max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px;
  width: 100%;

  h3 {
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    font-size: 26px;
  }
`;

const Span = styled.hr`
  color: red;
  margin-bottom: 20px;
  border: 1.5px solid rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0.6);
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  width: 100%;
  place-items: start center;
  margin: 0 auto;
  //   background: white;
  padding: 0 20px;
`;

const Row = styled.div`
  //   max-width: 500px;
`;

const FormHeader = styled.h4`
  margin-bottom: 10px;
  background: white;
  padding: 10px;
  margin: 20px 0;
`;

const FieldControl = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  margin-bottom: 10px;

  select {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => props.color};
    // background: papayawhip;
    min-width: 180px;
  }

  label {
    margin-right: 5px;
    align-items: center;
    min-width: 200px;
  }

  input {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => props.color};
    // background: papayawhip;
  }

  textarea {
    padding: 1rem 0.5rem;
    margin: 0.5em;
    outline: 1px solid ${(props) => props.color};
    border: none;
    border-radius: 3px;
    // background: papayawhip;
    resize: vertical;
  }
`;

const Other = styled.div`
  //   font-size: 10px;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.7);
  text-transform: capitalize;

  input {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => props.color};
    // background: papayawhip;
  }
`;

const TestContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  label {
  }

  input {
    border: none;
    border-radius: 3px;
    outline: none;
    margin-right: 20px;
  }
`;

const TableContainer = styled.table`
  padding: 0 20px;
  // border-collapse: collapse;
  box-sizing: border-box;
  width: 100%;
`;

const TableTr = styled.tr`
  input {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    width: 130px;
    border-radius: 3px;
    outline: 1px solid ${(props) => props.color};
    // background: papayawhip;
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
  select {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => props.color};
    // background: papayawhip;
    // min-width: 180px;
  }
`;

const TableHeader = styled.th`
  border-bottom: 1px solid lightgrey;
  text-align: left;
  justify-content: center;
  height: 50px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
`;

const Tbody = styled.td`
  text-align: left;
  border-bottom: 0.5px solid lightgrey;
  padding: 20px 0;
  font-size: 12px;
`;

const Additional = styled.div`
  width: 100%;
  padding: 0 20px;
  textarea {
    padding: 1rem 0.5rem;
    resize: vertical;
    height: 150px;
    width: 100%;
    margin: 0.5em 0;
    outline: 1px solid blue;
    border: none;
    border-radius: 3px;
    // background: papayawhip;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.clear ? "red" : "blue")};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 2s ease-out;
  text-transform: uppercase;
  margin: 0 20px 20px 0;

  &:hover {
    background-color: ${(props) => (props.clear ? "red" : "lightblue")};
    color: black;
  }
`;
