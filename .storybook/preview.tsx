import React from "react"
import type { Preview } from "@storybook/react"
import { Provider } from "react-redux"
import { store } from "../src/app/store"
import '../src/index.css'
import { ThemeConfig } from "tailwindcss/types/config";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    dataThemes: {
      defaultValue: {
        list: [
          { name: "Dark", dataTheme: "dark", color: "#00755e" },
          { name: "Light", dataTheme: "light", color: "#ffb7d5" },
        ],
        dataAttribute: "data-mode",            // optional (default: "data-theme")
        clearable: true,                        // optional (default: true)
        toolbar: {
          title: "Change data-theme attribute", // optional
          icon: "paintbrush",                   // optional
        },
      } satisfies ThemeConfig,
    },
  },

  /*
  decorators: [withThemeByDataAttribute({
    themes: {
      // nameOfTheme: 'dataAttributeForTheme',
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'dark',
    attributeName: 'data-mode',
  })]
  */
}

export default preview

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
]