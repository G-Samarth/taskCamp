import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ImageDropDiv from './image-drop-div';

import { toggleProfileImage } from '../redux/auth/auth.actions';

const UploadImage = ({ toggleProfileImage }) => {
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const inputRef = useRef();

    const handleChange = (e) => {
        const { name, files } = e.target;
        if (name === 'media' && files.length !== 0) {
            setMedia(files[0]);
            setMediaPreview(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (media) {
            const reader = new FileReader();
            reader.readAsDataURL(media);
            let uploadImage;
            reader.onloadend = async () => {
                uploadImage = reader.result;
                await axios.put('/auth/upload', { uploadImage });
            };
        }

        toggleProfileImage();
    };

    return (
        <div className="popup" id="popup">
            <div className="popup-card p-3 bg-white border-5">
                <div
                    className="popup-close"
                    onClick={() => toggleProfileImage()}
                >
                    &times;
                </div>
                <ImageDropDiv
                    setMedia={setMedia}
                    mediaPreview={mediaPreview}
                    setMediaPreview={setMediaPreview}
                    inputRef={inputRef}
                    handleChange={handleChange}
                />
                {mediaPreview && (
                    <button
                        onClick={(e) => handleSubmit(e)}
                        style={{ width: '10rem', margin: 'auto' }}
                        className="btn btn-success blur-sm"
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
};

export default connect(null, { toggleProfileImage })(UploadImage);
