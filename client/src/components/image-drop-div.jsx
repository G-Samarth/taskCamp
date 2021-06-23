import React, { Fragment } from 'react';

const ImageDropDiv = ({
    setMedia,
    mediaPreview,
    setMediaPreview,
    inputRef,
    handleChange,
}) => {
    const onDropUtil = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length !== 0) {
            const droppedFile = Array.from(e.dataTransfer.files);
            setMedia(droppedFile[0]);
            setMediaPreview(URL.createObjectURL(droppedFile[0]));
        }
    };
    return (
        <Fragment>
            <form className="upload-form">
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    name="media"
                    ref={inputRef}
                />
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDropUtil(e)}
                >
                    {!mediaPreview ? (
                        <Fragment>
                            <div
                                className="upload-box border-5"
                                onClick={() => inputRef.current.click()}
                            >
                                <p className="text-align">
                                    <i className="fas fa-cloud-upload-alt lg" />
                                </p>
                                <p className="sm text-align">
                                    Drag n Drop or Click To Upload Image
                                </p>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="uploaded-box">
                                <img
                                    className="uploaded-img round-img is-profile-lg"
                                    src={mediaPreview}
                                    centered
                                    onClick={() => inputRef.current.click()}
                                    alt="Profile"
                                />
                            </div>
                        </Fragment>
                    )}
                </div>
            </form>
        </Fragment>
    );
};

export default ImageDropDiv;
