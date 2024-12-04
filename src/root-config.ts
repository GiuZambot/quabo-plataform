import { LifeCycles, registerApplication, start } from 'single-spa'
import 'systemjs'

export const waitForElement = (selector: string, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const check = () => {
      const element = document.querySelector(selector)
      if (element) {
        resolve(element)
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for element ' + selector))
      } else {
        setTimeout(check, 100)
      }
    }
    check()
  })
}

export const appLoader = async (
  moduleName: string,
  elementSelector: string,
) => {
  const module = await System.import(moduleName)

  if (!module || typeof module !== 'object') {
    throw new Error('Module did not load correctly')
  }

  const lifeCycles: LifeCycles<{ domElementGetter: () => HTMLElement | null }> =
    {
      bootstrap: module.bootstrap
        ? module.bootstrap.bind(module)
        : () => Promise.resolve(),
      mount: async (props) => {
        await waitForElement(elementSelector)
        return module.mount ? module.mount(props) : Promise.resolve()
      },
      unmount: module.unmount
        ? module.unmount.bind(module)
        : () => Promise.resolve(),
    }

  return lifeCycles
}

registerApplication({
  name: '@test',
  app: () => appLoader('@test', '#mfe-container'),
  activeWhen: ['/mfe/catalog'],
  customProps: {
    domElementGetter: () => document.getElementById('mfe-container'),
  },
})

registerApplication({
  name: '@verbete/frontend',
  app: () => System.import('http://localhost:3000/frontend/verbete.js'), // URL servida pelo backend
  activeWhen: ['/games/verbete'],
  customProps: {
    domElementGetter: () => document.getElementById('mfe-container'),
  },
})

start({
  urlRerouteOnly: true,
})
