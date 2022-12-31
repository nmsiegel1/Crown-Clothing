import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/home.component";
import NavBar from "./routes/navigation/navigation.component";

const Shop = () => {
  return (
    <div>
      <h2> this is the shop page</h2>
    </div>
  );
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
