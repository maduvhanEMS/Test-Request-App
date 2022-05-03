import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BiUpload } from "react-icons/bi";
import { toast } from "react-toastify";
import { updateTestInformation } from "../../features/test_information/testInformationSlice";
import { updateTestSchedule } from "../../features/testSchedule/testScheduleSlice";
import axios from "axios";

const CompleteSchedule = ({ data, id }) => {
  const [check, setCheck] = useState(false);
  const [testName, setTestName] = useState([]);
  const [files, setFiles] = useState([]);
  const [formFileData, setFormFileData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let initialState = [];
    if (data?.test_information?.length > 0) {
      for (let i = 0; i < data.test_information.length; i++) {
        let obj = {};
        obj["id"] = data.test_information[i].id;
        obj["file"] = data.test_information[i].file;
        obj["reportNo"] = data.reportNo;
        obj["fileName"] = data.test_information[i].filename;
        initialState.push(obj);
      }
      setFormFileData(initialState);
    }
  }, [data]);

  const mainTest = ["Dynamic Vivacity", "Burn rate", "Bulk Density"];

  useEffect(() => {
    if (testName.length === 0) {
      const jsonTest = data?.tests?.map((item) => JSON.parse(item));
      if (jsonTest?.length > 0) {
        jsonTest.map((item) => {
          const key = Object.keys(item)[0];
          if (mainTest.includes(key) && Object.values(item)[0]) {
            console.log(Object.values(item)[0]);
            setTestName((prevState) => [...prevState, key]);
          }
        });
      }
    }
  }, [data]);

  useEffect(() => {
    const testFiles =
      data?.testSchedule?.length > 0 &&
      data?.testSchedule[0]?.files?.map((item) => JSON.parse(item));

    if (testFiles?.length > 0) {
      setFiles(testFiles);
    } else {
      console.log("withiin", testName);
      const names = testName.reduce(
        (options, option) => [
          ...options,
          {
            [option]: "",
          },
        ],
        []
      );
      if (testName.length > 0) {
        setFiles(names);
      }
    }
  }, [testName, data?.testSchedule]);

  useEffect(() => {
    const checkbox = [];

    if (formFileData !== 0) {
      formFileData.map((item) => {
        if (item["file"] === "") {
          checkbox.push(item["file"]);
        }
      });
    }

    if (files.length > 0) {
      files.map((item) => {
        if (Object.values(item)[0] === "") {
          checkbox.push(Object.values(item)[0]);
        }
      });
    }

    if (checkbox.length === 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [formFileData, files]);

  const onChange = (e) => {
    const { name } = e.target;
    const value = e.target.files[0];
    // Check if information already exist
    const i = files.findIndex((item) => Object.keys(item)[0] === name);

    if (i === -1) {
      setFiles((prevState) => [...prevState, { [name]: value }]);
    } else {
      const upState = [...files];
      upState[i][name] = value;
      setFiles(upState);
    }
  };

  const handleChange = (e, id) => {
    //get index
    const index = formFileData.findIndex((item) => {
      return parseInt(item.id) === parseInt(id);
    });
    const { name } = e.target;
    const newFile = [...formFileData];
    const value = e.target.files[0];
    newFile[index][name] = value;
    newFile[index]["fileName"] = e.target.files[0].name;
    setFormFileData(newFile);
  };

  const upload = async (e) => {
    let formData = new FormData();
    for (const file of formFileData) {
      formData.append("file", file.file);
      formData.append("id", file.id);
      formData.append("filename", file.fileName);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const uploaDReport = async (e) => {
    let formData = new FormData();
    for (const file of files) {
      formData.append("file", Object.values(file)[0]);
      formData.append("testname", Object.keys(file)[0]);
      formData.append("reportNo", data.reportNo);
    }

    // Display the values
    for (var value of formData.values()) {
      console.log(value);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/uploadReports",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const onSave = async (e) => {
    alert("Thank you Bossman");
    e.preventDefault();
    // dispatch(updateTestInformation({ reportNo: data.reportNo, formFileData }));
    // dispatch(updateTestSchedule({ reportNo: data.reportNo, files }));
    upload();
    uploaDReport();
  };

  const onSubmit = (e) => {
    alert("Thank you Bossman");
    e.preventDefault();
    // dispatch(updateTestInformation({ reportNo: data.reportNo, formFileData }));
    uploaDReport();
    dispatch(
      updateTestSchedule({
        reportNo: data.reportNo,
        status: "Completed",
      })
    );
  };

  return (
    <Container>
      <TableContainer>
        <thead>
          <TableTr>
            <TableHeader>Description</TableHeader>
            <TableHeader>Section</TableHeader>
            <TableHeader>Report Type</TableHeader>
            <TableHeader>File(s)</TableHeader>
            <TableHeader>FileName)</TableHeader>
          </TableTr>
        </thead>
        <tbody>
          <>
            {testName?.map((item, index) => {
              return (
                <TableTr key={item}>
                  <Tbody>
                    {data.reportNo + " " + data?.product.product_name}
                  </Tbody>
                  <Tbody> {data?.name}</Tbody>
                  <Tbody>{item}</Tbody>
                  <Tbody>
                    <form>
                      <label>
                        <span>
                          <BiUpload />
                        </span>
                        <input type="file" name={item} onChange={onChange} />
                        Select File
                      </label>
                    </form>
                  </Tbody>
                  <Tbody>
                    <span style={{ color: "black", marginLeft: "20px" }}>
                      {(files?.length > 0 && files[index][item]?.name) ||
                        (files?.length > 0 &&
                          files[index][item].split("/").pop())}
                    </span>
                  </Tbody>
                </TableTr>
              );
            })}
          </>
          {data?.test_information?.map((item, index) => {
            const { description, number, id } = item;
            const jsonData = data?.tests.map((item) => JSON.parse(item));
            const vivacity = jsonData.find((item) => {
              if (
                Object.keys(item)[0] === "Physical Dimensions" &&
                Object.values(item)[0]
              )
                return item;
            });
            return (
              vivacity && (
                <TableTr key={index}>
                  <Tbody>{description + number}</Tbody>
                  <Tbody> {data?.test?.facility_name}</Tbody>
                  <Tbody>{vivacity ? Object.keys(vivacity)[0] : ""}</Tbody>
                  <Tbody>
                    <form>
                      <label>
                        <span>
                          <BiUpload />
                        </span>
                        <input
                          type="file"
                          name="file"
                          onChange={(e) => handleChange(e, item.id)}
                        />
                        Select File
                      </label>
                    </form>
                  </Tbody>
                  <Tbody>
                    <span style={{ color: "black", marginLeft: "20px" }}>
                      {formFileData?.length > 0
                        ? formFileData[index]?.fileName
                        : ""}
                    </span>
                  </Tbody>
                </TableTr>
              )
            );
          })}
          {/* })} */}
        </tbody>
      </TableContainer>
      <label style={{ display: "block", margin: "20px 0" }}>
        Test Completed{" "}
        <input
          type="checkbox"
          style={{
            marginLeft: "10px",
          }}
          checked={check}
          disabled
        />
      </label>
      <form enctype="multipart/form-data">
        {check ? (
          <Button type="submit" onClick={(e) => onSubmit(e)}>
            Upload
          </Button>
        ) : (
          <Button type="submit" onClick={(e) => onSave(e)}>
            Save
          </Button>
        )}
      </form>
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
    display: none;
  }
  label {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
    justify-content: center;
    margin: auto 0;
    background-color: blue;
    color: white;
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

  span {
    margin-right: 10px;
    align-items: center;
    color: white;
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
  color: blue;
  background-color: smokewhite;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export default CompleteSchedule;
