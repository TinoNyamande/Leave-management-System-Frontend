import { faPlane, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AppTest.css"
function AppTest () {
    return (
        <div className="process-container">
        <div className="process">
          <img src="process1-logo.png" alt="Process 1 Logo"/>
          <h2>Process 1</h2>
          <i className="fas fa-play-circle fa-3x play-icon"></i>
        </div>
    
        <div className="process">
        <FontAwesomeIcon className="process-logo fas fa-play-circle fa-3x play-icon" icon={faPlay} ></FontAwesomeIcon>
          <h2>Process 2</h2>
          <i className="fas fa-play-circle fa-3x play-icon"></i>
          <FontAwesomeIcon className="fas fa-play-circle fa-3x play-icon" icon={faPlay} ></FontAwesomeIcon>

        </div>
      </div>
    )
}


 
export default AppTest
