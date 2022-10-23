import React from 'react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = percentage => (
    percentage === 100
        ? (<Progress percent={percentage} success={true} />)
        : (<Progress percent={percentage} active={true} />)
)

export default ProgressBar;
