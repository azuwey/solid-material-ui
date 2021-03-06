import type { JSX } from 'solid-js'
import { For } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { createStore } from 'solid-js/store'
import { List, ListItem, Typography } from '../../src'
import { ComponentList } from '..'
import './style.css'

interface Props {
  componentList: ComponentList
}

function Loading (): JSX.Element {
  return <Typography color='inherit' variant='body1'>Loading...</Typography>
}

export default function ({ componentList }: Props): JSX.Element {
  const [state, setState] = createStore({ selectedComponent: 0 })
  const onSelectComponent = (index: number): void => setState({ selectedComponent: index })

  return (
    <div className='skeleton'>
      <div className='component-list'>
        <List>
          <For each={componentList} fallback={<Loading />}>
            {(item, index) => (
              <ListItem onClick={() => onSelectComponent(index())}>
                {item.title}
              </ListItem>
            )}
          </For>
        </List>
      </div>
      <div className='doc'>
        <div className='canvas'>
          {() => (
            <Dynamic
              component={componentList[state.selectedComponent].component}
              {...componentList[state.selectedComponent].props}
            />
          )}
        </div>
        <div className='property-list'>
          <For each={Object.keys(componentList[state.selectedComponent].props)} fallback={<Loading />}>
            {(item) => (
              <div>name: {item} value: {componentList[state.selectedComponent].props[item] as string}</div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
