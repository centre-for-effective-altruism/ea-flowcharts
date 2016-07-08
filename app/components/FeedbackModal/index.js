/**
*
* FeedbackModal
*
*/

import React from 'react';
import { Modal, Button } from 'react-bootstrap'

import styles from './styles.css';

class FeedbackModal extends React.Component {

	constructor(props) {
		super(props);
		this.close = this.close.bind(this);
	}

	static propTypes = {
		showFeedbackModal: React.PropTypes.bool.isRequired,
		setShowFeedbackModal: React.PropTypes.func.isRequired,
	}

	close() {
		this.props.setShowFeedbackModal(false);
	}

    render() {
        return (
            <Modal show={this.props.showFeedbackModal} onHide={this.close} bsSize="lg">
            	<Modal.Header closeButton>
            		<Modal.Title>Give Feedback</Modal.Title>
          		</Modal.Header>
          		<Modal.Body>
          			<iframe className={styles.feedbackModalIFrame} src="https://cea-core.typeform.com/to/gZv1Lr"></iframe>
          		</Modal.Body>
          		<Modal.Footer>
            		<Button onClick={this.close}>Close</Button>
	        	</Modal.Footer>
            </Modal>
        );
    }
}

export default FeedbackModal;
