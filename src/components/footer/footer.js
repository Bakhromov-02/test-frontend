import * as Icons from '../../utils/icons';
import classes from './footer.module.css';

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.footer__content}>
                <div className={classes.footer__icons}>
                    <a href="/">{Icons.facebook}</a>
                    <a href="/">{Icons.instagram}</a>
                    <a href="/">{Icons.twitter}</a>
                    <a href="/">{Icons.linkedin}</a>
                </div>

                <p> Copyright ©2020 All rights reserved  </p>
            </div>
        </div>
    )
};

export default Footer;