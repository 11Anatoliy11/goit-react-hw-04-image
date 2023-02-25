import React, { Component } from 'react';
import { createPortal } from "react-dom";
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
    modalRoot = document.getElementById('modalRoot');

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            return this.props.onClose();
        }
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        return createPortal(
            <div className={s.overlay}>
                <div className={s.modal}>
                    <img src={this.props.pic} alt="" />
                </div>
            </div>,
            this.modalRoot
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};