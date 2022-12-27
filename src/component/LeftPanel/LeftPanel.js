import React from "react";
import "./LeftPanel.css";
import { Menu, Image } from "semantic-ui-react";
import logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import { filterProduct } from "../../redux/productSlice";

const LeftPanel = () => {
  const dispatch = useDispatch();

  const handelFilteration = (event) => {
    let className = event.target.className.split(/(\s+)/);
    const eventValues = {
      text: event.target.innerHTML,
      className: className[0]
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
          <Menu.Header className="header-phones" onClick={handelFilteration}>
            Phones
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item
              className="header-item"
              name="iphone"
              onClick={handelFilteration}
            />
            <Menu.Item
              className="header-item"
              name="Samsung"
              onClick={handelFilteration}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header className="header-cars" onClick={handelFilteration}>
            Cars
          </Menu.Header>

          <Menu.Menu>
            <Menu.Item
              className="header-item"
              name="Toyota"
              onClick={handelFilteration}
            />
            <Menu.Item
              className="header-item"
              name="Ferrari"
              onClick={handelFilteration}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header className="header-cars" onClick={handelFilteration}>
            Trucks
          </Menu.Header>
          <Menu.Menu>
            <Menu.Item
              className="header-item"
              name="Box"
              onClick={handelFilteration}
            />
            <Menu.Item
              className="header-item"
              name="Haul"
              onClick={handelFilteration}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default LeftPanel;
