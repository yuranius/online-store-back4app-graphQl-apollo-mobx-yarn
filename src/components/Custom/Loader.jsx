import Spinner from 'react-bootstrap/Spinner';

function Loader({animation, variant}) {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{height: window.innerHeight-100}}>
            <Spinner animation={animation} variant={variant} />
        </div>
    );
}

export default Loader;