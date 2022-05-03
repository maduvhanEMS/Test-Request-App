import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import menu from "../../Assets/Data/MenuData";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";

const Sidebar = ({ setDisplay, setSide, side }) => {
  const { user } = useSelector((state) => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);

  const [open, setOpen] = useState(false);

  const display = open ? "block" : "none";

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div
        className="sidebar"
        style={{
          width: side === "block" ? "300px" : "100px",
          // position: "absolute",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row-reverse",
          justifyItems: "center",
          // padding: "0 20px",
        }}
        // onClick={() => setSide("block")}
        // onMouseOut={() => setSide("none")}
      >
        <span
          style={{
            display: "flex",
            position: "absolute",
            right: "0",
            fontSize: "20px",
            marginRight: "5px",
            marginTop: "30px",
          }}
        >
          {side === "block" ? (
            <span style={{ cursor: "pointer" }} onClick={() => setSide("none")}>
              <MdArrowBackIosNew />
            </span>
          ) : (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSide("block")}
            >
              <MdArrowForwardIos />
            </span>
          )}
        </span>
        <div className="menu-list">
          <ul className="menu-items">
            {menu.map((item, index) => {
              const { name, icon, path } = item;
              return name === "Book In" && !user.isAdmin ? (
                ""
              ) : (
                <>
                  <div
                    className={`${
                      activeIndex === index
                        ? "dropdown-container active"
                        : "dropdown-container"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <li className="menu-item" key={index}>
                      <Link to={path}>
                        <span className="fa">{icon}</span>
                        {side === "block" && name}
                      </Link>
                      {/* {item?.submenu && (
                      <Button onClick={handleOpen}>
                        {open ? <AiOutlineUp /> : <AiOutlineDown />}
                      </Button>
                    )} */}
                    </li>
                    <div
                      className="dropdown-content"
                      style={{ display: display }}
                    >
                      {item?.submenu?.map((subitem) => {
                        const { name, path } = subitem;
                        return (
                          <li className="menu-item">
                            <Link to={path}>{name}</Link>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </IconContext.Provider>
  );
};

const Button = styled.div`
  cursor: pointer;
  padding: 0 30px;
`;

export default Sidebar;
