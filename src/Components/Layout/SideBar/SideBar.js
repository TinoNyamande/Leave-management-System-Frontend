import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './SideBar.css';
import { Link } from 'react-router-dom';
import {faArchive, faCoffee, faCogs, faFlagCheckered, faSpinner} from '@fortawesome/free-solid-svg-icons';
function SideBar () {
    return (
        <div className='my-container'>
            
                <div className='small-column'>
                    <div className='my-side-bar'>
                        <div className='processes sidebar-box'>
                            <Link to="/home" className='h-link'>
                            <div>
                                <FontAwesomeIcon icon={faSpinner} size='4x' />
                                <p>Processes</p>
                            </div>
                            </Link>
                        </div>
                        <div className='reports sidebar-box'>
                        <Link to='/reports' className='h-link'>
                                <div>
                                <FontAwesomeIcon icon = {faFlagCheckered} size='4x' />
                                <p>Reports</p>
                                </div>
                            </Link>
                                
                                
                        </div>
                        <div className='utilities sidebar-box'>
                            <Link to='/settings' className='h-link'>
                                <div>
                                  <FontAwesomeIcon icon ={faCogs} size='4x'/>
                                  <p>Settings</p>
                                </div>
                            </Link>
                                
                        </div>
                     </div>
                </div>
            
        </div>

    ) 
}
export default SideBar