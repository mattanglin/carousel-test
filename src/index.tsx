import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const renderApp = (Component: React.ComponentType) =>
ReactDOM.render(<Component />, document.getElementById('root') as HTMLElement)

renderApp(App)

if ((module as any).hot) {
  (module as any).hot.accept('./App.tsx', () => {
    const NextApp = require('./App.tsx').default
    console.log('🔥🔥🔥 HMR Update 🔥🔥🔥')

    renderApp(NextApp)
  })
}
