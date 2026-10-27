import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate()
    return (
        <div className='left-side'>
        <h1>BasketDash</h1>
        <h3>See all recent basketball games!</h3>
        <div className='menu-buttons'>
          <button id="menu-button" onClick={ () => navigate("/")}>Dashboard</button>
          <button id="menu-button">Search</button>
          <button id="menu-button">About</button>
        </div>
        
      </div>
    );
}