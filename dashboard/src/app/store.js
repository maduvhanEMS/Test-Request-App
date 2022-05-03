import { configureStore } from "@reduxjs/toolkit";

import facilityReducer from "../features/facility/facilitySlice";
import testRequestReducer from "../features/Tests/testSlice";
import departmentReducer from "../features/department/departmentSlice";
import authReducer from "../features/auth/authSlice";
import testInformationReducer from "../features/test_information/testInformationSlice";
import singleTestReducer from "../features/Tests/singleTestSlice";
import testScheduleReducer from "../features/testSchedule/testScheduleSlice";
import emailReducer from "../features/email/emailSlice";
import developmentReducer from "../features/development/developmentSlice";
import productRedcuer from "../features/products/productSlice";
import CCTest_informationReducer from "../features/CCTest_information/CCTest_informationSlice";

export default configureStore({
  reducer: {
    facilities: facilityReducer,
    testRequest: testRequestReducer,
    departments: departmentReducer,
    auth: authReducer,
    testInformation: testInformationReducer,
    CCtestInformation: CCTest_informationReducer,
    singleTestRequest: singleTestReducer,
    schedule: testScheduleReducer,
    email: emailReducer,
    development: developmentReducer,
    products: productRedcuer,
  },
});
