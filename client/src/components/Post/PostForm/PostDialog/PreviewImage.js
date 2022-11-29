import { Avatar, CardMedia, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'

function PreviewImage({ previewImage, removeFileImage }) {
  return (
    <>
      <CardMedia
        image={previewImage}
        style={{ width: '100', height: '220px' }}
      />
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
        <IconButton onClick={removeFileImage} size="medium">
          <Avatar style={{ background: 'tomato', color: 'white' }}>
            <Close />
          </Avatar>
        </IconButton>
      </div>
    </>
  )
}

export default PreviewImage
