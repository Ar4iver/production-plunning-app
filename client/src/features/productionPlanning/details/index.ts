import { Details, DetailsState } from './model/types/details'
import { detailsReducer } from './model/slice/detailsSlice'
import { getIsLoading } from './model/selectors/getIsLoadingData'
import { fetchDetailsData } from './model/services/fetchDetails'
import { getDetails } from './model/selectors/getDetails'
import { getIsErrorData } from './model/selectors/getIsErrorData'

export { fetchDetailsData }

export { getDetails, getIsLoading, getIsErrorData }

export { detailsReducer }

export { DetailsState, Details }
