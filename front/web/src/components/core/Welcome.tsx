import { Icon, IconSize, Intent, ProgressBar } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'


function Welcome() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <Icon icon={IconNames.TREE} intent={Intent.PRIMARY} size={IconSize.LARGE} />
        <h1>Welcome to the app.</h1>
        <div  className='w-60'>
          <ProgressBar intent={Intent.PRIMARY}/>
        </div>
    </div>
  )
}

export default Welcome