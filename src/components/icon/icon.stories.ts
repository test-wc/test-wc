import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from "lit";

import {Icon} from './icon'

Icon.addIconSet("it", "/assets/svg/sprites.svg")

interface IconPros {

}

const renderComponent = (params: any) => {
  return html`
    <bsi-icon type='primary' name='it-android-square'></bsi-icon>
  `
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: 'bsi-icon',
  render: (args) => renderComponent(args),
  args: {
      slot: 'Testo bottone',
      variant: 'primary',
      outline: false,
      disabled: false
  },
  argTypes: {
    variant: { 
      control: 'select',
      description: 'Overwritten description',
      options: ['primary', 'success', 'warning', 'danger']
    },
    disabled: { 
      control: 'boolean',
      type: 'boolean'
    },
    outline: { 
      control: 'boolean',
      type: 'boolean'
    },
    slot:  { 
      control: 'text',
    },
  },
} satisfies Meta<IconPros>;

export default meta;
type Story = StoryObj<IconPros>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
  },
};
