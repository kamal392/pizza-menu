import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu Pizza={Pizza} />
      <Footer />
    </div>
  );
}

function Header() {
  // const style ={color:"red",fontSize:"45px",textTransform:"uppercase"}
  return (
    <header className="header">
      <h1>Fast React Pizza co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // an empty array has a truthy value. so the component will still render.
  // const pizzas =[];
  const numPizza = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {/* passing pizza as a props to pizza component */}
      {/* Each time Menu component is rendering , it is calling Pizza component and passing the pizza details (data)
into Pizza component as a props . the Pizza component is receiving data as a props and using it inside
Pizza component and return a pizza. then Menu calls the Second Pizza and pass the data as a props again and get the 
second Pizza .&& does return a 0 value*/}
      {/* Replacing && operator with ternaries operator */}
      {numPizza > 0 ? (
        <ul className="pizzas">
          {pizzas.map((pizza) => {
            // each time you render a component in the list . each component needs a unique key.
            return <Pizza pizzaObj={pizza} key={pizza.name} />;
          })}
        </ul>
      ) : (
        <p>We are still working on our menu. Please come back later : </p>
      )}

      {/* instead of rendering pizza component like this . we will use map function */}
      {/* <Pizza
        name="Pizza spinaci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        photoName="pizzas/funghi.jpg"
       price={12}
      /> */}
    </main>
  );
}
function Pizza(props) {
  // console.log(props);
  // here we are using if statement coz we don't want part of component
  // to render if the condition is true.
  if (props.pizzaObj.soldOut) {
    return null;
  }
  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price + 3}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  // console.log(hour);
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // if(hour>=openHour&& hour<=closeHour){
  //   alert("we are open")
  // }else alert("Sorry we are close")
  // ==================================
  // conditional rendering with multiple return.
  //  we can use if and else statement in inside the component but not inside return statement cox everything inside
  // return statement is JSX . we cant use if else in jsx, we use ternary and && operator in jsx.
  // lets move condition statement from return to component and use multiple return.
  // if (!isOpen) {
  //   // this is good when we have to render part of the component . not the entire component.
  //   return <p>we are not ready to serve.</p>;
  // }
  return (
    <footer className="footer">
      {/* conditional rendering. first thing we need to add javascript mode using {}
       with && operator we we can short circuit */}
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        // footer component is looking bigger now so lets move it out and have it inside the Order component.

        <p>
          we are happy to serve you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        we are open until {props.closeHour}:00. Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.strictMode = during development it will render component twice in order to find certain bugs
  // react will also check if are using outdated part of react API
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
