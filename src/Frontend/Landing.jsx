import InstaIcon from '/insta.svg'
import GitHubIcon from '/github.svg'
import LinkedinIcon from '/linkedin2.svg'
import Typewriter from 'typewriter-effect';
import CustomObjectViewer from '../Shapes/Custom';

function Landing(){

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            setShowModal(true); // Show the modal when a file is uploaded
        }
    }

    return(
        <>
            <nav>
                <a href="/">Vue Mesh</a>
                <ul>
                    <li>
                        <a href="https://www.instagram.com/annany_12/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <img src={InstaIcon} alt="Instagram" style={{ width: '24px', height: '24px' }} />
                            {/* Insta */}
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/Annany-12" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <img src={GitHubIcon} alt="Instagram" style={{ width: '24px', height: '24px' }} />
                            {/* GitHub */}
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/annany-sharma-94b195292/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <img src={LinkedinIcon} alt="Instagram" style={{ width: '24px', height: '24px' }} />
                            {/* LinkedIn */}
                        </a>
                    </li>
                </ul>
            </nav>
            {/* <h1 class="title">View 3D Files Anywhere, Anytime
            </h1> */}

            {/* <h1 className="title">
                View <Typewriter
                options={{
                    strings: ['.obj', '.glb', '.gltf', '3D'],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                }}
                /> files anywhere, anytime
            </h1> */}

            <h1 className="title">
                View <span className="typewriter">
                <Typewriter
                    options={{
                    strings: ['3D', 'gltf', 'fbx', 'obj', 'vox'],
                    autoStart: true,
                    loop: true,
                    pauseFor: 2000,
                    delay: 200,
                    cursor: "",
                    }}
                />
                </span> files anywhere, anytime
            </h1>

            <h2 class="title2">Directly in Your Browser
            </h2>
            <p>Give the Sphere a big Spin</p>
            {/* <div className='input-container'>
                <input type="file" className='inputFile' />
            </div> */}


            {/* <div className='input-container'>
                <label className='custom-file-upload'>
                    <input type="file" className='inputFile' />
                    Click to Upload
                </label>
            </div> */}

        
            {/* <div className='input-container'>
                <label className='custom-file-upload'>
                    <input type="file" className='inputFile' onChange={handleFileUpload} accept=".glb,.gltf" />
                    Click to Upload
                </label>
            </div> */}

        </>
    );

}

export default Landing;