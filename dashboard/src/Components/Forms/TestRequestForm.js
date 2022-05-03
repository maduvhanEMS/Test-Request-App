import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { closed, header, additional, safety } from "../../Assets/Data/tests";
import { BiMinus, BiPlus } from "react-icons/bi";
import { selectTestData, postRequest } from "../../slices/forms";
import { useDispatch, useSelector } from "react-redux";
import { createBookIn } from "./bookInSlice";

const TestsNames = closed.map((name) => name.test);
const headers = header.map((item) => item.name);

const Color = true;

const date = new Date();

const TestRequestForm = () => {
  const formData = useSelector(selectTestData);
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({
    Requestor: "",
    Product_name: "",
    Department: "",
    test_type: "",
    Tests: TestsNames.reduce(
      (options, option) => ({
        ...options,
        [option]: false,
      }),
      {}
    ),
    Information: [
      headers.reduce(
        (options, option) => ({
          ...options,
          [option]: "",
        }),
        {}
      ),
    ],
    file: "",
    id: Math.random() * 100,
    createdAt: date.getDate(),
    status: "Received",
  });

  const [checked, setChecked] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (event) => {
    const { name } = event.target;
    const value = event.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFileUpload = (event) => {
    const { name } = event.target;
    const value = event.target.files[0];
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleCheckBoxes = (event) => {
    const { name } = event.target;

    setInputValues((prevState) => ({
      ...prevState,
      Tests: { ...prevState.Tests, [name]: !prevState.Tests[name] },
    }));
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    let tmpFile = { ...inputValues };
    let tmpState = [...tmpFile.Information];
    let mpt = { ...tmpState[index] };
    mpt[name] = value;
    tmpState[index] = mpt;
    tmpFile.Information = tmpState;

    setInputValues(tmpFile);
  };

  const newHeaders = headers.reduce(
    (options, option) => ({
      ...options,
      [option]: "",
    }),
    {}
  );

  const handleAddClick = (e) => {
    e.preventDefault();
    setInputValues((prevState) => ({
      ...prevState,
      Information: [...prevState.Information, newHeaders],
    }));
  };

  const handleRemove = (e, i) => {
    e.preventDefault();
    let list = { ...inputValues };
    let info = [...list.Information];
    info.splice(i, 1);
    list.Information = info;

    setInputValues(list);
  };

  useEffect(() => {
    const { Tests } = inputValues;
    let count = 0;

    for (const name in Tests) {
      if (Tests[name] === true) {
        count++;
      }
    }

    if (count > 0) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [inputValues]);

  const handleClear = (e) => {
    e.preventDefault();
    setInputValues({
      Requestor: "",
      Product_name: "",
      Department: "",
      test_type: "",
      Tests: TestsNames.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
      Information: [
        headers.reduce(
          (options, option) => ({
            ...options,
            [option]: "",
          }),
          {}
        ),
      ],
    });
  };

  const onSubmit = (data) => {
    setInputValues({
      ...inputValues,
    });

    console.log(inputValues);

    if (checked === true) {
      alert("Please select at least one test");
    }
    dispatch(postRequest(inputValues));
  };

  console.log("formData", formData);

  return (
    <Container>
      <Link to="/editForm" style={{ marginRight: "20px" }}>
        Edit
      </Link>
      <Link to="/product">Back</Link>
      <h3>Test Request Form</h3>
      <Span></Span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>General Information</FormHeader>
        <FormContainer>
          <Row>
            <FieldControl color={errors.Requestor ? true : false}>
              <label htmlFor="Requestor">
                Requestor <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="Requestor"
                {...register("Requestor", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FieldControl>
            {errors.Requestor && (
              <p style={{ color: "red" }}>Requestor is a required field</p>
            )}
            <FieldControl color={errors.Product_name ? true : false}>
              <label htmlFor="Product_name">
                Product Name <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id=" Product_name"
                {...register("Product_name", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              >
                <option value="">...Select</option>
                <option value="ste-38">STE-38</option>
                <option value="ste-44">STE-44</option>
                <option value="s265">S265</option>
                <option value="s365">S365</option>
                <option value="sd76">SD76</option>
                <option value="Other">Other</option>
              </select>
            </FieldControl>
            {errors.Product_name && (
              <p style={{ color: "red" }}>Product Name is a required field</p>
            )}
            {inputValues.Product_name === "Other" && (
              <Other color={errors.Other ? true : false}>
                <label htmlFor="Other">if other, please specify</label>
                <input
                  type="text"
                  id="Other"
                  {...register("Other", {
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
            <FieldControl color={errors.test_type ? true : false}>
              <label htmlFor="test_type">
                Test Type <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="test_type"
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
            <FieldControl color={errors.Requestor ? Color : false}>
              <label htmlFor="test_description">
                Test Description <span style={{ color: "red" }}>*</span>
              </label>

              <textarea
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
            <FieldControl color={errors.Department ? Color : false}>
              <label htmlFor="Department">
                Department <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="Department"
                {...register("Department", {
                  required: true,
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              >
                <option value="">Please select</option>
                <option value="Product Developement">
                  Product Developement
                </option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Project Management">Project Management</option>
              </select>
            </FieldControl>
            {errors.Department && (
              <p style={{ color: "red" }}>Department is a required field</p>
            )}
            <FieldControl>
              <label htmlFor="Expected_date"> Results Expected</label>
              <input
                type="date"
                id="Expected_date"
                {...register("Expected_date", {
                  onChange: (e) => {
                    handleChange(e);
                  },
                })}
              />
            </FieldControl>
            {inputValues.Product_name === "Other" && (
              <FieldControl
                color={errors.product_specification ? Color : false}
              >
                <label htmlFor="product_specification">
                  Product Specification <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
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
            {errors.product_specification && (
              <p style={{ color: "red" }}>
                Product specification is a required field
              </p>
            )}
            {inputValues.test_type === "Development" && (
              <FieldControl
                color={errors.product_specification ? Color : false}
              >
                <label htmlFor="cost_centre">
                  Cost Centre <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="cost_centre"
                  {...register("cost_centre", {
                    required: true,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
              </FieldControl>
            )}
            {errors.cost_centre && (
              <p style={{ color: "red" }}>Cost Cenre is a required field</p>
            )}
            <FieldControl>
              <label htmlFor="test_instruction">
                Test Instruction or WP No.{" "}
              </label>
              <input
                type="text"
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
        <p
          style={{
            color: "red",
            fontWeight: "500",
            padding: "0 20px",
            lineHeight: "2rem",
          }}
        >
          Note: Please select at least one test, otherwise you won't be able to
          submit the form!!!
        </p>
        <TestContainer>
          {closed.map((item, i) => {
            const { test } = item;
            return (
              <FieldControl key={i}>
                <input
                  type="checkbox"
                  id={test}
                  value={test}
                  {...register(test, {
                    required: checked,
                    onChange: (e) => handleCheckBoxes(e),
                  })}
                />
                <label htmlFor="dynamic_vivacity">{test}</label>
              </FieldControl>
            );
          })}
        </TestContainer>
        {/* Think of creating a separate form Maduvha */}
        <FormHeader>Test Information</FormHeader>
        <TableContainer>
          <thead>
            <TableTr add>
              {header.map((item, i) => {
                const { name } = item;

                return <TableHeader key={i}>{name}</TableHeader>;
              })}
              <TableHeader>
                <button onClick={(e) => handleAddClick(e)}>
                  <BiPlus />
                </button>
              </TableHeader>
            </TableTr>
          </thead>
          <tbody>
            {inputValues.Information.map((items, index) => {
              //   console.log(index);
              const inputs = [];

              for (const name in items) {
                inputs.push(
                  <Tbody key={index + name}>
                    <input
                      type="text"
                      name={name}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Tbody>
                );
              }
              return (
                <TableTr key={index}>
                  {inputs}
                  {inputValues.Information.length !== 1 && (
                    <Tbody>
                      <button>
                        <BiMinus onClick={(e) => handleRemove(e, index)} />
                      </button>
                    </Tbody>
                  )}
                </TableTr>
              );
            })}
          </tbody>
        </TableContainer>
        {/* Think of creating a separate form Maduvha */}
        <FormHeader>Additional Information</FormHeader>
        <Additional>
          <textarea
            placeholder={additional.text}
            {...register("additional", {
              onChange: (e) => {
                handleChange(e);
              },
            })}
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
              {...register("file", { onChange: (e) => handleFileUpload(e) })}
            />
          </FieldControl>
          <p>{inputValues.file && inputValues.file.name}</p>
        </Additional>
        {/* Think of creating a separate form Maduvha */}
        {inputValues.test_type === "Development" && (
          <>
            <FormHeader>Safety Analysis</FormHeader>
            <TableContainer>
              <tbody>
                {safety.map((items, index) => {
                  const { name, description } = items;
                  //   console.log(index);
                  return (
                    <TableTr key={index}>
                      <Tbody style={{ fontSize: "14px", fontWeight: "500" }}>
                        {name}
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
                            {...register(name, {
                              required: true,
                              onChange: (e) => {
                                handleChange(e);
                              },
                            })}
                          >
                            <option value="">..Select.</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </FieldControl>
                        {errors[name] && (
                          <p style={{ color: "red" }}>Please populate {name}</p>
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
                <TableTr>
                  <Tbody>
                    <input
                      type="text"
                      {...register("product", {
                        onChange: (e) => {
                          handleChange(e);
                        },
                      })}
                    />
                  </Tbody>
                  <Tbody>
                    <input
                      type="text"
                      {...register("class", {
                        onChange: (e) => {
                          handleChange(e);
                        },
                      })}
                    />
                  </Tbody>
                  <Tbody>
                    <input
                      type="text"
                      {...register("group", {
                        onChange: (e) => {
                          handleChange(e);
                        },
                      })}
                    />
                  </Tbody>
                </TableTr>
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
        <FieldControl
          style={{
            padding: "20px",
            left: "0",
            justifyContent: "space-between",
          }}
        >
          <label
            style={{
              minWidth: "350px",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            Test Officer <span style={{ color: "red" }}>*</span>
          </label>
          <select
            {...register("test_officer", {
              required: true,
              onChange: (e) => {
                handleChange(e);
              },
            })}
          >
            <option value="">Please select</option>
            <option value="maduvha">Maduvha</option>
            <option value="maduvha">Nemadandila</option>
          </select>
        </FieldControl>

        <Button type="submit">Submit</Button>
        <Button type="reset" onClick={(e) => handleClear(e)} clear>
          Clear
        </Button>
      </form>
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputValues)}</div>
    </Container>
  );
};

export default TestRequestForm;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
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
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
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
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
  }

  textarea {
    padding: 1rem 0.5rem;
    margin: 0.5em;
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    border: none;
    border-radius: 3px;
    background: papayawhip;
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
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
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
