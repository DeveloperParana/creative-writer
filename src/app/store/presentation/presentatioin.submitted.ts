import {onPresentationSubmitted} from '@store/selectors'
import {readDataFile} from '@utils/read-data-file'
import {handlePresentation} from '@store/actions'
import {loadBlob} from '@utils/load-blob'
import {dispatch} from '@utils/state'

onPresentationSubmitted((value) => {
  const photo = value.photo

  if (value.photoUrl) {
    loadBlob(value.photoUrl)
      .then(readDataFile)
      .then(({data}) => {
        dispatch(handlePresentation({...value, photo: data}))
      })
  } else if (photo instanceof File) {
    readDataFile(photo).then(({data}) => {
      dispatch(handlePresentation({...value, photo: data}))
    })
  }
})
