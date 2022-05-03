export const closed = [
  {
    test: "Dynamic Vivacity",
  },
  {
    test: "Burn Time",
  },
  {
    test: "Burn Rate",
  },
  {
    test: "Physical Dimension",
  },
  {
    test: "Bulk Density",
  },
];

export const header = [
  { name: "Shot Description/Batch No" },
  { name: "Reference Lot" },
  { name: "Shot/Sample" },
  { name: "Cond. Temp. [°C]" },
];

export const additional = {
  text: `Amount of grains to be measured.  Whether the requestor would like to attend. Closed vessel volumes.Specific test and shot naming conventions. Special test requests etc. Attach a detailed test plan if the information cannot be captured above.`,
};

export const safety = [
  {
    name: "Safety",
    description:
      "I am aware of the normal test instructions and facility operating procedures for these tests",
  },
  {
    name: "Handling",
    description:
      "The product is safe for handling, conditioning, transport and testing?",
  },
  {
    name: "Preparation",
    description: "The product is safe for sawing or cutting?",
  },
  {
    name: "Equipment",
    description:
      "The safety equipment as prescribed in the test instruction is adequate for the testing of this product?",
  },
  {
    name: "Load Density",
    description:
      "The standard closed vessel load density (0.2 g/cm) is safe for this product (P_max < 300 MPa, dP/dt_max < 94000 MPa/s)?",
  },
];
