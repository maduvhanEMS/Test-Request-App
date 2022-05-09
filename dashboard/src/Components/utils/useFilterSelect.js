import { useState, useMemo } from "react";

export const useFiltableData = (items, config = null) => {
  const [filterConfig, setFilterConfig] = useState({
    item: [],
    key: "",
  });
  const [filtered, setFiltered] = useState(false);
  const [dataAll, setData] = useState([]);

  const filteredItems = useMemo(() => {
    let filtableItems = items;

    if (filterConfig.item.length > 0 && filterConfig.secondKey) {
      filtableItems = items?.filter((item) =>
        filterConfig.item.includes(
          item[filterConfig.secondKey][filterConfig.column]
        )
      );
      setFiltered(true);
      setData(filtableItems);
      filterConfig.filter = true;

      return filtableItems;
    } else if (filterConfig.item.length > 0 && !filterConfig.search) {
      filtableItems = items?.filter((item) =>
        filterConfig.item.includes(
          Array.isArray(item[filterConfig.column])
            ? item[filterConfig.column].join(" ")
            : item[filterConfig.column]
        )
      );
      setFiltered(true);
      setData(filtableItems);
      filterConfig.filter = true;

      return filtableItems;
    } else if (typeof filterConfig.item === "string") {
      filtableItems = items?.filter((item) =>
        Array.isArray(item[filterConfig.column])
          ? item[filterConfig.column]
              .join(" ")
              .toLowerCase()
              .includes(filterConfig.item)
          : item[filterConfig.column].toLowerCase().includes(filterConfig.item)
      );

      setFiltered(true);
      setData(filtableItems);
      filterConfig.filter = true;

      return filtableItems;
    }
    // setFilterConfig((prevState) => ({ ...prevState, filter: filtered }));

    return filtableItems;
  }, [items, filterConfig]);

  //search button
  const searchButton = (key, column) => {
    if (key) {
      setFilterConfig({ item: key, column, search: true });
    } else {
      setFilterConfig({ item: key, column, search: false });
    }
  };

  const configDisplay = (column) => {
    let display = "Block";

    if (filterConfig.column === column && filterConfig.display) {
      if (display === filterConfig.display) {
        setFilterConfig((prevState) => ({ ...prevState, display: "None" }));
      } else {
        setFilterConfig((prevState) => ({ ...prevState, display: display }));
      }
    } else if (filterConfig.column === column && !filterConfig.display) {
      setFilterConfig((prevState) => ({ ...prevState, display: "Block" }));
    } else {
      setFilterConfig({
        item: [],
        display: display,
        column: column,
      });
    }
  };

  //function to filter
  const requestFilter = (key, column, secondKey = null) => {
    // only if seFilterConfig is not null
    let item = Array.isArray(filterConfig.item) ? filterConfig.item : [];

    if (filterConfig.item.length > 0) {
      if (
        filterConfig.column === column &&
        filterConfig.item.indexOf(key) === -1
      ) {
        item.push(key);
      } else {
        item.splice(filterConfig.item.indexOf(key), 1);
      }
    } else {
      item.push(key);
    }

    setFilterConfig({ item: item, column, secondKey });
  };

  const uniqueItems = (key, test = null) => {
    let uniquePropellant = [];

    let data = filtered && filterConfig.column === key ? items : filteredItems;

    console.log(
      filtered,
      data,
      "maduvha",
      filtered && filterConfig.column === key
    );

    if (test) {
      data?.map((item) => {
        if (uniquePropellant?.indexOf(item[test][key]) === -1) {
          uniquePropellant.push(item[test][key]);
        }

        return uniquePropellant;
      });
    } else {
      data?.map((item) => {
        if (Array.isArray(item[key])) {
          for (var i = 0; i < item[key].length; i++) {
            if (uniquePropellant?.indexOf(item[key][i]) === -1) {
              uniquePropellant.push(item[key][i]);
            }
          }
          console.log(filtered, data);
        } else {
          if (uniquePropellant?.indexOf(item[key]) === -1) {
            uniquePropellant.push(item[key]);
          }
        }

        return uniquePropellant;
      });
    }

    return uniquePropellant;
  };

  return {
    requestFilter,
    uniqueItems,
    filteredItems,
    searchButton,
    configDisplay,
    filterConfig,
  };
};
