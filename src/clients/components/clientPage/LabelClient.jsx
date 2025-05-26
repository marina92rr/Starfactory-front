import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadLabelsRequest,
    loadLabelsSuccess,
    loadLabelsFailure,
    clearLabels} from "../../../store/label/labelSlice";
import { clientsApi } from '../../../api';

export const LabelClient = ({dni}) => {

const dispatch = useDispatch()
 // Extraemos cada trozo de estado por separado y damos un default
   const labels = useSelector(state => state.labels?.labels) ?? []
 
   useEffect(() => {
    dispatch(clearLabels())
    dispatch(loadLabelsRequest())

    clientsApi.get(`/clients/${dni}/labels`)
      .then(response => {

        dispatch(loadLabelsSuccess(response.data.labels))
      })
      .catch(err => {
        dispatch(loadLabelsFailure(err.message))
      })
  }, [dispatch, dni])

    
  return (
   <div>
        <div className="d-flex align-items-center flex-wrap">
        {labels.map((label, idx) => (
          <span key={idx} 
                className='badge'
                style={{  
                  fontSize:'0.9rem',
                  backgroundColor: label.color,
                  color: 'black',
                  padding: '5px 10px',
                  borderRadius: '25px',
                  marginRight: '8px' 
                }}>
            {label.name.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  )
}
