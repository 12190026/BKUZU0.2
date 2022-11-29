import React, { lazy, useContext, useRef, useState } from 'react'
import { UIContext, UserContext } from '../../../../App'

import FileField from './FileField'

import DialogLoading from '../../../UI/DialogLoading'
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  DialogActions,
  Grid,
  DialogContent,
  Dialog,
  IconButton,
  Avatar,
} from '@material-ui/core'

import DialogHeader from './DialogHeader'
import PreviewImage from './PreviewImage'
import useCreatePost from '../../hooks/useCreatePost'
import { Alert } from '@material-ui/lab'
import { Close } from '@material-ui/icons'

export default function PostFormDialog() {
  const { uiState, uiDispatch } = useContext(UIContext)
  const [blob, setBlob] = useState(null)
  const [postImage, setPostImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [isImageCaptured, setIsImageCaptured] = useState(false)

  const [body, setBody] = useState({
    feelings: '',
    with: [],
    at: '',
    date: '',
  })

  const [postData, setPostData] = useState({
    privacy: 'Public',
    content: '',
  })

  const { userState } = useContext(UserContext)

  const fileRef = useRef()

  const handleContentChange = (e) => {
    setPostData({
      ...postData,
      content: e.target.value,
    })
  }
  const handleImageChange = (e) => {
    setPostImage(e.target.files[0])

    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setBlob(null)
      setIsImageCaptured(false)
      setPreviewImage(reader.result)
    }
  }


  function handleCloseDialog() {
    uiDispatch({ type: 'SET_POST_MODEL', payload: false })
  }

  function removeFileImage() {
    setPreviewImage('')
    setPostImage(null)
  }

  function removeCameraImage() {
    setBlob(null)
    setIsImageCaptured(false)
  }

  function showCapturedImage() {
    if (blob) {
      let blobURL = URL.createObjectURL(blob)

      return (
        <>
          <Alert>
            <b>Image Size ({Math.round(blob.size / 6024)} Kb)</b>
          </Alert>
          <img src={blobURL} style={{ width: '100%', height: '100%' }} alt="" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          >
            <IconButton onClick={removeCameraImage} size="medium">
              <Avatar style={{ background: 'tomato', color: 'white' }}>
                <Close />
              </Avatar>
            </IconButton>
          </div>
        </>
      )
    }
  }

  const { handleSubmitPost, loading } = useCreatePost({
    postData,
    body,
    postImage,
    isImageCaptured,
    blob,
  })

  return (
    <div>
      <Typography
        style={{
          color: !uiState.darkMode ? 'grey' : null,
          padding: '8px',
          background: !uiState.darkMode ? 'rgb(240,242,245)' : null,
          borderRadius: '20px',

          cursor: 'pointer',
        }}
        onClick={() => uiDispatch({ type: 'SET_POST_MODEL', payload: true })}
      >
        What`s in your mind, {userState.currentUser.name} ?
      </Typography>

      {loading ? (
        <DialogLoading loading={loading} text="Uploading Post..." />
      ) : (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          fullWidth
          scroll="body"
          maxWidth="sm"
          open={uiState.postModel}
          onClose={() => uiDispatch({ type: 'SET_POST_MODEL', payload: false })}
          style={{ width: '100%' }}
        >
          <DialogHeader
            userState={userState}
            handleCloseDialog={handleCloseDialog}
            body={body}
          />
          <DialogContent>
           

            <TextField
              placeholder={`Whats in your mind, ${userState.currentUser.name} ?`}
              multiline
              rows={3}
              value={postData.content}
              onChange={handleContentChange}
              style={{
                background: !uiState.darkMode ? '#fff' : null,
                border: 'none',
                width: '100%',
              }}
            />

            <Grid
              container
              justify="center"
              style={{ marginTop: '4px', marginBottom: '4px' }}
            >
             
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ marginTop: '4px', marginBottom: '4px' }}
            >
            </Grid>

            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={6} md={6}>
              <span>Add to your post</span>
                <FileField fileRef={fileRef} />
              </Grid>
            </Grid>
            
            {previewImage && (
              <>
              
                <Alert>
                  <b>Image Size ({Math.round(postImage.size / 6024)} Kb)</b>
                </Alert>
                <PreviewImage
                  previewImage={previewImage}
                  removeFileImage={removeFileImage}
                />
              </>
            )}

            {showCapturedImage()}
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={handleSubmitPost}
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
            >
              {loading ? (
                <CircularProgress
                  variant="indeterminate"
                  size={25}
                  style={{ color: '#fff' }}
                />
              ) : (
                ' Create Post'
              )}
            </Button>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileRef}
              onChange={handleImageChange}
              accept="image/*"
              capture="user"
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
