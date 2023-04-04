import React from 'react';
import "./App.css"
import Card from "./components/Card";

function App() {
  return (
    <div className="container">
      <div className="row">
        <Card
          title="What is Lorem Ipsum?"
          images="../images/batman.png"
          old_price="9,999"
          newPrice="9999"
          dollar="$"
          alt="batman"
          exp_date="10-08-2022"
        />
        <Card
          title="What is Lorem Ipsum?"
          images="../images/blackpanter.png"
          old_price="599"
          newPrice="500"
          dollar="$"
          alt="blackpanter"
          exp_date="10-08-2022"
        />
        <Card
          title="What is Lorem Ipsum?"
          images="../images/arthur.png"
          old_price="7999"
          newPrice="7000"
          dollar="$"
          alt="arthur"
          exp_date="10-08-2022"
        />
        <Card
          title="What is Lorem Ipsum?"
          images="../images/kashima.png"
          old_price="999"
          newPrice="500"
          dollar="$"
          alt="kashima"
          exp_date="10-08-2022"
        />
      </div>
    </div>
  );
}
export default App;