// import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Header from './component/Header/Header';
import Body from './component/Body/Body';
// import MapComponent from './component/Map/Map';

function App() {
  return (
    <div className="App">
      {/* <header> */}
        <Header />
      {/* </header> */}
      {/* <header className="App-header"> */}
      <div>
        <Body />
      </div>
        {/* <p>Just a test</p> */}
      {/* </header> */}
      {/* <Body /> */}
    </div>
  );
}

export default App;
