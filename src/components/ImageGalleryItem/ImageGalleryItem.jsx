import React, { PureComponent } from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends PureComponent {
    render() {
        return (
            <li className={s.galleryItem}>
                <img src={this.props.smallImgURL} alt={this.props.id} />
            </li>
        );
    }
}


ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    smallImgURL: PropTypes.string.isRequired,
};