import React, { useState } from "react";
import "./LeftPanel.css";
import { Menu, Image } from "semantic-ui-react";
import logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import { filterProduct } from "../../redux/productSlice";

const LeftPanel = () => {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState({
    AllProducts: false,
    Phones: false,
    Cars: false,
    Trucks: false,
    iphone: false,
    Samsung: false,
    Toyota: false,
    Ferrari: false,
    Box: false,
    Haul: false,
  });

  const handelFilteration = (event) => {
    let className = event.target.className.split(/(\s+)/);
    const eventValues = {
      text: event.target.innerHTML,
      className: className[0],
    };
    dispatch(filterProduct(eventValues));
  };

  return (
    <div className="main-div">
      <Menu vertical size="massive">
        <Menu.Item>
          <Image size="medium" src={logo} />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header
            className={
              activeFilter.AllProducts
                ? "element-active"
                : "header-all-products"
            }
            onClick={(event) => {
              handelFilteration(event);
              setActiveFilter({
                AllProducts: true,
                Phones: false,
                Cars: false,
                Trucks: false,
                iphone: false,
                Samsung: false,
                Toyota: false,
                Ferrari: false,
                Box: false,
                Haul: false,
              });
            }}
          >
            Show All
          </Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header
            className={activeFilter.Phones ? "element-active" : "header-phones"}
            onClick={(event) => {
              handelFilteration(event);
              setActiveFilter({
                AllProducts: false,
                Phones: true,
                Cars: false,
                Trucks: false,
                iphone: false,
                Samsung: false,
                Toyota: false,
                Ferrari: false,
                Box: false,
                Haul: false,
              });
            }}
          >
            Phones
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item
              className={activeFilter.iphone ? "element-active" : "header-item"}
              name="iphone"
              onClick={(event) => {
                handelFilteration(event);
                setActiveFilter({
                  AllProducts: false,
                  Phones: false,
                  Cars: false,
                  Trucks: false,
                  iphone: true,
                  Samsung: false,
                  Toyota: false,
                  Ferrari: false,
                  Box: false,
                  Haul: false,
                });
              }}
            />
            <Menu.Item
              className={
                activeFilter.Samsung ? "element-active" : "header-item"
              }
              name="Samsung"
              onClick={(event) => {
                handelFilteration(event);
                setActiveFilter({
                  AllProducts: false,
                  Phones: false,
                  Cars: false,
                  Trucks: false,
                  iphone: false,
                  Samsung: true,
                  Toyota: false,
                  Ferrari: false,
                  Box: false,
                  Haul: false,
                });
              }}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header
            className={activeFilter.Cars ? "element-active" : "header-cars"}
            o
            onClick={(event) => {
              handelFilteration(event);
              setActiveFilter({
                AllProducts: false,
                Phones: false,
                Cars: true,
                Trucks: false,
                iphone: false,
                Samsung: false,
                Toyota: false,
                Ferrari: false,
                Box: false,
                Haul: false,
              });
            }}
          >
            Cars
          </Menu.Header>

          <Menu.Menu>
            <Menu.Item
              className={activeFilter.Toyota ? "element-active" : "header-item"}
              name="Toyota"
              onClick={(event) => {
                handelFilteration(event);
                setActiveFilter({
                  AllProducts: false,
                  Phones: false,
                  Cars: false,
                  Trucks: false,
                  iphone: false,
                  Samsung: false,
                  Toyota: true,
                  Ferrari: false,
                  Box: false,
                  Haul: false,
                });
              }}
            />
            <Menu.Item
              className={
                activeFilter.Ferrari ? "element-active" : "header-item"
              }
              name="Ferrari"
              onClick={(event) => {
                handelFilteration(event);
                setActiveFilter({
                  AllProducts: false,
                  Phones: false,
                  Cars: false,
                  Trucks: false,
                  iphone: false,
                  Samsung: false,
                  Toyota: false,
                  Ferrari: true,
                  Box: false,
                  Haul: false,
                });
              }}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header
            className={activeFilter.Trucks ? "element-active" : "header-trucks"}
            onClick={(event) => {
              handelFilteration(event);
              setActiveFilter({
                AllProducts: false,
                Phones: false,
                Cars: false,
                Trucks: true,
                iphone: false,
                Samsung: false,
                Toyota: false,
                Ferrari: false,
                Box: false,
                Haul: false,
              });
            }}
          >
            Trucks
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item
              className={activeFilter.Box ? "element-active" : "header-item"}
              name="Box"
              onClick={(event) => {
                handelFilteration(event);
                setActiveFilter({
                  AllProducts: false,
                  Phones: false,
                  Cars: false,
                  Trucks: false,
                  iphone: false,
                  Samsung: false,
                  Toyota: false,
                  Ferrari: false,
                  Box: true,
                  Haul: false,
                });
              }}
            />
            <Menu.Item
              className={activeFilter.Haul ? "element-active" : "header-item"}
              name="Haul"
              onClick={(event) => {
                handelFilteration(event);
                setActiveFilter({
                  AllProducts: false,
                  Phones: false,
                  Cars: false,
                  Trucks: false,
                  iphone: false,
                  Samsung: false,
                  Toyota: false,
                  Ferrari: false,
                  Box: false,
                  Haul: true,
                });
              }}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftPanel;
