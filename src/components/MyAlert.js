import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample(props) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" className='expire-alert' onClose={() => setShow(false)} dismissible>
                <p className='text-center' style={{ marginBottom: '0px', padding: '15px' }}>Your password will expire in {props.alert} days.</p>
            </Alert>
        );
    }
    // return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}

export default AlertDismissibleExample;