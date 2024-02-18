import { DetailsState } from './model/types/details'
import { detailsReducer } from './model/slice/detailsSlice'
import { getIsLoading } from './model/selectors/getIsLoadingData'
import { fetchDetailsData } from './model/services/fetchDetails'
import { getDetails } from './model/selectors/getDetails'

export { fetchDetailsData }

export { getDetails, getIsLoading }

export { detailsReducer }

export { DetailsState }
