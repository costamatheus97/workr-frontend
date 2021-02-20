import React from 'react';

import Dropzone from 'react-dropzone';

import { DropContainer } from './styles';

const ProfilePictureDropzoneComponent: React.FC = ({ children }) => {
  return (
    <Dropzone
      accept="image/*"
      onDrop={acceptedFiles => console.log(acceptedFiles)}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
        <DropContainer
          className="profile_dropzone"
          {...getRootProps()}
          isDragAccept={isDragAccept}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          <p>{children}</p>
        </DropContainer>
      )}
    </Dropzone>
  );
};

export default ProfilePictureDropzoneComponent;
