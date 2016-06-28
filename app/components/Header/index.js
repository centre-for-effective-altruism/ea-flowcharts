/**
*
* Header
*
*/

import React from 'react';
import LogoLightbulb from 'assets/logos/ea-logo-lightbulb.svg';
import LogoText from 'assets/logos/ea-logo-text.svg';
import { Grid, Row, Col } from 'react-bootstrap';

import styles from './styles.css';

function Header() {
    return (
        <div className={styles.header}>
            <Grid>
                <Row>
                    <Col md={6}>
                        <Row>
                            <Col xs={2}>
                                <div className={styles.headerContent}>
                                    <img className={`img-responsive ${styles.headerLogoLightbulb}`} alt={'Effective Altruism Logo Lightbulb'} src={LogoLightbulb} />
                                </div>
                            </Col>
                            <Col xs={10}>
                                <div className={styles.headerContent}>
                                    <img className={`img-responsive ${styles.headerLogoText}`} alt={'Effective Altruism Logo'} src={LogoText} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <div className={styles.headerContent}>
                            <h1 className={styles.headerTitle}>Flowcharts</h1>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}

export default Header;
