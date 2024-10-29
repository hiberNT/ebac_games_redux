//criando uma função para renderizar os componentes
import { PreloadedState } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react'

import { configuraStore, RootState, AppStore } from '../store'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendeRenderOptions extends Omit<RenderOptions, 'queries'> {
  //to omitindo esse queries desse render para n dar problemas
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizaComProvider( //crianddo uma funçao que vai renderizar um componente ja com o contexto do redux e vai tr a possibilidade de passar um estado inicial para o redux
  elemento: React.ReactElement,
  {
    preloadedState = {}, //aqui é o estado inicial do nosso objeto tipo se quero 2 itens no carrinho os itens ficam aqui
    store = configuraStore(preloadedState),
    ...opcoesAdicionais //ocpoes casa o usuario queira adicionar mais alguma coisa
  }: ExtendeRenderOptions = {}
) {
  function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    //assim pegamos o encapsulador que configuramos
    store,
    ...render(elemento, {
      wrapper: Encapsulador,
      ...opcoesAdicionais
    })
  }
}
