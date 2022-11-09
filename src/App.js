import './App.css';
import LoginSignupContainer from './component/LoginSignupContainer/LoginSignupContainer';
import NavigationBar from './component/NavigationBar/NavigationBar';

const App = ()=> {
  return (
    <div className="App">
        <NavigationBar/>
        <LoginSignupContainer/>
    </div>
  );
}

export default App;
