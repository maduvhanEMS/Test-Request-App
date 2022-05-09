import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  get_ID,
  register_request,
  reset,
  resetCreated,
} from "../../features/Tests/testSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { createTestSchedule } from "../../features/testSchedule/testScheduleSlice";
import { createTestInformation } from "../../features/test_information/testInformationSlice";
import { sendEmail } from "../../features/email/emailSlice";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { createProduct } from "../../features/products/productSlice";
import { createDevelopment } from "../../features/development/developmentSlice";
import { createCCTestInformation } from "../../features/CCTest_information/CCTest_informationSlice";

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

const TestRequest = ({ data, id, departments, user }) => {
  const [safety, setSafety] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const [checkTests, setCheckTests] = useState(false);
  const [checkInfo, setCheckInfo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { testID } = useSelector((state) => state.testRequest);
  const { isCreated } = useSelector((state) => state.testRequest);

  const generateReportNo = (data, testRequestId) => {
    let reportNo;
    // create report number
    if (data.toLowerCase().includes("closed")) {
      reportNo = "CV0" + testRequestId;
    } else if (data.toLowerCase().includes("small")) {
      reportNo = "SAM0" + testRequestId;
    } else if (data.toLowerCase().includes("flare")) {
      reportNo = "FS0" + testRequestId;
    } else if (data.toLowerCase().includes("combustible")) {
      reportNo = "CC0" + testRequestId;
    } else {
      reportNo = "PM0" + testRequestId;
    }

    return reportNo;
  };

  const [inputValues, setInputValues] = useState({
    requestorId: user?.id,
    products: [],
    productId: 1,
    departmentId: "",
    test_type: "",
    facility_name: data?.facility_name,
    facilityId: data?.id,
    test_description: "",
    additional: "",
    tests: [],
    test_information: [],
    safety: [],
    expected_date: "",
    other: "",
    product_specification: "",
    cost_center: "",
    exp_class: [],
    group: [],
    scientist: "",
    lot_number: [],
    closed_vessel: "",
  });

  useEffect(() => {
    if (data) {
      if (data?.header?.length > 0) {
        const jsonData = data?.header[0]?.name?.map((item) => JSON.parse(item));
        const jsontests = data?.tests[0]?.name?.map((item) => JSON.parse(item));
        const safety = data?.safety[0]?.name?.map((item) => JSON.parse(item));

        const TestsNames = jsontests?.map((item) => item.testName);
        const headers = jsonData?.map((item) => item.headerName);
        const safetyNames = safety?.map((item) => item.safetyName);

        const trial = TestsNames?.reduce(
          (options, option) => [
            ...options,
            {
              [option]: false,
            },
          ],
          []
        );
        const safetyUpdate = safetyNames?.reduce(
          (options, option) => [
            ...options,
            {
              [option]: "",
            },
          ],
          []
        );

        const headerupdate = [
          headers?.reduce(
            (options, option) => ({
              ...options,
              [option]: "",
            }),
            {}
          ),
        ];

        if (safety) {
          setSafety(safety);
        } else {
          setSafety([]);
        }

        setInputValues((prevState) => ({
          ...prevState,
          tests: trial,
          test_information: headerupdate,
          facility_name: data?.facility_name,
          facilityId: data?.id,
          safety: safetyUpdate,
          products: [],
        }));
        navigate(`/testrequest?facility=${data?.facility_name}`);
      } else {
        setInputValues((prevState) => ({
          ...prevState,
          tests: [],
          test_information: [],
        }));
        setIsLoading(true);
      }
    }

    dispatch(get_ID());
    dispatch(reset());
  }, [id, data, dispatch, navigate]);

  useEffect(() => {
    // update product name
    if (inputValues?.products.length > 0) {
      const jsonData = data?.header[0]?.name?.map((item) => JSON.parse(item));
      const headers = jsonData?.map((item) => item.headerName);
      let prod = [];

      for (var i = 0; i < inputValues?.products.length; i++) {
        let product =
          inputValues?.products[i] === "Other"
            ? inputValues.other
            : inputValues?.products[i];
        const newHeaders = headers.reduce(
          // eslint-disable-next-line no-loop-func
          (options, option, index) => ({
            ...options,
            [option]:
              option === "reference_lot"
                ? product
                : option === "number"
                ? 0
                : "",
          }),
          {}
        );
        prod.push(newHeaders);
      }

      setInputValues((prevState) => ({
        ...prevState,
        test_information: prod,
      }));
    }
  }, [inputValues.other, data, inputValues.products]);

  useEffect(() => {
    if (inputValues?.test_information?.length > 0) {
      setIsLoading(false);
      for (var i = 0; i < inputValues.test_information.length; i++) {
        if (!Object.values(inputValues.test_information[i]).includes("")) {
          setCheckInfo(true);
        } else {
          setCheckInfo(false);
        }
      }
    }
    let count = 0;
    for (var j = 0; j < inputValues?.tests?.length; j++) {
      if (Object.values(inputValues.tests[j])[0]) {
        count++;
      }
    }

    if (count > 0) {
      setCheckTests(true);
    } else {
      setCheckTests(false);
    }
  }, [inputValues.test_information, inputValues?.tests]);

  //check if test has been selected

  const handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.value;

    if (name === "lot_number") {
      setInputValues({ ...inputValues, [name]: name.push(value) });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleCheckBoxes = (event, index) => {
    const { name } = event.target;
    let tmpFile = { ...inputValues };
    let tmpState = [...tmpFile.tests];
    let mpt = { ...tmpState[index] };
    mpt[name] = !inputValues.tests[index][name];
    tmpState[index] = mpt;
    tmpFile.tests = tmpState;
    setInputValues(tmpFile);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    let tmpFile = { ...inputValues };
    let tmpState = [...tmpFile.test_information];
    let mpt = { ...tmpState[index] };
    mpt[name] = value;
    tmpState[index] = mpt;
    tmpFile.test_information = tmpState;

    setInputValues(tmpFile);
  };

  const handleSafety = (e, index) => {
    const { name, value } = e.target;

    let tmpFile = { ...inputValues };
    let tmpState = [...tmpFile.safety];
    let mpt = { ...tmpState[index] };
    mpt[name] = value;
    tmpState[index] = mpt;
    tmpFile.safety = tmpState;

    setInputValues(tmpFile);
  };

  // try to replace a string
  function replaceString(value) {
    if (value.length > 0) {
      const valueArray = value.match(/\d+/);
      var index = valueArray.index;
      var number = valueArray[0];
      let newNumber;

      //updatet the initial value
      if (typeof Number(number) === "number") {
        newNumber = Number(number) + 1;
      }

      if (index === 0) {
        //replace a string
        return newNumber + value.substring(index + number.length);
      } else {
        return (
          value.substring(0, index) +
          newNumber +
          value.substring(index + number.length)
        );
      }
    } else {
      return value;
    }
  }

  const handleAddClick = (e) => {
    e.preventDefault();
    if (inputValues?.test_information[0].description !== "") {
      setCheck(false);
      const size = inputValues?.test_information.length;
      const jsonData = data?.header[0]?.name?.map((item) => JSON.parse(item));
      const headers = jsonData?.map((item) => item.headerName);
      const newHeaders = headers.reduce(
        (options, option) => ({
          ...options,
          [option]:
            option === "Batch No." || option === "number"
              ? replaceString(inputValues.test_information[size - 1][option])
              : inputValues.test_information[size - 1][option],
        }),
        {}
      );

      setInputValues((prevState) => ({
        ...prevState,
        test_information: [...prevState.test_information, newHeaders],
      }));
      setInputValues((prevState) => ({
        ...prevState,
        lot_number: [...prevState.lot_number, prevState.lot_number[size - 1]],
      }));
    } else {
      setCheck(true);
    }
  };

  const handleRemove = (e, i) => {
    e.preventDefault();
    let list = { ...inputValues };
    let info = [...list.test_information];
    let lot_no = [...list.lot_number];
    info.splice(i, 1);
    lot_no.splice(i, 1);
    list.test_information = info;
    list.lot_number = lot_no;

    setInputValues(list);
  };

  useEffect(() => {
    if (isCreated) {
      dispatch(createTestSchedule(inputValues));
      if (inputValues?.facility_name?.toLowerCase()?.includes("combustible")) {
        dispatch(createCCTestInformation(inputValues));
      } else {
        dispatch(createTestInformation(inputValues));
      }

      if (inputValues?.test_type === "Development") {
        dispatch(createDevelopment(inputValues));
      }
      // const emailData = {
      //   name: user.username,
      //   reportNo: inputValues.reportNo,
      //   Link: `http://localhost:3000/newRequest/${inputValues.reportNo}`,
      // };
      // dispatch(sendEmail(emailData));
      toast.success(
        `Report Number ${inputValues.reportNo} Succesfully created`
      );
      dispatch(resetCreated());

      setInputValues({
        requestorId: user?.id,
        products: [],
        productId: 1,
        departmentId: "",
        test_type: "",
        facility_name: data?.facility_name,
        facilityId: data?.id,
        test_description: "",
        additional: "",
        tests: [],
        test_information: [],
        safety: [],
        expected_date: "",
        other: "",
        product_specification: "",
        cost_center: "",
        exp_class: [],
        group: [],
        scientist: "",
        lot_number: [],
        closed_vessel: "",
      });
      dispatch(get_ID());
    }
  }, [isCreated, inputValues, dispatch, user, data]);

  console.log(inputValues);

  const onSubmit = (data) => {
    // check if other is selected
    if (inputValues.products.includes("Other")) {
      // find the index
      const index = inputValues.products.findIndex((item) => "Other");
      // update the index information with Other propellant name
      inputValues.products[index] = inputValues.other;

      // send data to the backend
      const product_data = {
        product_name: inputValues.other,
        specification: inputValues.product_specification,
        facilityId: inputValues.facilityId,
      };

      dispatch(createProduct(product_data));

      toast.success(`${inputValues.other} sucessfully added`);
    }

    // if test ID exist
    let startIndex;
    if (testID?.message?.includes("undefined")) {
      startIndex = 0;
    } else {
      startIndex = testID;
    }

    const testRequestId = startIndex + 1;
    const reportNo = generateReportNo(inputValues.facility_name, testRequestId);
    const title = reportNo + " - " + inputValues.products.join(" & ");

    // information required to create a schedule
    // update invalues to include reportNo, title and testRequets id
    inputValues["reportNo"] = reportNo;
    inputValues["testRequestId"] = testRequestId;
    inputValues["title"] = title;
    dispatch(register_request(inputValues));
  };

  const handleClear = () => {
    setInputValues({
      requestorId: user?.id,
      products: [],
      productId: 1,
      departmentId: "",
      test_type: "",
      facility_name: data?.facility_name,
      facilityId: data?.id,
      test_description: "",
      additional: "",
      tests: [],
      test_information: [],
      safety: [],
      expected_date: "",
      other: "",
      product_specification: "",
      cost_center: "",
      exp_class: [],
      group: [],
      scientist: "",
      lot_number: [],
      closed_vessel: "",
    });
  };

  const handleArrayChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("exp_class")) {
      const classData = { ...inputValues };
      classData.exp_class[index] = value;
      setInputValues(classData);
    } else if (name.startsWith("lot_number")) {
      const classData = { ...inputValues };
      classData.lot_number[index] = value;
      setInputValues(classData);
    } else {
      const classData = { ...inputValues };
      classData.group[index] = value;
      setInputValues(classData);
    }
  };

  if (isLoading) {
    return (
      <div style={{ height: "80vh", alignItems: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      {/* <h3>Test Request Form</h3> */}
      <Span></Span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>General Information</FormHeader>
        <FormContainer>
          <Row>
            <FieldControl color={errors.requestor ? "red" : "blue"}>
              <label htmlFor="Requestor">
                Requestor <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                disabled
                value={user?.username}
                id="requestor"
                {...register("requestor", {
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FieldControl>
            {errors.requestor && (
              <p style={{ color: "red" }}>Requestor is a required field</p>
            )}
            <FieldControl color={errors.productId ? "red" : "blue"}>
              <label htmlFor="productId">
                Product Name <span style={{ color: "red" }}>*</span>
              </label>
              <Select
                multiple
                fullWidth
                name="products"
                value={inputValues.products}
                style={{ fontSize: "12px", backgroundColor: "papayawhip" }}
                // onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                variant="outlined"
                {...register("products", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              >
                {data?.facility?.map((name) => (
                  <MenuItem key={name.product_name} value={name.product_name}>
                    <Checkbox
                      checked={
                        inputValues?.products?.indexOf(name.product_name) > -1
                      }
                    />
                    <ListItemText primary={name.product_name} />
                  </MenuItem>
                ))}
                <MenuItem value="Other">
                  <Checkbox
                    checked={inputValues?.products?.indexOf("Other") > -1}
                  />
                  <ListItemText primary="Other" />
                </MenuItem>
              </Select>
            </FieldControl>
            {errors.products && (
              <p style={{ color: "red" }}>Product Name is a required field</p>
            )}
            {inputValues?.products.includes("Other") && (
              <Other color={errors.other ? "blue" : "red"}>
                <label htmlFor="Other">if other, please specify</label>
                <input
                  type="text"
                  value={inputValues?.other}
                  id="Other"
                  {...register("other", {
                    required: true,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </Other>
            )}
            {errors.Other && (
              <p style={{ color: "red" }}>Product Name is a required field</p>
            )}
            <FieldControl color={errors.test_type ? "red" : "blue"}>
              <label htmlFor="test_type">
                Test Type <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="test_type"
                value={inputValues?.test_type}
                {...register("test_type", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              >
                <option value="">...Select</option>
                <option value="Production">Production</option>
                <option value="Development">Development</option>
              </select>
            </FieldControl>
            {errors.test_type && (
              <p style={{ color: "red" }}>Test Type is a required field</p>
            )}
            <FieldControl color={errors.test_description ? "red" : "blue"}>
              <label htmlFor="test_description">
                Test Description <span style={{ color: "red" }}>*</span>
              </label>

              <textarea
                value={inputValues?.test_description}
                {...register("test_description", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              ></textarea>
            </FieldControl>
            {errors.test_description && (
              <p style={{ color: "red" }}>
                Test Description is a required field
              </p>
            )}
          </Row>
          <Row>
            <FieldControl color={errors.departmentId ? "Red" : "blue"}>
              <label htmlFor="Department">
                Department <span style={{ color: "red" }}>*</span>
              </label>
              <select
                value={inputValues?.departmentId}
                id="departmentId"
                {...register("departmentId", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              >
                <option value="">Please select</option>
                {departments?.map((item, key) => {
                  return (
                    <option value={item.id} key={key}>
                      {item.department_name}
                    </option>
                  );
                })}
              </select>
            </FieldControl>
            {errors.departmentId && (
              <p style={{ color: "red" }}>Department is a required field</p>
            )}
            <FieldControl>
              <label htmlFor="expected_date"> Results Expected</label>
              <input
                type="date"
                name="expected_date"
                value={inputValues?.expected_date}
                id="expected_date"
                {...register("expected_date", {
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FieldControl>
            {inputValues?.products.includes("Other") && (
              <FieldControl
                color={errors.product_specification ? "blue" : "red"}
              >
                <label htmlFor="product_specification">
                  Product Specification <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={inputValues?.product_specification}
                  id="product_specification"
                  {...register("product_specification", {
                    required: true,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </FieldControl>
            )}
            {errors?.product_specification && (
              <p style={{ color: "red" }}>
                Product specification is a required field
              </p>
            )}
            {inputValues?.test_type === "Development" && (
              <FieldControl
                color={errors.product_specification ? "blue" : "red"}
              >
                <label htmlFor="cost_center">
                  Cost Centre <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={inputValues?.cost_center}
                  id="cost_center"
                  {...register("cost_center", {
                    required: true,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </FieldControl>
            )}
            {errors.cost_center && (
              <p style={{ color: "red" }}>Cost Centre is a required field</p>
            )}
            <FieldControl>
              <label htmlFor="test_instruction">
                Test Instruction or WP No.{" "}
              </label>
              <input
                type="text"
                value={inputValues?.wp}
                id="test_instruction"
                {...register("test_instruction", {
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
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
                <input
                  type="checkbox"
                  id={name}
                  checked={value}
                  {...register(`${name}`, {
                    onChange: (e) => handleCheckBoxes(e, i),
                  })}
                />
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
              <select
                value={inputValues.closed_vessel}
                {...register("closed_vessel", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              >
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
              {data?.header[0]?.name?.map((key, index) => {
                return (
                  <TableHeader key={key + index}>
                    {JSON.parse(key).headerName === "Batch No." &&
                    !inputValues?.facility_name
                      ?.toLowerCase()
                      ?.includes("flare") &&
                    inputValues?.test_type === "Development"
                      ? ""
                      : JSON.parse(key)?.headerName?.toUpperCase()}
                  </TableHeader>
                );
              })}
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
                        inputValues?.test_type !== "Development" ? (
                          <div>
                            <select
                              value={value}
                              onChange={(e) => handleInputChange(e, index)}
                              name={key}
                            >
                              <option value="">Please select</option>
                              <option value="ML">Mixer Load</option>
                              <option value="SL">Sub Lot</option>
                              <option value="Final Lot">Final Lot</option>
                            </select>
                            {inputValues?.test_information[index][key] ===
                              "Final Lot" && (
                              <input
                                type="text"
                                value={inputValues.lot_number[index]}
                                placeholder="Lot number"
                                {...register(`lot_number${index}`, {
                                  required: true,
                                  onChange: (e) => {
                                    handleArrayChange(e, index);
                                  },
                                })}
                              />
                            )}
                          </div>
                        ) : key === "Batch No." &&
                          !inputValues.facility_name
                            .toLowerCase()
                            .includes("flare") ? (
                          <input
                            style={{
                              display: `${`${
                                inputValues?.test_type !== "Development"
                                  ? "block"
                                  : "none"
                              }`}`,
                            }}
                            placeholder="ML100/Leg 100/SL125"
                            type="text"
                            value={value}
                            name={key}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        ) : key === "Test No." ? (
                          value
                        ) : key === "Coating Date" ? (
                          <input
                            type="date"
                            value={value}
                            name={key}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        ) : key === "Marks" ? (
                          <select
                            value={value}
                            name={key}
                            onChange={(e) => handleInputChange(e, index)}
                          >
                            <option>Please select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={value}
                            name={key}
                            onChange={(e) => handleInputChange(e, index)}
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
          {check && <p style={{ color: "red" }}>Please select description</p>}
        </TableContainer>

        {/* Think of creating a separate form Maduvha */}
        <FormHeader>Additional Information</FormHeader>
        <Additional>
          <textarea
            value={inputValues?.additional}
            placeholder={data?.tests[0]?.additional}
            {...register("additional", {
              onChange: (e) => {
                handleChange(e);
              },
            })}
          ></textarea>
          {/* <FieldControl>
            <input
              type="file"
              placeholder="upload"
              style={{
                width: "100%",
                border: "none",
                background: "white",
                margin: "0",
              }}
              {...register("file", { onChange: (e) => handleChange(e) })}
            />
          </FieldControl> */}
          {/* {inputValues?.file && inputValues?.file.name} */}
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
                            type="text"
                            {...register(safetyName, {
                              required: true,
                              onChange: (e) => {
                                handleSafety(e, index);
                              },
                            })}
                          >
                            <option value="">..Select.</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </FieldControl>
                        {errors[safetyName] && (
                          <p style={{ color: "red" }}>
                            Please populate {safetyName}
                          </p>
                        )}
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
                {inputValues.products.map((item, index) => {
                  const product = item === "Other" ? inputValues.other : item;
                  return (
                    <TableTr key={index}>
                      <Tbody>
                        <input type="text" value={product} readOnly />
                      </Tbody>
                      <Tbody>
                        <input
                          type="text"
                          value={inputValues?.exp_class[index]}
                          {...register(`exp_class${index}`, {
                            onChange: (e) => {
                              handleArrayChange(e, index);
                            },
                          })}
                        />
                      </Tbody>
                      <Tbody>
                        <input
                          type="text"
                          value={inputValues?.group[index]}
                          {...register(`group${index}`, {
                            onChange: (e) => {
                              handleArrayChange(e, index);
                            },
                          })}
                        />
                      </Tbody>
                    </TableTr>
                  );
                })}
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
              <input
                type="text"
                value={inputValues?.user?.username}
                {...register("scientist", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
              {errors.scientist && (
                <p style={{ color: "red" }}>This is a required field</p>
              )}
            </FieldControl>
          </>
        )}

        {user.username === "Guest"
          ? "Please login to submit the form"
          : checkInfo &&
            checkTests && (
              <div style={{ marginTop: "20px" }}>
                <Button type="submit">Submit</Button>
                <Button type="reset" onClick={handleClear} clear>
                  Clear
                </Button>
              </div>
            )}
      </form>
    </Container>
  );
};

export default TestRequest;

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
  width: 100%;
  box-sizing: border-box;
  input {
    padding: 0.5rem;
    margin: 0.5em;
    font-size: 12px;
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
    background: papayawhip;
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
