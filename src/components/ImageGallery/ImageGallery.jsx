import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
    state = {
        showModal: false,
        bigPic: null,
    };

    componentDidMount() {
        document.addEventListener('click', e => {
            if (e.target.nodeName !== 'IMG') {
                if (!this.state.showModal) {
                    return;
                }
                this.setState({ showModal: false });
                return;
            }

            const picture = this.props.images.find(obj => {
                return obj.id === parseInt(e.target.alt);
            });
            if (!picture) {
                return;
            }
            this.setState({ bigPic: picture.largeImageURL });
        });
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal, bigPic: null }));
    };

    render() {
        const { showModal, bigPic } = this.state;
        return (
            <>
                <ul className={s.gallery} onClick={this.toggleModal}>
                    {this.props.images.map(img => {
                        return (
                            <ImageGalleryItem
                                key={nanoid()}
                                smallImgURL={img.webformatURL}
                                id={img.id}
                            />
                        );
                    })}
                </ul>
                <Modal show={showModal} onClose={this.toggleModal} pic={bigPic} />
            </>
        );
    }
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        })
    ),
};