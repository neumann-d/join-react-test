import Button from '@material-ui/core/Button';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useState } from 'react';

import { toBase64 } from '../../common/utils';

const CandidateAvatarUpload = ({
    useAvatarState,
    buttonText
}: {
    useAvatarState: [string, React.Dispatch<React.SetStateAction<string>>];
    buttonText: string;
}) => {
    const [open, setOpen] = useState(false);
    const setAvatar = useAvatarState[1];

    const handleClose = () => setOpen(false);

    const handleSave = async (files: File[]) => {
        //Saving file to state for further use and closing Modal.
        const img = await toBase64(files[0]);
        setAvatar(String(img) || '');
        setOpen(false);
    };

    const handleOpen = () => setOpen(true);

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                {buttonText}
            </Button>
            <DropzoneDialog
                open={open}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
                filesLimit={1}
            />
        </div>
    );
};

export default CandidateAvatarUpload;
